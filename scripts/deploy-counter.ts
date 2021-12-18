import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

const deploy = async () => {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed();

  return counter;
};

const count = async (counter) => {
  await counter.count();
  console.log("counter: ", await counter.getCounter());
};

deploy().then(count);
