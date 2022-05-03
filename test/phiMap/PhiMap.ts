import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { ENSRegistry } from "../../src/types/@ensdomains/ens-contracts/contracts/registry/ENSRegistry";
import { PhiMap } from "../../src/types/contracts/PhiMap";
import { PhiRegistry } from "../../src/types/contracts/PhiRegistry";
import { TestRegistrar } from "../../src/types/contracts/ens/TestRegistrar";
import { TestResolver } from "../../src/types/contracts/ens/TestResolver";
import { PhiObject } from "../../src/types/contracts/object/PhiObject";
import { Signers } from "../types";
import {
  shouldBehaveBatchDeposit,
  shouldBehaveClaimStarterObject,
  shouldBehaveDeposit,
  shouldBehaveOwnerOfPhiland,
  shouldBehaveRemoveObjectToLand,
  shouldBehaveUnDeposit,
  shouldBehaveViewPhiland,
  shouldBehaveWriteObjectToLand,
} from "./PhiMap.behavior";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const namehash = require("@ensdomains/eth-ens-namehash");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sha3 = require("web3-utils").sha3;

describe("Unit tests PhiMap", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];
    this.signers.carol = signers[3];
    this.signers.treasury = signers[4];

    const ENSRegistryArtifact: Artifact = await artifacts.readArtifact("ENSRegistry");
    this.ensRegistry = <ENSRegistry>await waffle.deployContract(this.signers.admin, ENSRegistryArtifact, []);

    const TestResolverArtifact: Artifact = await artifacts.readArtifact("TestResolver");
    this.testResolver = <TestResolver>await waffle.deployContract(this.signers.admin, TestResolverArtifact, []);

    const TestRegistrarArtifact: Artifact = await artifacts.readArtifact("TestRegistrar");
    this.testRegistrar = <TestRegistrar>(
      await waffle.deployContract(this.signers.admin, TestRegistrarArtifact, [
        this.ensRegistry.address,
        namehash.hash("eth"),
      ])
    );

    // await this.testRegistrar.addController(this.signers.admin.address);
    await this.ensRegistry.setSubnodeOwner(namehash.hash(""), sha3("eth"), this.signers.admin.address);
    await this.ensRegistry
      .connect(this.signers.admin)
      .setSubnodeOwner(namehash.hash("eth"), sha3("zak3939"), this.signers.admin.address);
    await this.testResolver.setAddr(namehash.hash("zak3939.eth"), this.signers.alice.address);
    await this.ensRegistry
      .connect(this.signers.admin)
      .setSubnodeOwner(namehash.hash("eth"), sha3("test"), this.signers.alice.address);
    await this.testResolver.setAddr(namehash.hash("test.eth"), this.signers.alice.address);

    const phiObjectArtifact: Artifact = await artifacts.readArtifact("PhiObject");
    this.phiObject = <PhiObject>(
      await waffle.deployContract(this.signers.admin, phiObjectArtifact, [this.signers.treasury.address, 5])
    );

    const phiMapArtifact: Artifact = await artifacts.readArtifact("PhiMap");
    this.phiMap = <PhiMap>await waffle.deployContract(this.signers.admin, phiMapArtifact, [this.phiObject.address]);

    const phiRegistryArtifact: Artifact = await artifacts.readArtifact("PhiRegistry");
    this.phiRegistry = <PhiRegistry>(
      await waffle.deployContract(this.signers.admin, phiRegistryArtifact, [
        this.ensRegistry.address,
        this.phiMap.address,
      ])
    );
    await this.phiRegistry.connect(this.signers.admin).createPhiland("zak3939");
    await this.phiRegistry.connect(this.signers.alice).createPhiland("test");

    await this.phiObject.connect(this.signers.admin).setOwner(this.phiMap.address);
    await this.phiObject
      .connect(this.signers.admin)
      .createObject(
        1,
        "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
        { x: 1, y: 1, z: 2 },
        this.signers.bob.address,
        200,
      );
    await this.phiObject.connect(this.signers.admin).getPhiObject(this.signers.alice.address, 1);
    await this.phiObject.connect(this.signers.alice).setApprovalForAll(this.phiMap.address, true);
  });

  describe("PhiMap", function () {
    // beforeEach(async function () {

    // });

    shouldBehaveClaimStarterObject();
    shouldBehaveDeposit();
    shouldBehaveUnDeposit();
    shouldBehaveBatchDeposit();
    shouldBehaveOwnerOfPhiland();
    shouldBehaveWriteObjectToLand();
    shouldBehaveViewPhiland();
    shouldBehaveRemoveObjectToLand();
  });
});
