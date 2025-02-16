import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { narrow } from "inferred-types/runtime";
import { Narrowable } from "inferred-types/types";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Narrowable", () => {

  it("Narrowable<T>", () => {
    type Num = Narrowable & number;
    type Str = Narrowable & string;
    type NumericLiteral = Narrowable & 42;
    type StringLiteral = Narrowable & "foo";
    type Obj = object & Narrowable;

    type cases = [
      Expect<Equal<Num, number>>,
      Expect<Equal<Str, string>>,
      Expect<Equal<NumericLiteral, 42>>,
      Expect<Equal<StringLiteral, "foo">>,
      Expect<Equal<Obj, object>>,
    ];
    const cases: cases = [true, true, true, true, true];
  });


  it("narrow() runtime util", () => {
    const stringLiteral = narrow("foo");
    const numericLiteral = narrow(42);

    const obj = narrow({ foo: 1, bar: 2, baz: [1, 2, 3] });
    const arr = narrow("foo", "bar");

    const stringTuple1 = narrow(["foo", "bar"] as const);
    const stringTuple2 = narrow(["foo", "bar"]);
    const stringTuple3 = narrow("foo", "bar");
    const stringTuple4 = narrow(...arr);

    const mixedTuple1 = narrow(["foo", 42] as const);
    const mixedTuple2 = narrow(["foo", 42]);
    const mixedTuple3 = narrow("foo", 42);

    type cases = [
      Expect<Equal<typeof stringLiteral, "foo">>,
      Expect<Equal<typeof numericLiteral, 42>>,

      Expect<Equal<typeof obj, { foo: 1; bar: 2; baz: number[] }>>,

      Expect<Equal<typeof stringTuple1, readonly ["foo", "bar"]>>,
      Expect<Equal<typeof stringTuple2, readonly ["foo", "bar"]>>,
      Expect<Equal<typeof stringTuple3, readonly ["foo", "bar"]>>,
      Expect<Equal<typeof stringTuple4, readonly ["foo", "bar"]>>,

      Expect<Equal<typeof mixedTuple1, readonly ["foo", 42]>>,
      Expect<Equal<typeof mixedTuple2, readonly ["foo", 42]>>,
      Expect<Equal<typeof mixedTuple3, readonly ["foo", 42]>>,
    ];
    const cases: cases = [
      true, true, true, true, true,
      true, true, true, true, true
    ];
  });

});
