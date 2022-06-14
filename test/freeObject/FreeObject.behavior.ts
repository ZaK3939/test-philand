import { expect } from "chai";
import { ethers } from "hardhat";

export function shouldBehaveSetbaseMetadataURI(): void {
  it("should Set baseMetadataURI", async function () {
    await this.freeObject.connect(this.signers.admin).setbaseMetadataURI("https://www.arweave.net/");
    expect(await this.freeObject.connect(this.signers.alice).getBaseMetadataURI()).to.equal("https://www.arweave.net/");
  });
}

export function shouldBehaveSetMaxClaimed(): void {
  it("should Set MaxClaimed id= 1 100", async function () {
    await this.freeObject.connect(this.signers.admin).setMaxClaimed(1, 100);
    expect(await this.freeObject.connect(this.signers.alice).getMaxClaimed(1)).to.equal(100);
  });
}

export function shouldBehaveSetTokenURI(): void {
  it("should Set TokenURI", async function () {
    await this.freeObject.connect(this.signers.admin).setTokenURI(1, "jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk");
    expect(await this.freeObject.connect(this.signers.alice).getTokenURI(1)).to.equal(
      "jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk",
    );
    expect(await this.freeObject.connect(this.signers.alice).uri(1)).to.equal(
      "https://www.arweave.net/jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk",
    );
  });
}

export function shouldBehaveSetSize(): void {
  it("should return the new size once it's changed", async function () {
    await this.freeObject.connect(this.signers.admin).setSize(1, { x: 1, y: 2, z: 3 });
    const size = await this.freeObject.connect(this.signers.admin).getSize(1);
    expect(size.x).to.equal(1);
    expect(size.y).to.equal(2);
    expect(size.z).to.equal(3);
  });
}

export function shouldBehaveCreateObject(): void {
  it("should createObject", async function () {
    await this.freeObject
      .connect(this.signers.admin)
      .createObject(2, "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw", { x: 1, y: 2, z: 3 }, this.signers.bob.address);
    expect(await this.freeObject.connect(this.signers.alice).uri(2)).to.equal(
      "https://www.arweave.net/FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
    );
    expect(await this.freeObject.connect(this.signers.alice).getCreator(2)).to.equal(this.signers.bob.address);
    const size = await this.freeObject.connect(this.signers.admin).getSize(2);
    expect(size.x).to.equal(1);
    expect(size.y).to.equal(2);
    expect(size.z).to.equal(3);
  });
}

export function shouldBehaveInitObject(): void {
  it("should initObject", async function () {
    await this.freeObject
      .connect(this.signers.admin)
      .initObject(2, "jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk", { x: 2, y: 1, z: 2 }, this.signers.carol.address);
    expect(await this.freeObject.connect(this.signers.alice).uri(2)).to.equal(
      "https://www.arweave.net/jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk",
    );
    expect(await this.freeObject.connect(this.signers.alice).getCreator(2)).to.equal(this.signers.carol.address);
    const size = await this.freeObject.connect(this.signers.admin).getSize(2);
    expect(size.x).to.equal(2);
    expect(size.y).to.equal(1);
    expect(size.z).to.equal(2);
  });
}

export function shouldBehaveGetFreeObject(): void {
  it("should get free object", async function () {
    await this.freeObject.connect(this.signers.alice).getFreeObject(2);
    const afterNFTbalance = await this.freeObject.connect(this.signers.alice).balanceOf(this.signers.alice.address, 2);
    expect(afterNFTbalance).to.equal(1);
  });
}

export function shouldBehaveBatchGetFreeObject(): void {
  it("should batch get gree object ", async function () {
    await this.freeObject.connect(this.signers.alice).batchGetFreeObject([2, 2, 2]);
    const afterNFTbalance = await this.freeObject.connect(this.signers.alice).balanceOf(this.signers.alice.address, 2);
    expect(afterNFTbalance).to.equal(4);
  });
}
