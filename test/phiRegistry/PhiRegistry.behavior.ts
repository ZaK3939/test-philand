import { expect } from "chai";

export function shouldBehaveCreatePhiland(): void {
  it("create Philand", async function () {
    await this.phiRegistry.connect(this.signers.admin).createPhiland("zak3939");
    expect(await this.phiMap.connect(this.signers.admin).ownerLists("zak3939")).to.equal(this.signers.admin.address);
  });
}
