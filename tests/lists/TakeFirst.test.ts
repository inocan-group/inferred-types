import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { IsErrorCondition, TakeFirst } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("TakeFirst<TContent,TLen,[THandle]>", () => {

  it("happy path", () => {
    type Arr = [1, 2, 3, "foo", "bar"];

    type Two = TakeFirst<Arr, 2>;
    type Three = TakeFirst<Arr, 3>;
    type Biggie = TakeFirst<Arr, 100>;


    type cases = [
      Expect<Equal<Two, [1, 2]>>,
      Expect<Equal<Three, [1, 2, 3]>>,
      Expect<Equal<Biggie, Arr>>,
    ];

  });

});
