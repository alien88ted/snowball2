// Test the presale monitoring API with rate limiting

async function testPresaleAPI() {
  const baseUrl = 'http://localhost:3000/api/presale'

  console.log('Testing Presale Monitoring API with Rate Limiting')
  console.log('=' .repeat(50))

  try {
    // Test 1: Get wallet balance
    console.log('\n1. Testing wallet balance endpoint...')
    const walletRes = await fetch(`${baseUrl}/wallet-monitor`)
    const walletData = await walletRes.json()

    if (walletData.wallet) {
      console.log('✓ Wallet Balance:')
      console.log('  SOL:', walletData.wallet.solBalance?.toFixed(4) || 0)
      console.log('  USDC:', walletData.wallet.usdcBalance?.toFixed(2) || 0)
      console.log('  Total USD:', walletData.wallet.totalValueUSD?.toFixed(2) || 0)
    }

    // Test 2: Get metrics
    console.log('\n2. Testing metrics endpoint...')
    const metricsRes = await fetch(`${baseUrl}/wallet-monitor?metrics=true`)
    const metricsData = await metricsRes.json()

    if (metricsData.metrics) {
      const m = metricsData.metrics
      console.log('✓ Presale Metrics:')
      console.log('  Total Raised: $' + (m.totalRaised?.totalUSD?.toFixed(2) || '0'))
      console.log('  Unique Contributors:', m.uniqueContributors || 0)
      console.log('  Average Contribution: $' + (m.averageContribution?.toFixed(2) || '0'))
      console.log('  Daily Volume (24h): $' + (m.dailyVolume?.toFixed(2) || '0'))
      console.log('  Transaction Count:', m.transactionCount?.total || 0)
    }

    // Test 3: Multiple rapid requests to test rate limiting
    console.log('\n3. Testing rate limiting with rapid requests...')
    const rapidTests = []
    const testCount = 10

    console.log(`Making ${testCount} rapid requests...`)
    const startTime = Date.now()

    for (let i = 0; i < testCount; i++) {
      rapidTests.push(
        fetch(`${baseUrl}/wallet-monitor`)
          .then(r => ({ success: r.ok, status: r.status }))
          .catch(e => ({ success: false, error: e.message }))
      )
    }

    const results = await Promise.all(rapidTests)
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(1)

    const successful = results.filter(r => r.success).length
    const rateLimited = results.filter(r => r.status === 429).length

    console.log(`✓ Results in ${timeTaken}s:`)
    console.log(`  Successful: ${successful}/${testCount}`)
    console.log(`  Rate Limited (429): ${rateLimited}/${testCount}`)
    console.log(`  Average time per request: ${(timeTaken / testCount * 1000).toFixed(0)}ms`)

    if (rateLimited > 0) {
      console.log('\n⚠️  Some requests were rate limited (this is expected behavior)')
    }

    console.log('\n✅ API test completed!')

  } catch (error) {
    console.error('\n❌ Test failed:', error.message)
    console.error('\nMake sure the Next.js development server is running:')
    console.error('  npm run dev')
  }
}

// Run the test
console.log('Starting API test...\n')
testPresaleAPI().catch(console.error)