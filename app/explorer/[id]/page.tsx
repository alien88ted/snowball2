import { notFound } from "next/navigation"
import { getProject } from "@/lib/projects"
import { ProjectDetailEpic } from "@/components/project-detail-epic"

// Fetch presale data on the server
async function getPresaleData(projectId: string, presaleAddress?: string) {
  try {
    const params = new URLSearchParams()
    if (projectId) params.append("projectId", projectId)
    if (presaleAddress) params.append("address", presaleAddress)

    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"
    const res = await fetch(`${baseUrl}/api/presale/stats?${params}`, {
      // Cache for 30 seconds on the server
      next: { revalidate: 30 }
    })

    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Failed to fetch presale data:", error)
    return null
  }
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = getProject(params.id)

  if (!project) {
    notFound()
  }

  // Fetch presale data on the server (this will be cached)
  const presaleData = await getPresaleData(project.id, project.presaleAddress)

  return <ProjectDetailEpic project={project} initialPresaleData={presaleData} />
}