// Test presale API endpoint
const fetch = require('node-fetch')

async function testPresaleAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/presale/stats?projectId=coffee&address=2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s')
    const data = await response.json()

    console.log('Presale API Response:')
    console.log('='.repeat(50))
    console.log('Raised:', data.raised)
    console.log('Raised SOL:', data.raisedSOL)
    console.log('Raised USDC:', data.raisedUSDC)
    console.log('\nCurrent Balance:')
    console.log('  SOL:', data.currentBalance?.sol)
    console.log('  USDC:', data.currentBalance?.usdc)
    console.log('  Total USD:', data.currentBalance?.totalUSD)
    console.log('\nContributors:', data.contributors)
    console.log('Transactions:', data.transactions)
    console.log('Target:', data.target)
    console.log('Hard Cap:', data.hardCap)
    console.log('SOL Price:', data.solPrice)
    console.log('\nRecent Contributions:', data.recentContributions?.length || 0)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

testPresaleAPI()