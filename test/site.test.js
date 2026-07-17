// Built-site assertions against _site/.
// Locally, run `bundle exec jekyll build` first — these tests read the build output.
// In CI the build step runs before `npm test` (see .github/workflows).
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const siteDir = join(process.cwd(), "_site");
const repoDir = process.cwd();

const posts = [
  { slug: "test-assignment-walkthrough", title: "Test Assignment Walkthrough" },
  { slug: "disk-space-cleanup-with-claude-code", title: "Disk Space Cleanup with Claude Code" },
  { slug: "from-ubuntu-to-windows-11", title: "From Ubuntu to Windows 11" },
  { slug: "on-ai-generated-content", title: "On AI-Generated Content" },
  { slug: "ai-powered-learning-for-real-projects", title: "AI-Powered Learning for Real Projects" },
  { slug: "game-asset-creation", title: "Game Asset Creation" },
  { slug: "mahjong-solitaire-remastered-fun-first", title: "Mahjong Solitaire Remastered - Fun First" },
  { slug: "why-i-still-choose-a-desktop-computer", title: "Why I Still Choose a Desktop Computer in 2025" },
  { slug: "vibe-coding", title: "Vibe Coding" },
  { slug: "portfolio-website", title: "Portfolio website" },
];

const indexHtml = () => readFileSync(join(siteDir, "index.html"), "utf8");

describe("posts migration", () => {
  it("all ten permalink pages exist", () => {
    for (const { slug, title } of posts) {
      const page = join(siteDir, "posts", slug, "index.html");
      expect(existsSync(page), `${page} should exist`).toBe(true);
      const html = readFileSync(page, "utf8");
      expect(html, `${slug} should contain its <h2> title`).toMatch(
        new RegExp(`<h2>.*${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}.*</h2>`)
      );
    }
  });

  it("home feed has ten articles, newest first", () => {
    const chunks = indexHtml().split('<article class="post-card"');
    expect(chunks.length - 1).toBe(10);
    expect(chunks[1]).toContain("Test Assignment Walkthrough");
  });

  it("each home feed article has a valid data-tags attribute", () => {
    const chunks = indexHtml().split('<article class="post-card"').slice(1);
    for (const chunk of chunks) {
      const match = chunk.match(/^\s*data-tags="([^"]*)"/);
      expect(match, "article should open with a data-tags attribute").not.toBeNull();
      const primary = match[1].split(" ")[0];
      expect(["thoughts", "making"]).toContain(primary);
    }
  });

  it("post bodies survived migration (content integrity spot-checks)", () => {
    const html = indexHtml();
    expect(html).toContain("player.vimeo.com/video/1132866645");
    expect(html).toContain("Freed 7.2GB");
  });

  it("_data/posts.yml is gone", () => {
    expect(existsSync(join(repoDir, "_data", "posts.yml"))).toBe(false);
  });

  it("feed.xml has at least ten entries", () => {
    const feed = readFileSync(join(siteDir, "feed.xml"), "utf8");
    const entries = feed.match(/<entry>/g) || [];
    expect(entries.length).toBeGreaterThanOrEqual(10);
  });
});
