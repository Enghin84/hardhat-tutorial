import {HardhatUserConfig} from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import * as config from './config';
import 'hardhat-typechain';
import '@nomiclabs/hardhat-etherscan';

const cfg: HardhatUserConfig = {
    defaultNetwork: 'hardhat',
    networks: config.networks,
    etherscan: config.etherscan,
    solidity: {
        version: '0.8.4',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
};

export default cfg;
