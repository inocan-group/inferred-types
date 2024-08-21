import {  ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { ErrorCondition, MaybeError } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("MaybeError<T>", () => {

  it("happy path", () => {
    type F1 = MaybeError<"foo">;
    type F2 = MaybeError<[1,2,3]>;
    type F3 = MaybeError<Error>;
    type F4 = MaybeError<ErrorCondition>;

    type T1 = MaybeError<"foo" | Error>;
    type T2 = MaybeError<"foo" | ErrorCondition>;
    type T3 = MaybeError<"foo" | ErrorCondition<"bad-juju">>;


    type cases = [
      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
      ExpectFalse<F4>,

      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
    ];
    const cases: cases = [
      false, false, false, false,
      true, true, true
    ];
  });

});
