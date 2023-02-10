/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { Widen } from "../../src/types/type-conversion";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Widen<T>", () => {

  it("happy path", () => {
    type T1 = Widen<42>; // number
    type T2 = Widen<"foo">; // string
    type T3 = Widen<{ foo: 42; bar: "baz" }>; // {}
    type T4 = Widen<["foo", false, 42]>; // [ string, boolean, number ]


    
    type cases = [
      Expect<Equal<T1, number>>, //
      Expect<Equal<T2, string>>, 
      Expect<Equal<T3, {}>>, 
      Expect<Equal<T4, [string, boolean, number]>>, 
    ];
    const cases: cases = [true, true, true, true];
  });

});
