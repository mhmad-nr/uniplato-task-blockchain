import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValueDto {
  @ApiProperty()
  @IsNumberString()
  value: number | string;
}
