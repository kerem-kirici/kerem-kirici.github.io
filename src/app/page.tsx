'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { Actions, Grid, PageLayout, Section } from '@/components/layout';
import { ButtonLink } from '@/components/links';
import ProjectCard from '@/components/ProjectCard';
import StickyScrollContainer from '@/components/StickyScrollContainer';
import { Article, Heading, Subheading, Text } from '@/components/texts';
import { projects } from '@/data/projects';
import { memo } from 'react';

const ProjectsComponent = memo(({ lang }: { lang: 'en' | 'tr' }) => {
  return (
    <Grid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="md" className="mt-6 gap-y-10 sm:gap-y-20">
      {projects(lang)
        .slice(0, 4)
        .map((p) => (
          <ProjectCard key={`${p.slug}-${lang}`} {...p} />
        ))}
    </Grid>
  );
});

ProjectsComponent.displayName = 'ProjectsComponent';

export default function Home() {
  const { t, lang } = useLanguage();

  return (
    <PageLayout title={t('home.page_title')} description={t('home.page_description')}>
      <Section padding="lg" container="xl">
        <div className="space-y-6">
          <Heading as="h1" size="2xl" weight="semibold" tracking="tight">
            {t('hero.title')}
          </Heading>
          <Subheading as="h2" size="lg" weight="semibold" tracking="tight">
            {t('hero.subtitle')}
          </Subheading>
        </div>

        <div className="mt-8 flex flex-col gap-10 lg:clearfix lg:space-y-0 lg:block">
          <aside className="order-2 h-max space-y-6 rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/70 lg:order-none lg:float-right lg:ml-12 lg:w-[22rem] lg:max-w-full">
            <div className="space-y-3">
              <Heading as="h3" size="sm" weight="semibold" tracking="tight">
                {t('home.recent_focus_title')}
              </Heading>
              <Text size="sm" leading="relaxed" tone="muted">
                {t('home.recent_focus_text')}
              </Text>
            </div>

            <div className="space-y-4">
              <div>
                <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                  {t('home.currently_working_with')}
                </Text>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['SwiftUI', 'Swift', 'React', 'Next.js'].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-black/10 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                  {t('home.availability')}
                </Text>
                <Text size="sm" leading="relaxed" tone="muted" className="mt-2">
                  {t('home.availability_text')}
                </Text>
              </div>

              <div>
                <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                  {t('home.collaboration_style')}
                </Text>
                <Text size="sm" leading="relaxed" tone="muted" className="mt-2">
                  {t('home.collaboration_style_text')}
                </Text>
              </div>
            </div>
          </aside>

          <Article spacing="md" className="order-1 lg:order-none lg:pr-4">
            <Text size="lg" tone="muted" className="max-w-4xl leading-relaxed">
              {t('hero.description')}
            </Text>
            <div className="space-y-4 mt-6">
              <Text size="md" tone="subtle" className="tracking-wider">
                {t('hero.lets_connect')}
              </Text>
              <Actions gap="sm">
                <ButtonLink
                  href="mailto:kerem.kirici36@gmail.com"
                  variant="outline"
                  size="md"
                  className="shadow-sm"
                >
                  {t('hero.cta')}
                </ButtonLink>
                <ButtonLink
                  href="https://github.com/kerem-kirici"
                  variant="outline"
                  size="md"
                  newTab
                >
                  {t('hero.github')}
                </ButtonLink>
                <ButtonLink
                  href="https://www.linkedin.com/in/kerem-kırıcı-b191711b9/"
                  variant="outline"
                  size="md"
                  newTab
                >
                  {t('hero.linkedin')}
                </ButtonLink>
              </Actions>
            </div>
          </Article>
        </div>
      </Section>

      <Section padding="md" container="xl" className="pb-0">
        <StickyScrollContainer>
          <Heading as="h2" size="lg" weight="semibold" tracking="tight">
            {t('home.featured')}
          </Heading>
          <ProjectsComponent lang={lang} />
        </StickyScrollContainer>
      </Section>
    </PageLayout>
  );
}
