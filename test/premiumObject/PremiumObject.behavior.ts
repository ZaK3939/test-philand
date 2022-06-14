import { expect } from "chai";
import { ethers } from "hardhat";

export function shouldBehaveSetbaseMetadataURI(): void {
  it("should Set baseMetadataURI", async function () {
    await this.premiumObject.connect(this.signers.admin).setbaseMetadataURI("https://www.arweave.net/");
    expect(await this.premiumObject.connect(this.signers.alice).getBaseMetadataURI()).to.equal(
      "https://www.arweave.net/",
    );
  });
}

export function shouldBehaveSetMaxClaimed(): void {
  it("should Set MaxClaimed id= 1 100", async function () {
    await this.premiumObject.connect(this.signers.admin).setMaxClaimed(1, 100);
    expect(await this.premiumObject.connect(this.signers.alice).getMaxClaimed(1)).to.equal(100);
  });
}

export function shouldBehaveSetTokenURI(): void {
  it("should Set TokenURI", async function () {
    await this.premiumObject.connect(this.signers.admin).setTokenURI(1, "jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk");
    expect(await this.premiumObject.connect(this.signers.alice).getTokenURI(1)).to.equal(
      "jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk",
    );
    expect(await this.premiumObject.connect(this.signers.alice).uri(1)).to.equal(
      "https://www.arweave.net/jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk",
    );
  });
}

export function shouldBehaveSetSize(): void {
  it("should return the new size once it's changed", async function () {
    await this.premiumObject.connect(this.signers.admin).setSize(1, { x: 1, y: 2, z: 3 });
    const size = await this.premiumObject.connect(this.signers.admin).getSize(1);
    expect(size.x).to.equal(1);
    expect(size.y).to.equal(2);
    expect(size.z).to.equal(3);
  });
}

export function shouldBehaveCreateObject(): void {
  it("should createObject", async function () {
    await this.premiumObject
      .connect(this.signers.admin)
      .createObject(
        2,
        "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
        { x: 1, y: 2, z: 3 },
        this.signers.bob.address,
        200,
        ethers.utils.parseEther("0.01"),
      );
    expect(await this.premiumObject.connect(this.signers.alice).getMaxClaimed(2)).to.equal(200);
    expect(await this.premiumObject.connect(this.signers.alice).uri(2)).to.equal(
      "https://www.arweave.net/FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
    );
    expect(await this.premiumObject.connect(this.signers.alice).getCreator(2)).to.equal(this.signers.bob.address);
    const size = await this.premiumObject.connect(this.signers.admin).getSize(2);
    expect(size.x).to.equal(1);
    expect(size.y).to.equal(2);
    expect(size.z).to.equal(3);
  });
}

export function shouldBehaveInitObject(): void {
  it("should initObject", async function () {
    await this.premiumObject
      .connect(this.signers.admin)
      .initObject(
        2,
        "jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk",
        { x: 2, y: 1, z: 2 },
        this.signers.carol.address,
        300,
        ethers.utils.parseEther("0.05"),
      );
    expect(await this.premiumObject.connect(this.signers.alice).getMaxClaimed(2)).to.equal(300);
    expect(await this.premiumObject.connect(this.signers.alice).uri(2)).to.equal(
      "https://www.arweave.net/jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk",
    );
    expect(await this.premiumObject.connect(this.signers.alice).getCreator(2)).to.equal(this.signers.carol.address);
    const size = await this.premiumObject.connect(this.signers.admin).getSize(2);
    expect(size.x).to.equal(2);
    expect(size.y).to.equal(1);
    expect(size.z).to.equal(2);
  });
}

export function shouldBehaveBuyObject(): void {
  it("should buy object with eth", async function () {
    const beforeTreasurybalance = await this.signers.treasury.getBalance();
    expect(beforeTreasurybalance).to.equal(ethers.utils.parseEther("10000"));
    const beforebalance = await this.signers.carol.getBalance();
    expect(beforebalance).to.equal(ethers.utils.parseEther("10000"));
    const beforeNFTbalance = await this.premiumObject
      .connect(this.signers.alice)
      .balanceOf(this.signers.alice.address, 2);
    expect(beforeNFTbalance).to.equal(0);
    const ethToSend = ethers.utils.parseEther("0.05");
    await this.premiumObject.connect(this.signers.alice).buyObject(2, { value: ethToSend });
    const afterNFTbalance = await this.premiumObject
      .connect(this.signers.alice)
      .balanceOf(this.signers.alice.address, 2);
    expect(afterNFTbalance).to.equal(1);
    const afterTreasurybalance = await this.signers.treasury.getBalance();
    expect(afterTreasurybalance).to.equal(ethers.utils.parseEther("10000.035"));
    const afterbalance = await this.signers.carol.getBalance();
    expect(afterbalance).to.equal(ethers.utils.parseEther("10000.015"));
  });
}

export function shouldBehaveBatchBuyObject(): void {
  it("should batch buy object with eth", async function () {
    const ethToSend = ethers.utils.parseEther("0.10");
    await this.premiumObject.connect(this.signers.alice).batchBuyObject([2, 2], { value: ethToSend });
    const afterNFTbalance = await this.premiumObject
      .connect(this.signers.alice)
      .balanceOf(this.signers.alice.address, 2);
    expect(afterNFTbalance).to.equal(3);
    const afterTreasurybalance = await this.signers.treasury.getBalance();
    expect(afterTreasurybalance).to.equal(ethers.utils.parseEther("10000.105"));
    const afterbalance = await this.signers.carol.getBalance();
    expect(afterbalance).to.equal(ethers.utils.parseEther("10000.045"));
  });
}

export function CantBuyObjectWithNotEnoughETH(): void {
  it("cant buy object with not enough eth", async function () {
    const price = await this.premiumObject.connect(this.signers.admin).getTokenPrice(2);
    expect(price).to.equal(ethers.utils.parseEther("0.05"));
    const beforebalance = await this.premiumObject.connect(this.signers.bob).balanceOf(this.signers.bob.address, 2);
    expect(beforebalance).to.equal(0);
    const ethToSend = ethers.utils.parseEther("0.01");
    await expect(this.premiumObject.connect(this.signers.bob).buyObject(2, { value: ethToSend })).to.be.reverted;
  });
}

export function CantBatchBuyObjectWithNotEnoughETH(): void {
  it("cant batch buy object with eth", async function () {
    const ethToSend = ethers.utils.parseEther("0.05");
    await expect(this.premiumObject.connect(this.signers.alice).batchBuyObject([2, 2], { value: ethToSend })).to.be
      .reverted;
  });
}
