import { expect } from "chai";

import { getCoupon } from "../helpers";

export function shouldBehaveSetCouponType(): void {
  it("set Coupon Type", async function () {
    await this.phiClaim.connect(this.signers.admin).setCouponType("uniswap10", 4);
    expect(await this.phiClaim.connect(this.signers.admin).getCouponType("uniswap10")).to.equal(4);
  });
}

export function shouldBehaveClaimObject(): void {
  it("mint loot object", async function () {
    const fakeCoupon = getCoupon(this.signers.alice.address);
    await this.phiClaim
      .connect(this.signers.alice)
      .claimPhiObject(1, "lootbalance", fakeCoupon[this.signers.alice.address]["coupon"]);
    expect(await this.phiObject.connect(this.signers.admin).balanceOf(this.signers.alice.address, 1)).to.equal(1);
  });
}
