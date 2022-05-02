import { expect } from "chai";

export function shouldBehaveSetbaseMetadataURI(): void {
  it("should Set baseMetadataURI", async function () {
    await this.paidObject.connect(this.signers.admin).setbaseMetadataURI("https://www.arweave.net/");
    expect(await this.paidObject.connect(this.signers.alice).getBaseMetadataURI()).to.equal("https://www.arweave.net/");
  });
}

export function shouldBehaveSetMaxClaimed(): void {
  it("should Set MaxClaimed id= 1 100", async function () {
    await this.paidObject.connect(this.signers.admin).setMaxClaimed(1, 100);
    expect(await this.paidObject.connect(this.signers.alice).getMaxClaimed(1)).to.equal(100);
  });
}

export function shouldBehaveSetTokenURI(): void {
  it("should Set TokenURI", async function () {
    await this.paidObject.connect(this.signers.admin).setTokenURI(1, "jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk");
    expect(await this.paidObject.connect(this.signers.alice).getTokenURI(1)).to.equal(
      "jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk",
    );
    expect(await this.paidObject.connect(this.signers.alice).uri(1)).to.equal(
      "https://www.arweave.net/jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk",
    );
  });
}

export function shouldBehaveSetSize(): void {
  it("should return the new size once it's changed", async function () {
    await this.paidObject.connect(this.signers.admin).setSize(1, { x: 1, y: 2, z: 3 });
    const size = await this.paidObject.connect(this.signers.admin).getSize(1);
    expect(size.x).to.equal(1);
    expect(size.y).to.equal(2);
    expect(size.z).to.equal(3);
  });
}

export function shouldBehaveCreateObject(): void {
  it("should createObject", async function () {
    await this.paidObject
      .connect(this.signers.admin)
      .createObject(
        0,
        "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
        { x: 1, y: 2, z: 3 },
        this.signers.bob.address,
        200,
        10,
      );
    expect(await this.paidObject.connect(this.signers.alice).getMaxClaimed(0)).to.equal(200);
    expect(await this.paidObject.connect(this.signers.alice).uri(0)).to.equal(
      "https://www.arweave.net/FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
    );
    const size = await this.paidObject.connect(this.signers.admin).getSize(0);
    expect(size.x).to.equal(1);
    expect(size.y).to.equal(2);
    expect(size.z).to.equal(3);
  });
}
