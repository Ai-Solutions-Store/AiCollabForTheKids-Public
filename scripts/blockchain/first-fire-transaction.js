/**
 * OPERATION FIRST FIRE - GospelDonation.sol Transaction Script
 *
 * Executes the first on-chain contribution to prove 60/30/10 split
 *
 * USAGE:
 * 1. Set DEPLOYER_PRIVATE_KEY in environment
 * 2. Run: node scripts/blockchain/first-fire-transaction.js
 *
 * GOSPEL V1.3 - 60/30/10 IMMUTABLE - FOR THE KIDS
 */

const { ethers } = require('ethers');

// Configuration
const CONFIG = {
  // Base Mainnet
  rpcUrl: 'https://mainnet.base.org',
  chainId: 8453,

  // GospelDonation Contract
  contractAddress: '0x9855B75061D4c841791382998f0CE8B2BCC965A4',

  // Gnosis Safe Wallets (Recipients)
  charityWallet: '0x8d3dEADbE2b4B857A43331D459270B5eedC7084e',   // 60%
  infraWallet: '0xe0a42f83900af719019eBeD3D9473BE8E8f2920b',    // 30%
  founderWallet: '0x7c3E283119718395Ef5EfBAC4F52738C2018daA7', // 10%

  // Transaction amount (in wei) - 0.001 ETH symbolic first fire
  amount: ethers.parseEther('0.001'),

  // Gas settings
  gasLimit: 200000
};

// Minimal ABI for receiveCryptoDonation function
// Assuming standard receive/fallback or donate function
const CONTRACT_ABI = [
  'function receiveCryptoDonation() external payable',
  'function donate() external payable',
  'receive() external payable',
  'function getCharityPercentage() view returns (uint256)',
  'function getInfraPercentage() view returns (uint256)',
  'function getFounderPercentage() view returns (uint256)'
];

async function executeFirstFire() {
  console.log('═'.repeat(60));
  console.log('OPERATION FIRST FIRE - GospelDonation.sol');
  console.log('═'.repeat(60));
  console.log('');

  // Load private key
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
  if (!privateKey) {
    console.error('ERROR: DEPLOYER_PRIVATE_KEY not set in environment');
    console.error('');
    console.error('Set it with:');
    console.error('  export DEPLOYER_PRIVATE_KEY="0x..."');
    console.error('  OR');
    console.error('  set DEPLOYER_PRIVATE_KEY=0x... (Windows)');
    process.exit(1);
  }

  // Connect to Base Mainnet
  console.log('Connecting to Base Mainnet...');
  const provider = new ethers.JsonRpcProvider(CONFIG.rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  console.log(`Wallet: ${wallet.address}`);

  // Check balance
  const balance = await provider.getBalance(wallet.address);
  console.log(`Balance: ${ethers.formatEther(balance)} ETH`);

  if (balance < CONFIG.amount) {
    console.error(`ERROR: Insufficient balance. Need at least ${ethers.formatEther(CONFIG.amount)} ETH`);
    process.exit(1);
  }

  // Connect to contract
  console.log(`\nContract: ${CONFIG.contractAddress}`);
  const contract = new ethers.Contract(CONFIG.contractAddress, CONTRACT_ABI, wallet);

  // Attempt transaction
  console.log(`\nExecuting FIRST FIRE transaction...`);
  console.log(`Amount: ${ethers.formatEther(CONFIG.amount)} ETH`);

  try {
    // Try receiveCryptoDonation first
    let tx;
    try {
      tx = await contract.receiveCryptoDonation({
        value: CONFIG.amount,
        gasLimit: CONFIG.gasLimit
      });
    } catch (e) {
      // Fallback to donate()
      try {
        tx = await contract.donate({
          value: CONFIG.amount,
          gasLimit: CONFIG.gasLimit
        });
      } catch (e2) {
        // Fallback to direct ETH transfer (receive function)
        tx = await wallet.sendTransaction({
          to: CONFIG.contractAddress,
          value: CONFIG.amount,
          gasLimit: CONFIG.gasLimit
        });
      }
    }

    console.log(`\nTransaction submitted: ${tx.hash}`);
    console.log(`BaseScan: https://basescan.org/tx/${tx.hash}`);

    console.log('\nWaiting for confirmation...');
    const receipt = await tx.wait();

    console.log(`\n${'═'.repeat(60)}`);
    console.log('OPERATION FIRST FIRE COMPLETE');
    console.log(`${'═'.repeat(60)}`);
    console.log(`TX Hash: ${receipt.hash}`);
    console.log(`Block: ${receipt.blockNumber}`);
    console.log(`Gas Used: ${receipt.gasUsed.toString()}`);
    console.log(`\nBaseScan: https://basescan.org/tx/${receipt.hash}`);
    console.log(`\nExpected splits:`);
    console.log(`  60% Charity: ${ethers.formatEther(CONFIG.amount * 60n / 100n)} ETH → ${CONFIG.charityWallet}`);
    console.log(`  30% Infra:   ${ethers.formatEther(CONFIG.amount * 30n / 100n)} ETH → ${CONFIG.infraWallet}`);
    console.log(`  10% Founder: ${ethers.formatEther(CONFIG.amount * 10n / 100n)} ETH → ${CONFIG.founderWallet}`);
    console.log(`\nFOR THE KIDS. ALWAYS.`);

    return receipt.hash;

  } catch (error) {
    console.error('\nTransaction failed:');
    console.error(error.message);

    if (error.code === 'INSUFFICIENT_FUNDS') {
      console.error('\nNot enough ETH for gas. Fund the wallet at:');
      console.error(`https://basescan.org/address/${wallet.address}`);
    }

    process.exit(1);
  }
}

// Execute
executeFirstFire().catch(console.error);
