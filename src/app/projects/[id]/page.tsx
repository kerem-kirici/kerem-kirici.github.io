'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import ProjectDetailLayout from '@/components/projects/ProjectDetailLayout';
import { getProjectBySlug } from '@/data/projects';
import { notFound, useParams } from 'next/navigation';

// This function tells Next.js which "id" values to build
export async function generateStaticParams() {
  // Let's say you have 3 projects with these IDs:
  const projects = [
    { id: 'pokerist' },
    { id: 'sudokumobileapp' },
    { id: '2048-playing-algorithm' },
    { id: 'sudokugenerator' },
  ];

  // Return an array of objects, where each object has an "id" property
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectDetailPage() {
  const { id } = useParams();

  const { lang } = useLanguage();

  const project = getProjectBySlug(id as string, lang);

  if (!project) {
    notFound();
  }

  return <ProjectDetailLayout project={project} />;
}
