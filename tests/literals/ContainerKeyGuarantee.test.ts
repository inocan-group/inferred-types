import { Equal, Expect } from "@type-challenges/utils";
import { ContainerKeyGuarantee } from "src/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ContainerKeyGuarantee<T>", () => {

  it("happy path", () => {
    type Obj = {foo: 1};
    type Tup = [1,2,3];
    type StrArr = string[];

    type Bar = ContainerKeyGuarantee<Obj, "bar">;
    type Two = ContainerKeyGuarantee<Tup, 2>;
    type ThreeArr = ContainerKeyGuarantee<StrArr, 3>;

    
    type cases = [
      Expect<Equal<Bar, { foo: 1; bar: unknown }>>,
      Expect<Equal<Two, Tup & readonly [unknown, unknown, unknown]>>,
      Expect<Equal<ThreeArr, ThreeArr & readonly [unknown, unknown, unknown, unknown] >>,
    ];
    const cases: cases = [ true, true, true];
  });

});
