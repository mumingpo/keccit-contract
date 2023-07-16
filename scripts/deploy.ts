import { ethers } from 'hardhat';

async function main() {
    const storage = await ethers.deployContract('Storage');
    await storage.waitForDeployment();

    console.log(`Storage deployed at ${await storage.getAddress()}.`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
