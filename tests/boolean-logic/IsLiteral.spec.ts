import { describe, expect, it } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import { IfLiteral, IsBooleanLiteral, IsLiteral, IsOptionalLiteral } from "src/types";

describe("IsLiteral<T> type utility", () => {
  it("string values", () => {
    const s = "hi" as string;
    const sl = "hi" as const;

    type cases = [
      Expect<Equal<IsLiteral<typeof s>, false>>,
      Expect<Equal<IsLiteral<typeof sl>, true>>
    ];
    const cases: cases = [true, true];
    expect(typeof s).toBe("string");
    expect(typeof sl).toBe("string");
  });

  it("numeric values", () => {
    const v = 42 as number;
    const vl = 42 as const;

    type cases = [
      Expect<Equal<IsLiteral<typeof v>, false>>,
      Expect<Equal<IsLiteral<typeof vl>, true>>
    ];
    const cases: cases = [true, true];

    expect(typeof v).toBe("number");
    expect(typeof vl).toBe("number");
  });

  it("boolean values", () => {
    const v = true as boolean;
    const vl = false as const;

    type cases = [
      // wide
      Expect<Equal<IsBooleanLiteral<typeof v>, false>>,
      Expect<Equal<IsLiteral<typeof v>, false>>,
      // literal
      Expect<Equal<IsBooleanLiteral<typeof vl>, true>>,
      Expect<Equal<IsLiteral<typeof vl>, true>>
    ];
    const cases: cases = [true, true, true, true];
    expect(typeof v).toBe("boolean");
    expect(typeof vl).toBe("boolean");
  });

  it("union with undefined", () => {
    const vb = true as true | undefined;
    const vs = "foo" as "foo" | undefined;
    const vn = 42 as 42 | undefined;

    type cases = [
      Expect<Equal<IsLiteral<Exclude<typeof vb, undefined>>, true>>, //
      Expect<Equal<IsLiteral<Exclude<typeof vs, undefined>>, true>>, //
      Expect<Equal<IsLiteral<Exclude<typeof vn, undefined>>, true>>, //
      Expect<Equal<IsOptionalLiteral<typeof vb>, true>>, //
      Expect<Equal<IsOptionalLiteral<typeof vs>, true>>, //
      Expect<Equal<IsOptionalLiteral<typeof vn>, true>> //
    ];
    const cases: cases = [true, true, true, true, true, true];
  });
});

describe("IfLiteral<T,IF,ELSE,MAYBE>", () => {

  it("happy-path", () => {
    type T1 = IfLiteral<"foo", true, false>;
    type T2 = IfLiteral<true, true, false>;
    type T3 = IfLiteral<false, true, false>;
    type T4 = IfLiteral<42, true, false>;

    type F1 = IfLiteral<string, true, false>;
    type F2 = IfLiteral<boolean, true, false>;
    type F3 = IfLiteral<number, true, false>;

    type cases = [
      //
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<T3, true>>,
      Expect<Equal<T4, true>>,
      Expect<Equal<F1, false>>,
      Expect<Equal<F2, false>>,
      Expect<Equal<F3, false>>,
    ];
    
    const cases: cases = [ true, true, true, true, true, true, true ];

  });

});
