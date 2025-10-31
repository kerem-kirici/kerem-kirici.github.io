'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { PageLayout } from '@/components/layout';
import { Section } from '@/components/layout/Section';
import { Heading, Subheading, Text } from '@/components/texts';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <PageLayout title="About – Kerem Kırıcı" description="About Kerem Kırıcı, frontend developer.">
      <Section padding="md">
        <Heading as="h1" size="xl" weight="semibold" tracking="tight">
          {t('about.title')}
        </Heading>
        <Subheading gutter="md" muted>
          {t('about.subtitle')}
        </Subheading>
        <Text tone="muted" className="mt-4 max-w-4xl" preserveNewlines>
          {t('about.description')}
        </Text>
      </Section>
    </PageLayout>
  );
}
