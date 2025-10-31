'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { Actions, Grid, PageLayout, Section } from '@/components/layout';
import { ButtonLink } from '@/components/links';
import { Heading, Subheading, Text } from '@/components/texts';
import { projects } from '@/data/projects';

export default function Home() {
  const { t } = useLanguage();

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
          {t('home.featured')} DAHA YAPILACAK
        </Heading>
        <Grid cols={{ base: 1, sm: 2 }} gap="md" className="mt-6">
          {projects.slice(0, 4).map((p) => (
            //<ProjectCard key={p.slug} {...p} href={`/project/${p.slug}`} />
            <div key={p.slug}>{p.title}</div>
          ))}
        </Grid>
      </Section>
    </PageLayout>
  );
}
