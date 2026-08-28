'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { Actions, Aside, Card, Grid, PageLayout, Section } from '@/components/layout';
import { ButtonLink } from '@/components/links';
import ProjectCard from '@/components/ProjectCard';
import ScrollStack, { ScrollStackItem } from '@/components/StickyScrollStack';
import { Article, Heading, Subheading, Tag, Text } from '@/components/texts';
import { projects } from '@/data/projects';
import { TextKey } from '@/data/Texts';

const SKILL_GROUPS: { labelKey: TextKey; skills: string[] }[] = [
  { labelKey: 'skills.frontend', skills: ['Next.js', 'React', 'TypeScript', 'Vue.js'] },
  { labelKey: 'skills.backend_data', skills: ['Python', 'MongoDB', 'SQL', '.NET', 'Node.js'] },
  { labelKey: 'skills.mobile', skills: ['React Native', 'SwiftUI', 'Flutter'] },
  { labelKey: 'skills.tools', skills: ['Jenkins (CI/CD)', 'Git/GitLab', 'Agile'] },
];

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

        <div className="mt-8 flex flex-col gap-10 lg:flow-root lg:space-y-0 lg:block">
          <Aside
            heading={
              <div className="space-y-3">
                <Heading as="h3" size="sm" weight="semibold" tracking="tight">
                  {t('home.recent_focus_title')}
                </Heading>
                <Text size="sm" leading="relaxed" tone="muted">
                  {t('home.recent_focus_text')}
                </Text>
              </div>
            }
            information={
              <div className="space-y-4">
                <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                  {t('home.currently_working_with')}
                </Text>
                {SKILL_GROUPS.map(({ labelKey, skills }) => (
                  <div key={labelKey}>
                    <Text as="span" size="xs" weight="medium" tone="muted">
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
            }
            detailsClassName="lg:hidden"
            details={
              <div className="space-y-5">
                <div>
                  <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                    {t('home.current_position')}
                  </Text>
                  <Text size="sm" leading="relaxed" tone="muted" className="mt-2">
                    {t('home.current_position_text')}
                  </Text>
                </div>
                <div className="border-t border-black/10 pt-4 dark:border-white/10">
                  <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                    {t('home.availability')}
                  </Text>
                  <Text size="sm" leading="relaxed" tone="muted" className="mt-2">
                    {t('home.availability_text')}
                  </Text>
                </div>
              </div>
            }
          />

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

      {/* Desktop only: the two standing-status panels get a full-width row of
          their own rather than being stacked inside the floated aside, so every
          row below the hero shares one left edge. On smaller screens they stay
          in the aside, where the single column already lines them up. */}
      <Section padding="md" container="xl" className="hidden pt-0 lg:block">
        <Grid cols={{ base: 1, lg: 2 }} gap="lg">
          <Card>
            <Subheading as="h2" size="sm" gutter="none">
              {t('home.current_position')}
            </Subheading>
            <Text size="sm" leading="relaxed" tone="muted" className="mt-2">
              {t('home.current_position_text')}
            </Text>
          </Card>
          <Card>
            <Subheading as="h2" size="sm" gutter="none">
              {t('home.availability')}
            </Subheading>
            <Text size="sm" leading="relaxed" tone="muted" className="mt-2">
              {t('home.availability_text')}
            </Text>
          </Card>
        </Grid>
      </Section>

      <Section padding="md" container="xl" className="pt-0 pb-0">
        <Heading as="h2" size="lg" weight="semibold" tracking="tight">
          {t('home.featured')}
        </Heading>
      </Section>

      <Section padding="sm" container="xl" className="pt-0 pb-0">
        <ScrollStack useWindowScroll desktopColumns={2}>
          {projects(lang)
            .slice(0, 4)
            .map((p) => (
              <ScrollStackItem key={`${p.slug}-${lang}`}>
                <ProjectCard {...p} />
              </ScrollStackItem>
            ))}
        </ScrollStack>
      </Section>
    </PageLayout>
  );
}
