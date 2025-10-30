export const metadata = {
  title: "Contact – Kerem Kirici",
  description: "Get in touch with Kerem Kirici.",
};

export default function ContactPage() {
  return (
    <section className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Email me at {" "}
        <a
          href="mailto:kerem.kirici@gmail.com"
          className="underline decoration-black/30 underline-offset-4 dark:decoration-white/30"
        >
          kerem.kirici@gmail.com
        </a>
        .
      </p>
    </section>
  );
}


