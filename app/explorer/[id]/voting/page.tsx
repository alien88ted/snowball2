import { notFound } from "next/navigation"
import { getProject } from "@/lib/projects"
import { ProjectVoting } from "@/components/project-voting"

export default function ProjectVotingPage({ params }: { params: { id: string } }) {
  const project = getProject(params.id)

  if (!project) {
    notFound()
  }

  return <ProjectVoting project={project} />
}
