import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import {
  StripWhile,
  Whitespace
} from "@inferred-types/types";
import { stripWhile } from "inferred-types";
import { NUMERIC_CHAR } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("StripWhile<TContent,TComparator>", () => {

  it("happy path", () => {
    type Num = StripWhile<"   \n42", Whitespace>;

    // @ts-ignore
    type cases = [
      Expect<Equal<Num, "42">>,
    ];

  });

});

describe("stripWhile(val,...chars)", () => {

  it("happy path", () => {
    const metric = stripWhile("100mph", ...NUMERIC_CHAR);

    expect(metric).toBe("mph")

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof metric, "mph">>,
    ];
  });

});

