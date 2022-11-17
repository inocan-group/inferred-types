import { describe, it, expect } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import { box, BoxedFnParams, BoxValue, unbox } from "src/runtime";
import { First } from "src/types/First";

// [Instantiation Expressions](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7-beta/#instantiation-expressions)

describe("boxing / unboxing", () => {
  it("box a function with generic", () => {
    const fn = <T extends string>(i: T) => `Hello ${i}` as const;
    const b = box(fn);
    const r = unbox(b)<"foo" | "bar">;
    const t = r("foo");

    const b2 = box(42);
    const r2 = unbox(b2);

    expect(t).toBe("Hello foo");

    type B = typeof b;
    type BV = BoxValue<B>;
    type BF = First<BoxedFnParams<B>>;
  });
});
