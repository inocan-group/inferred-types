import { filter } from "src/runtime";
import { Equal, Expect } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";

describe("filter() utility function", () => {
  it("string filter built and gives proper types", () => {
    const f = filter({ startsWith: "th" });
    type P = Parameters<typeof f>;
    type R = ReturnType<typeof f>;
    const notPrivate = filter({ not: { startsWith: ["_", "."] } });

    // runtime
    expect(typeof f).toEqual("function");
    expect(["one", "two", "three"].filter(f)).toEqual(["three"]);
    expect(["foo.md", "bar.html", "_private.md", ".bobs-your-uncle.txt"].filter(notPrivate)) //
      .toEqual(["foo.md", "bar.html"]);

    // design time
    type cases = [
      Expect<Equal<P[0], string | undefined>>, //
      Expect<Equal<R, boolean>>
    ];
    const cases: cases = [true, true];
  });

  it("numeric filter built and gives proper types", () => {
    const f = filter({ equals: 42 });
    type P = Parameters<typeof f>;
    type R = ReturnType<typeof f>;

    // runtime
    expect(typeof f).toEqual("function");
    expect([1, 2, 3, 4, 5].filter(filter({ greaterThan: 3 }))) //
      .toEqual([4, 5]);
    expect([1, 2, 3, 4, 5].filter(filter({ not: { greaterThan: 3 } }))) //
      .toEqual([1, 2, 3]);

    // design time
    type cases = [
      Expect<Equal<P[0], number | undefined>>, //
      Expect<Equal<R, boolean>>
    ];
    const cases: cases = [true, true];
  });

  it("string filter's startsWith", () => {
    const f = filter({ startsWith: "." });
    const remaining = ["foo", "bar", ".baz"].filter(f);

    expect(remaining).toEqual([".baz"]);
  });
});
