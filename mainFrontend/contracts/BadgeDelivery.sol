// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./GoldenBadge.sol";
import "./SilverBadge.sol";
import "./BronzeBadge.sol";

contract BadgeDelivery {
       
    function deliverGoldenBadge(address _token) public {
      
      GoldenBadge bdg = GoldenBadge(_token);
      bdg.externaltransfer(msg.sender);
    }
    function deliverSilverBadge(address _token) public {
      
      SilverBadge bdg = SilverBadge(_token);
      bdg.externaltransfer(msg.sender);
    }
    function deliverBronzeBadge(address _token) public {
      
      BronzeBadge bdg = BronzeBadge(_token);
      bdg.externaltransfer(msg.sender);
    }

}