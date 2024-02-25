import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IndexesOfStr, IndexesOfStrWithMeta } from "../../src/types/string-literals/IndexesOfStr";
import {  UpperAlphaChar } from "../../src/inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IndexesOfStr<TStr,TIndex>", () => {

  it("happy path", () => {
    type UnionIndex = IndexesOfStr<"fooBarBaz", UpperAlphaChar>;
    type LiteralIndex = IndexesOfStr<"fooBarBaz", "B">;
    type MissingIndex = IndexesOfStr<"fooBarBaz", "X">;
    type EmptyString = IndexesOfStr<"", "a">;
    type MultiChar = IndexesOfStr<"foo, bar", ", ">;

    type cases = [
      Expect<Equal<UnionIndex, [3,6]>>,
      Expect<Equal<LiteralIndex, [3,6]>>,
      Expect<Equal<MissingIndex, []>>,
      Expect<Equal<EmptyString, []>>,
      Expect<Equal<MultiChar, [3]>>
    ];
    const cases: cases = [
      true, true, true, true, true
    ];
  });

  it("indexation on more than one character", () => {
    type Comma = IndexesOfStr<"foo, bar, baz", ", ">;
    
    type cases = [
      Expect<Equal<Comma, [3,6]>>
    ];
    const cases: cases = [ true ];
    
  });

});

describe("IndexesOfStrWithMeta<TStr,TIndex>", () => {

  it("happy path", () => {
    type UnionIndex = IndexesOfStrWithMeta<"fooBarBaz", UpperAlphaChar>;
    type LiteralIndex = IndexesOfStrWithMeta<"fooBarBaz", "B">;
    type MissingIndex = IndexesOfStrWithMeta<"fooBarBaz", "X">;
    type EmptyString = IndexesOfStrWithMeta<"", "a">;

    type cases = [
      Expect<Equal<UnionIndex, [["B", 3, 1], ["B", 6, 1]]>>,
      Expect<Equal<LiteralIndex, [["B", 3, 1], ["B", 6, 1]]>>,
      Expect<Equal<MissingIndex, []>>,
      Expect<Equal<EmptyString, []>>,

    ];
    const cases: cases = [
      true, true, true, true
    ];
  });

  
  it("indexation on more than one character", () => {
    type Comma = IndexesOfStrWithMeta<"foo, bar, baz", ", ">;
    
    type cases = [
      Expect<Equal<Comma, [[", ", 3, 2],[", ", 6, 2]]>>
    ];
    const cases: cases = [ true ];
    
  });
  

});
