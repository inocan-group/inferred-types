import { Equal, Expect } from "@type-challenges/utils";
import { rightWhitespace } from "inferred-types";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("rightWhitespace(content)", () => {

  it("happy path", () => {
    // const none = rightWhitespace("none");
    const one = rightWhitespace("one ");
    const two = rightWhitespace("two  ");
    const mixed = rightWhitespace("mixed  \n\t");
    const onlyRight = rightWhitespace(" onlyRight ");

    expect(one).toEqual(" ");
    expect(two).toEqual("  ");
    expect(mixed).toEqual("  \n\t");
    expect(onlyRight).toEqual(" ");

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof one, " ">>,
      Expect<Equal<typeof two, "  ">>,
      Expect<Equal<typeof mixed, "  \n\t">>,
      Expect<Equal<typeof onlyRight, " ">>,
    ];
  });

});
