export const metadata = {
  title: "About – Kerem Kirici",
  description: "About Kerem Kirici, frontend developer.",
};

export default function AboutPage() {
  return (
    <section className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
        I’m Kerem, a frontend developer specializing in React and Next.js.
        I enjoy building performant, accessible, and delightful user interfaces.
      </p>
    </section>
  );
}


