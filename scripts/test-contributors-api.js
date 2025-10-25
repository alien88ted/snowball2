// Test the contributors API endpoint

async function testContributorsAPI() {
  const baseUrl = 'http://localhost:3008/api/presale/contributors'

  // Test with Coffee project
  const coffeeAddress = '2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s'

  console.log('Testing Contributors API')
  console.log('=' .repeat(50))

  try {
    console.log('\nFetching top contributors for Coffee project...')
    console.log('Presale Address:', coffeeAddress)

    const response = await fetch(`${baseUrl}?projectId=coffee&wallet=${coffeeAddress}&limit=10`)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    console.log('\n✅ API Response Received!')
    console.log('\nSummary:')
    console.log('  Total Contributors:', data.summary?.totalContributors || 0)
    console.log('  Total Raised: $' + (data.summary?.totalRaised?.toFixed(2) || '0'))
    console.log('  Average Contribution: $' + (data.summary?.averageContribution?.toFixed(2) || '0'))
    console.log('  Median Contribution: $' + (data.summary?.medianContribution?.toFixed(2) || '0'))
    console.log('  Largest Contribution: $' + (data.summary?.largestContribution?.toFixed(2) || '0'))

    console.log('\nDistribution:')
    if (data.summary?.distribution) {
      const dist = data.summary.distribution
      console.log('  Under $100:', dist.under100 || 0)
      console.log('  $100-$500:', dist.from100to500 || 0)
      console.log('  $500-$1,000:', dist.from500to1000 || 0)
      console.log('  $1,000-$5,000:', dist.from1000to5000 || 0)
      console.log('  $5,000-$10,000:', dist.from5000to10000 || 0)
      console.log('  Above $10,000:', dist.above10000 || 0)
    }

    console.log('\nTop 5 Contributors:')
    const topContributors = data.contributors?.slice(0, 5) || []

    topContributors.forEach(contributor => {
      console.log(`\n  #${contributor.rank}. ${contributor.address.substring(0, 8)}...${contributor.address.slice(-6)}`)
      console.log(`      Total: $${contributor.totalContributed.toFixed(2)}`)
      console.log(`      Transactions: ${contributor.transactionCount}`)
      console.log(`      Average: $${contributor.averageAmount.toFixed(2)}`)
      console.log(`      Share: ${contributor.percentageOfTotal.toFixed(2)}%`)
    })

    if (topContributors.length === 0) {
      console.log('  No contributors found yet')
    }

    console.log('\n✅ Contributors API test successful!')
    console.log('\nYou can view the full list at:')
    console.log('http://localhost:3008/explorer/coffee')

  } catch (error) {
    console.error('\n❌ Test failed:', error.message)
    console.error('\nMake sure:')
    console.error('1. Next.js dev server is running (npm run dev)')
    console.error('2. The API endpoint is accessible')
    console.error('3. The presale monitoring service is working')
  }
}

// Wait a bit for the server to start
setTimeout(() => {
  testContributorsAPI().catch(console.error)
}, 3000)