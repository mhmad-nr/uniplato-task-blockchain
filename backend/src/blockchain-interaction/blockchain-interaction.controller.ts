import { Controller, Body, Post } from '@nestjs/common';
import { BCService } from './blockchain-interaction.service';
import { AddressDto, ValueDto ,TransactionDto} from './dto';

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
  async sedTransaction(@Body() transactionDto: TransactionDto) {
    return await this.bCService.sendTransaction(transactionDto);
  }
}
