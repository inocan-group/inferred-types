import { describe, it, expect } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import { Box, box, BoxedFnParams, BoxValue } from "src/runtime";
import { First } from "src/types/lists/First";

// [Instantiation Expressions](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7-beta/#instantiation-expressions)

describe("boxing / unboxing", () => {
  // it("NarrowBox<B,N> utility", () => {
  //   const fn = <T extends string>(i: T) => `Hello ${i}` as const;
  //   const b = box(fn);
  //   const b2 = b.narrow<["foo" | "bar"]>();
  //   const b3 = b2("foo");

  //   type B = typeof b;
  // });

  it("box a function with generic", () => {
    const fn = <T extends string>(i: T) => `Hello ${i}` as const;
    const b = box(fn);
    const ub = b.unbox();
    type UB = typeof ub;
    const unboxedFn = b.unbox()("foo");
    const unboxedFn2 = b.unbox()("foo" as string);
    type UBF = typeof unboxedFn;
    type UBF2 = typeof unboxedFn2;

    const bn = box(42);
    type BN = typeof bn;
    const rn = bn.unbox();
    type RN = typeof rn;
    const rn2 = bn.value;
    type RN2 = typeof rn2;

    type Hybrid = 42 | 56 | typeof fn;
    const h = box(42 as Hybrid);
    type H = typeof h;
    type HV = H["value"];

    // runtime
    expect(typeof b).toBe("object");
    expect(typeof ub).toBe("function");
    expect(unboxedFn).toBe("Hello foo");

    expect(rn).toBe(42);
    expect(rn2).toBe(42);

    // type tests
    type B = typeof b;
    type BV = BoxValue<B>;
    type BF = First<BoxedFnParams<B>>;

    type cases = [
      // FUNCTIONS
      Expect<Equal<B, Box<typeof fn>>>,
      Expect<Equal<BV, typeof fn>>, //
      Expect<Equal<BF, string>>,
      /** unboxing fn results in same fn including generics */
      Expect<Equal<UB, typeof fn>>,
      /** generic for fn provides strong literal type after unboxing */
      Expect<Equal<UBF, "Hello foo">>,
      /** generic still provides some strong typing when a wide type is passed in */
      Expect<Equal<UBF2, `Hello ${string}`>>,

      // NUMBER BOXes
      Expect<Equal<BN, Box<42>>>,
      /** unboxing preserves numeric literal */
      Expect<Equal<RN, 42>>,
      /** can pick off the value prop for same type */
      Expect<Equal<RN2, 42>>,

      // HYBRID
      Expect<Equal<HV, Hybrid>>
    ];
    const cases: cases = [true, true, true, true, true, true, true, true, true, true];
  });
});
