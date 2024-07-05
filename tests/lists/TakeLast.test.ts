import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { IsErrorCondition, Reverse, TakeLast } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("TakeLast<TContent,TLen,[THandle]>", () => {

  it("happy path", () => {
    type Arr = [1,2,3, "foo", "bar"];

    type Two = TakeLast<Arr, 2>;
    type Three = TakeLast<Arr, 3>;
    type Biggie = TakeLast<Arr, 100>;
    type Oops = TakeLast<Arr, 100, "throw">;


    type cases = [
      Expect<Equal<Two, ["bar","foo"]>>,
      Expect<Equal<Three, ["bar","foo",3]>>,
      Expect<Equal<Biggie, Reverse<Arr>>>,

      ExpectTrue<IsErrorCondition<Oops, "invalid-length">>
    ];
    const cases: cases = [
      true, true, true,
      true
    ];
  });

});
