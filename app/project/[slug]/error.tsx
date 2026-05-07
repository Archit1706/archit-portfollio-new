'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 font-mono text-[12px] px-6"
      style={{ color: 'var(--text-muted)' }}
    >
      <div className="font-serif text-[48px] leading-none" style={{ color: 'var(--text-primary)' }}>
        something broke
      </div>
      <p style={{ color: 'var(--text-faint)' }}>
        {error.message || 'An unexpected error occurred loading this project.'}
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-md smooth uppercase tracking-[0.12em]"
          style={{ background: 'var(--accent)', color: 'var(--bg)' }}
        >
          try again
        </button>
        <Link
          href="/projects"
          className="px-4 py-2 rounded-md smooth uppercase tracking-[0.12em]"
          style={{ border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}
        >
          ← back to projects
        </Link>
      </div>
    </div>
  );
}
