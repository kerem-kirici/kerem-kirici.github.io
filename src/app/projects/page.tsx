'use client';

import ProjectCard from '@/components/ProjectCard';
import ScrollStack, { ScrollStackItem } from '@/components/StickyScrollStack';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { Actions, Aside, PageLayout, Section } from '@/components/layout';
import { ButtonLink } from '@/components/links';
import { Article, Heading, Tag, Text } from '@/components/texts';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const { t, lang } = useLanguage();

  const allProjects = projects(lang);

  return (
    <PageLayout title={t('projects.page_title')} description={t('projects.page_description')}>
      <Section padding="lg" container="xl" className="pb-0">
        <div className="space-y-6">
          <Heading as="h1" size="2xl" weight="semibold" tracking="tight">
            {t('projects.title')}
          </Heading>
        </div>
        <div className="mt-8 flex flex-col gap-10 lg:flow-root lg:space-y-0 lg:block">
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

      <Section padding="md" container="xl" className="pt-8">
        <ScrollStack useWindowScroll desktopColumns={2} topPadding="none">
          {allProjects.map((project) => (
            <ScrollStackItem key={project.slug}>
              <ProjectCard {...project} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </Section>
    </PageLayout>
  );
}
