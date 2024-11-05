import { Equal, Expect } from "@type-challenges/utils";
import { DoneFnTuple } from "inferred-types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("DoneFnTuple", () => {

  it("happy path", () => {
    type Base = DoneFnTuple;

    type cases = [

      // Base Descriptions
      Expect<Equal<Base["done"]["desc"], "exits the API surface with the state which has been accumulated so far">>,
      Expect<Equal<Base["add"]["desc"], "add a value to the tuple/union">>,
    ];
    const cases: cases = [
      true, true,
    ];
  });

});

