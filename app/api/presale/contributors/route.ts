import { NextResponse } from "next/server"
import { PresaleMonitoringService } from "@/lib/presale-monitoring"
import { projects } from "@/lib/projects"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get('projectId')
  const walletAddress = searchParams.get('wallet')
  const limit = parseInt(searchParams.get('limit') || '20')

  try {
    // Find the project to get its presale address
    let presaleAddress = walletAddress

    if (projectId && !walletAddress) {
      const project = projects.find(p => p.id === projectId)
      if (!project || !project.presaleAddress) {
        return NextResponse.json(
          { error: 'Project not found or no presale address' },
          { status: 404 }
        )
      }
      presaleAddress = project.presaleAddress
    }

    if (!presaleAddress) {
      return NextResponse.json(
        { error: 'No presale address provided' },
        { status: 400 }
      )
    }

    // Create monitoring service for this presale
    const monitor = new PresaleMonitoringService(presaleAddress)

    try {
      // Get top contributors with detailed stats
      const topContributors = await monitor.getTopContributors(limit)

      // Get metrics for additional context
      const metrics = await monitor.getMetrics()

      // Format response
      const response = {
        presaleAddress,
        projectId,
        contributors: topContributors.map((contributor, index) => ({
          rank: index + 1,
          address: contributor.address,
          totalContributed: contributor.totalContributed,
          transactionCount: contributor.transactionCount,
          averageAmount: contributor.averageAmount,
          firstContribution: contributor.firstContribution,
          lastContribution: contributor.lastContribution,
          percentageOfTotal: metrics.totalRaised.totalUSD > 0
            ? (contributor.totalContributed / metrics.totalRaised.totalUSD) * 100
            : 0
        })),
        summary: {
          totalContributors: metrics.uniqueContributors,
          totalRaised: metrics.totalRaised.totalUSD,
          averageContribution: metrics.averageContribution,
          medianContribution: metrics.medianContribution,
          largestContribution: metrics.largestContribution,
          distribution: metrics.contributionDistribution
        },
        timestamp: Date.now()
      }

      // Set cache headers for 60 seconds
      return NextResponse.json(response, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      })

    } finally {
      // Clean up
      monitor.dispose()
    }

  } catch (error) {
    console.error('Error fetching contributors:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch contributors',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}