import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import type { ErrMsg, IsErrMsg } from "inferred-types/types";

import { describe, it } from "vitest";

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
