import { describe, it, expect } from "vitest";

import { keysOf, kv } from "../../src/runtime";

describe("kv utils", () => {
  it("simple assignment works with strong literal support", () => {
    const t1 = kv("foo", { a: 1, b: 2, c: "hi" });
    const t2 = kv("bar", true);

    expect(typeof t1).toBe("object");
    expect(typeof t2).toBe("object");

    expect(keysOf(t1)).toContain("foo");
    expect(t1.foo.a).toBe(1);
    expect(t1.foo.c).toBe("hi");

    expect(keysOf(t2)).toContain("bar");
    expect(t2.bar).toBe(true);
  });
});
