import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DeFiService } from './defi.service';
import { PoolDto } from './dto/pool.dto';

@Controller('defi')
export class DeFiController {
  constructor(private readonly deFiService: DeFiService) {}
  @Get('factory-owner')
  getFactoryOwner() {
    return this.deFiService.getFactoryOwner();
  }

  @Get('enable-fee-amount/:fee/:tickspacing')
  enableFeeAmount(
    @Param('fee') fee: number,
    @Param('tickspacing') tickSpacing: number,
  ) {
    return this.deFiService.enableFeeAmount(fee, tickSpacing);
  }

  @Get('tick-spacing/:fee')
  getTickSpacing(@Param('fee') fee: string) {
    return this.deFiService.getTickSpacing(fee);
  }

  @Post('create-pool')
  createPool(@Body() poolDto: PoolDto) {
    return this.deFiService.createPool(poolDto);
  }

  @Post('pool-address')
  getPoolAddress(@Body() poolDto: PoolDto) {
    return this.deFiService.getPoolAddress(poolDto);
  }
}
