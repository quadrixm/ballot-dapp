// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "../contracts/Ballot.sol";
// These files are dynamically created at test time
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract BallotTest {

  Ballot ballot = Ballot(DeployedAddresses.Ballot());

  // Test proposal creation in the constructor
  function testProposalCreation() public {
      // Add tests for proposal creation
      bytes32 expectedFirstProposalName = "Alice"; // Replace with actual first proposal name
      (bytes32 name, ) = ballot.proposals(0);
      Assert.equal(name, expectedFirstProposalName, "First proposal name should match");
  }
}
