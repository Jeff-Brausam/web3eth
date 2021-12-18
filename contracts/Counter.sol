// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract Counter {
  uint counter;
  
  event CounterInc(uint counter);
  // Writing state costs you fees
  function count() public returns (uint){
    counter++;
    console.log("Counter is now", counter);
    emit CounterInc(counter);
  }
  // Reading state is free
  function getCounter() public view returns (uint32){
    return uint32(counter);
  }

}