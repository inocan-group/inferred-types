/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IsContainer, Tuple} from "../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsContainer<T>", () => {

  it("happy path for object", () => {
    type ObjLit = IsContainer<{ foo: "bar" }>;
    type Empty = IsContainer<{}>;
    type GenericObj = IsContainer<object>;
    type Rec = IsContainer<Record<string, string>>;

    
    type cases = [
      Expect<Equal<ObjLit, true>>,
      Expect<Equal<Empty, true>>,
      Expect<Equal<GenericObj, true>>,
      Expect<Equal<Rec, true>>,
    ];
    const cases: cases = [ 
      true, true, true, true 
    ];
  });

  it("happy path for Tuple", () => {
    type TupleLit = IsContainer<Tuple<string, 3>>;
    type Empty = IsContainer<[]>;
    type GenericTuple = IsContainer<Tuple>;
    type Arr = IsContainer<string[]>;
    
    type cases = [
      Expect<Equal<TupleLit, true>>,
      Expect<Equal<Empty, true>>,
      Expect<Equal<GenericTuple, true>>,
      Expect<Equal<Arr, true>>,
    ];
    const cases: cases = [ 
      true, true, true, true 
    ];
  });

  
  it("non-containers return false", () => {
    type Num = IsContainer<42>;
    type Str = IsContainer<"foo">;
    type Nada = IsContainer<null>;
    type Nada2 = IsContainer<undefined>;
    type Never = IsContainer<never>;
    
    type cases = [
      Expect<Equal<Num, false>>,
      Expect<Equal<Str, false>>,
      Expect<Equal<Nada, false>>,
      Expect<Equal<Nada2, false>>,
      Expect<Equal<Never, false>>,
    ];
    const cases: cases = [ true, true, true, true, true ];
    
  });
  

});
