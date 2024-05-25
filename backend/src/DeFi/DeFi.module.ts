import { Module } from '@nestjs/common';
import { DeFiController } from './defi.controller';
import { DeFiService } from './defi.service';

@Module({
  imports: [],
  controllers: [DeFiController],
  providers: [DeFiService],
})
export class DeFiModule {}
