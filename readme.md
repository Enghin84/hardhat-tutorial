### Requirements

##### Install GitBash

--download link: https://git-scm.com/downloads
--instalation guide: https://www.stanleyulili.com/git/how-to-install-git-bash-on-windows/

##### Install Node.js

--download link: https://nodejs.org/en/download/

### Create a new folder for the project

##### Generate SSH key

To generate SSH key you have to open a git bash terminal, to do that you have to right click on desktop and select `Git bash here`
-Insert this command in the terminal `ssh-keygen -t ed25519 -C "your_email@example.com"` and replace with your email, but it has to be the one connected with your GitHub account (if you don't have a GitHub account, go and make one here https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home)
-skip the next steps by pressing enter, this way it will go with the default options
-the new .pub file it will generate on default location in /c/Users/user/.ssh/id_ed25519 <- `id_ed25519.pub` - this is what we are looking for. Now we have to change location of the terminal by doing the following command: cd /c/Users/user/.ssh/, note that your location might be different, it will contain your user name. You can type `ls` to verify if you are in the correct location, if you see `id_ed25519.pub`, then you are all good.
-after you find the file, use this command `cat id_ed25519.pub` it will show your ssh-key which is a long string (here is an example of ssh https://imgur.com/a/QtOw1wu)
-now that we have the ssh-key, we have to go to Github to insert it in account (here is how-to https://imgur.com/a/OdFAYbs)

##### Clone the git repository
    1. In the newly created folder you have to open a terminal here, to do that you have to right click and select the 
    `Git bash here` option
    2. 

##### Install dependencies

### Configure your config.ts
1. Add Rinkeby Infura Key
2. Add Wallet Private key
3. Add Etherscan API key for verify

### Type `npx hardhat` to see the commands
1. First thing we need to `compile` to generate the typechain files
2. Then we run the `test` command to see if everything is alright
3. After this we `run` this command `npx hardhat run --network rinkeby scripts/deploy.ts`

### Now we have deployed the contract, but we still need to verify it after with this command
`npx hardhat verify --network rinkeby [contract address] [token address in our case is {0x01f7feeb77ae5e04d9606c209a7faff2187cd5c1}]`

### Now it's time to interact with the smart contract that we just deployed 
For allowance, go to the contract of the token that we deployed the contract with, in our case is {`0x01f7feeb77ae5e04d9606c209a7faff2187cd5c1`}
    1. Press `Contract` -> `Read Contract`
##### 2. Press `Allowance`
        2.1. Owner (address) -> your wallet public address
        2.2. Spender (address) -> your contract address
##### 3. Go to `Write Contract` and connect your wallet
##### 4. Press `Approve`
        4.1. Spender (address) -> your contract address
        4.2. Amount (uint256) -> The max value you let the contract to spend from your assets
##### Now for deposit, go to your contract -> `Write Contract` -> connect wallet -> deposit -> insert the value and then add the digits( hit the +) and select 10^18
