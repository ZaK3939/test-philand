import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { ENSRegistry } from "../../src/types/@ensdomains/ens-contracts/contracts/registry/ENSRegistry";
import { PhiMap } from "../../src/types/contracts/PhiMap";
import { PhiRegistry } from "../../src/types/contracts/PhiRegistry";
import { TestRegistrar } from "../../src/types/contracts/ens/TestRegistrar";
import { TestResolver } from "../../src/types/contracts/ens/TestResolver";
import { FreeObject } from "../../src/types/contracts/object/FreeObject";
import { PhiObject } from "../../src/types/contracts/object/PhiObject";
import { Signers } from "../types";
import {
  shouldBehaveBatchDeposit,
  shouldBehaveBatchRemoveObjectFromLand,
  shouldBehaveBatchWriteObjectToLand,
  shouldBehaveClaimStarterObject,
  shouldBehaveDeposit,
  shouldBehaveOwnerOfPhiland,
  shouldBehaveRemoveLinkfromObject,
  shouldBehaveRemoveObjectFromLand,
  shouldBehaveUnDeposit,
  shouldBehaveViewLinks,
  shouldBehaveViewPhiland,
  shouldBehaveWriteLinkToObject,
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
      await waffle.deployContract(this.signers.admin, phiObjectArtifact, [this.signers.treasury.address])
    );
    const freeObjectArtifact: Artifact = await artifacts.readArtifact("FreeObject");
    this.freeObject = <FreeObject>(
      await waffle.deployContract(this.signers.admin, freeObjectArtifact, [this.signers.treasury.address])
    );

    const phiMapArtifact: Artifact = await artifacts.readArtifact("PhiMap");
    this.phiMap = <PhiMap>await waffle.deployContract(this.signers.admin, phiMapArtifact, [this.freeObject.address]);

    const phiRegistryArtifact: Artifact = await artifacts.readArtifact("PhiRegistry");
    this.phiRegistry = <PhiRegistry>(
      await waffle.deployContract(this.signers.admin, phiRegistryArtifact, [
        this.ensRegistry.address,
        this.phiMap.address,
      ])
    );
    await this.phiRegistry.connect(this.signers.admin).createPhiland("zak3939");
    await this.phiRegistry.connect(this.signers.alice).createPhiland("test");

    await this.freeObject.connect(this.signers.admin).setOwner(this.phiMap.address);
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
    await this.phiObject
      .connect(this.signers.admin)
      .createObject(
        2,
        "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU",
        { x: 2, y: 1, z: 2 },
        this.signers.bob.address,
        200,
      );
    await this.phiObject
      .connect(this.signers.admin)
      .createObject(
        3,
        "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU",
        { x: 1, y: 2, z: 2 },
        this.signers.bob.address,
        200,
      );
    await this.phiObject.connect(this.signers.admin).getPhiObject(this.signers.alice.address, 1);
    await this.phiObject.connect(this.signers.admin).getPhiObject(this.signers.alice.address, 2);
    await this.phiObject.connect(this.signers.admin).getPhiObject(this.signers.alice.address, 3);
    await this.freeObject.connect(this.signers.alice).setApprovalForAll(this.phiMap.address, true);
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
    shouldBehaveRemoveObjectFromLand();
    shouldBehaveBatchWriteObjectToLand();
    shouldBehaveWriteLinkToObject();
    shouldBehaveViewLinks();
    shouldBehaveRemoveLinkfromObject();
    shouldBehaveBatchRemoveObjectFromLand();
  });
});
