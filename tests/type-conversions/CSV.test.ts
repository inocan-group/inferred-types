import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import type { CsvToJsonTuple, CsvToStrUnion, CsvToTuple, CsvToTupleStr, CsvToUnion, Test } from "inferred-types/types";

import { csv } from "inferred-types/runtime";

describe("CsvToTuple<T> and CsvToTupleStr<T>", () => {

  it("happy path", () => {
    type OneTwoThree = CsvToTuple<"1,2,3">;
    type OneTwoThreeAlt = CsvToTuple<"1, 2, 3">;
    type OneTwoThreeStr = CsvToTupleStr<"1, 2, 3">;

    type FooBarBaz = CsvToTuple<"foo,bar,baz">;
    type Mixed = CsvToTuple<"foo, 42, 56,bar">;

    type cases = [
      Expect<Test<OneTwoThree,"equals", [1, 2,  3]>>,
      Expect<Test<OneTwoThreeAlt,"equals", [1, 2,  3]>>,
      Expect<Test<OneTwoThreeStr,"equals", ["1", "2",  "3"]>>,

      Expect<Test<FooBarBaz,"equals", ["foo", "bar",  "baz"]>>,
      Expect<Test<Mixed,"equals", ["foo", 42, 56,  "bar"]>>,

    ];
  });
});

describe("CsvToJsonTuple<T>", () => {

  it("happy path", () => {
    type OneTwoThree = CsvToJsonTuple<"1,2,3">;
    type FooBarBaz = CsvToJsonTuple<"foo,bar,baz">;
    type Mixed = CsvToJsonTuple<"foo, 42, 56,bar">;

    type cases = [
      Expect<Test<OneTwoThree, "equals", [1, 2,  3]>>,
      Expect<Test<FooBarBaz, "equals", ["\"foo\"", "\"bar\"",  "\"baz\""]>>,
      Expect<Test<Mixed, "equals", ["\"foo\"", 42, 56,  "\"bar\""]>>,
    ];
  });

});

describe("CsvToUnion<T> and CsvToStrUnion<T>", () => {

  it("happy path", () => {
    type OneTwoThree = CsvToUnion<"1,2,3">;
    type OneTwoThreeAlt = CsvToUnion<"1, 2, 3">;
    type Mixed = CsvToUnion<"foo, 42, 56,bar">;
    type MixedAsStr = CsvToStrUnion<"foo, 42, 56,bar">;

    type cases = [
      Expect<Test<OneTwoThree, "equals",  1 | 2 | 3>>,
      Expect<Test<OneTwoThreeAlt, "equals",  1 | 2 | 3>>,
      Expect<Test<Mixed, "equals",  "foo" | "bar" | 42 | 56>>,
      Expect<Test<MixedAsStr, "equals",  "foo" | "bar" | "42" | "56">>,
    ]

  });

});

describe("csv(content,format) runtime", () => {

  it("happy path", () => {
    const abc = csv("a,b, c,42");
    const abcJson = csv("a,b,c,42", "json-tuple");
    const abcStr = csv("a,b,c,42", "string-tuple");
    const bool = csv("foo,true, false, true", "json-tuple")

    expect(abc).toEqual(["a", "b", "c", 42])
    expect(abcJson).toEqual(["\"a\"", "\"b\"", "\"c\"", 42])
    expect(abcStr).toEqual(["a", "b", "c", "42"])
    expect(bool).toEqual(["\"foo\"", true, false, true])

    type cases = [
      Expect<Test<typeof abc, "equals", ["a", "b", "c",  42]>>,
      Expect<Test<typeof abcJson, "equals", ["\"a\"", "\"b\"", "\"c\"",  42]>>,
      Expect<Test<typeof abcStr, "equals", ["a", "b", "c",  "42"]>>,
      Expect<Test<typeof bool, "equals", ["\"foo\"", true, false,  true]>>,
    ];
  });

});
