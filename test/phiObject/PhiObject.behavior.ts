import { expect } from "chai";

export function shouldBehaveSetMaxClaimed(): void {
  it("should Set MaxClaimed id= 1 100", async function () {
    await this.phiObject.connect(this.signers.admin).setMaxClaimed(1, 100);
    expect(await this.phiObject.connect(this.signers.alice).getMaxClaimed(1)).to.equal(100);
  });
}

export function shouldBehaveSetbaseMetadataURI(): void {
  it("should Set baseMetadataURI", async function () {
    await this.phiObject.connect(this.signers.admin).setbaseMetadataURI("https://www.arweave.net/");
    expect(await this.phiObject.connect(this.signers.alice).getBaseMetadataURI()).to.equal("https://www.arweave.net/");
  });
}

export function shouldBehaveSetTokenURI(): void {
  it("should Set TokenURI", async function () {
    await this.phiObject.connect(this.signers.admin).setTokenURI(1, "jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk");
    expect(await this.phiObject.connect(this.signers.alice).getTokenURI(1)).to.equal(
      "jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk",
    );
    expect(await this.phiObject.connect(this.signers.alice).uri(1)).to.equal(
      "https://www.arweave.net/jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk",
    );
  });
}

export function shouldBehaveMint(): void {
  it("should mint id=1 once admin calls", async function () {
    await this.phiObject.connect(this.signers.admin).mintObject(this.signers.alice.address, 2, 1, "0x");
    expect(await this.phiObject.connect(this.signers.alice).balanceOf(this.signers.alice.address, 2)).to.equal(1);
    expect(await this.phiObject.connect(this.signers.alice).totalSupply(1)).to.equal(1);
  });
}

export function shouldBehaveSetSize(): void {
  it("should return the new size once it's changed", async function () {
    await this.phiObject.connect(this.signers.admin).setSize(1, { x: 1, y: 2, z: 3 });
    const size = await this.phiObject.connect(this.signers.admin).getSize(1);
    expect(size.x).to.equal(1);
    expect(size.y).to.equal(2);
    expect(size.z).to.equal(3);
  });
}

export function shouldInitToken(): void {
  it("should set token settings", async function () {
    await this.phiObject
      .connect(this.signers.admin)
      .initToken(1, 200, "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw", { x: 1, y: 2, z: 3 });
    expect(await this.phiObject.connect(this.signers.alice).getMaxClaimed(1)).to.equal(200);
    expect(await this.phiObject.connect(this.signers.alice).uri(1)).to.equal(
      "https://www.arweave.net/FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
    );
    const size = await this.phiObject.connect(this.signers.admin).getSize(1);
    expect(size.x).to.equal(1);
    expect(size.y).to.equal(2);
    expect(size.z).to.equal(3);
  });
}
