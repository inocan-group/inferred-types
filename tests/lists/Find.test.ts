import { Equal, Expect } from "@type-challenges/utils";
import { Find } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Find<TList, 'equals', TValue, TIndex>", () => {

  it("happy path", () => {
    type List = [ { id: 1; val: "hi" }, { id: 2; val: "bye" } ];
    type T1 = Find<List,"equals", 1, "id">;
    type T2 = Find<List,"equals", 2, "id">;
    type T3 = Find<List,"equals", 3, "id">;

    type cases = [
      Expect<Equal<T1, { id: 1; val: "hi" }>>,
      Expect<Equal<T2, { id: 2; val: "bye" }>>,
      Expect<Equal<T3, undefined>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});

describe("Find<TList, 'extends', TValue, TIndex>", () => {


  it("happy path  without indexing", () => {
    type List = [number, 1, 2, string, "foo"];
    type Num = Find<List,"extends", number>;
    type Two = Find<List,"extends", 2>;
    type Str = Find<List,"extends", string>;
    type Foo = Find<List,"extends", "foo">;
    type Missing = Find<List,"extends", "bar">;
    type FooBar = Find<List,"extends", "foo" | "bar">;

    type cases = [
      Expect<Equal<Num, number>>,
      Expect<Equal<Two, 2>>,
      Expect<Equal<Str, string>>,
      Expect<Equal<Foo, "foo">>,

      Expect<Equal<Missing, undefined>>,
      Expect<Equal<Num, number>>,
      Expect<Equal<FooBar, "foo">>,
    ];
    const cases: cases = [
      true, true, true, true,
      true, true, true
    ];

  });


  it("happy path with indexing", () => {
    type List = [ { id: 1; val: "hi" }, { id: 2; val: "bye" } ];
    type T1 = Find<List,"extends", 1, "id">;
    type T2 = Find<List,"extends", 2, "id">;
    type T3 = Find<List,"extends", 3, "id">;

    type cases = [
      Expect<Equal<T1, { id: 1; val: "hi" }>>,
      Expect<Equal<T2, { id: 2; val: "bye" }>>,
      Expect<Equal<T3, undefined>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});
