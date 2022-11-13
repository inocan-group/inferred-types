import { Equal, Expect } from "@type-challenges/utils";
import { merge } from "src/runtime/dictionary/merge";
import { describe, expect, it } from "vitest";

describe("merge() utility", () => {
  it("merge to scalars/undefined", () => {
    const m1 = merge(undefined, 6);
    const m2 = merge(42, 6);

    expect(m1).toBe(6);
    expect(m2).toBe(42);

    type cases = [
      Expect<Equal<typeof m1, 6>>, //
      Expect<Equal<typeof m2, 42>>
    ];
    const cases: cases = [true, true];
  });

  it("merge two objects", () => {
    const o1 = merge(
      { foo: "foo", baz: false, color: { fav: undefined, next: "green" } } as const,
      { foo: "bar", bar: 42, color: { fav: "red", next: "" as string } } as const
    );
    type O1 = typeof o1;

    // runtime
    expect(o1.foo).toBe("foo");
    expect(o1.bar).toBe(42);
    expect(o1.color.fav).toBe("red");
    expect(o1.color.next).toBe("green");

    // design time
    type cases = [
      Expect<Equal<O1["foo"], "foo">>, //
      Expect<Equal<O1["bar"], 42>>,
      Expect<Equal<O1["color"], { fav: "red"; next: "green" }>>
    ];
    const cases: cases = [true, true, true];
  });
});
