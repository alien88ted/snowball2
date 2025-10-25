const { Connection, PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js');

async function testQuickNode() {
  const QUICKNODE_URL = 'https://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/';
  const COFFEE_PRESALE = '2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s';

  console.log('Testing QuickNode endpoint directly...');
  console.log('URL:', QUICKNODE_URL);
  console.log('Wallet:', COFFEE_PRESALE);
  console.log('---\n');

  try {
    const connection = new Connection(QUICKNODE_URL, 'confirmed');
    const pubKey = new PublicKey(COFFEE_PRESALE);

    console.log('1. Testing getBalance()...');
    const balance = await connection.getBalance(pubKey);
    const solBalance = balance / LAMPORTS_PER_SOL;

    console.log('✅ SUCCESS! QuickNode is working!');
    console.log('SOL Balance:', solBalance.toFixed(2), 'SOL');

    // Fetch current SOL price
    console.log('\n2. Fetching SOL price...');
    const priceResp = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    const priceData = await priceResp.json();
    const solPrice = priceData.solana?.usd || 195;

    console.log('SOL Price: $' + solPrice.toFixed(2));
    console.log('Total USD Value: $' + (solBalance * solPrice).toLocaleString());

    console.log('\n3. Testing getRecentBlockhash()...');
    const { blockhash } = await connection.getRecentBlockhash();
    console.log('✅ Blockhash received:', blockhash.substring(0, 20) + '...');

    console.log('\n🎉 QuickNode endpoint is fully functional!');
    console.log('The wallet contains $' + (solBalance * solPrice).toLocaleString() + ' worth of SOL');

    return true;
  } catch (error) {
    console.error('❌ QuickNode test failed!');
    console.error('Error:', error.message);

    if (error.message.includes('403')) {
      console.error('\n⚠️  This looks like an authentication issue.');
      console.error('The API key might not have the right permissions.');
    } else if (error.message.includes('429')) {
      console.error('\n⚠️  Rate limiting detected.');
      console.error('Too many requests to the endpoint.');
    }

    return false;
  }
}

testQuickNode();