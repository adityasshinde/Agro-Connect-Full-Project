// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "@openzeppelin/contracts/access/AccessControl.sol";

contract SilverBadge is ERC20 {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    address tokenCreater = msg.sender;
    event SilverBadgeDelivered(address indexed receiver);
    string private _name;
    string private _symbol;
    constructor(uint256 _initialSupply,string memory name,string memory symbol) ERC20() public{
        _name = name;
        _symbol = symbol;
        _mint(msg.sender,_initialSupply);
    }
    

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

   
    function externaltransfer(address adr)public{
        _transfer(tokenCreater,adr,1);
        emit SilverBadgeDelivered(adr);
    }
}