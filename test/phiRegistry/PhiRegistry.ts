import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, upgrades, waffle } from "hardhat";
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
  CantBehaveCreatePhiland,
  CantBehaveDoubleCreatePhiland,
  CantBehaveSetEnsBaseNode,
  CantChangePhilandOwner,
  shouldBehaveChangePhilandOwner,
  shouldBehaveCreatePhiland,
  shouldBehaveSetEnsBaseNode,
} from "./PhiRegistry.behavior";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const namehash = require("@ensdomains/eth-ens-namehash");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sha3 = require("web3-utils").sha3;

describe("Unit tests PhiRegistry", function () {
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
    // await this.testRegistrar.register(sha3("test"), this.signers.alice.address, 86400);
    await this.testResolver.setAddr(namehash.hash("zak3939.eth"), this.signers.alice.address);

    const phiObjectArtifact: Artifact = await artifacts.readArtifact("PhiObject");
    this.phiObject = <PhiObject>(
      await waffle.deployContract(this.signers.admin, phiObjectArtifact, [this.signers.treasury.address])
    );
    const freeObjectArtifact: Artifact = await artifacts.readArtifact("FreeObject");
    this.freeObject = <FreeObject>(
      await waffle.deployContract(this.signers.admin, freeObjectArtifact, [this.signers.treasury.address])
    );

    const PhiMap = await ethers.getContractFactory("PhiMap");
    const phiMap = await upgrades.deployProxy(PhiMap, [this.signers.admin.address]);

    this.phiMap = <PhiMap>await phiMap.deployed();
    const phiRegistryArtifact: Artifact = await artifacts.readArtifact("PhiRegistry");
    this.phiRegistry = <PhiRegistry>(
      await waffle.deployContract(this.signers.admin, phiRegistryArtifact, [
        this.ensRegistry.address,
        this.phiMap.address,
      ])
    );
    const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";
    await this.phiMap.connect(this.signers.admin).grantRole(DEFAULT_ADMIN_ROLE, this.phiRegistry.address);
  });

  describe("PhiRegistry", function () {
    // beforeEach(async function () {

    // });
    shouldBehaveCreatePhiland();
    shouldBehaveSetEnsBaseNode();
    CantBehaveCreatePhiland();
    CantBehaveDoubleCreatePhiland();
    CantBehaveSetEnsBaseNode();
    CantChangePhilandOwner();
    shouldBehaveChangePhilandOwner();
  });
});
