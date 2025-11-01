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
    <StickyScrollContainer>
      <Grid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="md" className="mt-6 gap-y-80 sm:gap-y-5">
        {projects(lang)
          .slice(0, 4)
          .map((p) => (
            <ProjectCard key={`${p.slug}-${lang}`} {...p} />
          ))}
      </Grid>
    </StickyScrollContainer>
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
      <Section padding="lg">
        <Heading as="h1" size="2xl" weight="semibold" tracking="tight">
          {t('hero.title')}
        </Heading>
        <Subheading as="h2" size="lg" weight="semibold" tracking="tight">
          {t('hero.subtitle')}
        </Subheading>
        <Text size="lg" tone="muted" className="mt-4 max-w-3xl">
          {t('hero.description')}
        </Text>
        <Actions gap="md" className="mt-8">
          <ButtonLink
            href="https://github.com/kerem-kirici"
            variant="outline"
            size="sm"
            newTab
            className="opacity-80 hover:opacity-100"
          >
            {t('hero.github')}
          </ButtonLink>
          <ButtonLink
            href="https://www.linkedin.com/in/kerem-kırıcı-b191711b9/"
            variant="outline"
            size="sm"
            newTab
            className="opacity-80 hover:opacity-100"
          >
            {t('hero.linkedin')}
          </ButtonLink>
          <ButtonLink
            href="mailto:kerem.kirici36@gmail.com"
            variant="outline"
            size="sm"
            className="opacity-80 hover:opacity-100"
          >
            {t('hero.cta')}
          </ButtonLink>
        </Actions>
      </Section>

      <Section padding="md" className="pb-20">
        <Heading as="h2" size="lg" weight="semibold" tracking="tight">
          {t('home.featured')}
        </Heading>
        <ProjectsComponent lang={lang} />
      </Section>
    </PageLayout>
  );
}
