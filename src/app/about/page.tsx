export const metadata = {
  title: 'About – Kerem Kırıcı',
  description: 'About Kerem Kırıcı, frontend developer.',
};

import { Section } from '@/components/layout/Section';
import { Heading, Subheading, Text } from '@/components/texts';

export default function AboutPage() {
  return (
    <Section padding="md">
      <Heading as="h1" size="xl" weight="semibold" tracking="tight">
        About
      </Heading>
      <Subheading gutter="md" muted>
        Software Developer, Student, and Future iOS Pro
      </Subheading>
      <Text tone="muted" className="mt-4 max-w-4xl">
        Hello, I&apos;m Kerem Kırıcı. Thanks for stopping by. I&apos;m a software developer and a
        3rd-year Electronics and Communication Engineering student at ITU. I&apos;m the kind of
        person who thrives on solving complex problems, which has led me to a unique and challenging
        opportunity. <br /> <br /> My path has also given me a broad perspective. From a long-term
        stay working in the U.S. service industry, I learned invaluable lessons about communication,
        adaptability, and understanding user needs, skills I bring to every tech project I tackle.
        <br /> <br />
        While still completing my degree, I&apos;ve earned a role as a Junior Software Developer at
        Tatilsepeti, one of Turkey&apos;s major tech companies. This position has been a significant
        step beyond a typical internship; I independently develop and maintain frontend features for
        a large-scale Next.js and React.js control panel that serves over 500 hotel partners.
        Balancing this high-impact role with my studies has proven my ability to manage advanced
        responsibilities and deliver in a professional, agile environment. <br /> <br /> My
        experience at Tatilsepeti and my personal projects have given me a strong foundation in
        React, React Native, and full-stack development. However, my true passion is now firmly set
        on native iOS development. <br /> <br /> This is why I&apos;m actively steering my career in
        this direction. To build a strong foundation, I&apos;ve dedicated myself to mastering the
        Apple ecosystem. I recently earned a META &quot;Create the User Interface with SwiftUI&quot;
        certificate and immediately applied these new skills by building &apos;pokerist&apos;, a
        native iOS application from the ground up. This project was my hands-on way to move from
        theory to a complex, functional product. It&apos;s a powerful Texas Hold&apos;em hand
        analyzer that calculates win probabilities against up to 6 opponents by running a
        10,000-game Monte Carlo simulation asynchronously. To build it, I implemented a clean MVVM
        architecture, managed reactive state with SwiftUI and Combine, and designed a modern
        &apos;liquid glass&apos; UI that fully supports light and dark modes. <br /> <br /> I am
        excited and prepared to bring my proven discipline from the web world, and my user-focused
        perspective, to a full-time role where I can grow as a Swift and SwiftUI developer.
      </Text>
    </Section>
  );
}
