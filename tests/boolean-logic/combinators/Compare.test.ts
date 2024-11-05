import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { Compare, IsBoolean,  UpperAlphaChar, IsFalse } from "inferred-types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Compare<TVal,TOp,TComparator", () => {

  it("happy path", () => {
    type T1 = Compare<42, "extends", number>;
    type T2 = Compare<42, "equals", 42>;
    type T3 = Compare<420, "startsWith", 42>;
    type T4 = Compare<"foobar", "startsWith", "foo">;
    type T5 = Compare<["foo","bar"], "contains", "bar">;
    type T6 = Compare<"Foo", "startsWith", UpperAlphaChar>;
    type T7 = Compare<42, "greaterThan", 30>;

    type F1 = Compare<number, "extends", 42>;
    type F2 = Compare<["foo","bar"], "contains", "baz">;
    type F3 = Compare<"foo", "startsWith", UpperAlphaChar>;

    type O1 = Compare<"foobar", "greaterThan", 42>;
    type O2 = Compare<number, "greaterThan", 42>;
    type O3 = Compare<string, "startsWith", "foo">;


    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,
      ExpectTrue<T5>,
      ExpectTrue<T6>,
      ExpectTrue<T7>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,

      IsFalse<O1>,
      IsBoolean<O2>,
      IsBoolean<O3>
    ];
    const cases: cases = [
      true, true, true, true, true, true,true,
      false,false, false,
      true, true, true
    ];
  });

});

