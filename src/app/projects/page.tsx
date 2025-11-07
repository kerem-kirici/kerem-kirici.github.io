'use client';

import ProjectCard from '@/components/ProjectCard';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { Actions, Grid, PageLayout, Section } from '@/components/layout';
import { ButtonLink } from '@/components/links';
import { Heading, Text } from '@/components/texts';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const { t, lang } = useLanguage();

  const allProjects = projects(lang);

  return (
    <PageLayout title={t('projects.page_title')} description={t('projects.page_description')}>
      <Section padding="lg" container="xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="space-y-6">
            <Heading as="h1" size="2xl" weight="semibold" tracking="tight">
              {t('projects.title')}
            </Heading>
            <Text size="lg" tone="muted" className="max-w-4xl leading-relaxed">
              {t('projects.description')}
            </Text>
            <div className="space-y-4">
              <Text size="sm" tone="subtle" className="uppercase tracking-wider">
                {t('projects.explore_more')}
              </Text>
              <Actions gap="md">
                <ButtonLink href="/projects/pokerist" variant="primary" size="md">
                  {t('projects.view_highlighted_case')}
                </ButtonLink>
                <ButtonLink
                  href="https://github.com/kerem-kirici"
                  variant="outline"
                  size="md"
                  newTab
                >
                  {t('projects.github_profile')}
                </ButtonLink>
              </Actions>
            </div>
          </div>

          <aside className="space-y-6 rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/70">
            <div className="space-y-3">
              <Heading as="h2" size="sm" weight="semibold" tracking="tight">
                {t('projects.what_to_expect')}
              </Heading>
              <Text size="sm" leading="relaxed" tone="muted">
                {t('projects.what_to_expect_description')}
              </Text>
            </div>

            <div className="space-y-4">
              <div>
                <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                  {t('projects.project_types')}
                </Text>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full border border-black/10 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-200">
                    {t('projects.type.native_ios')}
                  </span>
                  <span className="rounded-full border border-black/10 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-200">
                    {t('projects.type.frontend_ux')}
                  </span>
                  <span className="rounded-full border border-black/10 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-200">
                    {t('projects.type.ai_algorithms')}
                  </span>
                  <span className="rounded-full border border-black/10 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-200">
                    {t('projects.type.tooling')}
                  </span>
                </div>
              </div>

              <div>
                <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                  {t('projects.collaboration')}
                </Text>
                <Text size="sm" leading="relaxed" tone="muted" className="mt-2">
                  {t('projects.collaboration_description')}
                </Text>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section padding="md" container="xl" className="pt-0">
        <Grid cols={{ base: 1, sm: 2 }} gap="md" className="mt-8 gap-y-10 sm:gap-y-12">
          {allProjects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </Grid>
      </Section>
    </PageLayout>
  );
}
