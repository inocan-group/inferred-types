import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { IsVariable } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsVariable<T>", () => {

  it("happy path", () => {
    type T1 = IsVariable<"fooBar">;
    type T2 = IsVariable<"fooBar2">;
    type T3 = IsVariable<"foo_bar">;

    type F1 = IsVariable<"foo-bar">;
    type F2 = IsVariable<"foobar!">;
    type F3 = IsVariable<"foo/bar">;


    // @ts-ignore
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
  });

});
