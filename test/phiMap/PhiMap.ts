import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { ENSRegistry } from "../../src/types/@ensdomains/ens-contracts/contracts/registry/ENSRegistry";
import { PhiMap } from "../../src/types/contracts/PhiMap";
import { PhiObject } from "../../src/types/contracts/PhiObject";
import { PhiRegistry } from "../../src/types/contracts/PhiRegistry";
import { TestRegistrar } from "../../src/types/contracts/ens/TestRegistrar";
import { TestResolver } from "../../src/types/contracts/ens/TestResolver";
import { Signers } from "../types";
import { shouldBehaveClaimStarterObject } from "./PhiMap.behavior";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const namehash = require("@ensdomains/eth-ens-namehash");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sha3 = require("web3-utils").sha3;

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];

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
    this.phiObject = <PhiObject>await waffle.deployContract(this.signers.admin, phiObjectArtifact, []);

    const phiMapArtifact: Artifact = await artifacts.readArtifact("PhiMap");
    this.phiMap = <PhiMap>await waffle.deployContract(this.signers.admin, phiMapArtifact, [this.phiObject.address]);

    const phiRegistryArtifact: Artifact = await artifacts.readArtifact("PhiRegistry");
    this.phiRegistry = <PhiRegistry>(
      await waffle.deployContract(this.signers.admin, phiRegistryArtifact, [
        this.ensRegistry.address,
        this.signers.admin.address,
        this.phiMap.address,
      ])
    );

    await this.phiObject.connect(this.signers.admin).setOwner(this.phiMap.address);
    await this.phiRegistry.connect(this.signers.admin).createPhiland("zak3939");
  });

  describe("PhiMap", function () {
    // beforeEach(async function () {

    // });

    shouldBehaveClaimStarterObject();
  });
});
