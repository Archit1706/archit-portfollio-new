export interface AgentSkill {
  id: string;
  name: string;
  slug: string;
  category: 'design' | 'devops' | 'productivity' | 'research';
  description: string;
  source: 'installed' | 'marketplace';
  tags: string[];
  skillMd: string;
}

export const SKILLS: AgentSkill[] = [
  {
    id: 'frontend-design',
    name: 'frontend-design',
    slug: 'frontend-design',
    category: 'design',
    source: 'installed',
    description: 'Create distinctive, production-grade frontend interfaces with high design quality. Generates creative, polished code that avoids generic AI aesthetics.',
    tags: ['UI/UX', 'React', 'CSS', 'Design Systems', 'Animation'],
    skillMd: `---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work — the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Focus on high-impact moments: one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics.

Remember: Claude is capable of extraordinary creative work. Don't hold back — show what can truly be created when thinking outside the box and committing fully to a distinctive vision.`,
  },
  {
    id: 'skill-creator',
    name: 'skill-creator',
    slug: 'skill-creator',
    category: 'productivity',
    source: 'marketplace',
    description: 'Create new skills, modify and improve existing skills, and measure skill performance with eval-driven iteration loops.',
    tags: ['Meta', 'Automation', 'Evals', 'Skill Engineering'],
    skillMd: `---
name: skill-creator
description: Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an existing skill, run evals to test a skill, benchmark skill performance with variance analysis, or optimize a skill's description for better triggering accuracy.
---

# Skill Creator

A skill for creating new skills and iteratively improving them.

At a high level, the process of creating a skill goes like this:

- Decide what you want the skill to do and roughly how it should do it
- Write a draft of the skill
- Create a few test prompts and run claude-with-access-to-the-skill on them
- Help the user evaluate the results both qualitatively and quantitatively
- Rewrite the skill based on feedback from evaluation results
- Repeat until satisfied

## Creating a Skill

### Capture Intent

Start by understanding the user's intent. The current conversation might already contain a workflow the user wants to capture. Extract answers from the conversation history first — the tools used, the sequence of steps, corrections the user made, input/output formats observed.

1. What should this skill enable Claude to do?
2. When should this skill trigger? (what user phrases/contexts)
3. What's the expected output format?
4. Should we set up test cases to verify the skill works?

### Write the SKILL.md

Based on the user interview, fill in these components:

- **name**: Skill identifier
- **description**: When to trigger, what it does. This is the primary triggering mechanism — include both what the skill does AND specific contexts for when to use it.
- **the rest of the skill**

### Anatomy of a Skill

\`\`\`
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description required)
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/    - Executable code for deterministic/repetitive tasks
    ├── references/ - Docs loaded into context as needed
    └── assets/     - Files used in output (templates, icons, fonts)
\`\`\`

### Progressive Disclosure

Skills use a three-level loading system:
1. **Metadata** (name + description) — Always in context (~100 words)
2. **SKILL.md body** — In context whenever skill triggers (<500 lines ideal)
3. **Bundled resources** — As needed (unlimited)

## Running Evals

For each test case, spawn two subagents in the same turn — one with the skill, one without. This provides a meaningful baseline comparison.

After running evals, review outputs qualitatively and quantitatively, then improve the skill based on findings. Keep going until the user is satisfied with the results.

## Description Optimization

The description field in SKILL.md frontmatter is the primary mechanism that determines whether Claude invokes a skill. After creating or improving a skill, offer to optimize the description for better triggering accuracy using the optimization loop.`,
  },
  {
    id: 'claude-md-improver',
    name: 'claude-md-improver',
    slug: 'claude-md-improver',
    category: 'devops',
    source: 'marketplace',
    description: 'Audit and improve CLAUDE.md files in repositories. Scans for all CLAUDE.md files, evaluates quality, outputs a graded report, then makes targeted updates.',
    tags: ['CLAUDE.md', 'Documentation', 'Code Quality', 'Workflow'],
    skillMd: `---
name: claude-md-improver
description: Audit and improve CLAUDE.md files in repositories. Use when user asks to check, audit, update, improve, or fix CLAUDE.md files. Scans for all CLAUDE.md files, evaluates quality against templates, outputs quality report, then makes targeted updates. Also use when the user mentions "CLAUDE.md maintenance" or "project memory optimization".
tools: Read, Glob, Grep, Bash, Edit
---

# CLAUDE.md Improver

Audit, evaluate, and improve CLAUDE.md files across a codebase to ensure Claude Code has optimal project context.

**This skill can write to CLAUDE.md files.** After presenting a quality report and getting user approval, it updates CLAUDE.md files with targeted improvements.

## Workflow

### Phase 1: Discovery

Find all CLAUDE.md files in the repository:

\`\`\`bash
find . -name "CLAUDE.md" -o -name ".claude.md" -o -name ".claude.local.md" 2>/dev/null | head -50
\`\`\`

| Type | Location | Purpose |
|------|----------|---------|
| Project root | \`./CLAUDE.md\` | Primary project context (shared with team) |
| Local overrides | \`./.claude.local.md\` | Personal/local settings (gitignored) |
| Global defaults | \`~/.claude/CLAUDE.md\` | User-wide defaults across all projects |
| Package-specific | \`./packages/*/CLAUDE.md\` | Module-level context in monorepos |

### Phase 2: Quality Assessment

For each CLAUDE.md file, evaluate against quality criteria:

| Criterion | Weight |
|-----------|--------|
| Commands/workflows documented | High |
| Architecture clarity | High |
| Non-obvious patterns | Medium |
| Conciseness | Medium |
| Currency | High |
| Actionability | High |

**Quality Scores:** A (90–100), B (70–89), C (50–69), D (30–49), F (0–29)

### Phase 3: Quality Report

**ALWAYS output the quality report BEFORE making any updates.** Include per-file scores, specific issues found, and recommended additions.

### Phase 4: Targeted Updates

After user confirmation, apply changes using the Edit tool. Preserve existing content structure.

**Update Guidelines:**
1. Propose targeted additions only — focus on genuinely useful info
2. Keep it minimal — avoid restating what's obvious from the code
3. Show diffs before applying any changes

## What Makes a Great CLAUDE.md

- Concise and human-readable
- Actionable commands that can be copy-pasted
- Project-specific patterns, not generic advice
- Non-obvious gotchas and warnings
- **\`#\` key shortcut**: During a Claude session, press \`#\` to auto-incorporate learnings`,
  },
  {
    id: 'session-report',
    name: 'session-report',
    slug: 'session-report',
    category: 'research',
    source: 'marketplace',
    description: 'Generate an explorable HTML report of Claude Code session usage — tokens, cache hits, subagents, skills, and expensive prompts — from local transcripts.',
    tags: ['Analytics', 'Usage', 'Observability', 'Tokens'],
    skillMd: `---
name: session-report
description: Generate an explorable HTML report of Claude Code session usage (tokens, cache, subagents, skills, expensive prompts) from ~/.claude/projects transcripts.
---

# Session Report

Produce a self-contained HTML report of Claude Code usage and save it to the current working directory.

## Steps

1. **Get data.** Run the bundled analyzer (default window: last 7 days; honor a different range if the user passed one, e.g. \`24h\`, \`30d\`, or \`all\`). The script \`analyze-sessions.mjs\` lives in the same directory as this SKILL.md — use its absolute path:
   \`\`\`sh
   node <skill-dir>/analyze-sessions.mjs --json --since 7d > /tmp/session-report.json
   \`\`\`
   For all-time, omit \`--since\`.

2. **Read** \`/tmp/session-report.json\`. Skim \`overall\`, \`by_project\`, \`by_subagent_type\`, \`by_skill\`, \`cache_breaks\`, \`top_prompts\`.

3. **Copy the template** to the output path in the current working directory:
   \`\`\`sh
   cp <skill-dir>/template.html ./session-report-$(date +%Y%m%d-%H%M).html
   \`\`\`

4. **Edit the output file** (use Edit, not Write — preserve the template's JS/CSS):
   - Replace the contents of \`<script id="report-data" type="application/json">\` with the full JSON from step 1.
   - Fill the \`<!-- AGENT: anomalies -->\` block with 3–5 one-line findings. Express figures as a **% of total tokens**. One line per finding:
     \`\`\`html
     <div class="take bad"><div class="fig">41.2%</div><div class="txt"><b>cc-monitor</b> consumed 41% of the week across just 3 sessions</div></div>
     \`\`\`
     Classes: \`.take bad\` for waste/anomalies, \`.take good\` for healthy signals, \`.take info\` for neutral facts.
   - Fill the \`<!-- AGENT: optimizations -->\` block with 1–4 \`<div class="callout">\` suggestions tied to specific rows.
   - Do not restructure existing sections.

5. **Report** the saved file path to the user. Do not open it or render it.

## Notes

- The template is the source of interactivity (sorting, expand/collapse, block-char bars). Your job is data + narrative, not markup.
- Keep commentary terse and specific — reference actual project names, numbers, timestamps from the JSON.
- If the JSON is >2MB, trim \`top_prompts\` to 100 entries and \`cache_breaks\` to 100 before embedding.`,
  },
  {
    id: 'claude-automation-recommender',
    name: 'claude-automation-recommender',
    slug: 'claude-automation-recommender',
    category: 'devops',
    source: 'marketplace',
    description: 'Analyze a codebase and recommend Claude Code automations — hooks, subagents, skills, plugins, and MCP servers — tailored to your stack.',
    tags: ['Automation', 'MCP', 'Hooks', 'Subagents', 'Setup'],
    skillMd: `---
name: claude-automation-recommender
description: Analyze a codebase and recommend Claude Code automations (hooks, subagents, skills, plugins, MCP servers). Use when user asks for automation recommendations, wants to optimize their Claude Code setup, mentions improving Claude Code workflows, asks how to first set up Claude Code for a project, or wants to know what Claude Code features they should use.
tools: Read, Glob, Grep, Bash
---

# Claude Automation Recommender

Analyze codebase patterns to recommend tailored Claude Code automations across all extensibility options.

**This skill is read-only.** It analyzes the codebase and outputs recommendations. It does NOT create or modify any files.

## Output Guidelines

- **Recommend 1–2 of each type**: Don't overwhelm — surface the top 1–2 most valuable automations per category
- **If user asks for a specific type**: Focus only on that type and provide more options (3–5 recommendations)
- **Go beyond the reference lists**: Use web search to find recommendations specific to the codebase's tools and frameworks
- **Tell users they can ask for more**: End by noting they can request more recommendations for any specific category

## Automation Types Overview

| Type | Best For |
|------|----------|
| **Hooks** | Automatic actions on tool events (format on save, lint, block edits) |
| **Subagents** | Specialized reviewers/analyzers that run in parallel |
| **Skills** | Packaged expertise, workflows, and repeatable tasks |
| **Plugins** | Collections of skills that can be installed |
| **MCP Servers** | External tool integrations (databases, APIs, browsers, docs) |

## Workflow

### Phase 1: Codebase Analysis

\`\`\`bash
# Detect project type and tools
ls -la package.json pyproject.toml Cargo.toml go.mod pom.xml 2>/dev/null
cat package.json 2>/dev/null | head -50

# Check for existing Claude Code config
ls -la .claude/ CLAUDE.md 2>/dev/null

# Analyze project structure
ls -la src/ app/ lib/ tests/ components/ pages/ api/ 2>/dev/null
\`\`\`

### Phase 2: Generate Recommendations

For each automation type, identify the highest-value opportunities based on:
- Repetitive tasks that Claude performs in this codebase
- Quality gates that should run automatically
- External tools that Claude frequently needs to consult
- Workflows that span multiple steps or files

### Phase 3: Output Report

Structure recommendations as:
\`\`\`
## Recommended Claude Code Automations

### Hooks (run automatically)
1. **[Hook name]**: [What it does, when it fires]
   \`\`\`json
   { "hooks": { ... } }
   \`\`\`

### Skills (invokable expertise)
1. **[Skill name]**: [What it enables, when to use it]

### MCP Servers (tool integrations)
1. **[Server name]**: [What it connects, setup snippet]
\`\`\`

End with: "Want me to go deeper on any of these? I can generate the full config for hooks, a SKILL.md draft, or the MCP server setup."`,
  },
];

export const SKILL_CATEGORIES = [
  { id: 'design', label: 'Design' },
  { id: 'devops', label: 'DevOps' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'research', label: 'Research' },
] as const;

export const SKILLS_BY_ID = Object.fromEntries(SKILLS.map((s) => [s.id, s]));
