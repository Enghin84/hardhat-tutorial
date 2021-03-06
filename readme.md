## Requirements

### Install GitBash

--download link: https://git-scm.com/downloads
--instalation guide: https://www.stanleyulili.com/git/how-to-install-git-bash-on-windows/

### Install Node.js

--download link: https://nodejs.org/en/download/

### Generate SSH key
    
   To generate SSH key you have to open a git bash terminal, to do that you have to right-click on desktop and select `Git bash here`
    
   1. Insert this command in the terminal `ssh-keygen -t ed25519 -C "your_email@example.com"` and replace it with your email, but it has to be the one connected with your GitHub account (if you don't have a GitHub account, go and make one here https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home)
   2. skip the next steps by pressing enter, this way it will go with the default options
   3. the new .pub file it will generate on default location in /c/Users/user/.ssh/id_ed25519 <- `id_ed25519.pub` - this is what we are looking for. Now we have to change location of the terminal by doing the following command: cd /c/Users/user/.ssh/, note that your location might be different, it will contain your user name. You can type `ls` to verify if you are in the correct location, if you see `id_ed25519.pub`, then you are all good.
   4. after you find the file, use this command `cat id_ed25519.pub` it will show your ssh-key which is a long string (here is an example of ssh https://imgur.com/a/QtOw1wu)
   5. now that we have the ssh-key, we have to go to Github to insert it into the account (here is how-to https://imgur.com/a/OdFAYbs)

### Clone the git repository
    1. Create a new folder for this project
    2. In the newly created folder you have to open a terminal here
    3. paste this command: git clone git@github.com:Enghin84/hardhat-tutorial.git, this line of code will clone the repo on your local machine
    4. type in terminal cd hardhat-tutorial to move the terminal in the cloned repo folder

### Install dependencies
    1. type `npm install` to install the depedencies

### Configure your config.ts

In the repo we have config.sample.ts, this is a mock version, here you have to rename it in config.ts and inside you have to paste your data.

#### Add Rinkeby Infura Key

   Go to https://infura.io/ and make an account there
   Create a new project
   Copy the Rinkeby ID
   (Steps here https://imgur.com/a/xkUYdMp)

#### Add Wallet Private key
    
   Install Metamask wallet, it's an extension for Chrome (tutorial https://www.youtube.com/watch?v=Af_lQ1zUnoM&ab_channel=MoneyZG)
   Copy wallet address (here is how https://imgur.com/a/LEz7S3y)
   https://faucet.rinkeby.io/ here you can get eth for Rinkeby, you will find instructions there.

#### Add Etherscan API key for verify

   Go to https://etherscan.io/ and make an account there to get the API key (here how https://imgur.com/a/SJV34ng)

Now that we are all set, it's time to run the commands to progress further. In the terminal insert the next commands

## Deployment stage

We will use Hardhat to work with smart contracts. Type `npx hardhat` in the terminal to see the list of commands and what they do.
#### 1. First thing we need to `compile` to generate the typechain files
#### 2. Then we run the `test` command to see if everything is alright
#### 3. After this we `run` this command `npx hardhat run --network rinkeby scripts/deploy.ts`. This command will deply the contract on the Rinkeby TestNet. When it will finish the deployment process(it might take a while), it will show here in the terminal the contract address, make sure you keep it safe, it will help us further, when we will intercat with the contract.

## Verify the contract

    Now we have deployed the contract, but we still need to verify it after with this command 
    `npx hardhat verify --network rinkeby [contract address] [token address which in our case is 0x01f7feeb77ae5e04d9606c209a7faff2187cd5c1]`

## Contract interaction

Now it's time to interact with the smart contract that we have just deployed (img snippets here https://imgur.com/a/mwLYF2r)

### Step 1 Allowance & Approve

For allowance, go to the EQZ contract page https://rinkeby.etherscan.io/address/0x01F7FeEB77aE5e04d9606C209a7faFf2187Cd5c1 
this is the token that we deployed the contract with, `0x01f7feeb77ae5e04d9606c209a7faff2187cd5c1`
#### 1. Press `Contract` -> `Read Contract`
#### 2. Press `Allowance`
        2.1. Owner (address) -> your wallet public address
        2.2. Spender (address) -> your contract address
#### 3. Go to `Write Contract` and connect your wallet
#### 4. Press `Approve`
        4.1. Spender (address) -> your contract address
        4.2. Amount (uint256) -> The max value you let the contract to spend from your assets, insert the value and then add the digits( hit the +) and select 10^18
### Step 2 Deposit 
Now for deposit, go to your contract on Rinkeby testnet -> `Write Contract` -> connect wallet -> deposit -> insert the value and then add the digits( hit the +) and select 10^18
