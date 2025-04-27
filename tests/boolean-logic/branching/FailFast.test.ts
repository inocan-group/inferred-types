import { Equal, Expect } from "@type-challenges/utils";
import { Err, FailFast } from "inferred-types/types";
import { Extends } from "transpiled/types";
import { describe, it } from "vitest";

describe("FailFast<[]>", () => {

  it("happy path", () => {
    type One = FailFast<[3,2,1]>;
    type Almost = FailFast<[3,2,false,1]>;
    type Oops = FailFast<[3,2,Err<`oops`>, 1]>
    type Finally = FailFast<[undefined, undefined, 1]>;
    type Override = FailFast<
        [undefined, undefined, false],
        { err: Err<"biscuit">}
    >;

    type cases = [
      Expect<Test<One, "equals",  1>>,
      Expect<Test<Almost, "equals",  false>>,
      Expect<Extends<Oops, Error>>,
      Expect<Extends<Finally, 1>>,
      Expect<Extends<Override, Err<"biscuit">>>,
    ];
  });


  it("only fail on errors", () => {

    type Fail = FailFast<
        [never, false, Err<"oops">, 1],
        { failureConditions: { error: true }}
    >;
    type Pass = FailFast<
    [never, false,  1],
    { failureConditions: { error: true }}
>;

    type cases = [
        Expect<Test<Fail, "equals",  Err<"oops">>>,
        Expect<Test<Pass, "equals",  1>>
    ];
  });

});
