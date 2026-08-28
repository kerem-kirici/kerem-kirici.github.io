'use client';

import { Aside, PageLayout, Section } from '@/components/layout';
import { ButtonLink } from '@/components/links';
import {
  Article,
  DateText,
  Heading,
  ImageComponent,
  Subheading,
  Tag,
  Text,
} from '@/components/texts';
import type { Project } from '@/data/projects';
import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageProvider';

type ProjectDetailLayoutProps = {
  project: Project;
};

function splitParagraphs(text: string) {
  return text
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function ProjectDetailLayout({ project }: ProjectDetailLayoutProps) {
  const { t } = useLanguage();

  const paragraphs = splitParagraphs(project.long_explanation);

  const [isXSmallScreen, setIsXSmallScreen] = useState(false);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsXSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <PageLayout title={project.title} description={project.description}>
      <Section padding="lg" container="xl">
        <div className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <Heading as="h1" size="xl" weight="semibold" tracking="tight">
              {project.title}
            </Heading>
            <DateText value={project.date} />
          </div>
          <Subheading as="h2" size="md" weight="semibold" tracking="tight">
            {project.description}
          </Subheading>
        </div>
        <div className="mt-8 flex flex-col gap-10 lg:flow-root lg:space-y-0 lg:block">
          <Aside
            heading={
              <div className="space-y-3">
                <Heading as="h2" size="sm" weight="semibold" tracking="tight">
                  {t('projects.project_snapshot')}
                </Heading>
                <div>
                  <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                    {t('projects.tech_stack')}
                  </Text>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Tag key={`aside-${tag}`}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            }
            information={
              <div className="space-y-4">
                <div>
                  <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                    {t('projects.repository')}
                  </Text>
                  <ButtonLink
                    href={project.githubUrl}
                    variant="outline"
                    tone="inverse"
                    newTab
                    size="md"
                    className="mt-2 w-full"
                  >
                    {t('projects.view_on_github')}
                  </ButtonLink>
                </div>
              </div>
            }
            details={
              !isXSmallScreen ? (
                <div className="break-words">
                  <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                    {t('projects.share')}
                  </Text>
                  <div className="mt-2 space-y-2 text-sm text-zinc-600 break-words dark:text-zinc-300">
                    <p>{t('projects.copy_link_to_share_description')}</p>
                    <div className="relative">
                      <code className="block rounded-lg bg-zinc-100 px-3 py-2 pr-10 text-xs font-medium text-zinc-700 break-words dark:bg-zinc-800 dark:text-zinc-200">
                        {`https://kerem-kirici.github.io${project.href}`}
                      </code>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `https://kerem-kirici.github.io${project.href}`,
                          );
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
                        aria-label="Copy link"
                      >
                        {copied ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : undefined
            }
          />
          <Article spacing="md" className="order-1 lg:order-none lg:pr-4">
            {paragraphs.map((paragraph, index) => (
              <Text key={index} size="lg" leading="relaxed" tone="subtle" preserveNewlines>
                {paragraph}
              </Text>
            ))}
          </Article>
        </div>
      </Section>

      {project.gallery.length > 0 && (
        <Section padding="md" container="xl" className="pb-0">
          <div className="space-y-5">
            <Heading as="h2" size="lg" weight="semibold" tracking="tight">
              {t('projects.gallery')}
            </Heading>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map(([imageSrc, orientation], index) => (
                <ImageComponent
                  key={`${imageSrc}-${orientation}`}
                  src={imageSrc}
                  alt={t('projects.gallery_image_alt', {
                    title: project.title,
                    index: String(index + 1),
                    orientation: t(
                      orientation === 'portrait' ? 'orientation.portrait' : 'orientation.landscape',
                    ),
                  })}
                  ratio={orientation === 'portrait' ? '3/4' : '4/3'}
                  rounded="2xl"
                  shadow="md"
                  hover
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ))}
            </div>
          </div>
        </Section>
      )}
    </PageLayout>
  );
}
