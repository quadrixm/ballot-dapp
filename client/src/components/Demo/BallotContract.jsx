import React, { useState } from "react";
import web3 from 'web3';
import useEth from "../../contexts/EthContext/useEth";

function BallotContract() {
  const { state: { contract, accounts } } = useEth();
  const [voteIndex, setVoteIndex] = useState(0);
  const [delegateAddress, setDelegateAddress] = useState("");
  const [voterAddresses, setVoterAddresses] = useState("");
  const [winnerName, setWinnerName] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(accounts[0] || "");

  const proposals = ['Alice', 'Bob', 'Eve'];

  const vote = async () => {
    try {
      await contract.methods.vote(voteIndex).send({ from: selectedAccount });
      alert("Vote successfully cast!");
      // Additional logic after successful voting
    } catch (error) {
      console.error('Error during voting:', error);
      alert("Error during voting. Please try again.");
    }
  };
  

  const delegate = async () => {
    if (!web3.utils.isAddress(delegateAddress)) {
      alert("The provided address for delegation is invalid.");
      return;
    }
  
    try {
      await contract.methods.delegate(delegateAddress).send({ from: selectedAccount });
      alert("Delegation successful!");
      // Additional logic after successful delegation
    } catch (error) {
      console.error('Error during delegation:', error);
      alert("Error during delegation. Please try again.");
    }
  };
  
  const giveRightToVote = async () => {
    const voterArray = voterAddresses.split(",").map(address => address.trim());
  
    if (voterArray.some(address => !web3.utils.isAddress(address))) {
      alert("One or more addresses are invalid.");
      return;
    }
  
    try {
      await contract.methods.giveRightToVote(voterArray).send({ from: selectedAccount });
      alert("Voting rights successfully updated!");
      // Additional logic after updating voting rights
    } catch (error) {
      console.error('Error while updating voting rights:', error);
      alert("Error while updating voting rights. Please try again.");
    }
  };

  const getWinnerName = async () => {
    try {
      const hexName = await contract.methods.winnerName().call();
      const readableName = web3.utils.hexToUtf8(hexName);
      setWinnerName(readableName);
      alert(`The winner is: ${readableName}`);
    } catch (error) {
      console.error('Error fetching winner name:', error);
      alert("Error fetching the winner's name. Please try again.");
    }
  };
  

  return (
    <div>
      <div>
        <h2>Proposals</h2>
        <ul>
          {proposals.map((proposal, index) => (
            <li key={index}>{proposal}</li>
          ))}
        </ul>
      </div>
      <div>
        <label htmlFor="accountSelect">Choose an account: </label>
        <select id="accountSelect" value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
          {accounts.map((account, index) => (
            <option key={index} value={account}>
              {account}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select value={voteIndex} onChange={(e) => setVoteIndex(e.target.value)}>
          <option value="">Select a Proposal</option>
          {proposals.map((proposal, index) => (
            <option key={index} value={index}>
              {proposal}
            </option>
          ))}
        </select>
        <button onClick={vote}>Vote</button>
      </div>
      <div>
        <input type="text" value={delegateAddress} onChange={(e) => setDelegateAddress(e.target.value)} />
        <button onClick={delegate}>Delegate Vote</button>
      </div>
      <div>
        <input type="text" value={voterAddresses} onChange={(e) => setVoterAddresses(e.target.value)} placeholder="Enter addresses separated by commas" />
        <button onClick={giveRightToVote}>Give Right to Vote</button>
      </div>
      <div>
        <button onClick={getWinnerName}>Get Winner Name</button>
        {winnerName && <p>Winner: {winnerName}</p>}
      </div>
    </div>
  );
}

export default BallotContract;
