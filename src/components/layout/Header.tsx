import { TextLink } from '@/components/links/TextLink';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-8">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        Kerem Kırıcı
      </Link>
      <nav className="flex items-center gap-5 text-sm">
        <TextLink href="/" underline="never" className="opacity-80 hover:opacity-100">
          Home
        </TextLink>
        <TextLink href="/projects" underline="never" className="opacity-80 hover:opacity-100">
          Projects
        </TextLink>
        <TextLink href="/about" underline="never" className="opacity-80 hover:opacity-100">
          About
        </TextLink>
        <TextLink href="/contact" underline="never" className="opacity-80 hover:opacity-100">
          Contact
        </TextLink>
        <TextLink
          href="https://github.com/kerem-kirici"
          underline="never"
          newTab
          className="opacity-80 hover:opacity-100"
        >
          GitHub
        </TextLink>
      </nav>
    </header>
  );
}
