// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { PhiObject } from "../../src/types/contracts/PhiObject";
import { PhiObject__factory } from "../../src/types/factories/contracts/PhiObject__factory";

task("deploy:PhiObject")
  .addParam("greeting", "Say hello, be nice")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    // const signers: SignerWithAddress[] = await ethers.getSigners();
    const phiObjectFactory: PhiObject__factory = <PhiObject__factory>await ethers.getContractFactory("PhiObject");
    const phiObject: PhiObject = <PhiObject>await phiObjectFactory.deploy(taskArguments.phiObject);
    await phiObject.deployed();
    console.log("PhiObject deployed to: ", phiObject.address);
  });
