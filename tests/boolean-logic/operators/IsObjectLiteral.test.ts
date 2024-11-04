import {  ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { IsObjectLiteral, Dictionary } from "@inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsObjectLiteral<T>", () => {

  it("happy path", () => {
    type T1 = IsObjectLiteral<{foo: 1}>;
    type T2 = IsObjectLiteral<Readonly<{foo: 1}>>;

    type F1 = IsObjectLiteral<object>;
    type F2 = IsObjectLiteral<Dictionary>;
    type F3 = IsObjectLiteral<Record<string, string>>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
    const cases: cases = [
      true, true,
      false, false, false
    ];
  });

});
