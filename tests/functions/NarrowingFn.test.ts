import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IsErrorCondition, NarrowingFn } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("NarrowingFn<T>", () => {

  it("happy path", () => {
    type Num = NarrowingFn<number>;
    type Str = NarrowingFn<string>;
    type WideUnion = NarrowingFn<string | number>;
    type LitUnion = NarrowingFn<42 | 56 | 78>;
    type Bool = NarrowingFn<boolean>;

    type Err = NarrowingFn<42>;
    type Err2 = NarrowingFn<true>;
    
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
