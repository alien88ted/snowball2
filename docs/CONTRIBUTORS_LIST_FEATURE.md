# Contributors List Feature

## Overview
Added a comprehensive contributors list to the explorer project detail pages, showing all wallet addresses and contribution amounts for presale participants.

## Components Created

### 1. API Endpoint
**File**: `/app/api/presale/contributors/route.ts`
- Fetches top contributors for any presale address
- Returns detailed contributor statistics
- Includes contribution distribution analysis
- 60-second cache for performance

### 2. Contributors List Component
**File**: `/components/contributions-list.tsx`
- Displays ranked list of all contributors
- Shows wallet addresses with copy functionality
- Links to Solscan for each address
- Displays contribution amounts and percentages
- Includes distribution statistics
- Expandable list (shows top 10, can expand to show all)

### 3. Integration
**File**: `/components/project-detail-client.tsx`
- Added ContributionsList component to project detail pages
- Displays after the tokenomics section

## Features

### Contributor Information
- **Rank**: Position based on contribution amount (with special badges for top 3)
- **Address**: Wallet address (truncated with copy button)
- **Total Contributed**: USD amount contributed
- **Transaction Count**: Number of separate contributions
- **Last Contribution**: Time since last contribution
- **Percentage**: Share of total raised
- **Solscan Link**: Direct link to view wallet on blockchain explorer

### Summary Statistics
- Total Contributors
- Average Contribution
- Median Contribution
- Largest Contribution
- Distribution across contribution ranges:
  - Under $100
  - $100-$500
  - $500-$1,000
  - $1,000-$5,000
  - $5,000-$10,000
  - Above $10,000

## Example Output

For the Coffee project presale:
- **18 total contributors**
- **$552,252.44 total raised**
- **Top contributor**: $932,817.28 (168.91% of total)
- **Median contribution**: $1,824.23
- **Distribution**: Most contributors (7) above $10,000

## Visual Design

- **Black border design** matching the site's aesthetic
- **Top 3 contributors** get special styling:
  - #1: Gold badge with trophy icon
  - #2: Silver badge
  - #3: Bronze badge
- **Hover effects** on rows for better UX
- **Responsive layout** works on all screen sizes
- **Distribution chart** with grid layout

## Performance Optimizations

### Rate Limiting
- Reduced batch size from 20 to 5 transactions
- Added 50ms delay between transaction fetches
- 300ms delay between batches
- 5 requests/second rate limit

### Caching
- 60-second API response cache
- LRU cache for transactions (10,000 limit)
- LRU cache for contributors (5,000 limit)

## Usage

The contributors list automatically appears on any project detail page:

1. Navigate to `/explorer/[project-id]`
2. Scroll down past the tokenomics section
3. View the full contributors list
4. Click "Show All" to expand beyond top 10
5. Copy addresses or view on Solscan

## API Usage

```javascript
// Fetch contributors for a presale
fetch('/api/presale/contributors?projectId=coffee&limit=20')

// Response format
{
  contributors: [
    {
      rank: 1,
      address: "CreQJ2t9...",
      totalContributed: 932817.28,
      transactionCount: 2,
      averageAmount: 466408.64,
      percentageOfTotal: 168.91
    }
  ],
  summary: {
    totalContributors: 18,
    totalRaised: 552252.44,
    averageContribution: 114769.28,
    medianContribution: 1824.23,
    largestContribution: 932817.28,
    distribution: {
      under100: 0,
      from100to500: 3,
      from500to1000: 3,
      from1000to5000: 4,
      from5000to10000: 1,
      above10000: 7
    }
  }
}
```

## Testing

Test the feature:
```bash
# Test API endpoint
node scripts/test-contributors-api.js

# View in browser
http://localhost:3008/explorer/coffee
```

## Benefits

1. **Transparency**: Shows all contributors publicly
2. **Social Proof**: Displays participation levels
3. **Analytics**: Contribution distribution insights
4. **Trust**: Verifiable on-chain data
5. **Competition**: Gamification with rankings

## Future Enhancements

1. **Real-time Updates**: WebSocket for live contributions
2. **Filtering**: Filter by date range or amount
3. **Export**: CSV download of contributor data
4. **Charts**: Visual charts for distribution
5. **ENS/SNS**: Resolve wallet names
6. **Badges**: Special badges for early contributors