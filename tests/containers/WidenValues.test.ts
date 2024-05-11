import { Equal, Expect } from "@type-challenges/utils";
import { HasSameValues, WidenValues } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("WidenValues<T>", () => {

  it("with a tuple container", () => {
    type Str = WidenValues<["foo","bar"]>;
    type MixedScalars = WidenValues<["foo",42,false,null]>;
    type NoChange = WidenValues<[string, number]>;
    type EmbeddedObj = WidenValues<[{foo: 1}, {bar: 2}]>;
    
    type cases = [
      Expect<Equal<Str, [string, string]>>,
      Expect<Equal<MixedScalars, [string, number, boolean, null]>>,
      Expect<Equal<NoChange, [string, number]>>,
      Expect<HasSameValues<EmbeddedObj,[
        {foo: number}, {bar: number}
      ]>>
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });

});
