'use client';

import { useState } from 'react';

interface Question {
  q: string;
  a: { label: string; response: string }[];
}

const QUESTIONS: Question[] = [
  {
    q: 'If an algorithm is equally unfair to everyone, is it just?',
    a: [
      {
        label: 'Equal harm is still harm',
        response:
          'Exactly. Uniform unfairness isn\'t fairness — it\'s equal damage. Most systems hide behind averages to avoid this question entirely. You didn\'t.',
      },
      {
        label: 'Equal treatment is a start',
        response:
          'A fair instinct. But uniformity and justice are different things. You just touched the core tension in every fairness metric ever invented.',
      },
    ],
  },
  {
    q: 'Would you trust an AI that\'s right 99.7% of the time — if the 0.3% always came from the same group?',
    a: [
      {
        label: 'Never',
        response:
          'You caught the distribution problem. Statistical accuracy can mask systemic exclusion. That instinct is rarer than it should be.',
      },
      {
        label: 'Depends on the stakes',
        response:
          'Nuanced. Context-dependence is exactly what most AI systems lack. You\'re thinking like an ethicist, not just a user.',
      },
    ],
  },
  {
    q: 'If code reflects its creator\'s blind spots — what do you think AI is most blind to right now?',
    a: [
      {
        label: 'Human judgment',
        response:
          'Judgment, with all its mess, may be what separates accountability from automation. You\'re right to miss it in the systems you use.',
      },
      {
        label: 'Lived experience',
        response:
          'Data is a shadow of experience, not experience itself. The gap between them is where most models quietly fail the people they\'re supposed to help.',
      },
    ],
  },
  {
    q: 'Is it possible to build a truly neutral system?',
    a: [
      {
        label: 'No — neutrality is a myth',
        response:
          'Correct, and rare to say out loud. Every system encodes values. The question isn\'t whether — it\'s whose, and whether you\'re honest about it.',
      },
      {
        label: 'Yes, with enough data',
        response:
          'More data doesn\'t remove bias — it can amplify it. But the belief that objectivity is achievable drives some of the best research in the field. Hold onto that ambition.',
      },
    ],
  },
  {
    q: 'When does a pattern become a prejudice?',
    a: [
      {
        label: 'When it\'s applied to individuals',
        response:
          'That\'s the exact line. Statistical patterns about groups applied to individuals — that\'s where probability and prejudice quietly converge. You found it.',
      },
      {
        label: 'When it causes harm',
        response:
          'Harm-first thinking. You\'d make a good AI ethicist. Most systems don\'t ask "who does this hurt" until it\'s far too late.',
      },
    ],
  },
  {
    q: 'At what scale does optimization become exploitation?',
    a: [
      {
        label: 'When it ignores the individual',
        response:
          'Scale makes it easy to stop seeing people as people. You identified the exact moment a system stops serving and starts extracting.',
      },
      {
        label: 'When someone profits without consent',
        response:
          'Consent and transparency — the two things that distinguish a tool from a trap. Most products never ask themselves this.',
      },
    ],
  },
  {
    q: 'What would it mean for an AI to truly understand you?',
    a: [
      {
        label: 'It would feel it, not just predict it',
        response:
          'That gap — between prediction and understanding — is what separates a model from a mind. You sensed something philosophers have argued about for decades.',
      },
      {
        label: 'It would know what I\'d regret',
        response:
          'Regret requires a self, a future, a past. The fact that you thought of it that way says more about your self-awareness than any model could.',
      },
    ],
  },
  {
    q: 'What makes you pause before trusting a system you can\'t explain?',
    a: [
      {
        label: 'Who answers when it\'s wrong?',
        response:
          'Accountability. Explainability isn\'t just technical elegance — it\'s the foundation of responsibility. That question is the one most auditors never ask.',
      },
      {
        label: 'Intuition — something feels off',
        response:
          'That instinct is valid data. Human uncertainty in the face of opacity is a feature, not a bug. Don\'t let anyone optimize it away.',
      },
    ],
  },
];

const DONE_MESSAGE =
  'You just sat with questions most engineers skip entirely. The discomfort, the nuance, the refusal to pick the easy answer — that\'s not just curiosity. That\'s the kind of thinking that makes systems more human.';

export function CuriositySpark() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);

  const current = QUESTIONS[idx];

  function handleAnswer(choiceIdx: number) {
    setAnswered(choiceIdx);
  }

  function handleNext() {
    if (idx >= QUESTIONS.length - 1) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setAnswered(null);
    }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-6 font-mono"
      style={{ zIndex: 60 }}
    >
      {/* Panel */}
      {open && (
        <div
          className="mb-2 rounded-xl overflow-hidden"
          style={{
            background: 'var(--bg-elev)',
            border: '1px solid var(--border-strong)',
            width: 300,
            boxShadow: 'var(--shadow-glass)',
            animation: 'spark-in 0.35s cubic-bezier(0.23,1,0.32,1) both',
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center justify-between border-b text-[11px] uppercase tracking-[0.18em]"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            <span>curiosity</span>
            {!done && (
              <span style={{ color: 'var(--text-faint)' }}>
                {idx + 1} / {QUESTIONS.length}
              </span>
            )}
          </div>

          <div className="p-4">
            {done ? (
              /* Completion state */
              <div>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center mb-3 text-[13px]"
                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                >
                  ✦
                </div>
                <p
                  className="text-[13px] leading-relaxed font-sans mb-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {DONE_MESSAGE}
                </p>
                <button
                  onClick={() => { setVisible(false); }}
                  className="w-full text-[10px] uppercase tracking-[0.18em] py-2 rounded smooth"
                  style={{
                    border: '1px solid var(--border-strong)',
                    color: 'var(--text-faint)',
                  }}
                >
                  close
                </button>
              </div>
            ) : answered !== null ? (
              /* Answer shown */
              <div style={{ animation: 'spark-in 0.3s cubic-bezier(0.23,1,0.32,1) both' }}>
                <div
                  className="text-[10px] uppercase tracking-[0.18em] mb-2 px-2 py-1 rounded inline-block"
                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                >
                  {current.a[answered].label}
                </div>
                <p
                  className="text-[13px] leading-relaxed font-sans mt-3 mb-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {current.a[answered].response}
                </p>
                <button
                  onClick={handleNext}
                  className="w-full text-[11px] uppercase tracking-[0.14em] py-2 rounded smooth"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                  }}
                  data-hover
                >
                  {idx >= QUESTIONS.length - 1 ? 'finish' : 'next question →'}
                </button>
              </div>
            ) : (
              /* Question state */
              <div>
                {/* Progress dots */}
                <div className="flex gap-1 mb-4">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className="rounded-full smooth"
                      style={{
                        width: i === idx ? 14 : 5,
                        height: 5,
                        background: i < idx
                          ? 'var(--accent)'
                          : i === idx
                          ? 'var(--accent)'
                          : 'var(--border-strong)',
                        opacity: i <= idx ? 1 : 0.4,
                      }}
                    />
                  ))}
                </div>

                <p
                  className="font-serif text-[17px] leading-snug mb-5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {current.q}
                </p>

                <div className="space-y-2">
                  {current.a.map((choice, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-[12px] smooth"
                      style={{
                        border: '1px solid var(--border-strong)',
                        color: 'var(--text-primary)',
                        background: 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-strong)';
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
                      }}
                      data-hover
                    >
                      {choice.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] uppercase tracking-[0.18em] smooth"
        style={{
          background: open ? 'var(--accent-soft)' : 'var(--bg-elev)',
          border: `1px solid ${open ? 'var(--accent)' : 'var(--border-strong)'}`,
          color: open ? 'var(--accent)' : 'var(--text-muted)',
        }}
        aria-label={open ? 'Close curiosity panel' : 'Open curiosity questions'}
        aria-expanded={open}
        data-hover
      >
        <span
          className="text-[13px]"
          style={{
            display: 'inline-block',
            animation: open ? 'none' : 'spark-pulse 2.5s ease-in-out infinite',
            color: open ? 'var(--accent)' : 'inherit',
          }}
        >
          ✦
        </span>
        {open ? 'close' : 'spark'}
      </button>
    </div>
  );
}
