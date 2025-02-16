import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { IsErrorCondition, Reverse, TakeLast } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("TakeLast<TContent,TLen,[THandle]>", () => {

  it("happy path", () => {
    type Arr = [1, 2, 3, "foo", "bar"];

    type Two = TakeLast<Arr, 2>;
    type Three = TakeLast<Arr, 3>;
    type Biggie = TakeLast<Arr, 100>;

    type cases = [
      Expect<Equal<Two, ["foo", "bar"]>>,
      Expect<Equal<Three, [3, "foo", "bar"]>>,
      Expect<Equal<Biggie, Arr>>,

    ];
  });

});
