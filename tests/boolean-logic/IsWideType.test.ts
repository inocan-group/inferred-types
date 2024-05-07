import {  ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import {  IsWideType } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsWideType<T>", () => {

  it("Scalars", () => {
    type T1 = IsWideType<string>;
    type T2 = IsWideType<boolean>;
    type T3 = IsWideType<object>;
    type T4 = IsWideType<string[]>;
    type T5 = IsWideType<unknown[]>;
    type T6 = IsWideType<readonly string[]>;
    // union with only wide values
    type T7 = IsWideType<string | number>;

    type F1 = IsWideType<"foo">;
    // union with literal values
    type F2 = IsWideType<string | 42>;
    type F3 = IsWideType<{foo: 1; bar: 2}>;
    
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,
      ExpectTrue<T5>,
      ExpectTrue<T6>,
      ExpectTrue<T7>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
    const cases: cases = [
      true, true, true, true, true, true, true,
      false, false, false
    ];
  });

});
