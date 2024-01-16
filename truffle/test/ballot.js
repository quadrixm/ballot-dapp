const Ballot = artifacts.require("Ballot");

function bytes32ToString(bytes32Value) {
    return web3.utils.toAscii(bytes32Value);
}

contract('Ballot', (accounts) => {
  let ballotInstance;

  before(async () => {
    ballotInstance = await Ballot.deployed();
  });

  describe("Deployment", () => {
    it("should deploy with correct initial state", async () => {
      assert(ballotInstance, "Contract was not deployed");
      
      const chairPerson = await ballotInstance.chairPerson();
      assert.equal(chairPerson, accounts[0], "Chairperson is not correct");
    });

    it('should initialize with correct number of proposals', async () => {
      const proposal = await ballotInstance.proposals(1);
      console.log({proposal});
      assert.equal("Bob", "Bob", 'First proposal should be Alice');
    });

    it('should allow chairperson to give right to vote', async () => {
      const voter = accounts[1];
      await ballotInstance.giveRightToVote([voter], {from: accounts[0]});
      const voterStruct = await ballotInstance.voters(voter);
      assert.equal(voterStruct.weight.toNumber(), 1, 'Voter should be 1 after giving right')
    })
  });
});
