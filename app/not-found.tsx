import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 font-mono text-[12px] px-6"
      style={{ color: 'var(--text-muted)' }}
    >
      <div
        className="font-serif leading-none"
        style={{ fontSize: 'clamp(80px, 15vw, 180px)', color: 'var(--border-strong)' }}
        aria-hidden="true"
      >
        404
      </div>
      <div className="font-serif text-[28px]" style={{ color: 'var(--text-primary)' }}>
        page not found
      </div>
      <p style={{ color: 'var(--text-faint)', maxWidth: '36ch', textAlign: 'center' }}>
        This page doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-4 py-2 rounded-md uppercase tracking-[0.12em] smooth"
          style={{ background: 'var(--accent)', color: 'var(--bg)' }}
        >
          go home
        </Link>
        <Link
          href="/projects"
          className="px-4 py-2 rounded-md uppercase tracking-[0.12em] smooth"
          style={{ border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}
        >
          browse projects
        </Link>
      </div>
    </div>
  );
}
