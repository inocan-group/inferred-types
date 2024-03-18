;import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { KV, WithKey } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("WithKey<T>", () => {

  it("happy path", () => {
    type O = WithKey<KV, "bar">;
    type O1 = WithKey<{foo: 42}, "bar">;
    type O2 = WithKey<{foo: 42}, "foo">;

    type A = WithKey<number[], 3>;
    type A1 = WithKey<[0,1,2], 3>;
    type A2 = WithKey<[0,1,2], 1>;

    
    type cases = [
      Expect<Equal<O, { bar: unknown}>>,
      Expect<Equal<O1, {foo: 42; bar: unknown}>>,
      Expect<Equal<O2, { foo: 42 } >>,

      Expect<Equal<A, [number, number, number, number]>>,
      Expect<Equal<A1, [0,1,2, unknown]>>,
      Expect<Equal<A2, [0,1,2]>>
    ];
    const cases: cases = [
      true, true, true,
      true, true, true
    ];
  });

});
