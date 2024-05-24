import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
} from 'class-validator';

export class MintDto {
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  privateKey: string;
}
