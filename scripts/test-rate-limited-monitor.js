const { PresaleMonitoringService } = require('../lib/presale-monitoring.ts')

async function testRateLimitedMonitoring() {
  console.log('Testing presale monitoring with rate limiting...')
  console.log('=' .repeat(50))

  const monitor = new PresaleMonitoringService()

  try {
    console.log('\n1. Testing wallet info (with rate limiting)...')
    const walletInfo = await monitor.getWalletInfo()
    console.log('✓ Wallet Balance:', {
      sol: walletInfo.solBalance.toFixed(4),
      usdc: walletInfo.usdcBalance.toFixed(2),
      totalUSD: walletInfo.totalValueUSD.toFixed(2)
    })

    console.log('\n2. Fetching limited transactions (100 max)...')
    const startTime = Date.now()
    const transactions = await monitor.getAllTransactions(100)
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(1)

    console.log(`✓ Fetched ${transactions.length} transactions in ${timeTaken}s`)
    console.log('  Average time per transaction:', (timeTaken / transactions.length * 1000).toFixed(0) + 'ms')

    // Show recent transactions
    const recentTxs = transactions.slice(0, 5)
    console.log('\n3. Recent transactions:')
    recentTxs.forEach((tx, i) => {
      console.log(`  ${i + 1}. ${tx.type.toUpperCase()}: ${tx.amount.toFixed(4)} ${tx.token} ($${tx.usdValue.toFixed(2)})`)
      console.log(`     From: ${tx.from.substring(0, 8)}...`)
      console.log(`     Time: ${new Date(tx.timestamp).toLocaleString()}`)
    })

    console.log('\n4. Getting metrics (with cache)...')
    const metricsStart = Date.now()
    const metrics = await monitor.getMetrics()
    const metricsTime = ((Date.now() - metricsStart) / 1000).toFixed(1)

    console.log(`✓ Metrics fetched in ${metricsTime}s`)
    console.log('\nPresale Metrics:')
    console.log('  Total Raised:', `$${metrics.totalRaised.totalUSD.toFixed(2)}`)
    console.log('  Unique Contributors:', metrics.uniqueContributors)
    console.log('  Average Contribution:', `$${metrics.averageContribution.toFixed(2)}`)
    console.log('  Median Contribution:', `$${metrics.medianContribution.toFixed(2)}`)
    console.log('  Daily Volume (24h):', `$${metrics.dailyVolume.toFixed(2)}`)
    console.log('  Weekly Volume (7d):', `$${metrics.weeklyVolume.toFixed(2)}`)

    console.log('\n  Contribution Distribution:')
    console.log('    < $100:', metrics.contributionDistribution.under100)
    console.log('    $100-500:', metrics.contributionDistribution.from100to500)
    console.log('    $500-1000:', metrics.contributionDistribution.from500to1000)
    console.log('    $1000-5000:', metrics.contributionDistribution.from1000to5000)
    console.log('    $5000-10000:', metrics.contributionDistribution.from5000to10000)
    console.log('    > $10000:', metrics.contributionDistribution.above10000)

    console.log('\n5. Testing cache performance...')
    const cacheStart = Date.now()
    const cachedMetrics = await monitor.getMetrics() // Should be from cache
    const cacheTime = Date.now() - cacheStart

    console.log(`✓ Cached metrics retrieved in ${cacheTime}ms`)

    const cacheStats = monitor.getCacheStats()
    console.log('\nCache Statistics:')
    console.log('  Transaction Cache Size:', cacheStats.transactionCacheSize)
    console.log('  Contributor Cache Size:', cacheStats.contributorCacheSize)
    console.log('  Last Update:', new Date(cacheStats.lastMetricsUpdate).toLocaleTimeString())

    console.log('\n✅ All tests completed successfully!')
    console.log('Rate limiting is working - no 429 errors encountered.')

  } catch (error) {
    console.error('\n❌ Test failed:', error.message)

    if (error.message.includes('429')) {
      console.error('Still getting rate limited. Consider:')
      console.error('1. Reducing batch size further')
      console.error('2. Increasing delays between requests')
      console.error('3. Using a different RPC endpoint')
      console.error('4. Upgrading QuickNode plan for higher limits')
    }
  } finally {
    // Clean up
    monitor.dispose()
  }
}

// Run the test
testRateLimitedMonitoring().catch(console.error)