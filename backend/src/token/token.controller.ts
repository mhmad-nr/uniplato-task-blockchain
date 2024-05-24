import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { AddressDto } from './dto';

// @ApiTags('Auth')
@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}
  @Post('token-balance')
  async getTokenBalance(@Body() addressDto: AddressDto): Promise<string> {
    return await this.tokenService.getTokenBalance(addressDto);
  }
  @Post('eth-balance')
  async getEthBalance(@Body() addressDto: AddressDto): Promise<string> {
    return await this.tokenService.getEthBalance(addressDto);
  }
}
