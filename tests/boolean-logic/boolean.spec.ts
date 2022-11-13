import { describe, it, expect } from "vitest";
// import type { Equal, Expect } from "@type-challenges/utils";
import { and, filter } from "src/runtime";

describe("boolean logic", () => {
  it("AND operation", () => {
    const a1 = and(
      () => true,
      () => false
    );
    const a2 = and(
      () => true,
      () => true
    );
    const md = and(filter({ endsWith: ".md" }), filter({ not: { startsWith: "_" } }));

    expect(a1()).toBe(false);
    expect(a2()).toBe(true);
    expect(["foo.md", "bar.html", "_baz.md"].filter(md)).toEqual(["foo.md"]);
  });
});
