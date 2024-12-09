/* eslint-disable ts/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { isScalar, IsScalar, Scalar} from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsScalar<T>", () => {

  it("happy path", () => {
    type T1 = IsScalar<1>;
    type T2 = IsScalar<"foo">;
    type T3 = IsScalar<string>;
    type T4 = IsScalar<null>;

    type F1 = IsScalar<undefined>;
    type F2 = IsScalar<{}>;
    type F3 = IsScalar<string[]>;
    type F4 = IsScalar<{foo: 1}>;
    type F5 = IsScalar<object>;
    type F6 = IsScalar<never>;

    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<T3, true>>,
      Expect<Equal<T4, true>>,

      Expect<Equal<F1, false>>,
      Expect<Equal<F2, false>>,
      Expect<Equal<F3, false>>,
      Expect<Equal<F4, false>>,
      Expect<Equal<F5, false>>,
      Expect<Equal<F6, false>>,
    ];
    const cases: cases = [
      true, true, true, true,
      true, true, true, true, true, true
    ];
  });


  it("dealing with unions", () => {
    type MixedUnion = IsScalar<number | number[]>;
    type AllScalarUnion = IsScalar<44 | 55>;
    type None = IsScalar<string[] | number[]>;

    type cases = [
      Expect<Equal<MixedUnion, boolean>>,
      Expect<Equal<AllScalarUnion, true>>,
      Expect<Equal<None, false>>,
    ];
    const cases: cases = [ true, true, true ];
  });


});

describe("isScalar(value) runtime type guard", () => {

  it("happy path for runtime", () => {
    const t1 = isScalar(1);
    const t2 = isScalar("foo");
    const t3 = isScalar(Symbol("test"));
    const t4 = isScalar(null);

    const f1 = isScalar(undefined);
    const f2 = isScalar({});
    const f3 = isScalar([] as string[]);
    const f4 = isScalar({foo: 1});
    const f5 = isScalar({foo: 1} as object);

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(t3).toBe(true);
    expect(t4).toBe(true);

    expect(f1).toBe(false);
    expect(f2).toBe(false);
    expect(f3).toBe(false);
    expect(f4).toBe(false);
    expect(f5).toBe(false);
    expect(f1).toBe(false);
  });


  it("types at runtime", () => {
    const val: unknown = 42 as unknown;

    if(isScalar(val)) {
      type Val = typeof val;
      expect(true).toBe(true);

      type cases = [
        Expect<Equal<Val, Scalar>>
      ];
      const cases: cases = [ true ];
    } else {
      expect(true, "isScalar() not working").toBe(false);
    }

  });


});
