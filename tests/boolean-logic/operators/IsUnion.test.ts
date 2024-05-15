import {  ExpectTrue, ExpectFalse } from "@type-challenges/utils";
import { describe, it } from "vitest";

import {  IsUnion} from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsUnion<T>", () => {

  it("happy path", () => {
    type T1 = IsUnion<"foo" | "bar">;
    type T2 = IsUnion<string | number>;
    type T3 = IsUnion<boolean | 42>;

    type F1 = IsUnion<"foo">;
    type F2 = IsUnion<boolean>;
    type F3 = IsUnion<true>;
    type F4 = IsUnion<string>;
    type F5 = IsUnion<number>;
    type F6 = IsUnion<string[]>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
      ExpectFalse<F4>,
      ExpectFalse<F5>,
      ExpectFalse<F6>,
    ];
    const cases: cases = [
      true, true, true,
      false, false, false, false, false, false
    ];
  });

});

