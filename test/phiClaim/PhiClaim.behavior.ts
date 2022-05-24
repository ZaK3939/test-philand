import { expect } from "chai";

import { getCoupon } from "../helpers";

const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";
export function shouldBehaveGetOwner(): void {
  it("deployer has default admin role", async function () {
    expect(await this.phiClaim.hasRole(DEFAULT_ADMIN_ROLE, this.signers.admin.address)).to.equal(true);
  });
}

export function shouldAdminItself(): void {
  it("admin role's admin is itself", async function () {
    expect(await this.phiClaim.getRoleAdmin(DEFAULT_ADMIN_ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
  });
}

export function shouldBehaveGetAdminSigner(): void {
  it("GetAdminSigner", async function () {
    expect(await this.phiClaim.connect(this.signers.admin).getAdminSigner()).to.equal(this.signers.admin.address);
  });
}

export function shouldBehaveSetCouponType(): void {
  it("set Coupon Type", async function () {
    await this.phiClaim.connect(this.signers.admin).setCouponType("uniswap10", 4);
    expect(await this.phiClaim.connect(this.signers.admin).getCouponType("uniswap10")).to.equal(4);
  });
}

export function shouldBehaveClaimObject(): void {
  it("mint loot object", async function () {
    await this.phiClaim.connect(this.signers.admin).setCouponType("lootbalance", 1);
    const fakeCoupon = getCoupon(this.signers.alice.address, this.phiObject.address);
    await this.phiClaim
      .connect(this.signers.alice)
      .claimPhiObject(
        this.phiObject.address,
        1,
        "lootbalance",
        fakeCoupon[(this.phiObject.address, this.signers.alice.address)]["coupon"],
      );
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
    const fakeCoupon = getCoupon(this.signers.alice.address, this.phiObject.address);
    await expect(
      this.phiClaim
        .connect(this.signers.bob)
        .claimPhiObject(1, "lootbalance", fakeCoupon[this.signers.alice.address]["coupon"]),
    ).to.be.reverted;
  });
}
export function CantClaimObjectWithdiffTokenId(): void {
  it("cant claim by different token Id", async function () {
    const fakeCoupon = getCoupon(this.signers.alice.address, this.phiObject.address);
    await expect(
      this.phiClaim
        .connect(this.signers.alice)
        .claimPhiObject(2, "lootbalance", fakeCoupon[this.signers.alice.address]["coupon"]),
    ).to.be.reverted;
  });
}

export function CantClaimObjectWithdiffCondition(): void {
  it("cant claim different condition", async function () {
    const fakeCoupon = getCoupon(this.signers.alice.address, this.phiObject.address);
    await expect(
      this.phiClaim
        .connect(this.signers.alice)
        .claimPhiObject(1, "fakelootbalance", fakeCoupon[this.signers.alice.address]["coupon"]),
    ).to.be.reverted;
  });
}
