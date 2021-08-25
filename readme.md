# Clone the git repo;

# Install dependencies;

# Configure your config.ts
1. Add Rinkeby Infura Key
2. Add Wallet Private key
3. Add Etherscan API key for verify;

# Type `npx hardhat` to see the commands
1. First thing we need to `compile` to generate the typechain files
2. Then we run the `test` command to see if everything is alright
3. After this we `run` this command `npx hardhat run --network rinkeby scripts/deploy.ts`

# Now we have deployed the contract, but we still need to verify it after with this command
`npx hardhat verify --network rinkeby [contract address] [token address in our case is {0x01f7feeb77ae5e04d9606c209a7faff2187cd5c1}]`

# Now it's time to interact with the smart contract that we just deployed 
For allowance, go to the contract of the token that we deployed the contract with, in our case is {`0x01f7feeb77ae5e04d9606c209a7faff2187cd5c1`}
    1. Press `Contract` -> `Read Contract`
### 2. Press `Allowance`
        2.1. Owner (address) -> your wallet public address
        2.2. Spender (address) -> your contract address
    3. Go to `Write Contract` and connect your wallet
### 4. Press `Approve`
        4.1. Spender (address) -> your contract address
        4.2. Amount (uint256) -> The max value you let the contract to spend from your assets
### Now for deposit, go to your contract -> `Write Contract` -> connect wallet -> deposit -> insert the value and then add the digits( hit the +) and select 10^18