// Inline Lucide-style icons (MIT). Stroke, rounded, 24x24.
const Ico = (d, extra = null) => (props) => {
  const { size = 18, stroke = 1.6, className = '', ...rest } = props || {};
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {typeof d === 'string' ? <path d={d} /> : d}
      {extra}
    </svg>
  );
};

const IconArrowRight = Ico('M5 12h14M13 6l6 6-6 6');
const IconArrowUpRight = Ico('M7 17L17 7M8 7h9v9');
const IconArrowDown = Ico('M12 5v14M5 12l7 7 7-7');
const IconGithub = Ico(
  <>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </>
);
const IconLinkedin = Ico(
  <>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </>
);
const IconMail = Ico(
  <>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 5L2 7" />
  </>
);
const IconCopy = Ico(
  <>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </>
);
const IconCheck = Ico('M20 6 9 17l-5-5');
const IconSun = Ico(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </>
);
const IconMoon = Ico('M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z');
const IconSparkles = Ico(
  <>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="M12 8l2 2-2 2-2-2zM19 5l1 1-1 1-1-1zM5 19l1 1-1 1-1-1z" />
  </>
);
const IconCpu = Ico(
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
  </>
);
const IconDatabase = Ico(
  <>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </>
);
const IconCloud = Ico('M17.5 19a4.5 4.5 0 1 0-1.4-8.78 6 6 0 0 0-11.6 2.28A4 4 0 0 0 6 19h11.5z');
const IconCode = Ico('m16 18 6-6-6-6M8 6l-6 6 6 6');
const IconBook = Ico(
  <>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </>
);
const IconBriefcase = Ico(
  <>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </>
);
const IconPlay = Ico('m6 4 14 8-14 8V4z');
const IconPause = Ico(
  <>
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </>
);
const IconX = Ico('M18 6 6 18M6 6l12 12');
const IconMenu = Ico('M4 6h16M4 12h16M4 18h16');
const IconMapPin = Ico(
  <>
    <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </>
);
const IconExternal = Ico(
  <>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </>
);
const IconScholar = Ico(
  <>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
  </>
);
const IconTerminal = Ico(
  <>
    <path d="m7 11 4-4-4-4" />
    <path d="M13 19h8" />
    <rect x="2" y="3" width="20" height="18" rx="2" />
  </>
);
const IconFlask = Ico(
  <>
    <path d="M10 2v7.31" />
    <path d="M14 9.3V1.99" />
    <path d="M8.5 2h7" />
    <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
    <path d="M5.58 16.5h12.85" />
  </>
);
const IconLayers = Ico(
  <>
    <path d="m12 2 10 5-10 5-10-5 10-5z" />
    <path d="m2 17 10 5 10-5" />
    <path d="m2 12 10 5 10-5" />
  </>
);
const IconTwitter = Ico('M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C21.998 7.773 22.78 5.25 22 4.009z');
const IconSearch = Ico(
  <>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </>
);
const IconChevronRight = Ico('m9 18 6-6-6-6');
const IconCircleDot = Ico(
  <>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </>
);
const IconZap = Ico('m13 2-3 7h6l-3 13 10-14h-7l2-6z');
const IconGlobe = Ico(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </>
);

Object.assign(window, {
  IconArrowRight, IconArrowUpRight, IconArrowDown, IconGithub, IconLinkedin,
  IconMail, IconCopy, IconCheck, IconSun, IconMoon, IconSparkles, IconCpu,
  IconDatabase, IconCloud, IconCode, IconBook, IconBriefcase, IconPlay,
  IconPause, IconX, IconMenu, IconMapPin, IconExternal, IconScholar,
  IconTerminal, IconFlask, IconLayers, IconTwitter, IconSearch,
  IconChevronRight, IconCircleDot, IconZap, IconGlobe,
});
