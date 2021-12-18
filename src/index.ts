import { ethers } from "ethers";
import Counter from "../artifacts/contracts/Counter.sol/Counter.json";

const getMetamask = () => {
  //@ts-ignore
  const metamask = window.ethereum;
  if (!metamask) {
    throw new Error("Missing metamask");
  }
  return metamask;
};

async function hasAccounts(): Promise<boolean> {
  const metamask = getMetamask();
  const accounts = await (metamask.request({
    method: "eth_accounts",
  }) as Promise<string[]>);
  return accounts && accounts.length > 0;
}

async function requestAccounts(): Promise<boolean> {
  const metamask = getMetamask();
  //@ts-ignore
  const accounts = (await metamask.request({
    method: "eth_requestAccounts",
  })) as string[];
  return accounts && accounts.length > 0;
}

async function getContract() {
  const address = process.env.CONTRACT_ADDRESS;

  if (!(await hasAccounts()) && !(await requestAccounts())) {
    console.log("You are in trouble, no one wants to play");
  }
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(getMetamask());

  const contract = new ethers.Contract(
    address,
    Counter.abi,
    provider.getSigner()
  );
  const el = document.createElement("div");
  const setCounter = async (count?) => {
    el.innerHTML = count || (await contract.getCounter());
  };
  setCounter();

  const button = document.createElement("button");
  button.innerText = "increment";
  button.onclick = async () => {
    await contract.count();
  };

  contract.on(contract.filters.CounterInc(), (count) => {
    setCounter();
  });

  document.body.appendChild(el);
  document.body.appendChild(button);
}

getContract();
