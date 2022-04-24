import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { Fixture } from "ethereum-waffle";

import { ENSRegistry } from "../src/types/@ensdomains/ens-contracts/contracts/registry/ENSRegistry";
import { TestRegistrar } from "../src/types/contracts/ens/TestRegistrar";
import { TestResolver } from "../src/types/contracts/ens/TestResolver";
import type { PhiObject } from "../src/types/contracts/object/PhiObject";

declare module "mocha" {
  export interface Context {
    phiObject: PhiObject;
    ensRegistry: ENSRegistry;
    testResolver: TestResolver;
    testRegistrar: TestRegistrar;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
  alice: SignerWithAddress;
  bob: SignerWithAddress;
}
