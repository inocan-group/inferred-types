import { describe, expect, it } from "vitest";

import { Expect, IsScalar, Scalar, Test } from "inferred-types/types";
import { isScalar } from "inferred-types/runtime"



describe("IsScalar<T>", () => {

  it("happy path", () => {
    type T1 = IsScalar<1>;
    type T2 = IsScalar<"foo">;
    type T3 = IsScalar<string>;
    type T4 = IsScalar<null>;
    type T5 = IsScalar<undefined>;

    type F2 = IsScalar<{}>;
    type F3 = IsScalar<string[]>;
    type F4 = IsScalar<{ foo: 1 }>;
    type F5 = IsScalar<object>;
    type F6 = IsScalar<never>;

    type cases = [
      Expect<Test<T1, "equals",  true>>,
      Expect<Test<T2, "equals",  true>>,
      Expect<Test<T3, "equals",  true>>,
      Expect<Test<T4, "equals",  true>>,
      Expect<Test<T5, "equals",  true>>,

      Expect<Test<F2, "equals",  false>>,
      Expect<Test<F3, "equals",  false>>,
      Expect<Test<F4, "equals",  false>>,
      Expect<Test<F5, "equals",  false>>,
      Expect<Test<F6, "equals",  false>>,
    ];
  });


  it("addressing union types", () => {
    type SomeScalar = IsScalar<number | number[]>;
    type AllScalarUnion = IsScalar<44 | 55>;
    type None = IsScalar<string[] | number[]>;

    type cases = [
      Expect<Test<SomeScalar, "equals",  boolean>>,
      Expect<Test<AllScalarUnion, "equals",  true>>,
      Expect<Test<None, "equals",  false>>,
    ];
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
    const f4 = isScalar({ foo: 1 });
    const f5 = isScalar({ foo: 1 } as object);

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

    if (isScalar(val)) {
      type Val = typeof val;
      expect(true).toBe(true);

      type cases = [
        Expect<Test<Val, "equals",  Scalar>>
      ];
      const cases: cases = [true];
    } else {
      expect(true, "isScalar() not working").toBe(false);
    }

  });


});
