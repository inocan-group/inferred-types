import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Dictionary, SimpleType } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("SimpleType<T>", () => {

  it("happy path", () => {
    type Str = SimpleType<"string">;
    type Num = SimpleType<"number">;
    type Bool = SimpleType<"boolean">;
    type True = SimpleType<"true">;
    type False = SimpleType<"false">;
    type Null = SimpleType<"null">;

    type cases = [
      Expect<Equal<Str, string>>,
      Expect<Equal<Num, number>>,
      Expect<Equal<Bool, boolean>>,
      Expect<Equal<True, true>>,
      Expect<Equal<False, false>>,
      Expect<Equal<Null, null>>,
    ];
    const cases: cases = [
      true, true, true, true, true, true
    ];
  });

  it("optional types", () => {
    type Str = SimpleType<"opt(string)">;
    type Num = SimpleType<"opt(number)">;
    type Bool = SimpleType<"opt(boolean)">;

    type cases = [
      Expect<Equal<Str, string | undefined>>,
      Expect<Equal<Num, number | undefined>>,
      Expect<Equal<Bool, boolean | undefined>>,
    ];
    const cases: cases = [
      true, true, true
    ];
  });

  it("Dictionaries", () => {
    type D1 = SimpleType<"Dict">;
    type DN1 = SimpleType<"Dict<{id: number}>">;
    type DN2 = SimpleType<"Dict<{foo: number}>">;
    type DS1 = SimpleType<"Dict<{id: string}>">;
    type DS2 = SimpleType<"Dict<{foo: string}>">;

    type cases = [
      Expect<Equal<D1, Dictionary>>,
      Expect<Equal<DN1, {id: number; [key: string|symbol]: any}>>,
      Expect<Equal<DN2, {foo: number; [key: string|symbol]: any}>>,
      Expect<Equal<DS1, {id: string; [key: string|symbol]: any}>>,
      Expect<Equal<DS2, {foo: string; [key: string|symbol]: any}>>,
    ];
    const cases: cases = [
      true, true, true, true, true,
    ];
  });


  it("Set, Map, and WeakMap", () => {
    type S1 = SimpleType<"Set">
    type S2 = SimpleType<"Set<string>">;
    type S3 = SimpleType<"Set<number>">;

    type M1 = SimpleType<"Map">;
    type M2 = SimpleType<"Map<number, string>">;
    type M3 = SimpleType<"Map<Dict, Dict<string, opt(number)>>">;

    type cases = [
      Expect<Equal<S1, Set<any>>>,
      Expect<Equal<S2, Set<string>>>,
      Expect<Equal<S3, Set<number>>>,

      Expect<Equal<M1, Map<any,any>>>,
      Expect<Equal<M2, Map<number,string>>>,
      Expect<Equal<
        M3,
        Map<Dictionary, Dictionary<string, number | undefined>>
      >>,

    ];
    const cases: cases = [
      true, true, true,
      true, true, true,

    ];

  });


});
