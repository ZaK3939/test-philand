import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { PhiObject } from "../../src/types/contracts/object/PhiObject";
import { Signers } from "../types";
import {
  shouldBehaveSetMaxClaimed,
  shouldBehaveSetSize,
  shouldBehaveSetTokenURI,
  shouldBehaveSetbaseMetadataURI,
  shouldInitToken,
} from "./PhiObject.behavior";

describe("Unit tests PhiObject", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];
    this.signers.carol = signers[3];
    this.signers.treasury = signers[4];

    const phiObjectArtifact: Artifact = await artifacts.readArtifact("PhiObject");
    this.phiObject = <PhiObject>(
      await waffle.deployContract(this.signers.admin, phiObjectArtifact, [this.signers.treasury.address])
    );
    await this.phiObject
      .connect(this.signers.admin)
      .createObject(
        1,
        "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
        { x: 1, y: 1, z: 2 },
        this.signers.bob.address,
        200,
        5,
      );
    await this.phiObject.connect(this.signers.admin).getPhiObject(this.signers.alice.address, 1);
  });

  describe("PhiObject", function () {
    // beforeEach(async function () {
    //   const phiObjectArtifact: Artifact = await artifacts.readArtifact("PhiObject");
    //   this.phiObject = <PhiObject>await waffle.deployContract(this.signers.admin, phiObjectArtifact, [this.signers.treasury.address,5]);
    //   await this.phiObject.connect(this.signers.admin).getPhiObject(this.signers.alice.address, 1);
    // });
    shouldBehaveSetbaseMetadataURI();
    shouldBehaveSetMaxClaimed();
    shouldBehaveSetTokenURI();
    shouldBehaveSetSize();
    shouldInitToken();
  });
});
