export const INITIAL_NOTES = [
  {
    id: "note-1",
    title: "Aether OS Architecture & AI Engine Guidelines",
    content: "# Aether OS Architecture Overview\n\nAether is designed with a **monochrome, pure-black aesthetic** combining Nothing OS, Linear, and Arc Browser principles.\n\n## Core Design Philosophy\n1. **Zero Distraction**: Surface background at #000000 with 1px subtle borders (#222222).\n2. **Deterministic Layouts**: Dense typography with Space Grotesk and JetBrains Mono.\n3. **AI-Native Context**: Contextual floating actions, instant summarization, and automated flashcard extraction.\n\n## System Metrics\n* Core latency: < 12ms\n* Local state index: Optimized\n* Memory overhead: Minimal\n\n```javascript\nconst aetherConfig = {\n  theme: \"monochrome-pure\",\n  dotMatrixDensity: \"high\",\n  aiModel: \"Gemini 2.5 Flash\",\n  shortcutsEnabled: true\n};\n```",
    folder: "Engineering",
    tags: ["architecture", "system", "v2.0"],
    isPinned: true,
    isFavorite: true,
    isTrash: false,
    createdAt: "2026-07-26T10:15:00.000Z",
    updatedAt: "2026-07-27T04:20:00.000Z",
    wordCount: 104,
    readingTime: "1 min"
  },
  {
    id: "note-2",
    title: "Quarterly Product Strategy & SaaS Launch Roadmap",
    content: "# Product Strategy Q3/Q4\n\nKey milestones for the Aether AI Notes platform rollout:\n\n### Phase 1: Core Surface & Local-First Engine\n- [x] Complete Nothing OS inspired dot-matrix grid system\n- [x] Linear-grade keyboard command palette (⌘K)\n- [x] Distraction-free floating editor toolbar\n\n### Phase 2: Intelligence & Flashcard Synthesis\n- [ ] Contextual AI drawer with 9 instant action macros\n- [ ] Automated 3D Flashcard flip deck generator\n- [ ] Automated tagging and summary indexing\n\n### Key Performance Indicators\n- Retention rate target: > 68%\n- Daily active editor time: 34 mins\n- AI action trigger frequency: 4.2x / session",
    folder: "Product Strategy",
    tags: ["roadmap", "saas", "planning"],
    isPinned: true,
    isFavorite: true,
    isTrash: false,
    createdAt: "2026-07-25T14:30:00.000Z",
    updatedAt: "2026-07-27T02:10:00.000Z",
    wordCount: 96,
    readingTime: "1 min"
  },
  {
    id: "note-3",
    title: "Quantum Computing & Superposition Fundamentals",
    content: "# Quantum Computing Essentials\n\nQuantum computing leverages quantum mechanical phenomena such as **superposition** and **entanglement** to perform computations exponential times faster than classical binary architectures.\n\n## Key Principles\n- **Qubit**: Unlike a classical bit (0 or 1), a qubit exists in a linear combination state |ψ⟩ = α|0⟩ + β|1⟩.\n- **Quantum Entanglement**: Particles interact such that quantum state of each particle cannot be described independently.\n- **Quantum Decoherence**: Loss of quantum coherence due to environmental noise.\n\n> \"If you think you understand quantum mechanics, you don't understand quantum mechanics.\" — Richard Feynman",
    folder: "Research",
    tags: ["quantum", "physics", "deep-tech"],
    isPinned: false,
    isFavorite: false,
    isTrash: false,
    createdAt: "2026-07-24T09:00:00.000Z",
    updatedAt: "2026-07-26T18:45:00.000Z",
    wordCount: 88,
    readingTime: "1 min"
  },
  {
    id: "note-4",
    title: "Cognitive Psychology & Deep Work Systems",
    content: "# Deep Work Operating Framework\n\nNotes on Cal Newport's Deep Work principles modified for knowledge workers:\n\n### Rule 1: Work Deeply\n- Eliminate shallow distractions. Set hard boundaries for communication slots.\n- Ritualize your work environment with dedicated minimalist setup (#000000 black theme, zero notification noise).\n\n### Rule 2: Embrace Boredom\n- Resist instant dopamine scrolling. Train focus endurance through timed 90-minute blocks.\n\n### Rule 3: Quit Social Media\n- Evaluate tool impact based on high-value goals rather than superficial benefits.",
    folder: "Personal",
    tags: ["productivity", "psychology", "habits"],
    isPinned: false,
    isFavorite: true,
    isTrash: false,
    createdAt: "2026-07-22T11:20:00.000Z",
    updatedAt: "2026-07-25T16:10:00.000Z",
    wordCount: 82,
    readingTime: "1 min"
  },
  {
    id: "note-5",
    title: "Linear & Arc Design Mechanics Breakdown",
    content: "# Visual Micro-Interactions Analysis\n\nExcellence in modern interface software stems from subtle precision:\n\n1. **Monochrome Palette Discipline**:\n   - Backgrounds: #000000, Secondary: #090909, Surface: #111111, Borders: #222222.\n   - Never introduce random colored accents when black & white creates authoritative contrast.\n\n2. **Typography Scale**:\n   - Space Grotesk for geometric section headings.\n   - JetBrains Mono for metadata, keybindings, and statistics.\n\n3. **Spatial Rhythms**:\n   - Strict 16px corner radius (rounded-2xl).\n   - Generous negative padding for breathability.",
    folder: "Design",
    tags: ["ui-ux", "design-system", "linear"],
    isPinned: false,
    isFavorite: false,
    isTrash: false,
    createdAt: "2026-07-20T08:00:00.000Z",
    updatedAt: "2026-07-24T12:00:00.000Z",
    wordCount: 79,
    readingTime: "1 min"
  },
  {
    id: "note-6",
    title: "Archived Draft: Legacy API Key Migration",
    content: `# Legacy V1 API Migration Specs
This draft describes old REST endpoint schemas that have been deprecated in favor of Aether GraphQL/gRPC stream protocols.
`,
    folder: "Engineering",
    tags: ["deprecated", "archive"],
    isPinned: false,
    isFavorite: false,
    isTrash: true,
    createdAt: "2026-07-10T10:00:00.000Z",
    updatedAt: "2026-07-15T11:00:00.000Z",
    wordCount: 26,
    readingTime: "1 min"
  }
];

export const INITIAL_FOLDERS = [
  "All Notes",
  "Engineering",
  "Product Strategy",
  "Research",
  "Design",
  "Personal"
];

export const INITIAL_TAGS = [
  "architecture",
  "system",
  "v2.0",
  "roadmap",
  "saas",
  "quantum",
  "productivity",
  "ui-ux",
  "linear",
  "design-system"
];

export const INITIAL_FLASHCARDS = [
  {
    id: "fc-1",
    deckId: "quantum-physics",
    deckName: "Quantum Physics & Superposition",
    question: "What is Quantum Superposition?",
    answer: "A fundamental principle where a physical system exists in a linear combination of multiple states simultaneously until measured.",
    difficulty: "Medium",
    lastReviewed: "2 hours ago",
    mastery: 85
  },
  {
    id: "fc-2",
    deckId: "quantum-physics",
    deckName: "Quantum Physics & Superposition",
    question: "How does Qubit differ from a classical Binary Bit?",
    answer: "A classical bit can only be 0 or 1. A qubit can represent 0, 1, or any quantum superposition of both states simultaneously.",
    difficulty: "Easy",
    lastReviewed: "1 day ago",
    mastery: 92
  },
  {
    id: "fc-3",
    deckId: "aether-architecture",
    deckName: "Aether OS Architecture",
    question: "What are the core color tokens of the Aether Design System?",
    answer: "Background: #000000, Secondary: #090909, Cards: #111111, Borders: #222222, Primary Text: #FFFFFF, Secondary Text: #9E9E9E.",
    difficulty: "Easy",
    lastReviewed: "3 hours ago",
    mastery: 98
  },
  {
    id: "fc-4",
    deckId: "productivity",
    deckName: "Deep Work Systems",
    question: "What is the core rule of Deep Work according to Cal Newport?",
    answer: "Work deeply by ritualizing your environment, eliminating shallow distractions, and focusing in uninterrupted 90-minute blocks.",
    difficulty: "Hard",
    lastReviewed: "3 days ago",
    mastery: 70
  }
];

export const ACTIVITY_TIMELINE = [
  {
    id: "act-1",
    time: "10 mins ago",
    title: "AI Synthesis Complete",
    desc: "Generated 3 flashcards from 'Quantum Computing & Superposition'",
    icon: "Sparkles"
  },
  {
    id: "act-2",
    time: "1 hour ago",
    title: "Note Updated",
    desc: "Modified 'Aether OS Architecture & AI Engine Guidelines'",
    icon: "FileText"
  },
  {
    id: "act-3",
    time: "3 hours ago",
    title: "Note Pinned",
    desc: "Pinned 'Quarterly Product Strategy & SaaS Launch Roadmap' to top dashboard",
    icon: "Pin"
  },
  {
    id: "act-4",
    time: "Yesterday",
    title: "Flashcard Session Completed",
    desc: "Scored 94% accuracy in 'Aether OS Architecture' deck",
    icon: "Brain"
  }
];

export const KEYBOARD_SHORTCUTS = [
  { key: "⌘ K", action: "Open Command Palette / Search" },
  { key: "⌘ N", action: "Create New Note" },
  { key: "⌘ J", action: "Toggle AI Assistant Drawer" },
  { key: "⌘ /", action: "Toggle Sidebar" },
  { key: "⌘ S", action: "Trigger Manual Autosave" },
  { key: "⌘ P", action: "Pin / Unpin Active Note" },
  { key: "⌘ D", action: "Duplicate Active Note" },
  { key: "⌘ Backspace", action: "Move Note to Trash" },
  { key: "1 - 5", action: "Quick Switch Navigation Pages" }
];
