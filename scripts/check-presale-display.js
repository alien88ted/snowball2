// Check presale display values
const fetch = require('node-fetch')

async function checkPresaleDisplay() {
  try {
    const res = await fetch('http://localhost:3000/api/presale/stats?projectId=coffee')
    const data = await res.json()

    console.log('COFFEE PROJECT STATS')
    console.log('=' .repeat(50))
    console.log('Total Raised: $' + Math.floor(data.raised / 1000) + 'K')
    console.log('  - SOL Balance:', data.raisedSOL.toFixed(2), 'SOL')
    console.log('  - SOL Value: $' + (data.raisedSOL * data.solPrice).toFixed(0))
    console.log('  - USDC Balance:', data.raisedUSDC.toFixed(0), 'USDC')
    console.log('  - Total USD: $' + data.currentBalance.totalUSD.toFixed(0))
    console.log()
    console.log('Contributors:', data.contributors)
    console.log('Transactions:', data.transactions)
    console.log('SOL Price: $' + data.solPrice)
    console.log()
    console.log('Progress: ' + ((data.raised / data.target) * 100).toFixed(0) + '% of $' + (data.target / 1000) + 'K target')
    console.log('Status:', data.raised > 0 ? '✅ WORKING' : '❌ NOT WORKING')
  } catch (error) {
    console.error('Error:', error.message)
  }
}

checkPresaleDisplay()