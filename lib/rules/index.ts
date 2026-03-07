import fs from "fs";
import path from "path";

// ── Types ──────────────────────────────────────────────────────────────────

export interface RuleFrontmatter {
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface RuleMeta extends RuleFrontmatter {
  slug: string;
}

export interface Rule extends RuleMeta {
  content: string;
}

// ── Paths ──────────────────────────────────────────────────────────────────

const RULES_DIR = path.join(process.cwd(), "content", "rules");

// ── Frontmatter Parser ─────────────────────────────────────────────────────

function parseFrontmatter(raw: string): { frontmatter: RuleFrontmatter; content: string } {
  const fenceRe = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
  const match = raw.match(fenceRe);

  if (!match) {
    return {
      frontmatter: { title: "Untitled", description: "", icon: "📄", order: 99 },
      content: raw.trim(),
    };
  }

  const yamlBlock = match[1];
  const content = raw.slice(match[0].length).trim();

  // Simple line-by-line YAML scalar parser (no deps)
  const frontmatter: Partial<RuleFrontmatter> = {};

  for (const line of yamlBlock.split(/\r?\n/)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");

    if (key === "title") frontmatter.title = value;
    else if (key === "description") frontmatter.description = value;
    else if (key === "icon") frontmatter.icon = value;
    else if (key === "order") frontmatter.order = parseInt(value, 10);
  }

  return {
    frontmatter: {
      title: frontmatter.title ?? "Untitled",
      description: frontmatter.description ?? "",
      icon: frontmatter.icon ?? "📄",
      order: frontmatter.order ?? 99,
    },
    content,
  };
}

// ── Public API ─────────────────────────────────────────────────────────────

/** Return metadata for all rules, sorted by `order`. */
export function getAllRules(): RuleMeta[] {
  if (!fs.existsSync(RULES_DIR)) return [];

  return fs
    .readdirSync(RULES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(RULES_DIR, file), "utf-8");
      const { frontmatter } = parseFrontmatter(raw);
      return { slug, ...frontmatter };
    })
    .sort((a, b) => a.order - b.order);
}

/** Return a single rule with its full markdown content. Returns null when not found. */
export function getRuleBySlug(slug: string): Rule | null {
  const filePath = path.join(RULES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, content } = parseFrontmatter(raw);

  return { slug, ...frontmatter, content };
}

/** Return all slugs (used for static params generation). */
export function getAllRuleSlugs(): string[] {
  if (!fs.existsSync(RULES_DIR)) return [];

  return fs
    .readdirSync(RULES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}
