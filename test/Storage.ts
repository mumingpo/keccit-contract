import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Storage', function() {
    async function deployFixture() {
        const Storage = (await ethers.getContractFactory('Storage'));
        const storage = await Storage.deploy();

        const data = 123;
        const transaction = await storage.put(data);
        const receipt = await transaction.wait();
        if (receipt === null) {
            throw new Error('Should not happen citing documentation of .wait().');
        }
        const block = await receipt.getBlock();
        const { timestamp } = block;

        return { storage, data, timestamp };
    }

    describe('Initial deployment', function() {
        it('Should succeed.', async function() {
            await loadFixture(deployFixture);
        });
    });

    describe('Get function', function() {
        it('Should return non-zero for registered data.', async function() {
            const { storage, data } = await loadFixture(deployFixture);
            expect(await storage.get(data)).to.not.equal(0);
        });
        it('Should return the timestamp of the signing block for registered data.', async function () {
            const { storage, data, timestamp } = await loadFixture(deployFixture);
            expect(await storage.get(data)).to.equal(timestamp);
        });
        it('Should revert with message for unregistered data.', async function() {
            const { storage } = await loadFixture(deployFixture);
            await expect(storage.get(789)).to.be.revertedWith('Data not yet stored');
        });
    });

    describe('Put function', function() {
        it('Should succeed for unregistered data.', async function() {
            const { storage } = await loadFixture(deployFixture);
            await expect(storage.put(789)).to.not.be.reverted;
        });
        it('Should emit event on successful puts.', async function() {
            const { storage } = await loadFixture(deployFixture);
            const transaction = await storage.put(789);
            const receipt = await transaction.wait();
            if (receipt === null) {
                throw new Error('Should not happen citing documentation of .wait().');
            }
            const { timestamp } = await receipt.getBlock();
            await expect(transaction).to.emit(storage, 'DataStored').withArgs(789, timestamp);
        });
        it('Should revert with message for registered data.', async function() {
            const { storage, data } = await loadFixture(deployFixture);
            await expect(storage.put(data)).to.be.revertedWith('Data already stored');
        });
    });


});