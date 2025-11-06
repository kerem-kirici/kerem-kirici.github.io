'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { Actions, Grid, PageLayout, Section } from '@/components/layout';
import { ButtonLink } from '@/components/links';
import ProjectCard from '@/components/ProjectCard';
import StickyScrollContainer from '@/components/StickyScrollContainer';
import { Heading, Subheading, Text } from '@/components/texts';
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
    <PageLayout
      title="Kerem Kırıcı – Frontend Developer"
      description="Portfolio of Kerem Kırıcı: projects, experience, and contact information."
    >
      <Section padding="lg" container="xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="space-y-6">
            <Heading as="h1" size="2xl" weight="semibold" tracking="tight">
              {t('hero.title')}
            </Heading>
            <Subheading as="h2" size="lg" weight="semibold" tracking="tight">
              {t('hero.subtitle')}
            </Subheading>
            <Text size="lg" tone="muted" className="max-w-4xl leading-relaxed">
              {t('hero.description')}
            </Text>
            <div className="space-y-4">
              <Text size="sm" tone="subtle" className="uppercase tracking-wider">
                Let’s connect
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
          </div>

          <aside className="space-y-6 rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/70">
            <div className="space-y-3">
              <Heading as="h3" size="sm" weight="semibold" tracking="tight">
                Recent Focus
              </Heading>
              <Text size="sm" leading="relaxed" tone="muted">
                Building polished native iOS experiences and high-impact web products that ship
                fast.
              </Text>
            </div>

            <div className="space-y-4">
              <div>
                <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                  Currently working with
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
                  Availability
                </Text>
                <Text size="sm" leading="relaxed" tone="muted" className="mt-2">
                  Open to collaborations on native iOS products, complex interfaces, and high-impact
                  frontend systems.
                </Text>
              </div>

              <div>
                <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                  Collaboration style
                </Text>
                <Text size="sm" leading="relaxed" tone="muted" className="mt-2">
                  Remote-first, async-friendly teams that value craft, rigor, and shipping
                  thoughtfully.
                </Text>
              </div>
            </div>
          </aside>
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
