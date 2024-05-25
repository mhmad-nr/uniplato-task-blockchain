import { Module } from '@nestjs/common';
import { BCModule } from './blockchain-interaction/blockchain-interaction.module';
import { TokenModule } from './token/token.module';
import { DeFiModule } from './DeFi/defi.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), BCModule, TokenModule, DeFiModule],
})
export class AppModule {}
