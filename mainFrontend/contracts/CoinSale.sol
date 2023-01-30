pragma solidity ^0.6.0;
import "./Crowdsale.sol";

contract CoinSale is Crowdsale {
    constructor (uint256 _rate,address payable _wallet,IERC20 _token) Crowdsale(_rate,_wallet,_token)public{
        
    }
}