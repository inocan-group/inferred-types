import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { CreateLookup, IsNever } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("CreateLookup<TPayload,TKeyProp,TValProp>", () => {
  type Tup = [
    {name: "foo"; value: 12; color: "red"; rank: 100},
    {name: "bar"; value: 53; color: "blue"; rank: 120},
    {name: "baz"; value: 12; color: "green"; rank: 1},
  ]

  it("happy path", () => {
    type LName = CreateLookup<Tup, "name", "value">;
    type LColor = CreateLookup<Tup, "color", "value">;
    type LValue = CreateLookup<Tup, "value", "name">; // non-unique key
    type LRank = CreateLookup<Tup, "rank", "value">; // numeric key converted
    
    type cases = [
      Expect<Equal<LName, {foo: 12; bar: 53; baz: 12}>>,
      Expect<Equal<LColor, {red: 12; blue: 53; green: 12}>>,
      ExpectTrue<IsNever<LValue>>,
      Expect<Equal<LRank, {100: 12; 120: 53; 1: 12}>>,
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });

});
