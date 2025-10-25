// Debug presale data
const fetch = require('node-fetch')

async function debugPresale() {
  try {
    const res = await fetch('http://localhost:3001/api/presale/stats?projectId=coffee')
    const data = await res.json()

    console.log('PRESALE DATA DEBUG')
    console.log('='.repeat(50))
    console.log('raised:', data.raised)
    console.log('currentBalance.totalUSD:', data.currentBalance?.totalUSD)
    console.log('target:', data.target)
    console.log('hardCap:', data.hardCap)
    console.log()
    console.log('Calculated percentage:')
    console.log('  Using raised:', ((data.raised / data.target) * 100).toFixed(1) + '%')
    console.log('  Using currentBalance:', ((data.currentBalance?.totalUSD / data.target) * 100).toFixed(1) + '%')
    console.log()
    console.log('Full data keys:', Object.keys(data))
  } catch (error) {
    console.error('Error:', error.message)
  }
}

debugPresale()