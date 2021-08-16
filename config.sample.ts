import { NetworksUserConfig } from 'hardhat/types';
// import { EtherscanConfig } from '@nomiclabs/hardhat-etherscan/dist/src/types';

export const networks: NetworksUserConfig = {
  // Needed for `solidity-coverage`
  coverage: {
    url: 'http://localhost:8555',
  },

  // Rinkeby
  rinkeby: {
    url: 'https://rinkeby.infura.io/v3/[YOUR-INFURA-KEY]',
    accounts: [],
  },

  // Mainnet
  mainnet: {
    url: 'https://mainnet.infura.io/v3/YOUR-INFURA-KEY',
    chainId: 1,
    accounts: ['0xaaaa'],
    gas: 'auto',
    gasPrice: 50000000000,
    gasMultiplier: 1.5,
  },
};
