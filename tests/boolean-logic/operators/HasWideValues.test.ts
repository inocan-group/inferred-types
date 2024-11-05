import {  ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { HasWideValues } from "inferred-types";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("HasWideValues<T>", () => {

  it("happy path", () => {
    type T1 = HasWideValues<["foo", 42, string]>;

    type F1 = HasWideValues<[]>;
    type F2 = HasWideValues<["foo", "bar", 42]>;

    type cases = [
      ExpectTrue<T1>,
      ExpectFalse<F1>,
      ExpectFalse<F2>
    ];
    const cases: cases = [
      true,
      false, false
    ];
  });

});
