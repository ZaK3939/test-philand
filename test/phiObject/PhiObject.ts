import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { PhiObject } from "../../src/types/contracts/PhiObject";
import { Signers } from "../types";
import {
  shouldBehaveMint,
  shouldBehaveSetMaxClaimed,
  shouldBehaveSetSize,
  shouldBehaveSetTokenLink,
  shouldBehaveSetbaseMetadataURI,
  shouldInitToken,
} from "./PhiObject.behavior";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];
  });

  describe("PhiObject", function () {
    beforeEach(async function () {
      const phiObjectArtifact: Artifact = await artifacts.readArtifact("PhiObject");
      this.phiObject = <PhiObject>await waffle.deployContract(this.signers.admin, phiObjectArtifact, []);
      await this.phiObject.connect(this.signers.admin).mintObject(this.signers.alice.address, 1, 1, "0x");
    });
    shouldBehaveSetbaseMetadataURI();
    shouldBehaveSetMaxClaimed();
    shouldBehaveSetTokenLink();
    shouldBehaveSetSize();
    shouldBehaveMint();
    shouldInitToken();
  });
});
