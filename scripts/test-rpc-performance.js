// Test and compare RPC endpoint performance

const { Connection, PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js')

// Test wallet (Coffee presale)
const TEST_WALLET = '2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s'

// RPC Endpoints
const ENDPOINTS = [
  {
    name: 'Helius Secure (100 req/s)',
    url: 'https://meridith-gjai0w-fast-mainnet.helius-rpc.com',
    rateLimit: 100,
    priority: 1
  },
  {
    name: 'Helius Standard (50 req/s)',
    url: 'https://mainnet.helius-rpc.com/?api-key=d2ca47fa-dd6f-4fdc-8abf-8e4fb5444c57',
    rateLimit: 50,
    priority: 2
  },
  {
    name: 'QuickNode (15 req/s)',
    url: 'https://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/',
    rateLimit: 15,
    priority: 3
  },
  {
    name: 'Public (5 req/s)',
    url: 'https://api.mainnet-beta.solana.com',
    rateLimit: 5,
    priority: 4
  }
]

// Performance test for a single endpoint
async function testEndpoint(endpoint) {
  const connection = new Connection(endpoint.url, 'confirmed')
  const publicKey = new PublicKey(TEST_WALLET)
  const results = {
    name: endpoint.name,
    rateLimit: endpoint.rateLimit,
    tests: {},
    errors: []
  }

  console.log(`\n📍 Testing ${endpoint.name}...`)

  try {
    // Test 1: Get Balance (simple)
    const balanceStart = Date.now()
    const balance = await connection.getBalance(publicKey)
    results.tests.balance = {
      latency: Date.now() - balanceStart,
      result: balance / LAMPORTS_PER_SOL
    }
    console.log(`   Balance: ${results.tests.balance.latency}ms`)

    // Test 2: Get Block Height
    const blockStart = Date.now()
    const blockHeight = await connection.getBlockHeight()
    results.tests.blockHeight = {
      latency: Date.now() - blockStart,
      result: blockHeight
    }
    console.log(`   Block Height: ${results.tests.blockHeight.latency}ms`)

    // Test 3: Get Signatures (more complex)
    const sigStart = Date.now()
    const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 })
    results.tests.signatures = {
      latency: Date.now() - sigStart,
      count: signatures.length
    }
    console.log(`   Signatures: ${results.tests.signatures.latency}ms (${signatures.length} found)`)

    // Test 4: Parse Transaction (heavy)
    if (signatures.length > 0) {
      const txStart = Date.now()
      const tx = await connection.getParsedTransaction(signatures[0].signature, {
        maxSupportedTransactionVersion: 0
      })
      results.tests.transaction = {
        latency: Date.now() - txStart,
        success: !!tx
      }
      console.log(`   Transaction: ${results.tests.transaction.latency}ms`)
    }

    // Test 5: Batch requests (rate limit test)
    console.log(`   Testing rate limit (5 rapid requests)...`)
    const batchStart = Date.now()
    const batchPromises = []
    for (let i = 0; i < 5; i++) {
      batchPromises.push(connection.getBalance(publicKey))
    }
    await Promise.all(batchPromises)
    results.tests.batch = {
      latency: Date.now() - batchStart,
      avgLatency: (Date.now() - batchStart) / 5
    }
    console.log(`   Batch (5 requests): ${results.tests.batch.latency}ms total, ${results.tests.batch.avgLatency.toFixed(0)}ms avg`)

    // Calculate average latency
    const latencies = Object.values(results.tests)
      .map(t => t.latency)
      .filter(l => l !== undefined)
    results.averageLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length

  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`)
    results.errors.push(error.message)
  }

  return results
}

// Compare all endpoints
async function compareEndpoints() {
  console.log('RPC ENDPOINT PERFORMANCE COMPARISON')
  console.log('=' .repeat(60))
  console.log(`Test Wallet: ${TEST_WALLET}`)
  console.log(`Timestamp: ${new Date().toISOString()}`)

  const results = []

  // Test each endpoint
  for (const endpoint of ENDPOINTS) {
    const result = await testEndpoint(endpoint)
    results.push(result)

    // Small delay between endpoints
    await new Promise(r => setTimeout(r, 1000))
  }

  // Display comparison
  console.log('\n' + '=' .repeat(60))
  console.log('PERFORMANCE SUMMARY')
  console.log('=' .repeat(60))

  // Sort by average latency
  results.sort((a, b) => (a.averageLatency || 9999) - (b.averageLatency || 9999))

  console.log('\n📊 Ranking by Average Latency:')
  results.forEach((r, i) => {
    const emoji = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '  '
    const latency = r.averageLatency ? `${r.averageLatency.toFixed(0)}ms` : 'Failed'
    const errors = r.errors.length > 0 ? ` (${r.errors.length} errors)` : ''
    console.log(`${emoji} ${r.name}: ${latency}${errors}`)
  })

  // Detailed comparison table
  console.log('\n📈 Detailed Metrics:')
  console.log('-'.repeat(60))
  console.log('Endpoint             | Balance | Block | Sigs  | Tx    | Batch')
  console.log('-'.repeat(60))

  results.forEach(r => {
    const name = r.name.substring(0, 20).padEnd(20)
    const balance = r.tests.balance ? `${r.tests.balance.latency}ms`.padEnd(7) : 'Failed '.padEnd(7)
    const block = r.tests.blockHeight ? `${r.tests.blockHeight.latency}ms`.padEnd(5) : 'Fail '.padEnd(5)
    const sigs = r.tests.signatures ? `${r.tests.signatures.latency}ms`.padEnd(6) : 'Fail  '.padEnd(6)
    const tx = r.tests.transaction ? `${r.tests.transaction.latency}ms`.padEnd(6) : 'N/A   '.padEnd(6)
    const batch = r.tests.batch ? `${r.tests.batch.avgLatency.toFixed(0)}ms` : 'Fail'

    console.log(`${name} | ${balance} | ${block} | ${sigs} | ${tx} | ${batch}`)
  })

  console.log('\n💡 Recommendations:')
  const fastest = results[0]
  if (fastest && fastest.averageLatency) {
    console.log(`✅ Use "${fastest.name}" for best performance (${fastest.averageLatency.toFixed(0)}ms avg)`)

    if (fastest.rateLimit >= 50) {
      console.log(`✅ High rate limit of ${fastest.rateLimit} req/s allows faster processing`)
    }
  }

  // Check if Helius is performing well
  const heliusResults = results.filter(r => r.name.includes('Helius'))
  const heliusWorking = heliusResults.some(r => r.errors.length === 0)
  if (heliusWorking) {
    console.log('✅ Helius endpoints are working correctly')
  } else {
    console.log('⚠️  Helius endpoints may need configuration')
  }

  // Rate limit comparison
  console.log('\n⚡ Rate Limit Advantages:')
  ENDPOINTS.forEach(ep => {
    const speedup = ep.rateLimit / 15 // Compare to QuickNode baseline
    if (speedup > 1) {
      console.log(`  ${ep.name}: ${speedup.toFixed(1)}x faster processing capacity`)
    }
  })

  console.log('\n✨ With Helius 100 req/s:')
  console.log('  - 1000 transactions: ~10 seconds (vs 67s at 15 req/s)')
  console.log('  - 5000 transactions: ~50 seconds (vs 333s at 15 req/s)')
  console.log('  - No rate limiting concerns')
}

// Run comparison
compareEndpoints().catch(console.error)