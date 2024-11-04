import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import {  IsErrorCondition, IdentityFn } from "@inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IdentityFn<T,[TNarrow]>", () => {


  it("Regular Identity", () => {
    type Num = IdentityFn<number>;
    type Lit = IdentityFn<42>;

    type cases = [
      Expect<Equal<Num, () => number>>,
      Expect<Equal<Lit, () => 42>>,
    ];
    const cases: cases = [ true, true ];

  });


  it("with narrowing", () => {
    type Num = IdentityFn<number, true>;
    type Str = IdentityFn<string, true>;
    type WideUnion = IdentityFn<string | number, true>;
    type LitUnion = IdentityFn<42 | 56 | 78, true>;
    type Bool = IdentityFn<boolean, true>;

    type Err = IdentityFn<42, true>;
    type Err2 = IdentityFn<true, true>;

    type cases = [
      Expect<Equal<Num, <T extends number>(v: T) => T>>,
      Expect<Equal<Str, <T extends string>(v: T) => T>>,
      Expect<Equal<WideUnion, <T extends string | number>(v: T) => T>>,
      Expect<Equal<LitUnion, <T extends 42 | 56 | 78>(v: T) => T>>,
      Expect<Equal<Bool, <T extends boolean>(v: T) => T>>,

      ExpectTrue<IsErrorCondition<Err, "invalid-literal">>,
      ExpectTrue<IsErrorCondition<Err2, "invalid-literal">>,
    ];
    const cases: cases = [
      true, true, true, true,true,
      true, true
    ];
  });

});
