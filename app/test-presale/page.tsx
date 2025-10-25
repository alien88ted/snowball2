"use client"

import { usePresale } from "@/hooks/use-presale"
import { getProject } from "@/lib/projects"

export default function TestPresalePage() {
  const project = getProject("coffee")
  const { data, loading, error } = usePresale("coffee", project?.presaleAddress)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Presale Data Test</h1>

      <div className="space-y-2">
        <p>Loading: {loading ? "Yes" : "No"}</p>
        <p>Error: {error || "None"}</p>
        {data && (
          <>
            <p>Raised: ${data.raised}</p>
            <p>Current Balance USD: ${data.currentBalance?.totalUSD}</p>
            <p>Contributors: {data.contributors}</p>
            <p>Target: ${data.target}</p>
            <p>Percentage: {((data.currentBalance?.totalUSD || data.raised) / data.target * 100).toFixed(1)}%</p>
          </>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-100">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}