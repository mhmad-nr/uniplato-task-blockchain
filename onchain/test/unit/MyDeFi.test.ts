import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { MyDeFi } from "../../typechain-types";
describe("MyDeFi", () => {
  let myDeFi: MyDeFi;
  let deployer: string;
  let address: HardhatEthersSigner[];

  let NOT_SIGNED_ADDRESS: HardhatEthersSigner;

  const getValue = (value: number, type: "wei" | "gwei" | "ether") =>
    ethers.parseUnits(value.toString(), type);
  const ENOUGH_VALUE = getValue(1, "gwei");
  const NOT_ENOUGH_VALUE = getValue(1, "wei");
  const AMOUNT = 10;

  const NAME = "NAME";
  const MESSAGE = "MESSAGE";

  beforeEach(async () => {
    address = await ethers.getSigners();
    NOT_SIGNED_ADDRESS = address[1];
    deployer = (await getNamedAccounts()).deployer;

    await deployments.fixture(["all"]);
    const myContract = await deployments.get("MyDeFi");

    myDeFi = await (ethers as any).getContractAt(
      myContract.abi,
      myContract.address
    );
  });
  describe("diposit", () => {
    it("must reverted 'MyDeFi__ValueMustBeMoreThanZero' error because msg.value is equal to zero", async () => {
      await expect(myDeFi.diposit()).to.be.revertedWithCustomError(
        myDeFi,
        "MyDeFi__ValueMustBeMoreThanZero"
      );
    });

    it("after diposit balance of the address should be equal to amount that is diposited", async () => {
      await myDeFi.diposit({ value: ENOUGH_VALUE });
      const balance = await myDeFi.getBalance(deployer);
      expect(balance).to.be.equal(ENOUGH_VALUE);
    });
  });
  describe("mint", () => {
    it("must reverted with 'MyDeFi__ValueIsNotEnough' error because msg.value is not enough for mint that amount of token", async () => {
      await expect(
        myDeFi.mint(AMOUNT, { value: NOT_ENOUGH_VALUE })
      ).to.be.revertedWithCustomError(myDeFi, "MyDeFi__ValueIsNotEnough");
    });

    it("expected to increese balance of the address by AMOUNT", async () => {
      await myDeFi.mint(AMOUNT, {
        value: getValue(AMOUNT, "gwei"),
      });
      const balance = await myDeFi.balanceOf(deployer);
      expect(balance).to.be.equal(AMOUNT);
    });
  });
  describe("mintDiposit", () => {
    it("must reverted with 'MyDeFi__BalanceIsNotEnough' error because address balance is not enough for mint that amount of token", async () => {
      await expect(myDeFi.mintDiposit(AMOUNT)).to.be.revertedWithCustomError(
        myDeFi,
        "MyDeFi__BalanceIsNotEnough"
      );
    });

    it("after mintDiposit balance should be reduced", async () => {
      await myDeFi.diposit({ value: getValue(AMOUNT, "gwei") });
      await myDeFi.mintDiposit(AMOUNT);

      const newBalance = await myDeFi.getBalance(deployer);
      expect(newBalance).to.be.equal(0);
    });
  });
 
});
