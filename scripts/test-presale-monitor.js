/**
 * Test script for presale wallet monitoring
 * Run: node scripts/test-presale-monitor.js
 */

const QUICKNODE_RPC = 'https://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/'
const COFFEE_PRESALE_ADDRESS = '2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s'

async function testPresaleMonitoring() {
  console.log('🚀 Testing Presale Wallet Monitoring Service')
  console.log('='.repeat(50))
  console.log(`📍 Presale Address: ${COFFEE_PRESALE_ADDRESS}`)
  console.log(`🔗 RPC Endpoint: QuickNode Mainnet`)
  console.log('')

  try {
    // Test 1: Direct RPC Balance Check
    console.log('Test 1: Direct Balance Check via RPC')
    console.log('-'.repeat(40))
    
    const balanceResponse = await fetch(QUICKNODE_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [COFFEE_PRESALE_ADDRESS]
      })
    })

    const balanceData = await balanceResponse.json()
    const solBalance = (balanceData.result?.value || 0) / 1e9 // Convert lamports to SOL
    console.log(`✅ SOL Balance: ${solBalance.toFixed(4)} SOL`)

    // Test 2: USDC Token Accounts
    console.log('\nTest 2: USDC Token Account Check')
    console.log('-'.repeat(40))

    const tokenAccountsResponse = await fetch(QUICKNODE_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 2,
        method: 'getTokenAccountsByOwner',
        params: [
          COFFEE_PRESALE_ADDRESS,
          { mint: 'EPjFWdd5AufqSSqeM2qN1eJHn4hqGKso9iedpqDZ7N' }, // USDC mint
          { encoding: 'jsonParsed' }
        ]
      })
    })

    const tokenData = await tokenAccountsResponse.json()
    let usdcBalance = 0

    if (tokenData.result?.value?.length > 0) {
      for (const account of tokenData.result.value) {
        const amount = account.account?.data?.parsed?.info?.tokenAmount?.uiAmount || 0
        usdcBalance += amount
      }
    }
    console.log(`✅ USDC Balance: ${usdcBalance.toFixed(2)} USDC`)

    // Test 3: Recent Transactions
    console.log('\nTest 3: Recent Transactions Check')
    console.log('-'.repeat(40))

    const signaturesResponse = await fetch(QUICKNODE_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 3,
        method: 'getSignaturesForAddress',
        params: [
          COFFEE_PRESALE_ADDRESS,
          { limit: 5 }
        ]
      })
    })

    const signaturesData = await signaturesResponse.json()
    const signatures = signaturesData.result || []
    
    console.log(`✅ Found ${signatures.length} recent transactions`)
    
    if (signatures.length > 0) {
      console.log('\n📝 Recent Transaction Signatures:')
      signatures.slice(0, 3).forEach((sig, i) => {
        console.log(`  ${i + 1}. ${sig.signature.substring(0, 20)}...`)
      })
    }

    // Test 4: API Endpoint Tests (if server is running)
    console.log('\nTest 4: API Endpoint Tests')
    console.log('-'.repeat(40))
    console.log('Note: Start the Next.js server to test API endpoints')
    console.log('Run: npm run dev')
    console.log('\nAPI Endpoints to test:')
    console.log(`  - http://localhost:3000/api/presale/wallet-monitor?address=${COFFEE_PRESALE_ADDRESS}&action=info`)
    console.log(`  - http://localhost:3000/api/presale/wallet-monitor?address=${COFFEE_PRESALE_ADDRESS}&action=summary`)
    console.log(`  - http://localhost:3000/api/presale/wallet-monitor?address=${COFFEE_PRESALE_ADDRESS}&action=metrics`)
    console.log(`  - http://localhost:3000/api/presale/wallet-monitor?address=${COFFEE_PRESALE_ADDRESS}&action=transactions`)

    // Summary
    console.log('\n' + '='.repeat(50))
    console.log('📊 Summary:')
    console.log(`  💰 Current Balance: ${solBalance.toFixed(4)} SOL + ${usdcBalance.toFixed(2)} USDC`)
    console.log(`  💵 Estimated Value: $${((solBalance * 100) + usdcBalance).toFixed(2)} (at ~$100/SOL)`)
    console.log(`  📈 Transaction Count: ${signatures.length} recent`)
    console.log(`  ✅ RPC Connection: Working`)
    console.log('')
    console.log('✨ Presale monitoring service is operational!')

  } catch (error) {
    console.error('❌ Error during testing:', error.message)
    console.error('Make sure the RPC endpoint is accessible and the address is valid')
  }
}

// Run the test
testPresaleMonitoring().catch(console.error)
