import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { CsvToStrUnion, CsvToTuple, CsvToTupleStr, CsvToUnion } from "../../src/types/numeric-literals/CsvToTuple";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("CsvToTuple", () => {

  it("happy path", () => {
    type OneTwoThree = CsvToTuple<"1,2,3">;
    type OneTwoThreeAlt = CsvToTuple<"1, 2, 3">;
    type OneTwoThreeStr = CsvToTupleStr<"1, 2, 3">;

    type FooBarBaz = CsvToTuple<"foo,bar,baz">;
    type Mixed = CsvToTuple<"foo, 42, 56,bar">;

    type cases = [
      Expect<Equal<OneTwoThree, [1,2,3]>>,
      Expect<Equal<OneTwoThreeAlt, [1,2,3]>>,
      Expect<Equal<OneTwoThreeStr, ["1","2","3"]>>,

      Expect<Equal<FooBarBaz, ["foo","bar","baz"]>>,
      Expect<Equal<Mixed, ["foo", 42, 56, "bar"]>>,

    ];
    const cases: cases = [
      true, true, true,
      true, true
    ];
  });

});

describe("CsvToUnion", () => {

  it("happy path", () => {
    type OneTwoThree = CsvToUnion<"1,2,3">;
    type OneTwoThreeAlt = CsvToUnion<"1, 2, 3">;
    type Mixed = CsvToUnion<"foo, 42, 56,bar">;
    type MixedAsStr = CsvToStrUnion<"foo, 42, 56,bar">;

    type cases = [
      Expect<Equal<OneTwoThree, 1|2|3>>,
      Expect<Equal<OneTwoThreeAlt, 1|2|3>>,
      Expect<Equal<Mixed, "foo"|"bar"|42|56>>,
      Expect<Equal<MixedAsStr, "foo"|"bar"|"42"|"56">>,
    ]

    const cases: cases = [
      true, true, true, true
    ];

  });

});

