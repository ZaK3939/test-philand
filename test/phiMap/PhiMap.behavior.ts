import { expect } from "chai";
import { ethers } from "hardhat";

export function shouldBehaveClaimStarterObject(): void {
  it("should mint claimStarterObject", async function () {
    await this.phiMap.connect(this.signers.admin).claimStarterObject("zak3939");
    expect(await this.phiObject.balanceOf(this.signers.admin.address, 1)).to.equal(1);
    expect(await this.phiObject.balanceOf(this.signers.admin.address, 2)).to.equal(1);
    expect(await this.phiObject.balanceOf(this.signers.admin.address, 3)).to.equal(1);
    expect(await this.phiObject.balanceOf(this.signers.admin.address, 4)).to.equal(1);
    expect(await this.phiObject.balanceOf(this.signers.admin.address, 5)).to.equal(1);
  });
}

export function shouldBehaveDeposit(): void {
  it("should deposit and balance 1->0", async function () {
    expect(await this.phiObject.balanceOf(this.signers.alice.address, 1)).to.equal(1);
    await this.phiMap.connect(this.signers.alice).deposit(1, 1);
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;
    const status = await this.phiMap.checkDepositStatus(this.signers.alice.address, 1);
    expect(status.amount).to.equal(1);
    expect(status.timestamp).to.equal(timestampBefore);
    expect(await this.phiObject.balanceOf(this.signers.alice.address, 1)).to.equal(0);
  });
}

export function shouldBehaveUnDeposit(): void {
  it("should undeposit and balance 0->1", async function () {
    expect(await this.phiObject.balanceOf(this.signers.alice.address, 1)).to.equal(0);
    await this.phiMap.connect(this.signers.alice).undeposit(1);
    expect(await this.phiObject.balanceOf(this.signers.alice.address, 1)).to.equal(1);
  });
}

export function shouldBehaveBatchDeposit(): void {
  it("should batch deposit and balance of batch 1->0", async function () {
    await this.phiMap.connect(this.signers.alice).claimStarterObject("test");
    await this.phiMap.connect(this.signers.alice).batchDeposit([1, 2, 3, 4, 5], [1, 1, 1, 1, 1]);
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;
    const status = await this.phiMap.checkDepositStatus(this.signers.alice.address, 4);
    expect(status.amount).to.equal(1);
    expect(status.timestamp).to.equal(timestampBefore);
    expect(await this.phiObject.balanceOf(this.signers.alice.address, 4)).to.equal(0);
  });
}

export function shouldBehaveOwnerOfPhiland(): void {
  it("should behave owner of philand", async function () {
    expect(await this.phiMap.connect(this.signers.admin).ownerOfPhiland("zak3939")).to.equal(
      this.signers.admin.address,
    );
  });
}

export function shouldBehaveWriteObjectToLand(): void {
  it("should write object to land", async function () {
    await this.phiMap.connect(this.signers.alice).deposit(1, 1);
    await this.phiMap
      .connect(this.signers.alice)
      .writeObjectToLand("test", { contractAddress: this.phiObject.address, tokenId: 1, xStart: 1, yStart: 1 });
  });
}

export function shouldBehaveViewPhiland(): void {
  it("should get response land", async function () {
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");
    expect(land[0].contractAddress).to.equal(this.phiObject.address);
    expect(land[0].tokenId).to.equal(1);
    expect(land[0].xStart).to.equal(1);
    expect(land[0].yStart).to.equal(1);
    expect(land[0].xEnd).to.equal(2);
    expect(land[0].yEnd).to.equal(2);
  });
}

export function shouldBehaveRemoveObjectToLand(): void {
  it("should remove object from land", async function () {
    await this.phiMap.connect(this.signers.alice).removeObjectToLand("test", 0);
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");
    expect(land[0].contractAddress).to.equal("0x0000000000000000000000000000000000000000");
    expect(land[0].tokenId).to.equal(0);
    expect(land[0].xStart).to.equal(0);
    expect(land[0].yStart).to.equal(0);
    expect(land[0].xEnd).to.equal(0);
    expect(land[0].yEnd).to.equal(0);
  });
}
