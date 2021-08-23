import {deployContract} from './helpers/helpers';
import {ERC20Mock, Vault} from "../typechain";
import {ethers as eth} from 'ethers';
import {ethers} from 'hardhat';
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {expect} from "chai";

describe('Vault', () => {
    let snapshotId: any;
    let token: ERC20Mock;
    let vault: Vault;
    let owner: SignerWithAddress;
    let user: SignerWithAddress;
    let unknownUser: SignerWithAddress;

    before(async () => {
        token = (await deployContract('ERC20Mock')) as ERC20Mock;
        vault = (await deployContract('Vault', [token.address])) as Vault;
        [owner, user, unknownUser] = await ethers.getSigners();
    });

    beforeEach(async () => {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    describe('Deploy', () => {
        it('Should fail if zero token address', async () => {
            await expect(deployContract('Vault', [eth.constants.AddressZero])).to.be.revertedWith('token is zero address');
        });

        it('Should deploy', async () => {
            expect(await vault.owner()).to.equal(owner.address);
            expect(await vault.token()).to.equal(token.address);
        });
    });

    describe('Deposit', () => {
        it('Should fail if amount 0', async () => {
            await expect(vault.deposit(0)).to.be.revertedWith('invalid amount deposited');
        });

        it('Should fail with insufficient balance', async () => {
            await expect(vault.connect(user).deposit(100)).to.be.revertedWith('ERC20: transfer amount exceeds balance');
        });

        it('Should fail with insufficient allowance', async () => {
            await token.mint(user.address, 10000);
            await expect(vault.connect(user).deposit(100)).to.be.revertedWith('ERC20: transfer amount exceeds allowance');
        });

        it('Should run successfully', async () => {
            await token.mint(user.address, 10000);
            await token.connect(user).approve(vault.address, 100);
            await expect(vault.connect(user).deposit(100))
                .to
                .emit(vault, 'DepositEvent')
                .withArgs(user.address, 100);

            await expect(await vault.totalAmountDeposited()).to.equal(100);
            await expect(await vault.balances(user.address)).to.equal(100);
        });
    });

    describe('Withdraw', () => {
        it('Should fail if amount 0', async () => {
            await expect(vault.withdraw(0)).to.be.revertedWith('invalid amount to withdraw');
        });

        it('Should fail with insufficient allowance', async () => {
            await expect(vault.connect(user).withdraw(100)).to.be.revertedWith('not enough money in the vault for this user');
        });

        it('Should fail with insufficient founds', async () => {
            await token.mint(user.address, 10000);
            await expect(vault.connect(user).withdraw(100)).to.be.revertedWith('not enough money in the vault');
        });

        it('Should run successfully', async () => {
            await token.mint(user.address, 10000);
            await token.connect(user).approve(vault.address, 100);
            await vault.connect(user).deposit(100);

            await expect(await vault.connect(user).withdraw(20))
                .to
                .emit(vault, 'WithdrawEvent')
                .withArgs(user.address, 20);

            await expect(await vault.totalAmountDeposited()).to.equal(80);
            await expect(await vault.balances(user.address)).to.equal(80);
        });
    });

    describe('SetActive', () => {
        it('Should it fail if called user other than owner', async () => {
            await expect(vault.connect(unknownUser).setActive(false)).to.be.revertedWith('Ownable: caller is not the owner');
        });

        it('Runs successfully', async () => {
            await expect(await vault.active()).to.equal(true);
            await vault.connect(owner).setActive(false);
            await expect(await vault.active()).to.equal(false);
        });
    })
});
