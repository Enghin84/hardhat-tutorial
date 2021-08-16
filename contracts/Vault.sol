pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Vault {
    event DepositEvent(address sender, uint256 amount);
    event WithdrawEvent(address sender, uint256 amount);

    IERC20 public immutable token;
    mapping(address => uint256) public balances;
    uint256 totalAmountDeposited = 0;

    constructor(address _token) {
        require(_token!=address(0), 'token is zero address');
        token = IERC20(_token);
    }

    function deposit(uint256 amount) external {
        require(amount>0, 'invalid amount deposited');

        // transfer ERC20 amount from sender to Vault
        bool isSucceeded = token.transferFrom(msg.sender, address(this), amount);
        require(isSucceeded, 'erc20 transfer failed...');

        // update totalAmountDeposited
        totalAmountDeposited = totalAmountDeposited + amount;

        // update balances
        balances[msg.sender] = balances[msg.sender] + amount;

        // emit deposit event
        emit DepositEvent(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(amount>0, 'invalid amount to withdraw');
        require(balances[msg.sender]>=amount, 'not enough money in the vault for this user');
        require(totalAmountDeposited>amount, 'not enough money in the vault');

        require(token.transferFrom(address(this), msg.sender, amount), 'token transaction failed');

        totalAmountDeposited = totalAmountDeposited - amount;
        balances[msg.sender] = balances[msg.sender] - amount;
        emit WithdrawEvent(msg.sender, amount);
    }
}
