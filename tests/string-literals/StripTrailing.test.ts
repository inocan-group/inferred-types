import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { StripTrailing } from "inferred-types";
import { stripTrailing } from "inferred-types";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("StripTrailing", () => {

  it("happy path", () => {
    type RemoveBar = StripTrailing<"FooBar","Bar">;
    type SameAsItEverWas = StripTrailing<"Foo","Bar">;
    type Num = StripTrailing<4000,"000">;

    type cases = [
      Expect<Equal<RemoveBar, "Foo">>,
      Expect<Equal<SameAsItEverWas, "Foo">>,
      Expect<Equal<Num, 4>>,
    ];
    const cases: cases = [
      true, true, true
    ];
  });


  it("numeric inputs", () => {
    type TheMeaning = StripTrailing<422, 2>;
    type NoChange = StripTrailing<42, 9>;

    type cases = [
      Expect<Equal<TheMeaning, 42>>,
      Expect<Equal<NoChange, 42>>,
    ];
    const cases: cases = [
      true, true
    ];
  });


  it("union stripper", () => {
    type Foo = StripTrailing<"foobar", "foo" | "bar">;

    type cases = [
      Expect<Equal<Foo, "foo">>
    ];
    const cases: cases = [
      true
    ];

  });



});


describe("stripTrailing() runtime", () => {

  it("happy path", () => {
    const foo = stripTrailing("foobar", "bar");
    const noChange = stripTrailing("foobar", "baz");

    expect(foo).toBe("foo");
    expect(noChange).toBe("foobar");


    type cases = [
      Expect<Equal<typeof foo, "foo">>,
      Expect<Equal<typeof noChange, "foobar">>,

    ];
    const cases: cases = [
      true, true
    ];
  });


  it("numeric inputs", () => {
    const theAnswer = stripTrailing(422, 2);

    expect(theAnswer).toBe(42);

    type cases = [
      Expect<Equal<typeof theAnswer, 42>>,
    ];
    const cases: cases = [
      true
    ];
  });


  it("multiple strippers", () => {
    const foo = stripTrailing("foobar", "foo", "bar");
    const foo2 = stripTrailing("foobar", "bar", "baz");

    expect(foo).toBe("foo");
    expect(foo2).toBe("foo");

    type cases = [
      Expect<Equal<typeof foo, "foo">>,
      Expect<Equal<typeof foo2, "foo">>,
    ];
    const cases: cases = [
      true, true
    ];

  });



});
