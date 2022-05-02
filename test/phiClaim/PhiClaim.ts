import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { PhiClaim } from "../../src/types/contracts/PhiClaim";
import { SoulObject } from "../../src/types/contracts/object/";
import { PhiObject } from "../../src/types/contracts/object/PhiObject";
import { Signers } from "../types";
import { shouldBehaveClaimObject, shouldBehaveSetCouponType } from "./PhiClaim.behavior";

describe("Unit tests PhiClaim", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];
    this.signers.treasury = signers[3];

    const phiObjectArtifact: Artifact = await artifacts.readArtifact("PhiObject");
    this.phiObject = <PhiObject>(
      await waffle.deployContract(this.signers.admin, phiObjectArtifact, [this.signers.treasury.address, 5])
    );
    await this.phiObject
      .connect(this.signers.admin)
      .createObject(
        1,
        "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
        { x: 1, y: 1, z: 2 },
        this.signers.bob.address,
        200,
      );
    const soulObjectArtifact: Artifact = await artifacts.readArtifact("SoulObject");
    this.soulObject = <SoulObject>await waffle.deployContract(this.signers.admin, soulObjectArtifact, []);
  });

  describe("PhiClaim", function () {
    beforeEach(async function () {
      const phiClaimArtifact: Artifact = await artifacts.readArtifact("PhiClaim");
      this.phiClaim = <PhiClaim>(
        await waffle.deployContract(this.signers.admin, phiClaimArtifact, [
          this.signers.admin.address,
          this.phiObject.address,
          this.soulObject.address,
        ])
      );
      await this.phiObject.connect(this.signers.admin).setOwner(this.phiClaim.address);
      await this.soulObject.connect(this.signers.admin).setOwner(this.phiClaim.address);
      await this.phiClaim.connect(this.signers.admin).setCouponType("lootbalance", 1);
    });
    shouldBehaveSetCouponType();
    shouldBehaveClaimObject();
  });
});
