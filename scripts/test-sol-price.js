// Test SOL price fetching from different sources

async function testSolPrice() {
  console.log('SOL PRICE SOURCES TEST')
  console.log('=' .repeat(50))
  console.log('Timestamp:', new Date().toISOString())
  console.log()

  // Test Jupiter
  console.log('1. Jupiter Aggregator (Primary):')
  try {
    const response = await fetch("https://price.jup.ag/v6/price?ids=SOL")
    const data = await response.json()
    const price = data?.data?.SOL?.price
    console.log('   Status:', response.ok ? 'OK' : 'Failed')
    console.log('   Price: $' + (price || 'N/A'))
    console.log('   Full response:', JSON.stringify(data, null, 2).substring(0, 200))
  } catch (error) {
    console.log('   Error:', error.message)
  }

  console.log()

  // Test CoinGecko
  console.log('2. CoinGecko (Fallback):')
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
    const data = await response.json()
    const price = data?.solana?.usd
    console.log('   Status:', response.ok ? 'OK' : 'Failed')
    console.log('   Price: $' + (price || 'N/A'))
    console.log('   Full response:', JSON.stringify(data, null, 2))
  } catch (error) {
    console.log('   Error:', error.message)
  }

  console.log()

  // Test our lib function
  console.log('3. Our fetchSolUsdPrice() function:')
  const { fetchSolUsdPrice } = require('../lib/solana')
  try {
    const price = await fetchSolUsdPrice()
    console.log('   Price: $' + price)
    console.log('   Source: ' + (price > 0 ? 'Successfully fetched' : 'Failed - returned 0'))
  } catch (error) {
    console.log('   Error:', error.message)
  }

  console.log()

  // Alternative sources (for comparison)
  console.log('4. Alternative Price Sources (for reference):')

  // Binance
  try {
    const response = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT")
    const data = await response.json()
    console.log('   Binance: $' + (parseFloat(data.price) || 'N/A'))
  } catch (error) {
    console.log('   Binance: Failed -', error.message)
  }

  // Coinbase
  try {
    const response = await fetch("https://api.coinbase.com/v2/exchange-rates?currency=SOL")
    const data = await response.json()
    const price = data?.data?.rates?.USD
    console.log('   Coinbase: $' + (price || 'N/A'))
  } catch (error) {
    console.log('   Coinbase: Failed -', error.message)
  }

  console.log()
  console.log('SUMMARY:')
  console.log('The system uses Jupiter as primary source (most accurate for Solana)')
  console.log('Falls back to CoinGecko if Jupiter is unavailable')
  console.log('Current SOL price: ~$192-195 USD')
}

testSolPrice().catch(console.error)