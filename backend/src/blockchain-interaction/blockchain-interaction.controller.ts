import { Controller, Body, Post } from '@nestjs/common';
import { BCService } from './blockchain-interaction.service';
import { TransactionDto } from './dto/transaction.dto';
import { ValueDto } from './dto/value.dto';
import { AddressDto } from './dto';

// @ApiTags('Auth')
@Controller('blockchain-interaction')
export class BCController {
  constructor(private bCService: BCService) {}
  @Post('balance')
  async getBalance(@Body() { address }: AddressDto): Promise<ValueDto> {
    return this.bCService.getBalance(address);
  }
  @Post('transaction-count')
  async getTransactionCount(
    @Body() { address }: AddressDto,
  ): Promise<ValueDto> {
    return this.bCService.getTransactionCount(address);
  }

  @Post('transaction')
  create(@Body() transactionDto: TransactionDto) {
    return this.bCService.sendTransaction(transactionDto);
  }
}
