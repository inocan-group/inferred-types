import { Equal, Expect } from "@type-challenges/utils";
import { ReduceValues } from "src/types/index";

import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ReduceValues<T>", () => {

  it("happy path with tuples", () => {
    type T1 = ReduceValues<[]>;
    type T2 = ReduceValues<["foo","bar","baz"]>;
    type T3 = ReduceValues<["foo", () => false, () => true]>;
    type T4 = ReduceValues<["foo", () => false, () => boolean]>;
    type T5 = ReduceValues<["foo", () => false, () => "blue"]>;

    type cases = [
      Expect<Equal<T1, []>>, //
      Expect<Equal<T2, ["foo","bar","baz"]>>,
      Expect <Equal<T3, ["foo", false, true]>>,
      Expect <Equal<T4, ["foo", false, boolean]>>,
      Expect <Equal<T5, ["foo", false, "blue"]>>,
    ];
    const cases: cases = [ true, true, true, true, true];
  });



  it("happy path with dictionaries", () => {
    type T1 = ReduceValues<{foo: number; bar: ()=> "hi"}>;

    type cases = [
      Expect<Equal<T1, [number, "hi"]>>
    ];
    const cases: cases = [
      true
    ];

  });


});
