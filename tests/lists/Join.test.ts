import { describe, expect, it } from "vitest";
import { Expect, Join , EnsureLeading, Test } from "inferred-types/types";
import {  Joiner, joinWith } from "inferred-types/runtime";

describe("Join<T,S>", () => {

  it("happy path", () => {
    type T1 = Join<["foo", "bar"]>;
    type T2 = Join<["foo", "bar"], "\n">;
    type T3 = Join<[EnsureLeading<"foo", "- ">, EnsureLeading<"bar", "- ">], "\n">;
    type IgnoreBlanks = Join<["foo", "", "bar", "","baz", ""], ",">;
    type IgnoreBlanks2 = Join<["foo", ""], ",">;


    type cases = [
      Expect<Test<T1, "equals",  "foobar">>,
      Expect<Test<T2, "equals",  "foo\nbar">>,
      Expect<Test<T3, "equals",  "- foo\n- bar">>,
      Expect<Test<IgnoreBlanks, "equals", "foo,bar,baz">>,
      Expect<Test<IgnoreBlanks2, "equals",  "foo">>,
    ];
  });


  it("non-string types", () => {
    type Arr1 = Join<[1,2,never,3]>;
    type Mixed = Join<[true,false,boolean,42]>;

    type cases = [
      Expect<Test<Arr1, "equals",  "123">>,
      Expect<Test<
        Mixed,
        "equals",
        "truefalsefalse42" | "truefalsetrue42"
      >>
    ];
  });


  it("truncation tests when using TMax generic", () => {
    type NoTrunc = Join<[1,2,3], ", ", 4>;
    type WithTrunc = Join<[1,2,3,4,5], ", ", 3>;
    type CustomEllipsis = Join<[1,2,3,4,5], ", ", 3, "... more">;
    type NoEllipsis = Join<[1,2,3,4,5], ", ", 3, false>;

    type cases = [
      Expect<Test<NoTrunc, "equals", "1, 2, 3">>,
      Expect<Test<WithTrunc, "equals", "1, 2, 3, ...">>,
      Expect<Test<CustomEllipsis, "equals", "1, 2, 3, ... more">>,
      Expect<Test<NoEllipsis, "equals", "1, 2, 3">>,
    ];
  });

});

describe("joinWith()() runtime utility", () => {

  it("join happy path", () => {
    const helloWorld = joinWith("")("hello", " ", "world");
    expect(helloWorld).toBe("hello world");
    const list = joinWith(", ")("foo","bar","baz");
    expect(list).toBe("foo, bar, baz");

    const partial = joinWith(" | ");
    const complete = partial("foo","bar");
    expect(complete).toBe("foo | bar");

    type cases = [
      Expect<Test<typeof helloWorld, "equals",  "hello world">>,
      Expect<Test<typeof list, "equals",  "foo, bar, baz">>,
      Expect<Test<typeof partial, "equals",  Joiner<" | ">>>
    ];
  });

});

