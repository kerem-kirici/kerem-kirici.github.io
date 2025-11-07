'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import ProjectDetailLayout from '@/components/projects/ProjectDetailLayout';
import { getProjectBySlug } from '@/data/projects';
import { notFound, useParams } from 'next/navigation';

export default function ProjectDetailPage() {
  const { id } = useParams();

  const { lang } = useLanguage();

  const project = getProjectBySlug(id as string, lang);

  if (!project) {
    notFound();
  }

  return <ProjectDetailLayout project={project} />;
}
