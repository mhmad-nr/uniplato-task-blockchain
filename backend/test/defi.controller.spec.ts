import { expect } from 'chai';
import { DeFiController } from '../src/DeFi/defi.controller';
import { DeFiService } from '../src/DeFi/defi.service';
import { PoolDto } from '../src/DeFi/dto/pool.dto';
import * as sinon from 'sinon';

describe('DeFiController', () => {
  let deFiController: DeFiController;
  let deFiService: DeFiService;
  let deFiServiceStub: sinon.SinonStubbedInstance<DeFiService>;

  beforeEach(() => {
    deFiServiceStub = sinon.createStubInstance(DeFiService);
    deFiController = new DeFiController(deFiServiceStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getFactoryOwner', () => {
    it('should get the factory owner', async () => {
      const expectedOwner = '0xFactoryOwnerAddress';
      deFiServiceStub.getFactoryOwner.resolves(expectedOwner);

      const result = await deFiController.getFactoryOwner();
      expect(result).to.equal(expectedOwner);
    });
  });
  describe('enableFeeAmount', () => {
    it('should enable fee amount', async () => {
      const fee = 1;
      const tickSpacing = 10;
      const expectedResponse = 'success'; // Change this to whatever string your service returns
      deFiServiceStub.enableFeeAmount.resolves(expectedResponse);

      const result = await deFiController.enableFeeAmount(fee, tickSpacing);

      expect(result).to.be.equal(expectedResponse);
    });
  });
  describe('getTickSpacing', () => {
    it('should get tick spacing', async () => {
      const fee = '1';
      const expectedTickSpacing = 10;
      deFiServiceStub.getTickSpacing.resolves(expectedTickSpacing);

      const result = await deFiController.getTickSpacing(fee);
      expect(result).to.equal(expectedTickSpacing);
    });
  });
  describe('createPool', () => {
    it('should create a pool', async () => {
      const poolDto: PoolDto = {
        tokenA: '0xTokenA',
        tokenB: '0xTokenB',
        fee: 30,
      };

      const expectedResponse = '0xPoolAddress';
      deFiServiceStub.createPool.resolves(expectedResponse);

      const result = await deFiController.createPool(poolDto);
      expect(result).to.equal(expectedResponse);
    });
  });

  describe('getPoolAddress', () => {
    it('should get pool address', async () => {
      const poolDto: PoolDto = {
        tokenA: '0xTokenA',
        tokenB: '0xTokenB',
        fee: 30,
      };
      const expectedPoolAddress = '0xPoolAddress';
      deFiServiceStub.getPoolAddress.resolves(expectedPoolAddress);

      const result = await deFiController.getPoolAddress(poolDto);
      expect(result).to.equal(expectedPoolAddress);
    });
  });
});
