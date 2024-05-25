import { expect } from 'chai';
import { BCController } from '../src/blockchain-interaction/blockchain-interaction.controller';
import { BCService } from '../src/blockchain-interaction/blockchain-interaction.service';
import {
  AddressDto,
  TransactionDto,
  ValueDto,
} from '../src/blockchain-interaction/dto';
import * as sinon from 'sinon';

describe('BCController', () => {
  let bcController: BCController;
  let bcServiceStub: sinon.SinonStubbedInstance<BCService>;

  beforeEach(() => {
    bcServiceStub = sinon.createStubInstance(BCService);
    bcController = new BCController(bcServiceStub);
  });

  afterEach(() => {
    sinon.restore();
  });
  describe('getBalance', () => {
    it('should get the balance', async () => {
      const addressDto: AddressDto = { address: '0xAddress' };
      const expectedValue: ValueDto = { value: '1000' };
      bcServiceStub.getBalance.resolves(expectedValue);

      const result = await bcController.getBalance(addressDto);
      expect(result).to.equal(expectedValue);
    });
  });
  describe('getTransactionCount', () => {
    it('should get the transaction count', async () => {
      const addressDto: AddressDto = { address: '0xAddress' };
      const expectedValue: ValueDto = { value: '10' };
      bcServiceStub.getTransactionCount.resolves(expectedValue);

      const result = await bcController.getTransactionCount(addressDto);
      expect(result).to.equal(expectedValue);
    });
  });
  describe('sedTransaction', () => {
    it('should create a transaction', async () => {
      const transactionDto: TransactionDto = {
        amount: 1,
        from: 'from address',
        privateKey: 'private key',
        to: 'to address',
      };
      const expectedResponse = { value: 'tx hash' };
      bcServiceStub.sendTransaction.resolves(expectedResponse);

      const result = await bcController.sedTransaction(transactionDto);
      expect(result).to.equal(expectedResponse);
    });
  });
});
