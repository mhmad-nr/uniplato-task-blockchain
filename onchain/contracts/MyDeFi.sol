// Layout of Contract:
// version
// imports
// errors
// interfaces, libraries, contracts
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// internal & private view & pure functions
// external & public view & pure functions

// Pragma
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Error
error MyDeFi__ValueIsNotEnough();
error MyDeFi__BalanceIsNotEnough();
error MyDeFi__ValueMustBeMoreThanZero();

/**@title DeFi contract
 * @author mohammad norouzi
 * @notice This contract implements a simpel ERC-20 Token and some additional functionalites
 */
contract MyDeFi is ERC20 {
    ////////////////
    ////events /////
    ////////////////
    event tokenMinted(address indexed minter, uint256 indexed amount);

    ////////////////
    ///variables ///
    ////////////////

    // minimum value in gwei
    uint256 private constant MINIMUM_VALUE = 1 gwei;
    // balance of address
    mapping(address => uint256) s_balances;

    ////////////////
    ///functions ///
    ////////////////
    constructor() ERC20("MyToken", "MTK") {}

    /*
     * @notice Mint new tokens. Minting cost is paid with msg.value.
     * @param _amount The amount of new tokens to mint.
     */
    function mint(uint256 _amount) public payable {
        if ((_amount * MINIMUM_VALUE) != msg.value) {
            revert MyDeFi__ValueIsNotEnough();
        }
        
        _mint(msg.sender, _amount);
    }

    /*
     * @notice Mint new tokens using the user's balance to pay the minting cost.
     * @param _amount The amount of new tokens to mint.
     */
    function mintDiposit(uint256 _amount) public payable {
        uint256 balance = s_balances[msg.sender];
        uint256 totalValue = _amount * MINIMUM_VALUE;
        if (totalValue != balance) {
            revert MyDeFi__BalanceIsNotEnough();
        }

        s_balances[msg.sender] -= totalValue;

        _mint(msg.sender, _amount);
    }
    /*
     * @notice Deposit values which users send to an associated balance address.
     */
    function diposit() public payable {
        if (msg.value == 0) {
            revert MyDeFi__ValueMustBeMoreThanZero();
        }
        s_balances[msg.sender] = msg.value;
    }

    /*
     * @notice private function to mint new tokens and emit an event.
     * @param _amount The amount of new tokens to mint.
     */
    function _mint(uint256 _amount) private {
        super._mint(msg.sender, _amount);
        emit tokenMinted(msg.sender, _amount);
    }
    /*
     * @notice This function returns the balance of addresses which have deposited before.
     */
    function getBalance(address _address) public view returns (uint256) {
        return s_balances[_address];
    }
}
