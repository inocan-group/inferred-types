import {  Expect } from "@type-challenges/utils";
import { FilterLiterals,  HasSameValues, KV } from "src/types/index";
import { describe, it } from "vitest";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("FilterLiterals<T>", () => {

  it("Happy Path", () => {
    type NumLits = FilterLiterals<[number, string, null, boolean, 1,2,3]>;
    type StrLits = FilterLiterals<[number, string, null, boolean, "foo","bar"]>;
    type BoolLits = FilterLiterals<[number, string, null,boolean,  true, false]>;

    type TupLits = FilterLiterals<
      [KV, object, string[], readonly (string|number)[],  [1,2,3]]
    >
    type ObjLits = FilterLiterals<
      [KV, object, string[], readonly (string|number)[], {foo: number}]
    >
    type ObjLits2 = FilterLiterals<
      [Record<string, string>, object, string[], readonly (string|number)[], {foo: number}]
    >
    
    type cases = [
      Expect<HasSameValues<NumLits, [number, string, null, boolean]>>,
      Expect<HasSameValues<StrLits, [number, string, null, boolean]>>,
      Expect<HasSameValues<BoolLits, [number, string, null, boolean]>>,

      Expect<HasSameValues<TupLits, [KV, object, string[],readonly (string|number)[]]>>,
      Expect<HasSameValues<ObjLits, [KV, object, string[],readonly (string|number)[]]>>,
      Expect<HasSameValues<ObjLits2, [Record<string, string>, object, string[],readonly (string|number)[]]>>,
    ];

    const cases: cases = [
      true, true, true,
      true, true, true
    ];
  });

});



