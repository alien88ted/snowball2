const { Connection, PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js');

async function testFinalAPI() {
  const presaleAddress = '2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s';

  console.log('=== FINAL TEST ===\n');

  // First, test direct blockchain connection
  console.log('1. Testing direct Solana connection...');
  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
    const pubKey = new PublicKey(presaleAddress);
    const balance = await connection.getBalance(pubKey);
    const solBalance = balance / LAMPORTS_PER_SOL;

    console.log('✅ Direct connection works!');
    console.log('   SOL Balance:', solBalance.toFixed(2), 'SOL');

    // Estimate USD value
    const solPrice = 195; // Approximate
    console.log('   USD Value: ~$' + (solBalance * solPrice).toLocaleString());
  } catch (error) {
    console.log('❌ Direct connection failed:', error.message);
  }

  console.log('\n2. Testing API endpoint...');
  try {
    const url = `http://localhost:3004/api/presale/stats?projectId=coffee&address=${presaleAddress}`;
    console.log('   URL:', url);

    const response = await fetch(url);
    const data = await response.json();

    console.log('   Response Status:', response.status);

    if (data.raised && data.raised > 100000) {
      console.log('✅ API SUCCESS! Real wallet data is being returned!');
      console.log('   Raised: $' + data.raised.toLocaleString());
      console.log('   SOL Balance:', data.raisedSOL);
    } else if (data.raised === 287543) {
      console.log('⚠️ API is still returning demo data');
      console.log('   Raised: $' + data.raised.toLocaleString() + ' (DEMO DATA)');
    } else {
      console.log('❌ API returned unexpected data');
      console.log('   Raised:', data.raised);
    }

    if (data.error) {
      console.log('   Error:', data.error);
    }
  } catch (error) {
    console.log('❌ API test failed:', error.message);
  }

  console.log('\n3. Testing browser endpoint...');
  console.log('   Open: http://localhost:3004/explorer/projects/coffee');
  console.log('   Check if it shows ~$352,000 raised (real data) or $287,543 (demo data)');
}

testFinalAPI();