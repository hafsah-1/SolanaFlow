import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import bs58 from "bs58";

// Set up the Solana connection (using Chainstack RPC for transactions)
const RPC_URL = "https://solana-devnet.core.chainstack.com/5a8e2a9579dafa8cc4617abe3b669aaa";
const connection = new Connection(RPC_URL, "confirmed");

// Alternative Public RPC (for airdrops only)
const publicConnection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Load the private key from environment variables
if (!process.env.REACT_APP_SOLANA_PRIVATE_KEY) {
  console.error("Error: Private key not found. Set REACT_APP_SOLANA_PRIVATE_KEY in your .env file.");
}
const secretKey = bs58.decode(process.env.REACT_APP_SOLANA_PRIVATE_KEY.trim());
const wallet = Keypair.fromSecretKey(secretKey);

// Function to request an airdrop if needed
async function requestAirdropIfNeeded() {
  try {
    const balance = await connection.getBalance(wallet.publicKey);
    console.log("Wallet balance:", balance / 10 ** 9, "SOL");

    if (balance === 0) {
      console.log("Requesting airdrop...");
      const airdropSignature = await publicConnection.requestAirdrop(wallet.publicKey, 2 * 10 ** 9);
      await publicConnection.confirmTransaction(airdropSignature);
      console.log("Airdrop successful!");
    } else {
      console.log("Wallet already has SOL, skipping airdrop.");
    }
  } catch (error) {
    console.error("Error requesting airdrop:", error);
  }
}

// Mint NFT function (for testing purposes)
async function mintNFT() {
  console.log("Minting NFT for completed focus session...");
  try {
    await requestAirdropIfNeeded();

    // TODO: Add real NFT minting logic here

    console.log("NFT Minted Successfully!");
  } catch (error) {
    console.error("Error minting NFT:", error);
  }
}

export { mintNFT };
