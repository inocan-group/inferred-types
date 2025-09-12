import { describe, it } from "vitest";
import { narrow } from "inferred-types/runtime";
import type { Expect, Narrowable, Test } from "inferred-types/types";

describe("Narrowable", () => {

  it("Narrowable<T>", () => {
    type Num = Narrowable & number;
    type Str = Narrowable & string;
    type NumericLiteral = Narrowable & 42;
    type StringLiteral = Narrowable & "foo";
    type Obj = object & Narrowable;

    type cases = [
      Expect<Test<Num, "equals",  number>>,
      Expect<Test<Str, "equals",  string>>,
      Expect<Test<NumericLiteral, "equals",  42>>,
      Expect<Test<StringLiteral, "equals",  "foo">>,
      Expect<Test<Obj, "equals",  object>>,
    ];
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
      Expect<Test<typeof stringLiteral, "equals",  "foo">>,
      Expect<Test<typeof numericLiteral, "equals",  42>>,

      Expect<Test<typeof obj, "equals",  { foo: 1; bar: 2; baz: number[] }>>,

      Expect<Test<typeof stringTuple1, "equals", readonly ["foo",  "bar"]>>,
      Expect<Test<typeof stringTuple2, "equals", readonly ["foo",  "bar"]>>,
      Expect<Test<typeof stringTuple3, "equals", readonly ["foo",  "bar"]>>,
      Expect<Test<typeof stringTuple4, "equals", readonly ["foo",  "bar"]>>,

      Expect<Test<typeof mixedTuple1, "equals", readonly ["foo", 42]>>,
      Expect<Test<typeof mixedTuple2, "equals", readonly ["foo", 42]>>,
      Expect<Test<typeof mixedTuple3, "equals", readonly ["foo", 42]>>,
    ];
  });

});
