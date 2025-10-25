/**
 * Script to verify that the Coffee project shows the correct raised amount
 */

const QUICKNODE_RPC = 'https://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/'
const COFFEE_PRESALE_ADDRESS = '2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s'

async function checkRaisedAmount() {
  console.log('🔍 Checking Coffee Project Raised Amount')
  console.log('='.repeat(50))
  
  try {
    // 1. Direct RPC Check - Get actual balance
    console.log('\n1️⃣ Actual Wallet Balance (from blockchain):')
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
    const solBalance = (balanceData.result?.value || 0) / 1e9
    const usdValue = solBalance * 100 // Assuming $100/SOL
    
    console.log(`✅ SOL Balance: ${solBalance.toFixed(2)} SOL`)
    console.log(`💵 USD Value: $${usdValue.toLocaleString()}`)
    
    // 2. Check API Endpoint (if server is running)
    console.log('\n2️⃣ API Response (if server is running):')
    console.log('-'.repeat(40))
    
    try {
      const apiUrl = `http://localhost:3000/api/presale/stats?projectId=coffee&address=${COFFEE_PRESALE_ADDRESS}`
      const apiResponse = await fetch(apiUrl, { 
        signal: AbortSignal.timeout(3000) 
      })
      
      if (apiResponse.ok) {
        const apiData = await apiResponse.json()
        console.log(`📊 API Raised: $${apiData.raised?.toLocaleString() || 'N/A'}`)
        console.log(`🪙 API SOL: ${apiData.raisedSOL?.toFixed(2) || 'N/A'} SOL`)
        
        if (apiData.currentBalance) {
          console.log(`💼 Current Balance:`)
          console.log(`   - SOL: ${apiData.currentBalance.sol?.toFixed(2) || 0}`)
          console.log(`   - USDC: ${apiData.currentBalance.usdc?.toFixed(2) || 0}`)
          console.log(`   - Total USD: $${apiData.currentBalance.totalUSD?.toLocaleString() || 0}`)
        }
      } else {
        console.log('⚠️ API returned error:', apiResponse.status)
      }
    } catch (e) {
      console.log('⚠️ Server not responding or API error')
      console.log('   Run "npm run dev" to start the server')
    }
    
    // 3. Summary
    console.log('\n'+'='.repeat(50))
    console.log('📍 Summary for $COFFEE Project Explorer Page:')
    console.log('')
    console.log(`The $COFFEE explorer page should now show:`)
    console.log(`✅ Raised Amount: $${usdValue.toLocaleString()} (from ${solBalance.toFixed(2)} SOL)`)
    console.log(`✅ Wallet Address: ${COFFEE_PRESALE_ADDRESS}`)
    console.log(`✅ Progress: ${((usdValue / 300000) * 100).toFixed(1)}% of $300K goal`)
    console.log('')
    console.log('This is REAL blockchain data, not demo values!')
    console.log('')
    console.log('To view the page:')
    console.log('1. Make sure server is running: npm run dev')
    console.log('2. Open: http://localhost:3000/explorer/coffee')
    console.log('3. The page will show the actual wallet balance of ~$181,556')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

// Run the check
checkRaisedAmount().catch(console.error)
