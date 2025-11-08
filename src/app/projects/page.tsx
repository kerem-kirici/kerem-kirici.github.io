'use client';

import ProjectCard from '@/components/ProjectCard';
import StickyScrollContainer from '@/components/StickyScrollContainer';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { Actions, Aside, Grid, PageLayout, Section } from '@/components/layout';
import { ButtonLink } from '@/components/links';
import { Article, Heading, Tag, Text } from '@/components/texts';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const { t, lang } = useLanguage();

  const allProjects = projects(lang);

  return (
    <PageLayout title={t('projects.page_title')} description={t('projects.page_description')}>
      <Section padding="lg" container="xl">
        <div className="space-y-6">
          <Heading as="h1" size="2xl" weight="semibold" tracking="tight">
            {t('projects.title')}
          </Heading>
        </div>
        <div className="mt-8 flex flex-col gap-10 lg:clearfix lg:space-y-0 lg:block">
          <Aside
            heading={
              <div className="space-y-3">
                <Heading as="h2" size="sm" weight="semibold" tracking="tight">
                  {t('projects.what_to_expect')}
                </Heading>
                <Text size="sm" leading="relaxed" tone="muted">
                  {t('projects.what_to_expect_description')}
                </Text>
              </div>
            }
            information={
              <div>
                <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                  {t('projects.project_types')}
                </Text>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(
                    [
                      'projects.type.native_ios',
                      'projects.type.react_native',
                      'projects.type.frontend_ux',
                      'projects.type.ai_algorithms',
                      'projects.type.tooling',
                    ] as const
                  ).map((type) => (
                    <Tag key={type}>{t(type)}</Tag>
                  ))}
                </div>
              </div>
            }
          />
          <Article spacing="md" className="order-1 lg:order-none lg:pr-4">
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
          </Article>
        </div>
      </Section>

      <Section padding="md" container="xl" className="pt-0">
        <StickyScrollContainer>
          <Grid cols={{ base: 1, sm: 2 }} gap="md" className="mt-8 gap-y-10 sm:gap-y-12">
            {allProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </Grid>
        </StickyScrollContainer>
      </Section>
    </PageLayout>
  );
}
