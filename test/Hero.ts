import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hero", () => {
  const createHero = async () => {
    const Hero = await ethers.getContractFactory("TestHero");
    const hero = await Hero.deploy();
    await hero._deployed();

    return hero;
  };

  let hero;

  before(async () => {
    hero = await createHero();
  });

  it("should get a zero hero array.", async () => {
    expect(await hero.getHeroes()).to.deep.equal([]);
  });

  it("should fail at creating hero because of payment.", async () => {
    let e;

    try {
      await hero.createHero(0, {
        value: ethers.utils.parseEther("0.04"),
      });
    } catch (err) {
      e = err;
    }
    expect(e.message.includes("Please send more money!")).to.equal(true);
  });

  it("should fail at creating hero because of payment.", async () => {
    const hero = await createHero();

    await hero.setRandom(69);
    await hero.createHero(0, {
      value: ethers.utils.parseEther("0.05"),
    });
    const heroes = (await hero.getHeroes())[0];

    // [S, H, D, I, M]
    // [S, H, D, I]
    // [S, I, D]
    expect(await hero.getMagic(heroes)).to.equal(16);
    expect(await hero.getHealth(heroes)).to.equal(2);
  });
});
