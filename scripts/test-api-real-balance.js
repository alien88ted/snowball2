const fetch = require('node-fetch');

async function testAPI() {
  const presaleAddress = '2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s';
  const url = `http://localhost:3002/api/presale/stats?projectId=coffee&address=${presaleAddress}`;

  console.log('Testing API with public RPC...');
  console.log('URL:', url);
  console.log('---\n');

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log('Response Status:', response.status);
    console.log('\nKey Data:');
    console.log('- Raised USD: $' + (data.raised || 0).toLocaleString());
    console.log('- Raised SOL:', data.raisedSOL || 0);
    console.log('- Current Balance:', data.currentBalance);
    console.log('- Contributors:', data.contributors || 0);
    console.log('- Wallet Address:', data.walletAddress);

    if (data.error) {
      console.log('\n❌ ERROR:', data.error);
    } else if (data.raised > 0) {
      console.log('\n✅ SUCCESS! Real data is being fetched!');
      console.log('The wallet shows $' + data.raised.toLocaleString() + ' raised!');
    } else {
      console.log('\n⚠️ WARNING: Still showing $0. Check server logs for errors.');
    }
  } catch (error) {
    console.error('❌ Error calling API:', error.message);
  }
}

testAPI();