import { Equal, Expect } from "@type-challenges/utils";
import { StripLeadingStringTemplate, StripSurroundingStringTemplate, StripTrailingStringTemplate } from "inferred-types/types";
import { describe, it } from "vitest";

describe("StripSurroundingStringTemplate<T>", () => {

  it("happy path", () => {
    type T1 = StripLeadingStringTemplate<`${string}${number}Foobar${string}`>
    type T2 = StripTrailingStringTemplate<`${string}${number}Foobar${string}`>
    type T3 = StripSurroundingStringTemplate<`${string}${number}Foobar${string}`>


    type cases = [
        Expect<Equal<T1, `${number}Foobar${string}`>>,
        Expect<Equal<T2, `${string}${number}Foobar`>>,
        Expect<Equal<T3, `${number}Foobar`>>,
    ];
  });

});
