import { describe, expect, it } from "vitest";
import { isVisible, tagFromHash, hashFromTag } from "../assets/js/feed-filter.js";

describe("feed-filter pure functions", () => {
  it("isVisible all", () => {
    expect(isVisible("thoughts", "all")).toBe(true);
    expect(isVisible("making", null)).toBe(true);
  });

  it("isVisible match", () => {
    expect(isVisible("making", "making")).toBe(true);
    expect(isVisible("thoughts extra", "making")).toBe(false);
  });

  it("isVisible multi-tag", () => {
    expect(isVisible("making ai", "ai")).toBe(true);
  });

  it("tagFromHash roundtrip", () => {
    expect(tagFromHash("#tag=making")).toBe("making");
    expect(tagFromHash("#footer")).toBe(null);
    expect(tagFromHash(hashFromTag("thoughts"))).toBe("thoughts");
  });

  it("hashFromTag null", () => {
    expect(hashFromTag(null)).toBe("");
  });
});
