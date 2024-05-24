import { Module } from '@nestjs/common';
import { BCController } from './blockchain-interaction.controller';
import { BCService } from './blockchain-interaction.service';

@Module({
  imports: [],
  controllers: [BCController],
  providers: [BCService],
  exports: [BCService],
})
export class BCModule {}
