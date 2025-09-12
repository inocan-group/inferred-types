import { Equal, Expect } from "@type-challenges/utils";
import type { StripLeadingStringTemplate, StripSurroundingStringTemplate, StripTrailingStringTemplate, Test } from "inferred-types/types";

import { describe, it } from "vitest";

describe("StripSurroundingStringTemplate<T>", () => {

  it("happy path", () => {
    type T1 = StripLeadingStringTemplate<`${string}${number}Foobar${string}`>
    type T2 = StripTrailingStringTemplate<`${string}${number}Foobar${string}`>
    type T3 = StripSurroundingStringTemplate<`${string}${number}Foobar${string}`>

    type cases = [
        Expect<Test<T1, "equals",  `${number}Foobar${string}`>>,
        Expect<Test<T2, "equals",  `${string}${number}Foobar`>>,
        Expect<Test<T3, "equals",  `${number}Foobar`>>,
    ];
  });

});
