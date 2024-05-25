import { Body, Controller, Post } from '@nestjs/common';
import { DeFiService } from './DeFi.service';

@Controller('defi')
export class DeFiController {
  constructor(private tokenService: DeFiService) {}
  // @Post('token-balance')
  // async getTokenBalance(@Body() addressDto: AddressDto): Promise<string> {
    // return await this.tokenService.getTokenBalance(addressDto);
  // }
 
}
