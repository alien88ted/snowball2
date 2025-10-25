async function testAPIEndpoint() {
  const baseUrl = 'http://localhost:3000'; // Adjust if needed
  const presaleAddress = '2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s';

  console.log('Testing API endpoint...\n');

  // Test 1: With both projectId and address
  console.log('Test 1: With projectId="coffee" and address parameter');
  try {
    const url1 = `${baseUrl}/api/presale/stats?projectId=coffee&address=${presaleAddress}`;
    console.log('URL:', url1);
    const resp1 = await fetch(url1);
    const data1 = await resp1.json();
    console.log('Response:', {
      raised: data1.raised,
      raisedSOL: data1.raisedSOL,
      currentBalance: data1.currentBalance,
      contributors: data1.contributors,
      error: data1.error
    });
  } catch (error) {
    console.error('Error:', error.message);
  }

  console.log('\n---\n');

  // Test 2: With only address
  console.log('Test 2: With only address parameter');
  try {
    const url2 = `${baseUrl}/api/presale/stats?address=${presaleAddress}`;
    console.log('URL:', url2);
    const resp2 = await fetch(url2);
    const data2 = await resp2.json();
    console.log('Response:', {
      raised: data2.raised,
      raisedSOL: data2.raisedSOL,
      currentBalance: data2.currentBalance,
      contributors: data2.contributors,
      error: data2.error
    });
  } catch (error) {
    console.error('Error:', error.message);
  }

  console.log('\n---\n');

  // Test 3: With only projectId (should return demo data)
  console.log('Test 3: With only projectId (should return demo data)');
  try {
    const url3 = `${baseUrl}/api/presale/stats?projectId=coffee`;
    console.log('URL:', url3);
    const resp3 = await fetch(url3);
    const data3 = await resp3.json();
    console.log('Response:', {
      raised: data3.raised,
      raisedSOL: data3.raisedSOL,
      currentBalance: data3.currentBalance,
      contributors: data3.contributors
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPIEndpoint().catch(console.error);