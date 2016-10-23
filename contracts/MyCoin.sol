pragma solidity ^0.4.2;

import "ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MyCoin {
	mapping (address => uint) balances;
	address public externalAccountA;
	address public externalAccountB;

	event Transfer(address indexed _from, address receiver, uint256 _value);

	function MyCoin() {
		externalAccountA = 0xf71f27846bb5ca26a8bc44917475bf7aee579d25;
		externalAccountB = 0x8f5f1150799ae63fa95a6cb9d19fecdee94838e6;

		balances[tx.origin] = 100000;
		balances[externalAccountA] = 0;
		balances[externalAccountB] = 0;
	}

	function sendCoin(uint amount) returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;

		//if (receiver == tx.origin) {
				balances[msg.sender] -= amount;
				balances[externalAccountA] += (amount/2);
				balances[externalAccountB] += (amount/2);

				Transfer(msg.sender, externalAccountA, (amount/2));
				Transfer(msg.sender, externalAccountB, (amount/2));
		//}
		return true;
	}

	function getContractBalance() returns(uint) {
		return balances[tx.origin];
	}

	function getContractBalanceInEth() returns(uint) {
		return ConvertLib.convert(getContractBalance(),2);
	}

	function getExternalAccountABalance() returns(uint) {
		return balances[externalAccountA];
	}

	function getExternalAccountABalanceInEth() returns(uint) {
		return ConvertLib.convert(getExternalAccountABalance(),2);
	}

	function getExternalAccountBBalance() returns(uint) {
		return balances[externalAccountB];
	}

	function getExternalAccountBBalanceInEth() returns(uint) {
		return ConvertLib.convert(getExternalAccountBBalance(),2);
	}
}
