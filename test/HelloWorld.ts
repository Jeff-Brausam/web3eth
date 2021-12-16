import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("hello world", () => {
  it("should say hi", async () => {
    // Reads the contract (as a json file)
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    // Deploys the contract
    const hello = await HelloWorld.deploy();
    // Confirms your contract is on the network
    await hello.deployed();

    expect(await hello.hello()).to.equal("Hello, World");
  });
});
