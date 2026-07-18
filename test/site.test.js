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
const workHtml = () => readFileSync(join(siteDir, "work", "index.html"), "utf8");
const projectsHtml = () => readFileSync(join(siteDir, "projects", "index.html"), "utf8");

const NEW_DESCRIPTION =
  "Personal site of Dmitriy Logunov — things I make and thoughts I share.";

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

describe("step 04 — neutral identity + top menu", () => {
  const navBlock = (html) =>
    html.match(/<nav class="main-menu">[\s\S]*?<\/nav>/)[0];

  it("menu has four items", () => {
    const nav = navBlock(indexHtml());
    const links = [...nav.matchAll(/<a href="([^"]*)">([^<]*)<\/a>/g)].map((m) => [
      m[1],
      m[2].trim(),
    ]);
    expect(links).toEqual([
      ["/", "Home"],
      ["/work", "Work"],
      ["/projects", "Projects"],
      ["/#footer", "Contacts"],
    ]);
  });

  it("no job title in header", () => {
    const html = indexHtml();
    const header = html.match(/<header>[\s\S]*?<\/header>/)[0];
    expect(header).not.toContain("Senior Full Stack Developer");
    expect(header).toContain("Coding with Purpose and Passion");
  });

  it("neutral metas", () => {
    const html = indexHtml();
    const og = html.match(/<meta property="og:description" content="([^"]*)">/)[1];
    expect(og).toBe(NEW_DESCRIPTION);
    const title = html.match(/<title>([^<]*)<\/title>/)[1];
    expect(title).toBe("Dmitriy Logunov");
  });

  it("work page label renamed", () => {
    for (const html of [indexHtml(), workHtml(), projectsHtml()]) {
      const nav = navBlock(html);
      expect(nav).not.toContain("Work and Education");
    }
  });

  it("work page body untouched", () => {
    expect(workHtml()).toContain("Looking to hire a senior developer?");
  });
});

describe("step 05 — home restructure (showcase + feed-dominant)", () => {
  it("showcase strip present with six compact cards", () => {
    const html = indexHtml();
    const anchors = [
      ...html.matchAll(/<a class="showcase-card" href="([^"]*)"/g),
    ].map((m) => m[1]);
    expect(anchors.length).toBe(6);
    expect(anchors.filter((h) => h === "/work").length).toBe(3);
    // remaining three are the highlighted projects' external links
    expect(anchors.filter((h) => h !== "/work").length).toBe(3);
  });

  it("no expandable grid on home", () => {
    const html = indexHtml();
    expect(html).not.toContain("additional-project");
    expect(html).not.toContain("toggleProjects");
    expect(html).not.toContain("expand-projects-btn");
  });

  it("feed intact below the strip", () => {
    const html = indexHtml();
    expect(html.split('<article class="post-card"').length - 1).toBe(10);
    const stripAt = html.indexOf('class="showcase-card"');
    const firstArticleAt = html.indexOf('<article class="post-card"');
    expect(stripAt).toBeGreaterThan(-1);
    expect(stripAt).toBeLessThan(firstArticleAt);
  });

  it("projects page untouched (full card grid intact)", () => {
    const html = projectsHtml();
    // NOTE: step-05 spec says ">= 6" but _data/projects.yml has 4 entries;
    // the real invariant is that step 5 leaves the /projects grid untouched.
    expect(html.split('class="project-card"').length - 1).toBeGreaterThanOrEqual(4);
    for (const title of [
      "Guitar Practice Assistant",
      "Mahjong Solitaire Remastered",
      "Koenig Bicycle",
      "Mahjong Solitaire",
    ]) {
      expect(html).toContain(title);
    }
  });

  it("showcase styles compiled into the stylesheet", () => {
    const css = readFileSync(join(siteDir, "assets", "css", "styles.css"), "utf8");
    expect(css).toContain("showcase-card");
  });
});

describe("step 06 — tag chips + feed filter", () => {
  it("chip bar rendered", () => {
    const html = indexHtml();
    for (const tag of ["all", "thoughts", "making"]) {
      expect(html).toMatch(
        new RegExp(`<button class="tag-chip" data-tag="${tag}"`)
      );
    }
    expect(html.split('class="tag-chip"').length - 1).toBe(3);
  });

  it("tag labels rendered on every feed card", () => {
    const chunks = indexHtml().split('<article class="post-card"').slice(1);
    expect(chunks.length).toBe(10);
    for (const chunk of chunks) {
      const label = chunk.match(/<span class="post-tag[^"]*">(thoughts|making)<\/span>/);
      expect(label, "each card should carry a primary tag label").not.toBeNull();
    }
  });

  it("feed-filter module loaded", () => {
    expect(indexHtml()).toContain("feed-filter.js");
  });
});

describe("step 07 — author notes", () => {
  const NOTE_DATE = "July 18, 2026";

  const gameAssetArticle = (html) => {
    const chunks = html.split('<article class="post-card"');
    return chunks.find((c) => c.includes("Game Asset Creation"));
  };

  it("note renders on the home feed inside the Game Asset Creation article", () => {
    const article = gameAssetArticle(indexHtml());
    expect(article).toBeDefined();
    expect(article).toContain('<aside class="post-note">');
    expect(article).toContain('class="post-note-label">Note<');
    expect(article).toContain(NOTE_DATE);
  });

  it("note renders on the permalink page", () => {
    const page = readFileSync(
      join(siteDir, "posts", "game-asset-creation", "index.html"),
      "utf8"
    );
    expect(page).toContain('<aside class="post-note">');
    expect(page).toContain('class="post-note-label">Note<');
    expect(page).toContain(NOTE_DATE);
  });

  it("no notes elsewhere on the home feed", () => {
    expect(indexHtml().split('<aside class="post-note"').length - 1).toBe(1);
  });

  it("note is an aside, not a sibling article", () => {
    const html = indexHtml();
    // still exactly ten post articles — the note added no new <article>
    expect(html.split('<article class="post-card"').length - 1).toBe(10);
    // the aside lives inside the Game Asset article chunk
    const article = gameAssetArticle(html);
    expect(article.indexOf('<aside class="post-note"')).toBeGreaterThan(-1);
  });

  it("post-note styles compiled", () => {
    const css = readFileSync(join(siteDir, "assets", "css", "styles.css"), "utf8");
    expect(css).toContain("post-note");
  });
});

describe("step 08 — content edits (test assignment + onyx)", () => {
  const testAssignmentPage = () =>
    readFileSync(
      join(siteDir, "posts", "test-assignment-walkthrough", "index.html"),
      "utf8"
    );

  it("job-search intro gone", () => {
    expect(indexHtml()).not.toContain("I'm currently looking for a new role");
    expect(testAssignmentPage()).not.toContain(
      "I'm currently looking for a new role"
    );
  });

  it("permission folded into the opening sentence", () => {
    expect(testAssignmentPage()).toContain(
      "I'm sharing, with permission from the company, a walkthrough"
    );
  });

  it("figcaption gone but the Vimeo iframe stays", () => {
    const page = testAssignmentPage();
    expect(page).not.toContain("Walkthrough: component structure");
    expect(page).toContain("player.vimeo.com/video/1132866645");
  });

  it("onyx images live", () => {
    const work = workHtml();
    expect(work).toContain("pegasus_kiosk_card.png");
    expect(work).toContain("pegasus_kiosk.png");
    expect(existsSync(join(siteDir, "assets", "images", "pegasus_kiosk_card.png"))).toBe(true);
    expect(existsSync(join(siteDir, "assets", "images", "pegasus_kiosk.png"))).toBe(true);
  });

  it("onyx reads as the current role", () => {
    // Owner-confirmed start year is 2026 (the step's prose guide, not its stale
    // "2024" test string). See plan/notes-for-pr.md, Step 08.
    const work = workHtml();
    expect(work).toContain("2026 — present");
    expect(work).toContain("am now contributing to Stage 2");
  });
});

describe("step 10 — cleanup", () => {
  it("no stale post data source", () => {
    // _data/posts.yml is gone and no build source still references site.data.posts.
    // (plan/ docs legitimately mention the retired source; they are excluded from the build.)
    expect(existsSync(join(repoDir, "_data", "posts.yml"))).toBe(false);
    const buildSources = [
      "index.markdown",
      join("_layouts", "post.html"),
      join("_layouts", "main.html"),
      join("_includes", "post-card.html"),
    ];
    for (const rel of buildSources) {
      expect(readFileSync(join(repoDir, rel), "utf8")).not.toContain(
        "site.data.posts"
      );
    }
  });

  it("no orphaned expand/collapse markup remains on home", () => {
    const html = indexHtml();
    expect(html).not.toContain("additional-project");
    expect(html).not.toContain("toggleProjects");
  });
});
