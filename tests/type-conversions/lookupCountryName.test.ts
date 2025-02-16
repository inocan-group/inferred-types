import { Equal, Expect } from "@type-challenges/utils";
import { lookupCountryAlpha2, lookupCountryAlpha3, lookupCountryCode, lookupCountryName } from "inferred-types/runtime";
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

describe("lookupCountryAlpha2", () => {

  it("lookupCountryAlpha2() with alpha2", () => {
    const us = lookupCountryAlpha2("USA");
    const ca = lookupCountryAlpha2("CAN");
    const ca2 = lookupCountryAlpha2("CA");
    const uk = lookupCountryAlpha2("GBR");

    const usLower = lookupCountryAlpha2("usa");


    expect(us).toBe("US");
    expect(ca).toBe("CA");
    expect(ca2).toBe("CA");
    expect(uk).toBe("GB");
    expect(usLower).toBe("US");


    // @ts-ignore
    type cases = [
      Expect<Equal<typeof us, "US">>,
      Expect<Equal<typeof ca, "CA">>,
      Expect<Equal<typeof ca2, "CA">>,
      Expect<Equal<typeof uk, "GB">>,
      Expect<Equal<typeof usLower, "US">>,
    ]
  });

  it("lookupCountryAlpha2() with alpha3", () => {
    const us = lookupCountryAlpha2("USA");
    const ca = lookupCountryAlpha2("CAN");
    const uk = lookupCountryAlpha2("GBR");

    const usLower = lookupCountryAlpha2("usa");


    expect(us).toBe("US");
    expect(ca).toBe("CA");
    expect(uk).toBe("GB");
    expect(usLower).toBe("US");


    // @ts-ignore
    type cases = [
      Expect<Equal<typeof us, "US">>,
      Expect<Equal<typeof ca, "CA">>,
      Expect<Equal<typeof uk, "GB">>,
      Expect<Equal<typeof usLower, "US">>,
    ]
  });


  it("lookupCountryAlpha2() with numeric string", () => {
    const us = lookupCountryAlpha2("840");
    const ca = lookupCountryAlpha2("124");
    const uk = lookupCountryAlpha2("826");

    expect(us).toBe("US");
    expect(ca).toBe("CA");
    expect(uk).toBe("GB");

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof us, "US">>,
      Expect<Equal<typeof ca, "CA">>,
      Expect<Equal<typeof uk, "GB">>,
    ]
  });

  it("lookupCountryAlpha2() with country name", () => {
    const us = lookupCountryAlpha2("United States of America");
    const ca = lookupCountryAlpha2("Canada");
    const uk = lookupCountryAlpha2("United Kingdom");

    expect(us).toBe("US");
    expect(ca).toBe("CA");
    expect(uk).toBe("GB");

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof us, "US">>,
      Expect<Equal<typeof ca, "CA">>,
      Expect<Equal<typeof uk, "GB">>,
    ]
  });

})

describe("lookupCountryAlpha3", () => {

  it("lookupCountryAlpha3() with alpha2", () => {
    const us = lookupCountryAlpha3("US");
    const ca = lookupCountryAlpha3("CA");
    const uk = lookupCountryAlpha3("GB");

    const usLower = lookupCountryAlpha3("usa");


    expect(us).toBe("USA");
    expect(ca).toBe("CAN");
    expect(uk).toBe("GBR");
    expect(usLower).toBe("USA");


    // @ts-ignore
    type cases = [
      Expect<Equal<typeof us, "USA">>,
      Expect<Equal<typeof ca, "CAN">>,
      Expect<Equal<typeof uk, "GBR">>,
      Expect<Equal<typeof usLower, "USA">>,
    ]
  });

  it("lookupCountryAlpha3() with alpha3", () => {
    const us = lookupCountryAlpha3("USA");
    const ca = lookupCountryAlpha3("CAN");
    const uk = lookupCountryAlpha3("GBR");

    const usLower = lookupCountryAlpha3("usa");


    expect(us).toBe("USA");
    expect(ca).toBe("CAN");
    expect(uk).toBe("GBR");
    expect(usLower).toBe("USA");


    // @ts-ignore
    type cases = [
      Expect<Equal<typeof us, "USA">>,
      Expect<Equal<typeof ca, "CAN">>,
      Expect<Equal<typeof uk, "GBR">>,
      Expect<Equal<typeof usLower, "USA">>,
    ]
  });


  it("lookupCountryAlpha3() with numeric string", () => {
    const us = lookupCountryAlpha3("840");
    const ca = lookupCountryAlpha3("124");
    const uk = lookupCountryAlpha3("826");

    expect(us).toBe("USA");
    expect(ca).toBe("CAN");
    expect(uk).toBe("GBR");

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof us, "USA">>,
      Expect<Equal<typeof ca, "CAN">>,
      Expect<Equal<typeof uk, "GBR">>,
    ]
  });

  it("lookupCountryAlpha3() with country name", () => {
    const us = lookupCountryAlpha3("United States of America");
    const ca = lookupCountryAlpha3("Canada");
    const uk = lookupCountryAlpha3("United Kingdom");

    expect(us).toBe("USA");
    expect(ca).toBe("CAN");
    expect(uk).toBe("GBR");

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof us, "USA">>,
      Expect<Equal<typeof ca, "CAN">>,
      Expect<Equal<typeof uk, "GBR">>,
    ]
  });

})

describe("lookupCountryCode", () => {

  it("lookupCountryCode() with alpha2", () => {
    const us = lookupCountryCode("US");
    const ca = lookupCountryCode("CA");
    const uk = lookupCountryCode("GB");

    const usLower = lookupCountryCode("usa");


    expect(us).toBe("840");
    expect(ca).toBe("124");
    expect(uk).toBe("826");
    expect(usLower).toBe("840");


    // @ts-ignore
    type cases = [
      Expect<Equal<typeof us, "840">>,
      Expect<Equal<typeof ca, "124">>,
      Expect<Equal<typeof uk, "826">>,
      Expect<Equal<typeof usLower, "840">>,
    ]
  });

  it("lookupCountryCode() with alpha3", () => {
    const us = lookupCountryCode("USA");
    const ca = lookupCountryCode("CAN");
    const uk = lookupCountryCode("GBR");

    const usLower = lookupCountryCode("usa");


    expect(us).toBe("840");
    expect(ca).toBe("124");
    expect(uk).toBe("826");
    expect(usLower).toBe("840");


    // @ts-ignore
    type cases = [
      Expect<Equal<typeof us, "840">>,
      Expect<Equal<typeof ca, "124">>,
      Expect<Equal<typeof uk, "826">>,
      Expect<Equal<typeof usLower, "840">>,
    ]
  });


  it("lookupCountryCode() with country name", () => {
    const us = lookupCountryCode("United States of America");
    const ca = lookupCountryCode("Canada");
    const uk = lookupCountryCode("United Kingdom");

    expect(us).toBe("840");
    expect(ca).toBe("124");
    expect(uk).toBe("826");

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof us, "840">>,
      Expect<Equal<typeof ca, "124">>,
      Expect<Equal<typeof uk, "826">>,
    ]
  });


})
