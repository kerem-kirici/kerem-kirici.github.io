'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { Actions, Grid, Section } from '@/components/layout';
import { ButtonLink } from '@/components/links';
import ProjectCard from '@/components/ProjectCard';
import { Heading, Subheading, Text } from '@/components/texts';
import { projects } from '@/data/projects';

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Section padding="lg">
        <Heading as="h1" size="2xl" weight="semibold" tracking="tight">
          {t('hero.title')}
        </Heading>
        <Subheading as="h2" size="lg" weight="semibold" tracking="tight">
          A Developer, Student, and Future iOS Pro
        </Subheading>
        <Text size="lg" tone="muted" className="mt-4 max-w-3xl">
          Hey, I&apos;m Kerem! I&apos;m a 3rd-year engineering student at ITU who also works as a
          Junior Software Developer at Tatilsepeti. It&apos;s a unique position where I get to build
          real-world features for large-scale React apps. I love building things that people find
          genuinely useful - a perspective that was really shaped by my long-term work experience in
          the U.S. While I enjoy my work in React, my true passion is mastering native iOS
          development with Swift and SwiftUI.
        </Text>
        <Actions gap="md" className="mt-8">
          <ButtonLink href="mailto:kerem.kirici36@gmail.com" variant="primary" size="sm">
            {t('hero.cta')}
          </ButtonLink>
          <ButtonLink href="https://github.com/kerem-kirici" variant="outline" size="sm" newTab>
            {t('hero.github')}
          </ButtonLink>
        </Actions>
      </Section>

      <Section padding="md" className="pb-20">
        <Heading as="h2" size="lg" weight="semibold" tracking="tight">
          {t('home.featured')}
        </Heading>
        <Grid cols={{ base: 1, sm: 2 }} gap="md" className="mt-6">
          {projects.slice(0, 4).map((p) => (
            <ProjectCard key={p.slug} {...p} href={`/project/${p.slug}`} />
          ))}
        </Grid>
      </Section>
    </>
  );
}
