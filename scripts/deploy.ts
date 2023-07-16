import { ethers } from 'hardhat';

async function main() {
    const storage = await ethers.deployContract('Storage');
    await storage.waitForDeployment();
    console.log(`Storage deployed at ${await storage.getAddress()}.`);
    // sepolia test storage
    // Storage deployed at 0x71E12D6d07C119c808958698530a5fEd9263C841.
    // Storage deployed at 0xc078eA74dE8804dABcc408082428939c27ac37e9.
    
}

main().catch((error) => {
    // console.error(error);
    process.exitCode = 1;
});
