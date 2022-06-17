import { expect } from "chai";
import { ethers } from "hardhat";

export function shouldBehaveOwnerOfPhiland(): void {
  it("should behave owner of philand", async function () {
    expect(await this.phiMap.connect(this.signers.admin).ownerOfPhiland("zak3939")).to.equal(
      this.signers.admin.address,
    );
    expect(await this.phiMap.connect(this.signers.admin).ownerOfPhiland("test")).to.equal(this.signers.alice.address);
  });
}

export function shouldBehaveviewPhiland(): void {
  it("should view Philand ", async function () {
    const aliceENSLAnd = await this.phiMap.connect(this.signers.alice).viewPhiland("test");
    expect(aliceENSLAnd).to.deep.equal([]);
  });
}

export function shouldBehaveViewNumberOfPhiland(): void {
  it("should get number of philand", async function () {
    const NoP = await this.phiMap.connect(this.signers.alice).viewNumberOfPhiland();
    expect(NoP).to.equal(2);
  });
}

export function shouldBehaveClaimStarterObject(): void {
  it("should mint claimStarterObject", async function () {
    await this.freeObject
      .connect(this.signers.admin)
      .mintBatchObject(this.signers.admin.address, [1, 2, 3, 4, 5], [1, 1, 1, 1, 1], "0x");
    expect(await this.freeObject.balanceOf(this.signers.admin.address, 1)).to.equal(1);
    expect(await this.freeObject.balanceOf(this.signers.admin.address, 2)).to.equal(1);
    expect(await this.freeObject.balanceOf(this.signers.admin.address, 3)).to.equal(1);
    expect(await this.freeObject.balanceOf(this.signers.admin.address, 4)).to.equal(1);
    expect(await this.freeObject.balanceOf(this.signers.admin.address, 5)).to.equal(1);
  });
}

export function shouldBehaveBatchDeposit(): void {
  it("should batch deposit and balance of batch 1->0", async function () {
    await this.freeObject
      .connect(this.signers.admin)
      .mintBatchObject(this.signers.alice.address, [1, 2, 3, 4, 5], [1, 1, 1, 1, 1], "0x");
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
export function shouldBehaveCheckDepositStatus(): void {
  it("should check single Deposit Status", async function () {
    const deposit = await this.phiMap.checkDepositStatus("test", this.freeObject.address, 5);
    expect(deposit.amount).to.equal(1);
    expect(deposit.used).to.equal(0);
  });
}

export function shouldBehaveCheckAllDepositStatus(): void {
  it("should check All Deposit Status", async function () {
    const deposits = await this.phiMap.connect(this.signers.alice).checkAllDepositStatus("test");
    for (const i in deposits) {
      expect(deposits[i].contractAddress).to.equal(this.freeObject.address);
      expect(deposits[i].tokenId).to.equal(Number(i) + 1);
      expect(deposits[i].amount).to.equal(1);
      expect(deposits[i].used).to.equal(0);
    }
  });
}

export function shouldBehaveCheckDepositAvailable(): void {
  it("should check Deposit Available", async function () {
    expect(this.phiMap.connect(this.signers.alice).checkDepositAvailable("test", this.freeObject.address, 1)).to.equal(
      true,
    );
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

export function shouldBehaveAddDeposit(): void {
  it("should deposit again", async function () {
    await this.phiObject.connect(this.signers.admin).getPhiObject(this.signers.alice.address, 1);
    expect(await this.phiObject.balanceOf(this.signers.alice.address, 1)).to.equal(1);
    await this.phiMap.connect(this.signers.alice).deposit("test", this.phiObject.address, 1, 1);
    const status = await this.phiMap.checkDepositStatus("test", this.phiObject.address, 1);
    expect(status.amount).to.equal(2);
    expect(status.used).to.equal(0);
  });
}
export function shouldBehaveUnDeposit(): void {
  it("should undeposit and balance 0->1", async function () {
    expect(await this.phiObject.balanceOf(this.signers.alice.address, 1)).to.equal(0);
    await this.phiMap.connect(this.signers.alice).unDeposit("test", this.phiObject.address, 1, 1);
    expect(await this.phiObject.balanceOf(this.signers.alice.address, 1)).to.equal(1);
  });
}

export function shouldBehaveWriteObjectToLand(): void {
  it("should write object to land", async function () {
    await this.phiMap.connect(this.signers.alice).deposit("test", this.phiObject.address, 1, 1);
    await this.phiMap
      .connect(this.signers.alice)
      .writeObjectToLand("test", { contractAddress: this.phiObject.address, tokenId: 1, xStart: 1, yStart: 1 }, [
        "",
        "",
      ]);
    const status = await this.phiMap.checkDepositStatus("test", this.phiObject.address, 1);
    expect(status.amount).to.equal(2);
    expect(status.used).to.equal(1);
  });
}

export function shouldBehaveBatchUnDeposit(): void {
  it("should batchUnDeposit from land", async function () {
    await this.phiMap.connect(this.signers.alice).batchUnDeposit("test", [this.phiObject.address], [1], [1]);
    const status = await this.phiMap.checkDepositStatus("test", this.phiObject.address, 1);
    expect(status.amount).to.equal(1);
    expect(status.used).to.equal(1);
  });
}

export function CantBatchUnDeposit(): void {
  it("cant batchUnDeposit from land because allready used", async function () {
    await expect(this.phiMap.connect(this.signers.alice).batchUnDeposit("test", [this.phiObject.address], [1], [1])).to
      .be.reverted;
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
      .batchDeposit(
        "test",
        [this.phiObject.address, this.phiObject.address, this.phiObject.address],
        [1, 2, 3],
        [1, 1, 1],
      );
    await this.phiMap.connect(this.signers.alice).batchWriteObjectToLand(
      "test",
      [
        { contractAddress: this.phiObject.address, tokenId: 1, xStart: 1, yStart: 1 },
        { contractAddress: this.phiObject.address, tokenId: 2, xStart: 2, yStart: 2 },
        { contractAddress: this.phiObject.address, tokenId: 3, xStart: 4, yStart: 3 },
      ],
      [
        { title: "", url: "" },
        { title: "", url: "" },
        { title: "", url: "" },
      ],
    );
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");
    expect(land[1].contractAddress).to.equal(this.phiObject.address);
    expect(land[1].tokenId).to.equal(1);
    expect(land[1].xStart).to.equal(1);
    expect(land[1].yStart).to.equal(1);
    expect(land[1].xEnd).to.equal(2);
    expect(land[1].yEnd).to.equal(2);
    expect(land[2].contractAddress).to.equal(this.phiObject.address);
    expect(land[2].tokenId).to.equal(2);
    expect(land[2].xStart).to.equal(2);
    expect(land[2].yStart).to.equal(2);
    expect(land[2].xEnd).to.equal(4);
    expect(land[2].yEnd).to.equal(3);
    expect(land[3].contractAddress).to.equal(this.phiObject.address);
    expect(land[3].tokenId).to.equal(3);
    expect(land[3].xStart).to.equal(4);
    expect(land[3].yStart).to.equal(3);
    expect(land[3].xEnd).to.equal(5);
    expect(land[3].yEnd).to.equal(5);
  });
}

export function shouldBehaveBatchRemoveAndWrite(): void {
  it("should batchRemoveAndWrite", async function () {
    await this.phiMap
      .connect(this.signers.alice)
      .batchRemoveAndWrite(
        "test",
        [2],
        true,
        [{ contractAddress: this.phiObject.address, tokenId: 2, xStart: 7, yStart: 7 }],
        [{ title: "", url: "" }],
      );
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");
    expect(land[2].contractAddress).to.equal("0x0000000000000000000000000000000000000000");
    expect(land[2].tokenId).to.equal(0);
    expect(land[2].xStart).to.equal(0);
    expect(land[2].yStart).to.equal(0);
    expect(land[2].xEnd).to.equal(0);
    expect(land[2].yEnd).to.equal(0);
    expect(land[4].contractAddress).to.equal(this.phiObject.address);
    expect(land[4].tokenId).to.equal(2);
    expect(land[4].xStart).to.equal(7);
    expect(land[4].yStart).to.equal(7);
    expect(land[4].xEnd).to.equal(9);
    expect(land[4].yEnd).to.equal(8);
  });
}

export function shouldBehaveViewPhilandArray(): void {
  it("should viewPhilandArray test.eth", async function () {
    const philandArray = await this.phiMap.connect(this.signers.admin).viewPhilandArray("test");
    await expect(this.phiMap.connect(this.signers.admin).viewPhilandArray("test")).to.not.be.reverted;
    console.log(philandArray);
  });
}

export function shouldBehaveWriteLinkToObject(): void {
  it("should write link to object 1", async function () {
    await this.phiMap.connect(this.signers.alice).writeLinkToObject("test", 1, ["zak3939", "zak3939.eth"]);
    const objectLink = await this.phiMap.connect(this.signers.admin).viewObjectLink("test", 1);
    expect(objectLink.title).to.equal("zak3939");
    expect(objectLink.url).to.equal("zak3939.eth");
  });
}

export function CantWriteLinkToAnotherUserObject(): void {
  it("should write link to another user object ", async function () {
    await expect(this.phiMap.connect(this.signers.admin).writeLinkToObject("test", 1, ["zak3939", "zak3939.eth"])).to.be
      .reverted;
  });
}

export function CantWriteLinkToObject(): void {
  it("Cant write link to object 2", async function () {
    await expect(this.phiMap.connect(this.signers.alice).writeLinkToObject("test", 2, ["zak3939", "zak3939.eth"])).to.be
      .reverted;
  });
}

export function shouldBehaveViewLinks(): void {
  it("should write link to object 3 and check 3 link", async function () {
    await this.phiMap.connect(this.signers.alice).writeLinkToObject("test", 3, ["zak3939", "zak3939.eth"]);
    const Links = await this.phiMap.connect(this.signers.admin).viewLinks("test");
    expect(Links[3].title).to.equal("zak3939");
    expect(Links[3].url).to.equal("zak3939.eth");
  });
}

export function shouldBehaveRemoveLinkfromObject(): void {
  it("should remove link from object 1", async function () {
    await this.phiMap.connect(this.signers.alice).removeLinkFromObject("test", 1);
    const objectLink = await this.phiMap.connect(this.signers.admin).viewObjectLink("test", 1);
    expect(objectLink.title).to.equal("");
    expect(objectLink.url).to.equal("");
  });
}

export function shouldBehaveBatchRemoveObjectFromLand(): void {
  it("should batch remove object from land", async function () {
    await this.phiMap.connect(this.signers.alice).batchRemoveObjectFromLand("test", [1, 3]);
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");
    expect(land[1].contractAddress).to.equal("0x0000000000000000000000000000000000000000");
    expect(land[1].tokenId).to.equal(0);
    expect(land[1].xStart).to.equal(0);
    expect(land[1].yStart).to.equal(0);
    expect(land[1].xEnd).to.equal(0);
    expect(land[1].yEnd).to.equal(0);
    expect(land[3].contractAddress).to.equal("0x0000000000000000000000000000000000000000");
    expect(land[3].tokenId).to.equal(0);
    expect(land[3].xStart).to.equal(0);
    expect(land[3].yStart).to.equal(0);
    expect(land[3].xEnd).to.equal(0);
    expect(land[3].yEnd).to.equal(0);
  });
}

export function shouldBehaveInitialization(): void {
  it("should Initialization", async function () {
    await this.phiMap.connect(this.signers.alice).mapInitialization("test");
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");
    expect(land).to.deep.equal([]);
    const links = await this.phiMap.connect(this.signers.admin).viewLinks("test");
    expect(links).to.deep.equal([]);
  });
}

export function shouldBehaveCheckAllDepositStatusAfterInit(): void {
  it("should check All Deposit used = 0 After init", async function () {
    const deposits = await this.phiMap.connect(this.signers.alice).checkAllDepositStatus("test");
    for (const i in deposits) {
      expect(deposits[i].used).to.equal(0);
    }
  });
}

export function CantWriteObjectToLand(): void {
  it("cant write object to land : out of map range", async function () {
    await expect(
      this.phiMap
        .connect(this.signers.alice)
        .writeObjectToLand("test", { contractAddress: this.phiObject.address, tokenId: 2, xStart: 15, yStart: 1 }),
    ).to.be.reverted;
    await expect(
      this.phiMap
        .connect(this.signers.alice)
        .writeObjectToLand("test", { contractAddress: this.phiObject.address, tokenId: 3, xStart: 1, yStart: 15 }),
    ).to.be.reverted;
    await expect(
      this.phiMap
        .connect(this.signers.alice)
        .writeObjectToLand("test", { contractAddress: this.phiObject.address, tokenId: 2, xStart: -1, yStart: 1 }),
    ).to.be.reverted;
    await expect(
      this.phiMap
        .connect(this.signers.alice)
        .writeObjectToLand("test", { contractAddress: this.phiObject.address, tokenId: 3, xStart: 1, yStart: -1 }),
    ).to.be.reverted;
  });
}

export function shouldBehaveChangeWallPaper(): void {
  it("should ChangeWallPaper", async function () {
    await this.wallPaper.connect(this.signers.alice).getFreeWallPaper(1);
    const lastWallPaper = await this.phiMap.connect(this.signers.alice).checkWallPaper("test");
    expect(lastWallPaper.contractAddress).to.equal("0x0000000000000000000000000000000000000000");

    await this.phiMap.connect(this.signers.alice).changeWallPaper("test", this.wallPaper.address, 1);
    const currentWallPaper = await this.phiMap.connect(this.signers.alice).checkWallPaper("test");
    expect(currentWallPaper.contractAddress).to.equal("0x6C1404F6A70093be3D4dc78cF673De52881C85f7");
  });
}
