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
  {
    id: 'teach-me',
    name: 'teach-me',
    slug: 'teach-me',
    category: 'research',
    source: 'marketplace',
    description: 'Deep teaching skill. Reads any provided artifact (PDF, URL, paper, repo, code) and teaches every concept in two modes — a 12-year-old explanation and a technical deep-dive — for maximum retention.',
    tags: ['Teaching', 'Learning', 'Explanations', 'Pedagogy'],
    skillMd: `---
name: teach-me
description: >
  Deep teaching skill. Triggers whenever the user wants to learn or understand something from a provided artifact — PDF, URL, article, blog post, GitHub repo, code, paper, or any uploaded material. Activate on phrases like "teach me", "teach me this", "explain this in detail", "I want to learn this", "break this down for me", "help me understand", "walk me through this", "explain like I'm 5", "ELI5", "deep dive into", "teach me in depth", or any variation where the user is asking to learn from a provided resource. Also trigger when the user uploads a document and asks any question that implies they want to understand it fully, not just get a quick answer. This skill is the go-to for maximizing learning and retention from any material. Use it aggressively — if the user uploads something and wants to understand it, this skill applies.
---

# Teach-Me Skill

The goal: maximize learning and retention. Teach everything in the material — from zero assumptions to full depth. Never hallucinate. Stick to the artifact. Only go off-track to explain a prerequisite concept, then come back.

---

## Step 1: Read the Material First

Before teaching anything, fully read and parse the artifact the user provided.

- **PDF / uploaded file**: read it completely using the appropriate file-reading tools
- **URL / article / blog**: use \`web_fetch\` to retrieve the full content
- **GitHub repo**: fetch the README first, then key files (main entry point, core modules)
- **Code snippet / pasted text**: read directly from the conversation

Do not start teaching until you have read the full material. If the material is very long (e.g., a full textbook chapter or large codebase), read as much as you can, and note to the user that you're working from the content you've loaded.

---

## Step 2: Build the Teaching Outline

After reading, silently build a topic outline in your head:
- What are the core concepts in this material?
- What's the logical order — from foundational → intermediate → advanced?
- Are there any prerequisite concepts the user needs to understand first?

Do NOT share this outline explicitly with the user unless the material is very long and you want to give them a roadmap. Just use it to drive your teaching order.

---

## Step 3: Teach in Two Modes — Always Both, Always in Order

Teach every topic twice: first the 12-year-old version, then the technical deep-dive. Do this for each major concept or section, not just once at the top level.

---

### Mode 1 — The 12-Year-Old Explanation

**Rules:**
- Use a relatable story, analogy, or everyday example. Think: cooking, sports, video games, school, roads, LEGO, etc. Pick whatever fits best.
- Short sentences. One idea per sentence.
- No jargon. If a term must appear, define it immediately in plain words.
- Make it visual — describe it like you're painting a picture in their head.
- Keep it friendly and warm. Like explaining to a curious kid who's not dumb, just new to this.
- Ground every abstract idea in something the kid has experienced.

**Format:**
\`\`\`
🧒 Simple Version

[Your plain-English, story-style explanation here]
\`\`\`

---

### Mode 2 — The Technical Deep-Dive

**Rules:**
- Domain-appropriate tone. If it's math: show the math. If it's systems: go into architecture. If it's biology: use precise terminology. If it's code: walk through the code line by line or block by block.
- Use the exact examples, equations, code, or diagrams from the artifact. Do not invent new examples unless bridging a gap.
- If the topic requires a prerequisite, go off-track, explain the prerequisite clearly, then say "OK, back to [topic]" and continue.
- Do not skip steps. Explain every transition: why something is done, not just what is done.

**Format:**
\`\`\`
🔬 Technical Deep-Dive

[Your in-depth, domain-precise explanation here]
\`\`\`

---

## Step 4: Teaching Flow

Go concept by concept, section by section. For each concept:

1. State what you're about to teach. One sentence.
2. Give the 🧒 Simple Version.
3. Give the 🔬 Technical Deep-Dive.
4. If there's a natural connection to the next concept, bridge it.

Keep going until you've covered all major concepts in the material.

---

## Step 5: End with a Summary + Check-In

After covering all the material:

- Give a 3-5 bullet summary of the key takeaways (plain English).
- Ask: "What would you like me to go deeper on, or is there anything that felt unclear?"

---

## Important Rules (Never Break These)

1. **Never assume prior knowledge.** Always start from zero.
2. **Never hallucinate.** Only teach what's in the artifact.
3. **Never skip.** If it's in the material, it gets taught.
4. **Never go off-track without flagging it.** Say: "Quick detour — to understand this, you need to know about [X]. [Explanation.] OK, back to [main topic]."
5. **Always use short sentences in both modes.**
6. **Match depth to material.** A 3-page blog gets a focused lesson. A 40-page paper gets a full structured breakdown.
7. **Use examples from the artifact.** Don't invent new ones unless bridging a gap.`,
  },
  {
    id: 'caveman',
    name: 'caveman',
    slug: 'caveman',
    category: 'productivity',
    source: 'marketplace',
    description: 'Activates a terse, caveman-style response mode that strips filler, articles, hedging, and pleasantries while preserving all technical substance. Three intensity levels: lite, full, ultra.',
    tags: ['Style', 'Terse', 'Prose', 'Response Mode'],
    skillMd: `---
name: caveman
description: Activates a terse, caveman-style response mode that strips filler, articles, hedging, and pleasantries from Claude's prose while preserving all technical substance. Use this skill whenever the user sends "/caveman", mentions "caveman mode", or requests terse/minimal prose style. Also triggers when the user specifies intensity levels like "/caveman lite", "/caveman full", or "/caveman ultra". The skill governs ALL subsequent responses until explicitly deactivated — it must stay active across every turn without drift or reversion.
---

# Caveman Mode

## Activation & Deactivation

| Signal | Effect |
|---|---|
| \`/caveman\` | Activate at \`full\` (default) |
| \`/caveman lite\` | Activate at \`lite\` |
| \`/caveman full\` | Activate at \`full\` |
| \`/caveman ultra\` | Activate at \`ultra\` |
| \`stop caveman\` / \`normal mode\` | Deactivate, revert to normal |

**Persist every turn.** No reversion after long conversations. No drift toward filler. If unsure whether active: still active. Only deactivates on explicit signal above.

---

## Intensity Levels

### \`lite\`
Drop filler words and hedging. Keep articles, full sentences, professional register.
> *"Your component re-renders because you create a new object reference each render. Wrap it in useMemo."*

### \`full\` (default)
Drop articles, fragments OK, short synonyms preferred.
> *"New object ref each render. Inline object prop = new ref = re-render. Wrap in useMemo."*

### \`ultra\`
Abbreviate prose words (DB/auth/config/req/res/fn/impl), strip conjunctions, arrows for causality (X → Y), one word when one word enough.
> *"Inline obj prop → new ref → re-render. useMemo."*

---

## What to Drop (full/ultra)

**Always drop:**
- Articles: a, an, the
- Filler: just, really, basically, actually, simply, essentially
- Pleasantries: sure, certainly, of course, happy to, great question
- Hedging: it seems like, you might want to, perhaps consider
- Throat-clearing: "I'd be happy to help you with that"

**Prefer short synonyms:**
- big not extensive
- fix not "implement a solution for"
- use not utilize
- show not demonstrate
- need not require

**Sentence pattern:** \`[thing] [action] [reason]. [next step].\`

---

## What to Never Touch

- Code blocks — always written normally
- Error strings — quoted exactly
- Function names, API names, technical terms — never abbreviated
- Commit messages, PRs — written normally

---

## Auto-Clarity Exceptions

Drop caveman prose temporarily for:

1. **Security warnings** — write normally, full sentences
2. **Irreversible / destructive operations** — write the warning normally, then resume caveman
3. **Multi-step sequences** where fragment order or missing conjunctions create genuine technical ambiguity
4. **User repeats question or asks to clarify** — expand, then resume

After the clear section ends, resume caveman immediately. No announcement needed.

---

## Confirmation on Activation

On \`/caveman [level]\`, respond with one terse line confirming mode + level. Example:
> \`Caveman full. Active.\`

On deactivation:
> \`Normal mode restored.\`

---

## Examples

**Q: Why React component re-render?**

| Level | Response |
|---|---|
| lite | "Your component re-renders because you create a new object reference each render. Wrap it in useMemo." |
| full | "New object ref each render. Inline object prop = new ref = re-render. Wrap in useMemo." |
| ultra | "Inline obj prop → new ref → re-render. useMemo." |`,
  },
  {
    id: 'latex-resume-tailor',
    name: 'latex-resume-tailor',
    slug: 'latex-resume-tailor',
    category: 'productivity',
    source: 'marketplace',
    description: "Tailor an existing LaTeX resume to a specific job description without inventing facts or changing the document's size. Preserves macros, bullet counts, and page length.",
    tags: ['LaTeX', 'Resume', 'Job Search', 'Writing'],
    skillMd: `---
name: latex-resume-tailor
description: Tailor an existing LaTeX resume to a specific job description without inventing facts or changing the document's size. Use this whenever the user provides a job description (JD) and a LaTeX resume and wants the resume rewritten, aligned, optimized, or "tailored" to that job — including phrasings like "make my resume match this JD", "align my resume to this posting", "rework my resume for this role", or "optimize my LaTeX resume". Trigger even if the user only pastes a JD and a .tex file without spelling out the word "tailor".
---

# LaTeX Resume Tailor

Rewrite an existing LaTeX resume so it aligns with a target job description, while keeping every fact true and every dimension identical. The user is applying for a real job, so accuracy and a clean compile matter more than flashy language.

## Inputs

Two inputs are required:
1. A **job description (JD)** — the posting the resume is being tailored toward.
2. The **original LaTeX resume** — the full \`.tex\` source.

If either is missing, ask for it before proceeding. Do not tailor against a JD you can only partially see, and do not work from a resume summary instead of the actual \`.tex\` source.

## Hard constraints

These five constraints are the whole point of the skill. Treat a violation of any of them as a failed task.

### 1. Zero hallucination

Use only the content, metrics, employers, dates, technologies, and accomplishments already present in the original resume. You may restructure, re-weight, reorder, and reframe what is there to surface the skills the JD cares about. You may not add a tool, a metric, a result, or a responsibility the resume does not already contain. If the JD wants something the resume lacks, leave it out rather than inventing it.

### 2. Identical dimensions

The tailored resume must occupy the same space as the original — same section order, same number of entries, and the **same number of bullet points in each section**. Do not add bullets, delete bullets, or merge two bullets into one. Rewrite each existing bullet in place.

Keep line length stable too. A resume that fit on one page must still fit on one page. Before returning, count the bullets per section in the original and confirm the output matches exactly.

### 3. No AI vocabulary

Write in plain, professional language a human would actually use. Avoid inflated verbs and buzzwords: no "spearheaded", "revolutionized", "synergized", "leveraged" (as filler), "delve", "tapestry", "navigated", "orchestrated" (as filler), "robust", "seamless", "cutting-edge", "game-changing". Prefer direct verbs: built, wrote, designed, shipped, reduced, measured, tested, analyzed, led.

### 4. Punctuation

No em-dashes and no en-dashes anywhere in the output. Replace any long dash with a standard hyphen (\`-\`).

### 5. LaTeX integrity

Return the complete, compilable \`.tex\` document. Preserve every macro and custom command exactly as defined (for example \`\\resumeItem\`, \`\\resumeSubheading\`, \`\\resumeProjectHeading\`, \`\\resumeItemListStart\`). Do not rename macros, change their argument counts, alter the preamble, or touch package imports. Only the human-readable text inside the existing macro arguments should change. Special LaTeX characters introduced by rewording (\`%\`, \`&\`, \`#\`, \`_\`, \`$\`) must be escaped.

## Method

1. Read the JD and pull out the role's priorities: the key skills, tools, domains, and the kind of problem the team is hiring someone to solve.
2. Read the resume and map each existing bullet to the JD priorities it best supports.
3. For each bullet, rewrite the wording to lead with the JD-relevant angle, using only facts already in that bullet. Keep the metric if there is one.
4. Reorder skills, and reorder entries within a section, so the most JD-relevant material appears first — but only if the resume's structure allows reordering without breaking it.
5. Verify the constraints (see checklist) and return the full \`.tex\`.

## Self-check before returning

- Bullet count per section matches the original exactly.
- No new tools, metrics, employers, dates, or claims were introduced.
- No em-dashes or en-dashes anywhere.
- No AI buzzwords from the list above.
- All macros intact; document compiles; special characters escaped.
- Overall length unchanged (still fits the same page count).

## Output

Return the complete tailored \`.tex\` document in a code block. After it, add a short plain-language summary (a few lines) of what was re-emphasized and why, so the user can see the reasoning. Do not pad this summary with marketing language.`,
  },
  {
    id: 'story-cover-letter',
    name: 'story-cover-letter',
    slug: 'story-cover-letter',
    category: 'productivity',
    source: 'marketplace',
    description: "Write a targeted, story-driven cover letter from a job description and a resume. Maps one or two real projects to the role's actual problem — no clichés, no padding.",
    tags: ['Cover Letter', 'Writing', 'Job Search', 'Storytelling'],
    skillMd: `---
name: story-cover-letter
description: Write a targeted, story-driven cover letter from a job description and a resume. Use this whenever the user wants a cover letter written or rewritten for a specific role — including phrasings like "write a cover letter for this job", "draft a cover letter", "I need a cover letter for this posting", or when the user pastes a job description plus a resume and asks for a letter. Trigger even if the user does not say the word "story" — the story-driven approach is the default for any cover letter request here.
---

# Story-Driven Cover Letter

Write a cover letter that reads like a person making a focused case for one specific job — not a prose version of the resume. The goal is a letter the hiring manager actually finishes reading.

## Inputs

Two inputs are required:
1. A **job description (JD)** — the role being applied to.
2. The applicant's **resume** — the source of real projects and accomplishments.

If either is missing, ask for it. The letter draws every concrete claim from the resume, so a vague summary is not enough.

## Core principle: a story, not a resume clone

A resume lists everything. A cover letter argues one thing: *this person can solve the problem this team is hiring for.* Do not walk through the resume section by section. Instead:

- Find the central problem or mission in the JD — what the team actually needs done.
- Pick the one or two projects from the resume that most directly show the applicant has done that kind of work before.
- Build the letter around that connection.

Everything else from the resume stays out. A reader who wants the full list can read the resume; the letter exists to make them want to.

## Hard constraints

### Humanized tone

Short, punchy, clear sentences. Write the way a competent professional actually speaks. Vary sentence length, but lean short. Read it back and cut any sentence that sounds like a press release.

### No AI vocabulary or clichés

Ban the standard cover-letter filler and machine phrasing:
- Openers: "In today's fast-paced digital landscape", "I am thrilled to apply for", "I am writing to express my interest in", "Look no further".
- Filler phrases: "a testament to my skills", "proven track record", "results-driven", "passionate about leveraging", "perfect fit", "hit the ground running".
- Inflated verbs: "spearheaded", "revolutionized", "synergized", "orchestrated" (as filler).

Replace them with plain statements of what happened and what it means.

### Punctuation

No em-dashes and no en-dashes. Use standard hyphens and ordinary sentence punctuation only.

### Honesty

Every concrete claim — a project, a metric, a technology, a role — must come from the resume. Do not invent achievements or inflate scope to match the JD. If the resume does not support a point the JD wants, leave it out.

### Length

Keep it to one page: aim for 280 to 350 words. Short sentences should not mean a thin letter — give each body paragraph enough specifics (the problem, what was built, the result) to be convincing.

## Structure

Use this shape:

1. **Hook (one short paragraph).** Open with something that directly addresses the company's goal, mission, or tech stack — show you understand what they are trying to do. No throat-clearing, no "I am writing to apply." Get to the point in the first sentence.
2. **Body (one or two short paragraphs).** Map a specific past project to a specific JD requirement. Name the project, say what the problem was, say what was built or done, and connect it explicitly to what this role needs. If there are two clear matches, use two short paragraphs — one each. Do not exceed two.
3. **Close (one short paragraph).** Brief and confident. State interest in the role plainly and invite the next step. No groveling, no restating the whole letter.

## Self-check before returning

- Reads as a story making one argument, not a summary of the resume.
- Opens with a real hook tied to the company, not a cliché.
- Every concrete claim is traceable to the resume.
- No em-dashes or en-dashes; no banned phrases or inflated verbs.
- Sentences are short and human.
- Length is roughly 280 to 350 words; body paragraphs carry real specifics.

## Output

Return the finished cover letter as plain text, ready to paste. Do not include placeholder brackets unless a real detail (like the hiring manager's name) is genuinely unavailable from the inputs; if so, flag it clearly so the user knows to fill it in.`,
  },
];

export const SKILL_CATEGORIES = [
  { id: 'design', label: 'Design' },
  { id: 'devops', label: 'DevOps' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'research', label: 'Research' },
] as const;

export const SKILLS_BY_ID = Object.fromEntries(SKILLS.map((s) => [s.id, s]));
