import { Module } from '@nestjs/common';
import { BCModule } from './blockchain-interaction/blockchain-interaction.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [BCModule , TokenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
