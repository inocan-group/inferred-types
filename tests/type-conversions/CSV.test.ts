import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import {
  CsvToJsonTuple,
  CsvToStrUnion,
  CsvToTuple,
  CsvToTupleStr,
  CsvToUnion
} from "inferred-types/types";
import { csv } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("CsvToTuple<T> and CsvToTupleStr<T>", () => {

  it("happy path", () => {
    type OneTwoThree = CsvToTuple<"1,2,3">;
    type OneTwoThreeAlt = CsvToTuple<"1, 2, 3">;
    type OneTwoThreeStr = CsvToTupleStr<"1, 2, 3">;

    type FooBarBaz = CsvToTuple<"foo,bar,baz">;
    type Mixed = CsvToTuple<"foo, 42, 56,bar">;

    type cases = [
      Expect<Equal<OneTwoThree, [1, 2, 3]>>,
      Expect<Equal<OneTwoThreeAlt, [1, 2, 3]>>,
      Expect<Equal<OneTwoThreeStr, ["1", "2", "3"]>>,

      Expect<Equal<FooBarBaz, ["foo", "bar", "baz"]>>,
      Expect<Equal<Mixed, ["foo", 42, 56, "bar"]>>,

    ];
    const cases: cases = [
      true, true, true,
      true, true
    ];
  });
});

describe("CsvToJsonTuple<T>", () => {

  it("happy path", () => {
    type OneTwoThree = CsvToJsonTuple<"1,2,3">;
    type FooBarBaz = CsvToJsonTuple<"foo,bar,baz">;
    type Mixed = CsvToJsonTuple<"foo, 42, 56,bar">;

    type cases = [
      Expect<Equal<OneTwoThree, [1, 2, 3]>>,
      Expect<Equal<FooBarBaz, ["\"foo\"", "\"bar\"", "\"baz\""]>>,
      Expect<Equal<Mixed, ["\"foo\"", 42, 56, "\"bar\""]>>,
    ];
    const cases: cases = [
      true, true, true
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
      Expect<Equal<OneTwoThree, 1 | 2 | 3>>,
      Expect<Equal<OneTwoThreeAlt, 1 | 2 | 3>>,
      Expect<Equal<Mixed, "foo" | "bar" | 42 | 56>>,
      Expect<Equal<MixedAsStr, "foo" | "bar" | "42" | "56">>,
    ]

    const cases: cases = [
      true, true, true, true
    ];

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
      Expect<Equal<typeof abc, ["a", "b", "c", 42]>>,
      Expect<Equal<typeof abcJson, ["\"a\"", "\"b\"", "\"c\"", 42]>>,
      Expect<Equal<typeof abcStr, ["a", "b", "c", "42"]>>,
      Expect<Equal<typeof bool, ["\"foo\"", true, false, true]>>,
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });

});
