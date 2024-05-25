import {
  IsNumber,
  IsEthereumAddress,
  isEthereumAddress,
} from 'class-validator';

export class PoolDto {
  @IsEthereumAddress()
  tokenA: string;

  @IsEthereumAddress()
  tokenB: string;

  @IsNumber()
  fee: number;
}
