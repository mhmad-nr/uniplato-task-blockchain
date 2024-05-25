import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PoolDto } from './dto/pool.dto';
import { ethers } from 'ethers';
import {
  abi as uniswapFactoryABI,
  address as uniswapFactoryAddress,
} from '../util/contracts/sepolia/Uniswap.json';



@Injectable()
export class DeFiService {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private uniswapFactory: ethers.Contract;
  
  constructor() {
    const RPC_URL = process.env.SEPOLIA_RPC_URL || '';
    const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
    
    this.provider = new ethers.JsonRpcProvider(RPC_URL);
    this.signer = new ethers.Wallet(PRIVATE_KEY, this.provider);
    this.uniswapFactory = new ethers.Contract(
      uniswapFactoryAddress,
      uniswapFactoryABI,
      this.signer,
    );
  }

  async createPool(poolDto: PoolDto): Promise<string> {
    try {
      const { fee, tokenA, tokenB } = poolDto;
      const tx = await this.uniswapFactory.createPool(tokenA, tokenB, fee);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      if (error.info.error.code == -32000) {
        throw new BadRequestException(error.info.error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async enableFeeAmount(fee: number, tickSpacing: number): Promise<string> {
    try {
      const tx = await this.uniswapFactory.enableFeeAmount(fee, tickSpacing);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      if (error.info.error.code == -32000) {
        throw new BadRequestException(error.info.error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async getTickSpacing(fee: string): Promise<number> {
    return await this.uniswapFactory.feeAmountTickSpacing(fee);
  }

  async getPoolAddress(poolDto: PoolDto): Promise<string> {
    const { fee, tokenA, tokenB } = poolDto;
    return await this.uniswapFactory.getPool(tokenA, tokenB, fee);
  }

  async getFactoryOwner(): Promise<string> {
    return await this.uniswapFactory.owner();
  }
}
