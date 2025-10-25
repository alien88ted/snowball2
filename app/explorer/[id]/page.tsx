import { notFound } from "next/navigation"
import { getProject } from "@/lib/projects"
import { ProjectDetailMatched } from "@/components/project-detail-matched"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = getProject(params.id)

  if (!project) {
    notFound()
  }

  return <ProjectDetailMatched project={project} />
}