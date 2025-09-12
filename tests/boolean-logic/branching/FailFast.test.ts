

import { describe, it } from "vitest";
import type { Err, Expect, Extends, FailFast, Test } from "inferred-types/types";

describe("FailFast<[]>", () => {

  it("happy path", () => {
    type One = FailFast<[3,2,1]>;
    type Almost = FailFast<[3,2,false,1]>;
    type Almost2 = FailFast<[3,2,Err<"nice try">,1]>;
    type Oops = FailFast<[3,2,Err<`oops`>, 1]>
    type Finally = FailFast<[undefined, undefined, 1]>;
    type Override = FailFast<
        [undefined, undefined, false],
        { err: Err<"biscuit">}
    >;

    type cases = [
      Expect<Test<One, "equals",  1>>,
      Expect<Test<Almost, "equals",  false>>,
      Expect<Test<Almost2, "isError",  "nice try">>,
      Expect<Test<Oops, "isError", "oops">>,
      Expect<Extends<Finally, 1>>,
      Expect<Test<Override, "isError", "biscuit">>,
    ];
  });

  it("only fail on errors", () => {

    type Fail = FailFast<
        [never, false, Err<"oops">, 1],
        { failureConditions: ["error"] }
    >;
    type Pass = FailFast<
        [never, false,  1],
        { failureConditions: ["error"]}
    >;

    type cases = [
        Expect<Test<Fail, "equals",  Err<"oops">>>,
        Expect<Test<Pass, "equals",  1>>
    ];
  });

});
