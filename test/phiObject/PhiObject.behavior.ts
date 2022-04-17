import { expect } from "chai";

export function shouldBehaveMint(): void {
  it("should mint id=1 once admin calls", async function () {
    await this.phiObject.connect(this.signers.admin).mintObject(this.signers.alice.address, 1, 1, "0x");
    expect(await this.phiObject.connect(this.signers.alice).balanceOf(this.signers.alice.address, 1)).to.equal(1);
    expect(await this.phiObject.connect(this.signers.alice).totalSupply(1)).to.equal(1);
  });
}

export function shouldBehaveSetSize(): void {
  it("should return the new size once it's changed", async function () {
    await this.phiObject.connect(this.signers.admin).mintObject(this.signers.alice.address, 1, 1, "0x");
    await this.phiObject.connect(this.signers.admin).setSize(1, { x: 1, y: 2, z: 3 });
    const size = await this.phiObject.connect(this.signers.admin).getSize(1);
    expect(size.x).to.equal(1);
    expect(size.y).to.equal(2);
    expect(size.z).to.equal(3);
  });
}
