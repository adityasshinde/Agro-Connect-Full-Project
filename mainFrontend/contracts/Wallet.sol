pragma solidity ^0.6.0;

contract Wallet {
   
    event sentToFarmer(address indexed _farmerAddress,uint256 _amount ,uint time,string _itemName);
    function sendToFarmer (address payable _farmer, uint256 _amount,string memory _itemName) public {
        _farmer.transfer(_amount);
        emit sentToFarmer(_farmer,_amount,block.timestamp,_itemName);
    }
    function viewBalance () public view returns(uint256){
        return address(this).balance;
    }
    receive ()external payable{    
    }

}