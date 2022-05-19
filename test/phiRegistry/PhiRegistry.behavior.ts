import { expect } from "chai";

export function shouldBehaveCreatePhiland(): void {
  it("should create Philand", async function () {
    await this.phiRegistry.connect(this.signers.admin).createPhiland("zak3939");
    expect(await this.phiMap.connect(this.signers.admin).ownerLists("zak3939")).to.equal(this.signers.admin.address);
  });
}

export function shouldBehaveSetEnsBaseNode(): void {
  it("should set NewNode", async function () {
    await this.phiRegistry
      .connect(this.signers.admin)
      .setBaseNode("0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae");
  });
}

export function CantBehaveCreatePhiland(): void {
  it("Cant create Philand by not ens onwer", async function () {
    await expect(this.phiRegistry.connect(this.signers.admin).createPhiland("test")).to.be.reverted;
  });
}

export function CantBehaveDoubleCreatePhiland(): void {
  it("Cant create Philand 2nd times", async function () {
    await expect(this.phiRegistry.connect(this.signers.admin).createPhiland("zak3939")).to.be.reverted;
  });
}

export function CantBehaveSetEnsBaseNode(): void {
  it("Cant setCouponType by not contract onwer ", async function () {
    await expect(
      this.phiRegistry
        .connect(this.signers.alice)
        .setBaseNode("0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae"),
    ).to.be.reverted;
  });
}

export function CantChangePhilandOwner(): void {
  it("Cant setCouponType by not ens onwer ", async function () {
    await expect(this.phiRegistry.connect(this.signers.bob).changePhilandOwner("zak3939")).to.be.reverted;
  });
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const namehash = require("@ensdomains/eth-ens-namehash");
export function shouldBehaveChangePhilandOwner(): void {
  it("should change philand owner", async function () {
    await this.ensRegistry.connect(this.signers.admin).setOwner(namehash.hash("zak3939.eth"), this.signers.bob.address);
    await this.phiRegistry.connect(this.signers.bob).changePhilandOwner("zak3939");
    expect(await this.phiMap.connect(this.signers.admin).ownerLists("zak3939")).to.equal(this.signers.bob.address);
  });
}
