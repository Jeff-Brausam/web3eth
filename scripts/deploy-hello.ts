import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

const deploy = async () => {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const hello = await HelloWorld.deploy();
  await hello.deployed();

  return hello;
};
//@ts-ignore
const sayHello = async (hello) => {
  console.log("Say Hello:", await hello.hello());
};

deploy().then(sayHello);
