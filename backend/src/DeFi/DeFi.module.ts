import { Module } from '@nestjs/common';
import { DeFiController } from './DeFi.controller';
import { DeFiService } from './DeFi.service';

@Module({
  imports: [],
  controllers: [DeFiController],
  providers: [DeFiService],
})
export class DeFiModule {}
