import { Equal, Expect } from "@type-challenges/utils";
import { HasSameValues } from "inferred-types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("HasSameValues<TList,TComparator", () => {

  it("testing with tuples", () => {
    type T1 = HasSameValues<[], []>;
    type T2 = HasSameValues<[1,2,3], [3,2,1]>;
    type T3 = HasSameValues<[1,2,3], [3,1,2]>;

    type F1 = HasSameValues<[], [3,2,1]>;
    type F2 = HasSameValues<[3,2,1], []>;
    type F3 = HasSameValues<[1,2,5], [3,2,1]>;
    type F4 = HasSameValues<[1,2,3], [1,2,3,4]>;
    type F5 = HasSameValues<[1,2,3,4], [1,2,3]>;

    // @ts-ignore
    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<T3, true>>,

      Expect<Equal<F1, false>>,
      Expect<Equal<F2, false>>,
      Expect<Equal<F3, false>>,
      Expect<Equal<F4, false>>,
      Expect<Equal<F5, false>>,
    ];

  });


  it("testing with never", () => {
    type T1 = HasSameValues<never, never>;

    type F1 = HasSameValues<[1,2,3], never>;
    type F2 = HasSameValues<never, [1,2,3]>;

    // @ts-ignore
    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<F1, false>>,
      Expect<Equal<F2, false>>,
    ];

  });

});
