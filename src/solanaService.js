import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';
import bs58 from 'bs58';

// Set up the Solana connection (Devnet for testing)
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Load the private key from environment variables
const secretKey = bs58.decode(process.env.REACT_APP_SOLANA_PRIVATE_KEY.trim());
const wallet = Keypair.fromSecretKey(secretKey);

// Mint NFT function (for testing purposes)
async function mintNFT() {
  console.log('Minting NFT for completed focus session...');
  try {
    // Request an airdrop of SOL (for testing)
    const airdropSignature = await connection.requestAirdrop(wallet.publicKey, 2 * 10 ** 9);
    await connection.confirmTransaction(airdropSignature);

    console.log('NFT Minted Successfully!');
  } catch (error) {
    console.error('Error minting NFT:', error);
  }
}

export { mintNFT };
