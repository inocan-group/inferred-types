import { Equal, Expect } from "@type-challenges/utils";
import { Err, FailFast } from "inferred-types/types";
import { Extends } from "transpiled/types";
import { describe, it } from "vitest";

describe("FailFast<[]>", () => {

  it("happy path", () => {
    type One = FailFast<[3,2,1]>;
    type Almost = FailFast<[3,2,false,1]>;
    type Oops = FailFast<[3,2,Err<`oops`>, 1]>

    type cases = [
      Expect<Equal<One, 1>>,
      Expect<Equal<Almost, false>>,
      Expect<Extends<Oops, Error>>,
    ];
  });

});
