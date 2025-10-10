import { notFound } from "next/navigation"
import { getProject } from "@/lib/projects"
import { ProjectDetailClient } from "@/components/project-detail-client"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = getProject(params.id)

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}