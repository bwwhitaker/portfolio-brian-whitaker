// ---------------------------------------------------------------------------
// Diagram data. <FlowDiagram> renders these; you never touch SVG.
// Nodes sit on a column/row grid. Edges connect node ids.
// `detail` is what shows when a reader selects the node — this is where your
// engineering judgement gets to speak, so make it specific.
// ---------------------------------------------------------------------------

export type DiagramNode = {
  id: string;
  label: string;
  /** Small line under the label inside the box. Keep to ~3 words. */
  meta?: string;
  col: number;
  row: number;
  /** input = something the world gives us, job = runs on a schedule,
   *  store = persistence, out = something the user receives. */
  kind: "input" | "job" | "store" | "out" | "ui";
  detail: string;
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  /** Dashed edges read as "on a schedule" rather than "on request". */
  scheduled?: boolean;
};

export type Diagram = {
  id: string;
  title: string;
  caption: string;
  cols: number;
  rows: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export const showScoutPipeline: Diagram = {
  id: "show-scout-pipeline",
  title: "How a match becomes a message",
  caption:
    "Nothing in this path is triggered by a person. Select any stage to see what it does and what made it awkward.",
  cols: 4,
  rows: 3,
  nodes: [
    {
      id: "scraper",
      label: "Scraper",
      meta: "FastAPI on Railway",
      col: 0,
      row: 0,
      kind: "input",
      detail:
        "A Python service that walks venue and producer sites and normalises what it finds into performance records. It runs separately from the web app because scraping is bursty, occasionally slow, and I did not want it sharing a runtime with request handling.",
    },
    {
      id: "admin",
      label: "Admin review",
      meta: "Soft-reject",
      col: 1,
      row: 0,
      kind: "ui",
      detail:
        "Scraped records land in a review queue rather than straight into the catalogue. Rejects are soft — the row stays with a rejected flag, so the scraper does not re-propose the same bad record next run. Role-based access is enforced through a profiles table and a UserContext provider.",
    },
    {
      id: "performances",
      label: "performances",
      meta: "Postgres",
      col: 2,
      row: 0,
      kind: "store",
      detail:
        "Approved performances, with a timezone-aware show_datetime. A show at 7:30pm is 7:30pm where the theatre is, not where the server is — getting this wrong is the kind of bug users notice immediately and never forgive.",
    },
    {
      id: "watchlist",
      label: "Watchlist",
      meta: "pg_trgm search",
      col: 0,
      row: 2,
      kind: "ui",
      detail:
        "Users add shows they want to see. Titles are messy in the wild, so search is fuzzy — a pg_trgm trigram index means 'Sweeny Todd' still finds the right row.",
    },
    {
      id: "cities",
      label: "City preferences",
      meta: "Soft deletes",
      col: 1,
      row: 2,
      kind: "ui",
      detail:
        "Where a user is willing to travel. Removing a city is a soft delete so that historical matches stay explainable, and the editor warns on unsaved changes.",
    },
    {
      id: "match",
      label: "Matching job",
      meta: "pg_cron",
      col: 2,
      row: 1,
      kind: "job",
      detail:
        "A scheduled Postgres function, match_watchlist_to_performances(), joins watchlist, user_cities and performances and writes rows into matches. Putting the join in the database instead of application code means it is one plan, one transaction, and no N+1 across users.",
    },
    {
      id: "matches",
      label: "matches",
      meta: "Postgres",
      col: 3,
      row: 1,
      kind: "store",
      detail:
        "The join table is also the notification ledger. A match row records what was matched and whether the user has been told, which is what makes the send step idempotent.",
    },
    {
      id: "nudge",
      label: "Nudge job",
      meta: "Vercel cron",
      col: 3,
      row: 0,
      kind: "job",
      detail:
        "A scheduled route reads unsent matches and hands them to SendGrid, then marks them sent. Split from the matching job on purpose: a mail provider outage should not stop matching, and a matching bug should not send a hundred wrong emails.",
    },
    {
      id: "delivery",
      label: "Email and SMS",
      meta: "SendGrid, Twilio",
      col: 3,
      row: 2,
      kind: "out",
      detail:
        "The actual point of the product: you find out a show you wanted is playing near you, without having checked anything.",
    },
  ],
  edges: [
    { from: "scraper", to: "admin" },
    { from: "admin", to: "performances", label: "approved" },
    { from: "watchlist", to: "match" },
    { from: "cities", to: "match" },
    { from: "performances", to: "match", scheduled: true },
    { from: "match", to: "matches" },
    { from: "matches", to: "nudge", scheduled: true },
    { from: "nudge", to: "delivery" },
  ],
};

export const paperDocArchitecture: Diagram = {
  id: "paper-doc-architecture",
  title: "Two portals, one schema",
  caption:
    "An admin side for authoring and a student side for sitting tests, over shared Postgres with row-level security doing the separating.",
  cols: 4,
  rows: 3,
  nodes: [
    {
      id: "import",
      label: "Word importer",
      meta: "Label-prefix parser",
      col: 0,
      row: 0,
      kind: "input",
      detail:
        "Test content arrives as Word documents. A deterministic parser reads labelled blocks (Q:, TYPE:, OPTIONS:, and so on) rather than guessing at structure, and there is a downloadable .docx template so authors write in a shape the parser can read. Deterministic beat clever here: a parser that is wrong 5% of the time creates more work than it saves.",
    },
    {
      id: "editor",
      label: "Test editor",
      meta: "Admin",
      col: 1,
      row: 0,
      kind: "ui",
      detail:
        "Authoring surface for stimuli and questions: multi-expand accordion, drag-and-drop reordering with grip isolation, a sticky control banner. Grew large enough that I split it into StimulusRow, QuestionRow, StimulusImageUpload and a shared helpers module.",
    },
    {
      id: "stimuli",
      label: "stimuli / questions",
      meta: "Postgres + RLS",
      col: 2,
      row: 0,
      kind: "store",
      detail:
        "Stimuli come in three types — text, image and table — with a CHECK constraint guarding the set. Tables are stored as JSON in the existing content column rather than a new table, because the shape is only ever read as a unit.",
    },
    {
      id: "storage",
      label: "Image library",
      meta: "Supabase Storage",
      col: 2,
      row: 1,
      kind: "store",
      detail:
        "Named uploads with a searchable grid picker, drag-and-drop and clipboard paste. A dedicated image_name column is what makes images findable months later; an image_summary field describes them for the student view.",
    },
    {
      id: "shell",
      label: "Proctored test",
      meta: "Student",
      col: 1,
      row: 2,
      kind: "ui",
      detail:
        "The exam runtime: IntroScreen, ActiveTestView, QuestionPanel, ResultsScreen, plus a stimulus side panel with its own scroll. Per-question time is tracked into a JSONB column, and answer reveal is configurable — immediately after each 'lock in', or all at the end.",
    },
    {
      id: "attempts",
      label: "test_attempts",
      meta: "JSONB timing",
      col: 2,
      row: 2,
      kind: "store",
      detail:
        "One row per sitting, carrying answers, anti-cheating flags and per-question durations. Storing timing as JSONB keeps a variable-length structure out of the relational schema without giving up queryability.",
    },
    {
      id: "stripe",
      label: "Stripe",
      meta: "Packages, webhooks",
      col: 3,
      row: 1,
      kind: "out",
      detail:
        "Lesson packages are sold through Checkout in three group-size tiers across single, 5-pack and 10-pack. Balances are tracked in minutes and drawn down FIFO across credit lots by a Postgres function. Unused hours do not expire — a deliberate trust decision for a two-person business.",
    },
    {
      id: "email",
      label: "Daily summary",
      meta: "Edge Function + Resend",
      col: 3,
      row: 0,
      kind: "job",
      detail:
        "pg_cron triggers a Supabase Edge Function that mails a subscriber summary through Resend. The point is that my co-founder starts the day knowing what happened without opening the admin.",
    },
  ],
  edges: [
    { from: "import", to: "editor" },
    { from: "editor", to: "stimuli" },
    { from: "editor", to: "storage" },
    { from: "stimuli", to: "shell", label: "renders" },
    { from: "storage", to: "shell" },
    { from: "shell", to: "attempts" },
    { from: "attempts", to: "email", scheduled: true },
    { from: "stripe", to: "shell", label: "entitles" },
  ],
};

export const diagrams: Record<string, Diagram> = {
  [showScoutPipeline.id]: showScoutPipeline,
  [paperDocArchitecture.id]: paperDocArchitecture,
};
