import {deployContract} from './helpers/helpers';
import {ERC20Mock, Vault} from "../typechain";
import {ethers} from 'hardhat';
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {expect} from "chai";

describe('vault', () => {
    let snapshotId: any;
    let token: ERC20Mock;
    let vault: Vault;
    let owner: SignerWithAddress;

    before(async () => {
        token = (await deployContract('ERC20Mock')) as ERC20Mock;
        vault = (await deployContract('Vault', [token.address])) as Vault;
        [owner] = await ethers.getSigners();
    });

    beforeEach(async () => {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it('Should deploy', async () => {
        expect(await vault.owner()).to.equal(owner.address);
        expect(await vault.token()).to.equal(token.address);
    });
});
