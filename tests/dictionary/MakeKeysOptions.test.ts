import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { MakeKeysOptional } from "../../src/types/dictionary/MakeKeysOptional";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("MakeKeysOptional<TObj,TKeys>", () => {

  it("happy path", () => {
    type Obj = { foo: 1; bar: 2};
    type Opt = MakeKeysOptional<Obj, ["bar"]>;
    
    type cases = [
      Expect<Equal<Opt, { foo: 1; bar?: 2 | undefined }>>
    ];
    const cases: cases = [ true ];
  });

});
