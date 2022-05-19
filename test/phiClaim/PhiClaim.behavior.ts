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

export function CantSetCouponType(): void {
  it("cant set Coupon Type", async function () {
    await expect(this.phiClaim.connect(this.signers.alice).setCouponType("uniswap10", 4)).to.be.reverted;
  });
}

export function CantClaimObjectWithdiffUser(): void {
  it("cant claim by bob,not alice(coupon claim user)", async function () {
    const fakeCoupon = getCoupon(this.signers.alice.address);
    await expect(
      this.phiClaim
        .connect(this.signers.bob)
        .claimPhiObject(1, "lootbalance", fakeCoupon[this.signers.alice.address]["coupon"]),
    ).to.be.reverted;
  });
}
export function CantClaimObjectWithdiffTokenId(): void {
  it("cant claim by different token Id", async function () {
    const fakeCoupon = getCoupon(this.signers.alice.address);
    await expect(
      this.phiClaim
        .connect(this.signers.alice)
        .claimPhiObject(2, "lootbalance", fakeCoupon[this.signers.alice.address]["coupon"]),
    ).to.be.reverted;
  });
}

export function CantClaimObjectWithdiffCondition(): void {
  it("cant claim different condition", async function () {
    const fakeCoupon = getCoupon(this.signers.alice.address);
    await expect(
      this.phiClaim
        .connect(this.signers.alice)
        .claimPhiObject(1, "fakelootbalance", fakeCoupon[this.signers.alice.address]["coupon"]),
    ).to.be.reverted;
  });
}
