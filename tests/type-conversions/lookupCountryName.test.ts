import { Equal, Expect } from "@type-challenges/utils";
import { lookupCountryName } from "src/runtime/index";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("lookupCountryName()", () => {

  it("lookupCountryName() with alpha2", () => {
    const us = lookupCountryName("US");
    const ca = lookupCountryName("CA");
    const uk = lookupCountryName("GB");

    const usLower = lookupCountryName("us");


    expect(us).toBe("United States of America");
    expect(ca).toBe("Canada");
    expect(uk).toBe("United Kingdom");
    expect(usLower).toBe("United States of America");

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof us, "United States of America">>,
      Expect<Equal<typeof ca, "Canada">>,
      Expect<Equal<typeof uk, "United Kingdom">>,
      Expect<Equal<typeof usLower, "United States of America">>,
    ]
  });
  it("lookupCountryName() with alpha3", () => {
    const us = lookupCountryName("USA");
    const ca = lookupCountryName("CA");
    const uk = lookupCountryName("GBR");

    const usLower = lookupCountryName("usa");


    expect(us).toBe("United States of America");
    expect(ca).toBe("Canada");
    expect(uk).toBe("United Kingdom");
    expect(usLower).toBe("United States of America");


    // @ts-ignore
    type cases = [
      Expect<Equal<typeof us, "United States of America">>,
      Expect<Equal<typeof ca, "Canada">>,
      Expect<Equal<typeof uk, "United Kingdom">>,
      Expect<Equal<typeof usLower, "United States of America">>,
    ]
  });

  it("lookupCountryName() with numeric string", () => {
    const us = lookupCountryName("840");
    const ca = lookupCountryName("124");
    const uk = lookupCountryName("826");

    expect(us).toBe("United States of America");
    expect(ca).toBe("Canada");
    expect(uk).toBe("United Kingdom");

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof us, "United States of America">>,
      Expect<Equal<typeof ca, "Canada">>,
      Expect<Equal<typeof uk, "United Kingdom">>,
    ]
  });





});
