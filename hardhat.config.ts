import {HardhatUserConfig} from "hardhat/config";
import * as config from './config';

const cfg: HardhatUserConfig = {
    defaultNetwork: 'hardhat',
    networks: config.networks,

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
