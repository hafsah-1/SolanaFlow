import { Connection, Keypair } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import bs58 from "bs58";

// Set up the Solana connection (Devnet for testing)
const RPC_URL = "https://solana-devnet.core.chainstack.com/5a8e2a9579dafa8cc4617abe3b669aaa"; // Your actual RPC URL
const connection = new Connection(RPC_URL, "confirmed");

// Load private key from environment variables
const secretKey = bs58.decode(process.env.REACT_APP_SOLANA_PRIVATE_KEY); // Store it securely!
const wallet = Keypair.fromSecretKey(secretKey);

async function mintNFT() {
    console.log("Minting NFT for completed focus session...");

    // Initialize Metaplex
    const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(wallet))  // Use your wallet for signing transactions
        .use(bundlrStorage());        // Use Bundlr for storage (alternatively you can use Arweave)

    try {
        // Replace the metadata URI with your actual metadata URL (this could be a file hosted on IPFS or Arweave)
        const { nft } = await metaplex.nfts().create({
            uri: "https://your-metadata-url.com/metadata.json", // Replace with actual metadata URL
            name: "Focus Master NFT",  // Name of the NFT
            symbol: "FOCUS",          // Symbol for the NFT
            sellerFeeBasisPoints: 500, // 5% royalties on secondary sales
        });

        console.log("NFT Minted Successfully!", nft);
    } catch (error) {
        console.error("Error minting NFT:", error);
    }
}

export { mintNFT };
