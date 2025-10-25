const { Connection, PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js');

async function testWalletBalance() {
  const COFFEE_PRESALE_ADDRESS = "2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s";

  // QuickNode endpoints
  const connection = new Connection(
    'https://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/',
    'confirmed'
  );

  try {
    console.log('Testing wallet balance for COFFEE presale...');
    console.log('Address:', COFFEE_PRESALE_ADDRESS);
    console.log('---');

    // Get SOL balance
    const pubKey = new PublicKey(COFFEE_PRESALE_ADDRESS);
    const balance = await connection.getBalance(pubKey);
    const solBalance = balance / LAMPORTS_PER_SOL;

    console.log('SOL Balance:', solBalance.toFixed(2), 'SOL');

    // Fetch SOL price
    const solPriceResp = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    const solPriceData = await solPriceResp.json();
    const solPrice = solPriceData.solana?.usd || 100;

    console.log('SOL Price: $' + solPrice.toFixed(2));
    console.log('Total USD Value: $' + (solBalance * solPrice).toLocaleString());

    if (solBalance === 0) {
      console.log('\n⚠️ WARNING: Wallet has 0 balance!');
      console.log('This might be the wrong address or the wallet is empty.');
    } else {
      console.log('\n✅ Wallet has funds! This is the correct presale address.');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testWalletBalance();