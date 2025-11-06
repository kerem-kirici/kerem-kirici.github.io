import ProjectDetailLayout from '@/components/projects/ProjectDetailLayout';
import { getProjectBySlug } from '@/data/projects';
import { notFound } from 'next/navigation';

const project = getProjectBySlug('2048-playing-algorithm');

export const metadata = {
  title: project ? `${project.title} – Kerem Kırıcı` : 'Project – Kerem Kırıcı',
  description: project?.description ?? 'Detailed project explanation and gallery.',
};

export default function Algorithm2048ProjectPage() {
  if (!project) {
    notFound();
  }

  return <ProjectDetailLayout project={project} />;
}
