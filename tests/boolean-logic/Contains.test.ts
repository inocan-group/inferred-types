import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import {  Contains, NarrowlyContains } from "src/types/index";
import { describe, it } from "vitest";

describe("Contains<T,A>", () => {
  it("Content is a tuple", () => {
    type T1 = [number, 32, 64, "foo"];
    type T2 = ["foo",false, true];
    type T3 = [42, 64, 128];
    type T4 = ["foo", "bar"];
    type T5 = ["foo", "bar", null, undefined];

    type cases = [
      // "foo" extends string so true
      Expect<Equal<Contains<T1, string>, true>>,
      // "bar" does NOT extend "foo"
      Expect<Equal<Contains<T1, "bar">, false>>,
      // T4 has literal string but this will match the wide type string
      Expect<Equal<Contains<T4, string>, true>>,
      // T1 has both wide and narrow versions of "number"
      Expect<Equal<Contains<T1, number>, true>>,
      // T3 has narrow versions of "number"
      Expect<Equal<Contains<T3, number>, true>>,
      // T3 has the numeric literal 128
      Expect<Equal<Contains<T3, 128>, true>>,
      // boolean literals evaluate to wide type
      Expect<Equal<Contains<T2, boolean>, true>>,
      Expect<Equal<Contains<T5, null>, true>>,
    ];
    const cases: cases = [true, true, true, true, true, true, true, true];
  });

  
  it("Using numeric literals", () => {
    type Found = Contains<2000, 2>;
    type Found2 = Contains<2000, "2">;
    type Found3 = Contains<"2000", 2>;

    type NotFound = Contains<2000, 1>;
    type NotFound2 = Contains<2000, "1">;
    type NotFound3 = Contains<"2000", 1>;
    
    type cases = [
      ExpectTrue<Found>,
      ExpectTrue<Found2>,
      ExpectTrue<Found3>,
      ExpectFalse<NotFound>,
      ExpectFalse<NotFound2>,
      ExpectFalse<NotFound3>,
    ];
    const cases: cases = [
      true, true, true,
      false, false, false
    ];
  });
  
  it("Content is a string", () => {
    type HasBar = Contains<"FooBar", "Bar">;
    type NoBar = Contains<"FooBaz", "Bar">;
    type WideContent = Contains<string, "Bar">;
    type WideContains = Contains<"FooBar", string>;
    
    type cases = [
      ExpectTrue<HasBar>,
      ExpectFalse<NoBar>,
      Expect<Equal<WideContent, boolean>>,
      ExpectTrue<WideContains>
    ];
    const cases: cases = [
      true, false, true, true
    ];
  });

  
  it("Comparator is a union", () => {
    type Foo = Contains<["foo", "bar"], "foo" | 42>;
    type Nada = Contains<["foo", "bar"], boolean | 42>;
    
    type cases = [
      ExpectTrue<Foo>,
      ExpectFalse<Nada>,
    ];
    const cases: cases = [
      true, false
    ];
    
  });
  

});

describe("NarrowlyContains<T,A>", () => {
  it("happy-path", () => {
    type T1 = [number, 32, 64, "foo"];
    type T2 = [false, true];
    type T3 = [42, 64, 128];
    type T4 = ["foo", "bar"];

    type cases = [
      // "foo" is not equal to string
      Expect<Equal<NarrowlyContains<T1, string>, false>>,
      // "foo" does equal "foo"
      Expect<Equal<NarrowlyContains<T1, "foo">, true>>,
      // T4 has literal string but this doesn't match with NarrowlyContains
      Expect<Equal<NarrowlyContains<T4, string>, false>>,
      // T1 has both wide and narrow versions of "number" but match is only on wide type
      Expect<Equal<NarrowlyContains<T1, number>, true>>,
      // T3 has matches on narrow number
      Expect<Equal<NarrowlyContains<T3, 42>, true>>,
      // T3 identifies a non-match of narrow numbers
      Expect<Equal<NarrowlyContains<T3, 442>, false>>,
      // boolean literals evaluate to wide type
      Expect<Equal<NarrowlyContains<T2, boolean>, false>>
    ];
    const cases: cases = [true, true, true, true, true, true, true];
  });
});
