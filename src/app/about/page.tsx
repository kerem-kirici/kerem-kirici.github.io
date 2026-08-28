'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { Actions, Card, PageLayout } from '@/components/layout';
import { ButtonLink } from '@/components/links';
import { Section } from '@/components/layout/Section';
import { DateText, Heading, Subheading, Tag, Text } from '@/components/texts';
import { TextKey } from '@/data/Texts';

const EXPERIENCE_SLUGS = ['isbankasi', 'tatilsepeti', 'visight'] as const;

const SKILL_GROUPS: { labelKey: TextKey; skills: string[] }[] = [
  {
    labelKey: 'skills.languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'C#', 'C/C++', 'Swift', 'SQL', 'HTML', 'CSS'],
  },
  {
    labelKey: 'skills.frontend',
    skills: ['React.js', 'Next.js', 'Vue.js', 'Redux Toolkit', 'Material UI'],
  },
  { labelKey: 'skills.mobile', skills: ['React Native', 'SwiftUI', 'Combine', 'Expo', 'Flutter'] },
  { labelKey: 'skills.backend', skills: ['.NET', 'Node.js'] },
  { labelKey: 'skills.data', skills: ['MongoDB', 'PyMongo', 'SQL', 'Firebase', 'Supabase'] },
  { labelKey: 'skills.ai_ml', skills: ['TensorFlow', 'PyTorch'] },
  {
    labelKey: 'skills.tools',
    skills: [
      'Jenkins (CI/CD)',
      'Git/GitLab',
      'Agile/Scrum',
      'Swagger',
      'Automated Testing',
      'Technical Documentation',
    ],
  },
];

const CERTIFICATE_SLUGS = ['meta', 'csbridge'] as const;

const GOAL_SLUGS = ['startup', 'build', 'growth'] as const;

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <PageLayout title={t('about.page_title')} description={t('about.page_description')}>
      <Section padding="md" className="pb-0">
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

      <Section padding="md">
        <Heading as="h2" size="lg" weight="semibold" tracking="tight">
          {t('about.experience_title')}
        </Heading>
        <div className="mt-8 space-y-10 border-l border-black/10 pl-6 dark:border-white/10">
          {EXPERIENCE_SLUGS.map((slug) => (
            <div key={slug} className="relative">
              <span
                className="absolute top-2 -left-[1.85rem] h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600"
                aria-hidden
              />
              <Subheading as="h3" size="md" gutter="none" tracking="tight">
                {t(`experience.${slug}.role` as TextKey)}
              </Subheading>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <Text as="span" size="sm" weight="medium" tone="subtle">
                  {t(`experience.${slug}.company` as TextKey)}
                </Text>
                <DateText value={t(`experience.${slug}.dates` as TextKey)} />
              </div>
              <Text size="sm" leading="relaxed" tone="muted" className="mt-2 max-w-3xl">
                {t(`experience.${slug}.summary` as TextKey)}
              </Text>
              <ul className="mt-3 max-w-3xl space-y-2">
                {t(`experience.${slug}.highlights` as TextKey)
                  .split('\n')
                  .map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600"
                        aria-hidden
                      />
                      <Text size="sm" leading="relaxed" tone="subtle">
                        {highlight}
                      </Text>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section padding="md" className="pt-0">
        <Heading as="h2" size="lg" weight="semibold" tracking="tight">
          {t('about.skills_title')}
        </Heading>
        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map(({ labelKey, skills }) => (
            <div key={labelKey}>
              <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                {t(labelKey)}
              </Text>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section padding="md" className="pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <Text size="xs" tone="subtle" className="uppercase tracking-wider">
              {t('about.education_title')}
            </Text>
            <Subheading as="h3" size="sm" gutter="md" tracking="tight">
              {t('about.education.school')}
            </Subheading>
            <Text size="sm" tone="subtle" className="mt-1">
              {t('about.education.degree')}
            </Text>
            <DateText as="div" value={t('about.education.dates')} className="mt-1" />
            <Text size="sm" leading="relaxed" tone="muted" className="mt-3">
              {t('about.education.summary')}
            </Text>
          </Card>

          <Card>
            <Text size="xs" tone="subtle" className="uppercase tracking-wider">
              {t('about.certificates_title')}
            </Text>
            <div className="mt-4 space-y-5">
              {CERTIFICATE_SLUGS.map((slug) => (
                <div key={slug}>
                  <Subheading as="h3" size="sm" gutter="none" tracking="tight">
                    {t(`about.cert.${slug}.title` as TextKey)}
                  </Subheading>
                  <Text size="sm" tone="muted" className="mt-1">
                    {t(`about.cert.${slug}.issuer` as TextKey)}
                  </Text>
                  <Text size="sm" leading="relaxed" tone="subtle" className="mt-1">
                    {t(`about.cert.${slug}.detail` as TextKey)}
                  </Text>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <Text size="xs" tone="subtle" className="uppercase tracking-wider">
              {t('about.leadership_title')}
            </Text>
            <Subheading as="h3" size="sm" gutter="md" tracking="tight">
              {t('about.leadership.role')}
            </Subheading>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <Text as="span" size="sm" weight="medium" tone="subtle">
                {t('about.leadership.org')}
              </Text>
              <DateText value={t('about.leadership.dates')} />
            </div>
            <Text size="sm" leading="relaxed" tone="muted" className="mt-3">
              {t('about.leadership.text')}
            </Text>
          </Card>
        </div>
      </Section>

      <Section padding="md" className="pt-0">
        <Heading as="h2" size="lg" weight="semibold" tracking="tight">
          {t('about.goals_title')}
        </Heading>
        <Text tone="muted" leading="relaxed" className="mt-4 max-w-4xl">
          {t('about.goals_lead')}
        </Text>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {GOAL_SLUGS.map((slug) => (
            <Card key={slug}>
              <Subheading as="h3" size="sm" gutter="md" tracking="tight">
                {t(`about.goals.${slug}.title` as TextKey)}
              </Subheading>
              <Text size="sm" leading="relaxed" tone="muted" className="mt-2">
                {t(`about.goals.${slug}.text` as TextKey)}
              </Text>
            </Card>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <Text size="md" tone="subtle" leading="relaxed" className="max-w-3xl">
            {t('about.goals.cta')}
          </Text>
          <Actions gap="sm">
            <ButtonLink
              href="mailto:kerem.kirici36@gmail.com"
              variant="outline"
              size="md"
              className="shadow-sm"
            >
              {t('about.goals.get_in_touch')}
            </ButtonLink>
            <ButtonLink
              href="https://www.linkedin.com/in/kerem-kirici"
              variant="outline"
              size="md"
              newTab
            >
              {t('nav.linkedin')}
            </ButtonLink>
          </Actions>
        </div>
      </Section>
    </PageLayout>
  );
}
