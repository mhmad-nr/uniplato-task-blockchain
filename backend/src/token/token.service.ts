import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import * as ethers from 'ethers';
import { MintDto } from './dto/mint.dto';
import { ValueDto } from './dto/value.dto';
import {
  abi,
  address as contractAddress,
} from '../util/contracts/sepolia/MyDeFi.json';
import { AddressDto } from './dto';

const url =
  'https://eth-sepolia.g.alchemy.com/v2/3VcyTXGugy89ZiitlqrRGmo8SHTTr-g4';
@Injectable()
export class TokenService {
  private provider: ethers.JsonRpcProvider;
  constructor() {
    this.provider = new ethers.JsonRpcProvider(url);
  }
  async getContract(key: string) {
    const signer = new ethers.Wallet(key, this.provider);

    return {
      contract: new ethers.Contract(contractAddress, abi, signer),
      signer,
    };
  }

  async getTokenBalance(addressDto: AddressDto): Promise<string> {
    const { address, privateKey } = addressDto;
    const { contract } = await this.getContract(privateKey);

    const balance = await contract.balanceOf(address);
    return ethers.formatUnits(balance, 18); // Adjust the decimals if necessary
  }
  async getEthBalance(addressDto: AddressDto): Promise<string> {
    const { address, privateKey } = addressDto;
    const { contract } = await this.getContract(privateKey);

    const balance = await contract.balanceOf(address);
    return ethers.formatUnits(balance, 18); // Adjust the decimals if necessary
  }

  async mintToken(mintDto: MintDto): Promise<any> {
    const { privateKey, amount } = mintDto;
    const { contract } = await this.getContract(privateKey);

    const tx = await contract.mint(amount, {
      value: ethers.parseUnits(amount.toString(), 'gwei'),
    });
    const receipt = await tx.wait();

    return { value: receipt.hash };
  }
  async diposit(mintDto: MintDto): Promise<any> {
    const { privateKey, amount } = mintDto;
    const { contract } = await this.getContract(privateKey);

    const tx = await contract.diposit({
      value: ethers.parseUnits(amount.toString(), 'gwei'),
    });
    const receipt = await tx.wait();

    return { value: receipt.hash };
  }
}
