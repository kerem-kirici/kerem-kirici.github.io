import { Actions } from '@/components/layout/Actions';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { ButtonLink } from '@/components/links/ButtonLink';
import ProjectCard from '@/components/ProjectCard';
import { Heading } from '@/components/texts/Heading';
import { Text } from '@/components/texts/Text';
import { projects } from '@/data/projects';

export default function Home() {
  return (
    <>
      <Section padding="lg">
        <Heading as="h1" size="2xl" weight="semibold" tracking="tight">
          Building elegant experiences with React & Next.js
        </Heading>
        <Text size="lg" tone="muted" className="mt-4 max-w-2xl">
          I’m Kerem, a frontend developer focused on crafting fast, accessible, and delightful web
          apps. Here are some projects I’ve been working on.
        </Text>
        <Actions gap="md" className="mt-8">
          <ButtonLink href="mailto:kerem.kirici36@gmail.com" variant="primary" size="sm">
            Get in touch
          </ButtonLink>
          <ButtonLink href="https://github.com/kerem-kirici" variant="outline" size="sm" newTab>
            GitHub
          </ButtonLink>
        </Actions>
      </Section>

      <Section padding="md" className="pb-20">
        <Heading as="h2" size="lg" weight="semibold" tracking="tight">
          Featured projects
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
