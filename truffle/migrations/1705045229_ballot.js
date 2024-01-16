const Ballot = artifacts.require("Ballot");
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider);

function toBytes32(str) {
    return web3.utils.asciiToHex(str);
}

module.exports = function (_deployer) {
  const names = ["Alice", "Bob", "Eve"];
  const bytes32Names = names.map(name => toBytes32(name));
  _deployer.deploy(Ballot, bytes32Names);
};
