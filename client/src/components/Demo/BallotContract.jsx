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
    <div className="max-w-2xl mx-auto p-5">
      <div className="mb-6">
        <h1 className="text-blue-500">Hello, Tailwind!</h1>
        <h2 className="text-xl font-semibold mb-4">Proposals</h2>
        <ul className="list-disc pl-5">
          {proposals.map((proposal, index) => (
            <li key={index} className="mb-1">{proposal}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <label htmlFor="accountSelect" className="block mb-2">Choose an account:</label>
        <select id="accountSelect" className="border border-gray-300 rounded p-2 w-full" value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
          {accounts.map((account, index) => (
            <option key={index} value={account}>
              {account}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <select className="border border-gray-300 rounded p-2 w-full mb-4" value={voteIndex} onChange={(e) => setVoteIndex(e.target.value)}>
          <option value="">Select a Proposal</option>
          {proposals.map((proposal, index) => (
            <option key={index} value={index}>
              {proposal}
            </option>
          ))}
        </select>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={vote}>Vote</button>
      </div>

      <div className="mb-6">
        <input type="text" className="border border-gray-300 rounded p-2 w-full mb-4" value={delegateAddress} onChange={(e) => setDelegateAddress(e.target.value)} />
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={delegate}>Delegate Vote</button>
      </div>

      <div className="mb-6">
        <input type="text" className="border border-gray-300 rounded p-2 w-full mb-4" value={voterAddresses} onChange={(e) => setVoterAddresses(e.target.value)} placeholder="Enter addresses separated by commas" />
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={giveRightToVote}>Give Right to Vote</button>
      </div>

      <div>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={getWinnerName}>Get Winner Name</button>
        {winnerName && <p className="mt-4 text-lg">Winner: {winnerName}</p>}
      </div>
    </div>
  );
}

export default BallotContract;
