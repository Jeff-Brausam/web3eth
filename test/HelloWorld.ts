import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("hello world", function () {
  it("should say hi", async function () {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
  });
});
