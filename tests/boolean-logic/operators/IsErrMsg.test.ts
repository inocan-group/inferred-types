import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { ErrMsg, IsErrMsg } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsErrMsg<T>", () => {

  it("happy path", () => {
    type T1 = IsErrMsg<ErrMsg<"bad-juju">>;
    type T2 = IsErrMsg<ErrMsg<"bad-juju", "things got fucked up">>;
    type T3 = IsErrMsg<ErrMsg<"bad-juju", "things got fucked up">, "bad-juju">;

    type F1 = IsErrMsg<ErrMsg<"bad-juju", "things got fucked up">, "bad-monkey">;
    type F2 = IsErrMsg<"bad-juju">;

    // @ts-ignore
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
    ];
  });

});
