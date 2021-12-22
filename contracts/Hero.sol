// SPDX-License-Identifier: MIT
/*
   
    I should be able to get my heroes I have generated.
    Heroes should be stored on the chain.
   
    stats are randomly generated
        A scale of 1 - 18
        The stats are randomly picked and their amplitude is randomly determined according to the following:
            Stat 1 can max at 18
            Stat 2 can max at 17
            Stat 3 can max at 16
            ...
    You could imagine these being an NFT
        They are non divisable
*/

pragma solidity ^0.8.0;

contract Hero {
  enum Class { Mage, Healer, Barbarian }
  // A mapping that in addresses and produces out arrays (stores it on chain)
  mapping(address => uint[]) addressToHeroes;
  // A way to access that addressToHeroes array
  function getHeroes() public view returns (uint[] memory) {
    return addressToHeroes[msg.sender];
  }
  // Never actually use this for an NFT. Only for this case of code.
  function generateRandom() public virtual view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
  }

  function getStrength(uint hero) public pure returns (uint32){
    return uint32((hero >> 2) & 0x1F);
  }
  
  function getHealth(uint hero) public pure returns (uint32){
    return uint32((hero >> 7) & 0x1F);
  }
  
  function getDex(uint hero) public pure returns (uint32){
    return uint32((hero >> 12) & 0x1F);
  }
  
  function getIntellect(uint hero) public pure returns (uint32){
    return uint32((hero >> 17) & 0x1F);
  }
  
  function getMagic(uint hero) public pure returns (uint32){
    return uint32((hero >> 22) & 0x1F);
  }

  function createHero(Class class) public payable {
    require(msg.value >= 0.05 ether, "Please send more money!");

    // stats are strength, health, dexterity, intellect, magic 
    uint[] memory stats = new uint[](5);
    /* 
      The reason this starts at 2, is because your classes are reserved for
      bits 0, 1, and 2. (or in binary 00,01, and 10) 
      Then each class beyond that requires 5 bits of storage.   
    */
    stats[0] = 2;
    stats[1] = 7;
    stats[2] = 12;
    stats[3] = 17;
    stats[4] = 22;
  
    uint len = 5;
    uint hero = uint(class);

    do {
      uint pos = generateRandom() % len;
      uint value = generateRandom() % (13 + len) + 1;

      hero |= value << stats[pos];

      len--;
      stats[pos] = stats[len];
    } while(len > 0);
  
    addressToHeroes[msg.sender].push(hero);
  }
}
