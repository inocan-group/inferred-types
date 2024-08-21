import {  ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { HasArray } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("HasArray<T>", () => {

  it("happy path", () => {
    type T1 = HasArray<[1,2,[4,5],6]>;
    type T2 = HasArray<[1,2, [4, [5,6]]]>;

    type F1 = HasArray<[1,2,3,4]>;
    type F2 = HasArray<[]>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
    ];
    const cases: cases = [
      true, true,
      false, false
    ];
  });

});
