import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsString, isEthereumAddress } from 'class-validator';

export class AddressDto {
    
  @IsEthereumAddress()
  address: string;

  @ApiProperty()
  @IsString()
  privateKey: string;
}
