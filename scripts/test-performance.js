// Performance test for optimized presale monitoring

async function testPerformanceAPI() {
  const baseUrl = 'http://localhost:3008/api/presale'

  console.log('Performance Test - Optimized with 15 req/sec')
  console.log('=' .repeat(60))

  try {
    // Test 1: Wallet balance (should be fast)
    console.log('\n1. Testing wallet balance speed...')
    const walletStart = Date.now()
    const walletRes = await fetch(`${baseUrl}/wallet-monitor`)
    const walletData = await walletRes.json()
    const walletTime = Date.now() - walletStart

    console.log(`✓ Wallet fetched in ${walletTime}ms`)
    if (walletData.wallet) {
      console.log(`  Balance: $${walletData.wallet.totalValueUSD.toFixed(2)}`)
    }

    // Test 2: Full metrics (with 2000 transactions)
    console.log('\n2. Testing full metrics with transaction history...')
    const metricsStart = Date.now()
    const metricsRes = await fetch(`${baseUrl}/wallet-monitor?metrics=true`)
    const metricsData = await metricsRes.json()
    const metricsTime = Date.now() - metricsStart

    console.log(`✓ Metrics fetched in ${(metricsTime/1000).toFixed(1)}s`)
    if (metricsData.metrics) {
      console.log(`  Transactions processed: ${metricsData.metrics.transactionCount?.total || 0}`)
      console.log(`  Contributors found: ${metricsData.metrics.uniqueContributors || 0}`)
    }

    // Test 3: Contributors endpoint
    console.log('\n3. Testing contributors endpoint...')
    const contribStart = Date.now()
    const contribRes = await fetch(`${baseUrl}/contributors?projectId=coffee&limit=50`)
    const contribData = await contribRes.json()
    const contribTime = Date.now() - contribStart

    console.log(`✓ Contributors fetched in ${(contribTime/1000).toFixed(1)}s`)
    console.log(`  Top contributors: ${contribData.contributors?.length || 0}`)
    console.log(`  Total raised: $${(contribData.summary?.totalRaised || 0).toFixed(2)}`)

    // Test 4: Parallel requests (test rate limiting)
    console.log('\n4. Testing parallel requests (15 req/sec capacity)...')
    const parallelCount = 15
    const parallelStart = Date.now()

    const parallelPromises = []
    for (let i = 0; i < parallelCount; i++) {
      parallelPromises.push(
        fetch(`${baseUrl}/wallet-monitor`)
          .then(r => ({ ok: r.ok, status: r.status }))
          .catch(() => ({ ok: false, status: 0 }))
      )
    }

    const parallelResults = await Promise.all(parallelPromises)
    const parallelTime = Date.now() - parallelStart
    const successCount = parallelResults.filter(r => r.ok).length
    const rateLimitCount = parallelResults.filter(r => r.status === 429).length

    console.log(`✓ ${parallelCount} parallel requests in ${parallelTime}ms`)
    console.log(`  Successful: ${successCount}/${parallelCount}`)
    console.log(`  Rate limited: ${rateLimitCount}/${parallelCount}`)
    console.log(`  Average: ${(parallelTime/parallelCount).toFixed(0)}ms per request`)

    // Performance Summary
    console.log('\n' + '=' .repeat(60))
    console.log('PERFORMANCE SUMMARY')
    console.log('=' .repeat(60))
    console.log(`Wallet Balance:     ${walletTime}ms`)
    console.log(`Full Metrics:       ${(metricsTime/1000).toFixed(1)}s`)
    console.log(`Contributors List:  ${(contribTime/1000).toFixed(1)}s`)
    console.log(`Parallel Capacity:  ${successCount}/${parallelCount} requests`)

    const totalTime = ((walletTime + metricsTime + contribTime) / 1000).toFixed(1)
    console.log(`\nTotal Time: ${totalTime}s`)

    // Performance rating
    if (metricsTime < 5000 && contribTime < 5000) {
      console.log('\n🚀 EXCELLENT PERFORMANCE - Under 5 seconds for heavy operations')
    } else if (metricsTime < 10000 && contribTime < 10000) {
      console.log('\n✅ GOOD PERFORMANCE - Under 10 seconds for heavy operations')
    } else {
      console.log('\n⚠️  PERFORMANCE NEEDS IMPROVEMENT - Over 10 seconds for operations')
    }

    // Recommendations
    console.log('\nOptimizations Applied:')
    console.log('✓ Rate limiter: 15 requests/second (token bucket algorithm)')
    console.log('✓ Batch size: 10 parallel transactions')
    console.log('✓ Batch delay: 100ms (reduced from 300ms)')
    console.log('✓ Transaction limit: 2000 (increased from 1000)')
    console.log('✓ Parallel processing in batches')
    console.log('✓ LRU cache for transactions and contributors')

  } catch (error) {
    console.error('\n❌ Test failed:', error.message)
  }
}

// Run the test
console.log('Starting performance test...\n')
testPerformanceAPI().catch(console.error)