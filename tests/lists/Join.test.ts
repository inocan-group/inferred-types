import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { Join , EnsureLeading } from "inferred-types/types";
import {  Joiner, joinWith } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Join<T,S>", () => {

  it("happy path", () => {
    type T1 = Join<["foo", "bar"]>;
    type T2 = Join<["foo", "bar"], "\n">;
    type T3 = Join<[EnsureLeading<"foo", "- ">, EnsureLeading<"bar", "- ">], "\n">;
    type IgnoreBlanks = Join<["foo", "", "bar", "","baz", ""], ",">;
    type IgnoreBlanks2 = Join<["foo", ""], ",">;


    type cases = [
      Expect<Equal<T1, "foobar">>,
      Expect<Equal<T2, "foo\nbar">>,
      Expect<Equal<T3, "- foo\n- bar">>,
      Expect<Equal<IgnoreBlanks, "foo,bar,baz">>,
      Expect<Equal<IgnoreBlanks2, "foo">>,
    ];
    const cases: cases = [true, true, true, true, true];
  });


  it("non-string types", () => {
    type Arr1 = Join<[1,2,never,3]>;
    type Mixed = Join<[true,false,boolean,42]>;

    type cases = [
      Expect<Equal<Arr1, "123">>,
      Expect<Equal<
        Mixed,
        "truefalsefalse42" | "truefalsetrue42"
      >>
    ];
    const cases: cases = [ true, true ];

  });


  it("truncation tests when using TMax generic", () => {
    type NoTrunc = Join<[1,2,3], ", ", 4>;
    type WithTrunc = Join<[1,2,3,4,5], ", ", 3>;
    type CustomEllipsis = Join<[1,2,3,4,5], ", ", 3, "... more">;
    type NoEllipsis = Join<[1,2,3,4,5], ", ", 3, false>;

    type cases = [
      Expect<Equal<NoTrunc, "1, 2, 3">>,
      Expect<Equal<WithTrunc, "1, 2, 3, ...">>,
      Expect<Equal<CustomEllipsis, "1, 2, 3, ... more">>,
      Expect<Equal<NoEllipsis, "1, 2, 3">>,
    ];
    const cases: cases = [ true, true, true, true ];

  });

});

describe("joinWith()() runtime utility", () => {

  it("join happy path", () => {
    const helloWorld = joinWith("")("hello", " ", "world");
    expect(helloWorld).toBe("hello world");
    const list = joinWith(", ")("foo","bar","baz");
    expect(list).toBe("foo, bar, baz");

    const partial = joinWith(" | ");

    type cases = [
      Expect<Equal<typeof helloWorld, "hello world">>,
      Expect<Equal<typeof list, "foo, bar, baz">>,
      Expect<Equal<typeof partial, Joiner<" | ">>>
    ];
    const cases: cases = [ true, true, true ];

  });

});

