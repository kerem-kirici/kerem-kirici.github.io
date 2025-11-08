'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import ProjectDetailLayout from '@/components/projects/ProjectDetailLayout';
import { getProjectBySlug } from '@/data/projects';
import { notFound } from 'next/navigation';

export default function ProjectDetailPage() {
  const { lang } = useLanguage();

  const project = getProjectBySlug('2048-playing-algorithm', lang);

  if (!project) {
    notFound();
  }

  return <ProjectDetailLayout project={project} />;
}
