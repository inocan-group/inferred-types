import {  ExpectTrue, ExpectFalse, Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IfUnion, IsUnion} from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsUnion<T>", () => {

  it("happy path", () => {
    type T1 = IsUnion<"foo" | "bar">;
    type T2 = IsUnion<string | number>;

    type F1 = IsUnion<"foo">;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectFalse<F1>
    ];
    const cases: cases = [
      true, true,
      false,
    ];
  });

});

describe("IfUnion<T>", () => {

  it("happy path", () => {
    type T1 = IfUnion<"foo" | "bar", "yes", "no">;
    type T2 = IfUnion<string | number, "yes", "no">;

    type F1 = IfUnion<"foo",  "yes", "no">;

    type cases = [
      Expect<Equal<T1, "yes">>,
      Expect<Equal<T2, "yes">>,
      Expect<Equal<F1, "no">>,
    ];
    const cases: cases = [
      true, true,
      true,
    ];
  });

});
