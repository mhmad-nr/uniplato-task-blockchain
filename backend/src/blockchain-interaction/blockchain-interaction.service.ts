import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import * as ethers from 'ethers';
import { TransactionDto } from './dto/transaction.dto';
import { ValueDto } from './dto/value.dto';

@Injectable()
export class BCService {
  private provider: ethers.JsonRpcProvider;
  constructor() {
    const RPC_URL = process.env.SEPOLIA_RPC_URL || '';

    this.provider = new ethers.JsonRpcProvider(RPC_URL);
  }

  async getBalance(address: string): Promise<ValueDto> {
    try {
      const balance = await this.provider.getBalance(address);

      return {
        value: ethers.formatEther(balance),
      };
    } catch (error) {
      if (error.error.code) {
        throw new BadRequestException(error.error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async getTransactionCount(address: string): Promise<ValueDto> {
    try {
      const value = await this.provider.getTransactionCount(address);
      return {
        value,
      };
    } catch (error) {
      if (error.error.code) {
        throw new BadRequestException(error.error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async sendTransaction(transactionDto: TransactionDto): Promise<ValueDto> {
    try {
      const { privateKey, amount, from, to } = transactionDto;
      // Create a wallet instance from the private key
      const wallet = new ethers.Wallet(privateKey, this.provider);

      // Define the transaction details
      const tx = {
        to,
        value: ethers.parseEther(amount.toString()),
        gasLimit: 10, // 21000 is the standard gas limit for a simple ETH transfer
      };
      // Sign and send the transaction
      const transactionResponse = await wallet.sendTransaction(tx);

      // Wait for the transaction to be mined
      const receipt = await transactionResponse.wait();

      // Return the transaction hash
      return { value: receipt.hash };
    } catch (error) {
      if (error.error.code) {
        throw new BadRequestException(error.error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
