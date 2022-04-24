import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { PaidObject } from "../../src/types/contracts/object/PaidObject";
import { Signers } from "../types";
import {
  shouldBehaveCreateObject,
  shouldBehaveSetMaxClaimed,
  shouldBehaveSetSize,
  shouldBehaveSetTokenURI,
  shouldBehaveSetbaseMetadataURI,
} from "./PaidObject.behavior";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];
    const paidObjectArtifact: Artifact = await artifacts.readArtifact("PaidObject");
    this.paidObject = <PaidObject>await waffle.deployContract(this.signers.admin, paidObjectArtifact, []);
  });

  describe("PaidObject", function () {
    beforeEach(async function () {
      await this.paidObject
        .connect(this.signers.admin)
        .createObject(
          1,
          "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
          { x: 1, y: 1, z: 2 },
          this.signers.bob.address,
          200,
          1,
        );
    });
    shouldBehaveSetbaseMetadataURI();
    shouldBehaveSetMaxClaimed();
    shouldBehaveSetTokenURI();
    shouldBehaveSetSize();
    shouldBehaveCreateObject();
  });
});
