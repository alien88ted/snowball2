const { Connection, PublicKey } = require('@solana/web3.js');

const QUICKNODE_RPC = 'https://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/';
const PRESALE_ADDRESS = '2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s';

async function countUniqueContributors() {
  console.log('🔍 Counting Unique Contributors to Coffee Presale');
  console.log('='.repeat(60));
  
  try {
    const connection = new Connection(QUICKNODE_RPC, 'confirmed');
    const presalePublicKey = new PublicKey(PRESALE_ADDRESS);
    
    console.log('📊 Fetching transaction signatures...');
    const signatures = await connection.getSignaturesForAddress(
      presalePublicKey, 
      { limit: 1000 },
      'confirmed'
    );
    
    console.log(`Found ${signatures.length} total transactions`);
    
    const uniqueAddresses = new Set();
    let deposits = 0;
    let solDeposits = 0;
    let usdcDeposits = 0;
    
    console.log('\n📋 Analyzing transactions for unique contributors...');
    
    // Check first 100 transactions for unique senders
    const checkLimit = Math.min(100, signatures.length);
    for (let i = 0; i < checkLimit; i++) {
      process.stdout.write(`\rChecking transaction ${i + 1}/${checkLimit}...`);
      
      try {
        const tx = await connection.getParsedTransaction(
          signatures[i].signature,
          { commitment: 'confirmed', maxSupportedTransactionVersion: 0 }
        );
        
        if (tx && tx.meta && !tx.meta.err) {
          // Get sender address
          const sender = tx.transaction.message.accountKeys[0]?.pubkey.toString();
          
          // Find presale wallet in accounts
          const presaleIndex = tx.transaction.message.accountKeys.findIndex(
            key => key.pubkey.toString() === PRESALE_ADDRESS
          );
          
          if (presaleIndex !== -1) {
            const preBalance = tx.meta.preBalances[presaleIndex] || 0;
            const postBalance = tx.meta.postBalances[presaleIndex] || 0;
            
            // Check if it's a deposit (balance increased)
            if (postBalance > preBalance && sender && sender !== PRESALE_ADDRESS) {
              uniqueAddresses.add(sender);
              deposits++;
              solDeposits++;
            }
            
            // Check for USDC transfers
            if (tx.meta.innerInstructions) {
              for (const inner of tx.meta.innerInstructions) {
                for (const ix of inner.instructions) {
                  const parsed = ix.parsed;
                  if (parsed?.type === 'transfer' || parsed?.type === 'transferChecked') {
                    const dest = parsed.info?.destination || parsed.info?.to;
                    const source = parsed.info?.source || parsed.info?.from;
                    
                    if (dest === PRESALE_ADDRESS && source) {
                      uniqueAddresses.add(source);
                      usdcDeposits++;
                      if (solDeposits === 0) deposits++; // Don't double count
                    }
                  }
                }
              }
            }
          }
        }
      } catch (e) {
        // Skip if can't parse
      }
    }
    
    console.log('\n\n' + '='.repeat(60));
    console.log('📊 CONTRIBUTOR STATISTICS:');
    console.log('='.repeat(60));
    console.log(`✅ Unique Contributors Found: ${uniqueAddresses.size}`);
    console.log(`📈 Total Deposits Analyzed: ${deposits}`);
    console.log(`💰 SOL Deposits: ${solDeposits}`);
    console.log(`💵 USDC Deposits: ${usdcDeposits}`);
    
    // Extrapolate if we didn't check all transactions
    if (checkLimit < signatures.length) {
      const estimatedTotal = Math.floor(uniqueAddresses.size * Math.sqrt(signatures.length / checkLimit));
      console.log(`\n📊 Estimated Total Contributors (from ${signatures.length} txs): ~${estimatedTotal}`);
    }
    
    // Show sample contributors
    console.log('\n👥 Sample Contributors:');
    const sampleAddresses = Array.from(uniqueAddresses).slice(0, 5);
    sampleAddresses.forEach((addr, i) => {
      console.log(`  ${i + 1}. ${addr.slice(0, 8)}...${addr.slice(-6)}`);
    });
    
    // Test API endpoint
    console.log('\n🌐 Testing API Response:');
    try {
      const response = await fetch(`http://localhost:3000/api/presale/stats?projectId=coffee&address=${PRESALE_ADDRESS}`);
      const data = await response.json();
      console.log(`  API Contributors Count: ${data.contributors}`);
      console.log(`  API Total Raised: $${data.currentBalance?.totalUSD?.toLocaleString() || 0}`);
    } catch (e) {
      console.log('  ⚠️ API not available or error:', e.message);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

countUniqueContributors();
