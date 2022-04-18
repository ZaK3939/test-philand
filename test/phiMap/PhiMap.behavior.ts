import { expect } from "chai";

export function shouldBehaveClaimStarterObject(): void {
  it("should mint id=1 once admin calls", async function () {
    await this.phiMap.connect(this.signers.admin).claimStarterObject("zak3939");
    expect(await this.phiObject.balanceOf(this.signers.admin.address, 1)).to.equal(1);
  });
}
