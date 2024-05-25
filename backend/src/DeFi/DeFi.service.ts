import {
  Injectable,
} from '@nestjs/common';
import * as ethers from 'ethers';

const url =
  'https://eth-sepolia.g.alchemy.com/v2/3VcyTXGugy89ZiitlqrRGmo8SHTTr-g4';
@Injectable()
export class DeFiService {
  private provider: ethers.JsonRpcProvider;
  constructor() {
    this.provider = new ethers.JsonRpcProvider(url);
  }

}
