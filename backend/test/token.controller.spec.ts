import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { TokenController } from '../src/token/token.controller';
import { TokenService } from '../src/token/token.service';
import { AddressDto, MintDto } from '../src/token/dto';

describe('TokenController', () => {
  let tokenService: TokenService;
  let tokenController: TokenController;

  beforeEach(() => {
    tokenService = new TokenService();
    tokenController = new TokenController(tokenService);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getTokenBalance', () => {
    it('should return token balance', async () => {
      const addressDto: AddressDto = { address: '0x123', privateKey: 'key' };
      const expectedBalance = '1000';
      const getTokenBalanceStub = sinon
        .stub(tokenService, 'getTokenBalance')
        .resolves(expectedBalance);

      const result = await tokenController.getTokenBalance(addressDto);
      expect(result).to.equal(expectedBalance);
      expect(getTokenBalanceStub.calledOnceWith(addressDto)).to.be.true;
    });
  });

  describe('getEthBalance', () => {
    it('should return ETH balance', async () => {
      const addressDto: AddressDto = { address: '0x123', privateKey: 'key' };
      const expectedBalance = '500';
      const getEthBalanceStub = sinon
        .stub(tokenService, 'getEthBalance')
        .resolves(expectedBalance);

      const result = await tokenController.getEthBalance(addressDto);
      expect(result).to.equal(expectedBalance);
      expect(getEthBalanceStub.calledOnceWith(addressDto)).to.be.true;
    });
  });

  describe('mintToken', () => {
    it('should mint tokens and return transaction hash', async () => {
      const mintDto: MintDto = { amount: 100, privateKey: 'key' };
      const expectedTxHash = '0xabc123';
      const mintTokenStub = sinon
        .stub(tokenService, 'mintToken')
        .resolves(expectedTxHash);

      const result = await tokenController.mintToken(mintDto);
      expect(result).to.equal(expectedTxHash);
      expect(mintTokenStub.calledOnceWith(mintDto)).to.be.true;
    });
  });
});
