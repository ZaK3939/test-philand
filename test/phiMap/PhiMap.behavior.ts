import { expect } from "chai";
import { ethers } from "hardhat";

export function shouldBehaveClaimStarterObject(): void {
  it("should mint claimStarterObject", async function () {
    await this.phiMap.connect(this.signers.admin).claimStarterObject("zak3939");
    expect(await this.freeObject.balanceOf(this.signers.admin.address, 1)).to.equal(1);
    expect(await this.freeObject.balanceOf(this.signers.admin.address, 2)).to.equal(1);
    expect(await this.freeObject.balanceOf(this.signers.admin.address, 3)).to.equal(1);
    expect(await this.freeObject.balanceOf(this.signers.admin.address, 4)).to.equal(1);
    expect(await this.freeObject.balanceOf(this.signers.admin.address, 5)).to.equal(1);
  });
}

export function shouldBehaveDeposit(): void {
  it("should deposit and balance 1->0", async function () {
    expect(await this.phiObject.balanceOf(this.signers.alice.address, 1)).to.equal(1);
    await this.phiMap.connect(this.signers.alice).deposit("test", this.phiObject.address, 1, 1);
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;
    const status = await this.phiMap.checkDepositStatus("test", this.phiObject.address, 1);
    expect(status.amount).to.equal(1);
    expect(status.timestamp).to.equal(timestampBefore);
    expect(await this.phiObject.balanceOf(this.signers.alice.address, 1)).to.equal(0);
  });
}

export function shouldBehaveUnDeposit(): void {
  it("should undeposit and balance 0->1", async function () {
    expect(await this.phiObject.balanceOf(this.signers.alice.address, 1)).to.equal(0);
    await this.phiMap.connect(this.signers.alice).unDeposit("test", this.phiObject.address, 1, 1);
    expect(await this.phiObject.balanceOf(this.signers.alice.address, 1)).to.equal(1);
  });
}

export function shouldBehaveBatchDeposit(): void {
  it("should batch deposit and balance of batch 1->0", async function () {
    await this.phiMap.connect(this.signers.alice).claimStarterObject("test");
    await this.phiMap
      .connect(this.signers.alice)
      .batchDeposit(
        "test",
        [
          this.freeObject.address,
          this.freeObject.address,
          this.freeObject.address,
          this.freeObject.address,
          this.freeObject.address,
        ],
        [1, 2, 3, 4, 5],
        [1, 1, 1, 1, 1],
      );
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;
    const status = await this.phiMap.checkDepositStatus("test", this.freeObject.address, 4);
    expect(status.amount).to.equal(1);
    expect(status.timestamp).to.equal(timestampBefore);
    expect(await this.freeObject.balanceOf(this.signers.alice.address, 4)).to.equal(0);
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
    await this.phiMap.connect(this.signers.alice).deposit("test", this.phiObject.address, 1, 1);
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

export function shouldBehaveRemoveObjectFromLand(): void {
  it("should remove object from land", async function () {
    await this.phiMap.connect(this.signers.alice).removeObjectFromLand("test", 0);
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");
    expect(land[0].contractAddress).to.equal("0x0000000000000000000000000000000000000000");
    expect(land[0].tokenId).to.equal(0);
    expect(land[0].xStart).to.equal(0);
    expect(land[0].yStart).to.equal(0);
    expect(land[0].xEnd).to.equal(0);
    expect(land[0].yEnd).to.equal(0);
  });
}

export function shouldBehaveBatchWriteObjectToLand(): void {
  it("should batch write object to land", async function () {
    await this.phiMap
      .connect(this.signers.alice)
      .batchDeposit("test", [this.phiObject.address, this.phiObject.address], [2, 3], [1, 1]);
    await this.phiMap.connect(this.signers.alice).batchWriteObjectToLand("test", [
      { contractAddress: this.phiObject.address, tokenId: 1, xStart: 1, yStart: 1 },
      { contractAddress: this.phiObject.address, tokenId: 2, xStart: 2, yStart: 2 },
      { contractAddress: this.phiObject.address, tokenId: 3, xStart: 4, yStart: 3 },
    ]);
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");
  });
}

export function shouldBehaveWriteLinkToObject(): void {
  it("should write link to object 1", async function () {
    await this.phiMap.connect(this.signers.alice).writeLinkToObject("test", 1, "zak3939", "zak3939.eth");
    const objectLink = await this.phiMap.connect(this.signers.admin).viewObjectLink("test", 1);
    expect(objectLink[0].title).to.equal("zak3939");
    expect(objectLink[0].url).to.equal("zak3939.eth");
  });
}

export function shouldBehaveViewLinks(): void {
  it("should write link to object 2 and check 1,2 link", async function () {
    await this.phiMap.connect(this.signers.alice).writeLinkToObject("test", 2, "zak3939", "zak3939.eth");
    const Links = await this.phiMap.connect(this.signers.admin).viewLinks("test");
    expect(Links[2].index).to.equal(2);
    expect(Links[2].title).to.equal("zak3939");
    expect(Links[2].url).to.equal("zak3939.eth");
  });
}

export function shouldBehaveRemoveLinkfromObject(): void {
  it("should remove link from object 1", async function () {
    await this.phiMap.connect(this.signers.alice).removeLinkFromObject("test", 1);
    const objectLink = await this.phiMap.connect(this.signers.admin).viewObjectLink("test", 1);
    expect(objectLink).to.deep.equal([]);
  });
}

export function shouldBehaveBatchRemoveObjectFromLand(): void {
  it("should batch remove object from land", async function () {
    await this.phiMap.connect(this.signers.alice).batchRemoveObjectFromLand("test", [1, 3]);
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");
  });
}
