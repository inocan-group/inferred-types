import { describe, it, expect } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import { Box, box, BoxedFnParams, BoxValue, unbox } from "src/runtime";
import { First } from "types/lists/First";

// [Instantiation Expressions](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7-beta/#instantiation-expressions)

// this exercise was started around the time that Instantiation expressions
// were first introduced and with the hope that this would help narrow functions
// which have an inner generic that provides narrow typing.

describe("boxing / unboxing", () => {
  it("box a function with generic", () => {
    const fn = <T extends string>(i: T) => `Hello ${i}` as const;
    const b = box(fn);
    const globalUnbox = unbox(b);
    type UB = typeof globalUnbox;
    const usingValue = b.value("foo");
    const unboxedNarrow = b.unbox("foo");
    const unboxedWide = b.unbox("foo" as string);

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
    expect(
      typeof globalUnbox,
      `using unbox(fn) should have returned function: ${globalUnbox}`
    ).toBe("function");
    expect(usingValue).toBe("Hello foo");
    expect(unboxedNarrow).toBe("Hello foo");
    expect(unboxedWide).toBe("Hello foo");

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
      /** this uses the VALUE prop and provides the TARGET resolution for unbox */
      Expect<Equal<typeof usingValue, "Hello foo">>,
      /**
       * using the passthrough feature of `b.unbox(val)` we would ideally like to
       * get same narrow type as test above but it is reduced to an "ok" level for
       * now
       */
      Expect<Equal<typeof unboxedNarrow, `Hello ${string}`>>,
      /**
       * Note, however, that the wide value of string passed in resolves in the same
       * manner which helps to point to where resolution is being lost
       */
      Expect<Equal<typeof unboxedWide, `Hello ${string}`>>,

      // NUMBER BOXes
      Expect<Equal<BN, Box<42>>>,
      /** unboxing preserves numeric literal */
      Expect<Equal<RN, 42>>,
      /** can pick off the value prop for same type */
      Expect<Equal<RN2, 42>>,

      // HYBRID
      Expect<Equal<HV, Hybrid>>
    ];
    const cases: cases = [true, true, true, true, true, true, true, true, true, true, true];
  });
});
