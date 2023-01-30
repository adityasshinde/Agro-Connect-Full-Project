pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";


contract AgroCoin is ERC20, ERC20Detailed {
     constructor(uint256 initialSupply) ERC20Detailed("AgroCoin", "AGC",0) public {
        _mint(msg.sender, initialSupply);
    }
    function burnToken (address _account, uint256 _amount) public {
        _burn(_account,_amount);
    }
    function getBalanceof(address payable _address) public view returns(uint256) {
        return _address.balance;
    }
}