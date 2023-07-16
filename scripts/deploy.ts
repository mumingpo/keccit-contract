import { ethers } from 'hardhat';

async function main() {
    const storage = await ethers.deployContract('Storage');
    await storage.waitForDeployment();
    console.log(`Storage deployed at ${await storage.getAddress()}.`);
    // sepolia test storage
    // Storage deployed at 0xf00a801074eaEdFA4eCc4a2D697bE049D7F6EFe5.
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
