import { IsEthereumAddress, isEthereumAddress } from 'class-validator';

export class AddressDto {
    
  @IsEthereumAddress()
  address: string;
}
