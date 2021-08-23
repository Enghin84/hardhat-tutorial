import {deployContract} from "../test/helpers/helpers";
import {Vault} from "../typechain";

async function main() {
    const tokenAddress = '0x01f7feeb77ae5e04d9606c209a7faff2187cd5c1'; // EQZ on rinkeby
    const vaultContract = (await deployContract('Vault', [tokenAddress])) as Vault;
    await vaultContract.deployed();
    console.log('Vault contract deployed to ', vaultContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
