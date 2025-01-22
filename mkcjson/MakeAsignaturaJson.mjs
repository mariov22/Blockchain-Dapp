
import fs from "node:fs/promises";

const ganacheNetworkId = "5777";

const {abi, networks: {[ganacheNetworkId]: {address}}} = JSON.parse(await fs.readFile("./truffle/build/contracts/Asignatura.json"));

console.log("ABI =", abi);
console.log("Address =", address);

const res = {abi, address};

await fs.writeFile('./dapp/src/Asignatura.json', JSON.stringify(res, null, 2));

