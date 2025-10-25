// Analyze request patterns and calculate actual requests per second

class RequestAnalyzer {
  constructor() {
    this.requests = []
    this.startTime = Date.now()
  }

  logRequest(type, timestamp = Date.now()) {
    this.requests.push({ type, timestamp })
  }

  getAnalysis() {
    if (this.requests.length === 0) return null

    const endTime = Date.now()
    const duration = (endTime - this.startTime) / 1000 // in seconds

    // Group requests by second
    const requestsBySecond = {}
    const baseTime = this.requests[0].timestamp

    this.requests.forEach(req => {
      const second = Math.floor((req.timestamp - baseTime) / 1000)
      if (!requestsBySecond[second]) {
        requestsBySecond[second] = []
      }
      requestsBySecond[second].push(req)
    })

    // Calculate statistics
    const secondCounts = Object.values(requestsBySecond).map(reqs => reqs.length)
    const maxRPS = Math.max(...secondCounts)
    const avgRPS = this.requests.length / duration

    // Find bursts (seconds with > 15 requests)
    const bursts = Object.entries(requestsBySecond)
      .filter(([_, reqs]) => reqs.length > 15)
      .map(([second, reqs]) => ({
        second: parseInt(second),
        count: reqs.length,
        types: reqs.map(r => r.type)
      }))

    return {
      totalRequests: this.requests.length,
      duration: duration.toFixed(2),
      averageRPS: avgRPS.toFixed(2),
      maxRPS,
      bursts,
      requestsBySecond: Object.entries(requestsBySecond).map(([sec, reqs]) => ({
        second: parseInt(sec),
        count: reqs.length
      }))
    }
  }
}

// Simulate what happens when fetching transactions
async function simulateTransactionFetch(limit = 1000) {
  const analyzer = new RequestAnalyzer()
  console.log(`\nSimulating fetch of ${limit} transactions...`)
  console.log('=' .repeat(60))

  // Configuration
  const BATCH_SIZE = 10
  const BATCH_DELAY = 100 // ms
  const RATE_LIMIT = 15 // requests per second
  const SIGNATURES_PER_PAGE = 1000

  let totalFetched = 0
  let requestCount = 0

  // Step 1: Get signatures (pagination)
  const signaturePages = Math.ceil(limit / SIGNATURES_PER_PAGE)
  console.log(`\n1. Fetching ${signaturePages} pages of signatures...`)

  for (let page = 0; page < signaturePages; page++) {
    analyzer.logRequest('getSignatures')
    requestCount++
    await new Promise(r => setTimeout(r, 1000 / RATE_LIMIT)) // Rate limit delay
  }

  // Step 2: Fetch transaction details in batches
  console.log(`\n2. Fetching ${limit} transaction details in batches of ${BATCH_SIZE}...`)

  for (let i = 0; i < limit; i += BATCH_SIZE) {
    const batchEnd = Math.min(i + BATCH_SIZE, limit)
    const batchCount = batchEnd - i

    // Parallel requests in this batch
    const batchStart = Date.now()
    for (let j = 0; j < batchCount; j++) {
      // Random stagger 0-50ms as in our code
      const stagger = Math.random() * 50
      await new Promise(r => setTimeout(r, stagger))
      analyzer.logRequest('getTransaction')
      requestCount++
    }

    // Batch delay
    if (i + BATCH_SIZE < limit) {
      await new Promise(r => setTimeout(r, BATCH_DELAY))
    }

    // Progress
    if ((i + BATCH_SIZE) % 100 === 0) {
      console.log(`  Processed ${Math.min(i + BATCH_SIZE, limit)}/${limit} transactions...`)
    }
  }

  // Get analysis
  const analysis = analyzer.getAnalysis()

  console.log('\n' + '=' .repeat(60))
  console.log('ANALYSIS RESULTS')
  console.log('=' .repeat(60))
  console.log(`Total Requests:     ${analysis.totalRequests}`)
  console.log(`Total Duration:     ${analysis.duration}s`)
  console.log(`Average RPS:        ${analysis.averageRPS}`)
  console.log(`Peak RPS:           ${analysis.maxRPS}`)
  console.log(`Efficiency:         ${((parseFloat(analysis.averageRPS) / RATE_LIMIT) * 100).toFixed(1)}% of capacity`)

  if (analysis.bursts.length > 0) {
    console.log(`\n⚠️  BURSTS DETECTED (>${RATE_LIMIT} req/sec):`)
    analysis.bursts.forEach(burst => {
      console.log(`  Second ${burst.second}: ${burst.count} requests`)
    })
  } else {
    console.log(`\n✅ No bursts detected (all under ${RATE_LIMIT} req/sec)`)
  }

  // Request distribution graph
  console.log('\nRequest Distribution (# requests per second):')
  const maxCount = Math.max(...analysis.requestsBySecond.map(s => s.count))
  const scale = 40 / maxCount

  analysis.requestsBySecond.slice(0, 20).forEach(sec => {
    const bar = '█'.repeat(Math.floor(sec.count * scale))
    const label = `Sec ${sec.second.toString().padStart(2)}: ${sec.count.toString().padStart(2)} |`
    console.log(`${label} ${bar}`)
  })

  return analysis
}

// Calculate theoretical limits
function calculateTheoreticalLimits() {
  console.log('\n' + '=' .repeat(60))
  console.log('THEORETICAL CALCULATIONS')
  console.log('=' .repeat(60))

  const RATE_LIMIT = 15
  const BATCH_SIZE = 10
  const BATCH_DELAY = 100

  console.log('\nConfiguration:')
  console.log(`  Rate Limit:    ${RATE_LIMIT} req/sec`)
  console.log(`  Batch Size:    ${BATCH_SIZE} parallel`)
  console.log(`  Batch Delay:   ${BATCH_DELAY}ms`)

  console.log('\nFor 1000 transactions:')
  const batches1k = Math.ceil(1000 / BATCH_SIZE)
  const batchTime1k = batches1k * (BATCH_DELAY / 1000)
  const requestTime1k = 1000 / RATE_LIMIT
  const totalTime1k = Math.max(batchTime1k, requestTime1k)

  console.log(`  Batches:       ${batches1k}`)
  console.log(`  Batch Time:    ${batchTime1k.toFixed(2)}s (delays only)`)
  console.log(`  Request Time:  ${requestTime1k.toFixed(2)}s (at ${RATE_LIMIT} req/sec)`)
  console.log(`  Total Time:    ~${totalTime1k.toFixed(2)}s`)

  console.log('\nFor 2000 transactions:')
  const batches2k = Math.ceil(2000 / BATCH_SIZE)
  const batchTime2k = batches2k * (BATCH_DELAY / 1000)
  const requestTime2k = 2000 / RATE_LIMIT
  const totalTime2k = Math.max(batchTime2k, requestTime2k)

  console.log(`  Batches:       ${batches2k}`)
  console.log(`  Batch Time:    ${batchTime2k.toFixed(2)}s (delays only)`)
  console.log(`  Request Time:  ${requestTime2k.toFixed(2)}s (at ${RATE_LIMIT} req/sec)`)
  console.log(`  Total Time:    ~${totalTime2k.toFixed(2)}s`)

  console.log('\nBottleneck Analysis:')
  if (requestTime2k > batchTime2k) {
    console.log(`  ⚠️  Rate limit is the bottleneck`)
    console.log(`  Could process faster with higher rate limit`)
  } else {
    console.log(`  ⚠️  Batch delays are the bottleneck`)
    console.log(`  Could reduce batch delay to improve speed`)
  }

  console.log('\nOptimal Settings for 15 req/sec:')
  const optimalBatchSize = 15 // Match rate limit
  const optimalDelay = 50 // Minimal delay
  console.log(`  Batch Size:    ${optimalBatchSize} (match rate limit)`)
  console.log(`  Batch Delay:   ${optimalDelay}ms (minimal)`)
  console.log(`  Expected Time: ${(2000 / RATE_LIMIT).toFixed(2)}s for 2000 tx`)
}

// Main analysis
async function main() {
  console.log('REQUEST PATTERN ANALYSIS')
  console.log('=' .repeat(60))

  // Theoretical calculations
  calculateTheoreticalLimits()

  // Simulate 500 transactions
  console.log('\n' + '=' .repeat(60))
  console.log('SIMULATION: 500 TRANSACTIONS')
  await simulateTransactionFetch(500)

  // Simulate 1000 transactions
  console.log('\n' + '=' .repeat(60))
  console.log('SIMULATION: 1000 TRANSACTIONS')
  await simulateTransactionFetch(1000)

  console.log('\n' + '=' .repeat(60))
  console.log('RECOMMENDATIONS')
  console.log('=' .repeat(60))
  console.log('\n1. Current settings are conservative:')
  console.log('   - Batch size of 10 < rate limit of 15')
  console.log('   - 100ms delays add unnecessary waiting')
  console.log('\n2. To optimize further:')
  console.log('   - Increase batch size to 15')
  console.log('   - Reduce batch delay to 50ms')
  console.log('   - Remove random stagger (not needed with token bucket)')
  console.log('\n3. Why we might see overload:')
  console.log('   - Initial burst when processing batch')
  console.log('   - Token bucket refills while processing')
  console.log('   - But overall average stays under 15 req/sec')
}

// Run analysis
main().catch(console.error)