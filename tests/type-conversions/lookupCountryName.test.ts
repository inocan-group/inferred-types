import { lookupCountryAlpha2, lookupCountryAlpha3, lookupCountryCode, lookupCountryName } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

import { describe, expect, it } from "vitest";

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

        type cases = [
            Expect<Test<typeof us, "equals", "United States of America">>,
            Expect<Test<typeof ca, "equals", "Canada">>,
            Expect<Test<typeof uk, "equals", "United Kingdom">>,
            Expect<Test<typeof usLower, "equals", "United States of America">>,
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

        type cases = [
            Expect<Test<typeof us, "equals", "United States of America">>,
            Expect<Test<typeof ca, "equals", "Canada">>,
            Expect<Test<typeof uk, "equals", "United Kingdom">>,
            Expect<Test<typeof usLower, "equals", "United States of America">>,
        ]
    });

    it("lookupCountryName() with numeric string", () => {
        const us = lookupCountryName("840");
        const ca = lookupCountryName("124");
        const uk = lookupCountryName("826");

        expect(us).toBe("United States of America");
        expect(ca).toBe("Canada");
        expect(uk).toBe("United Kingdom");

        type cases = [
            Expect<Test<typeof us, "equals", "United States of America">>,
            Expect<Test<typeof ca, "equals", "Canada">>,
            Expect<Test<typeof uk, "equals", "United Kingdom">>,
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

        type cases = [
            Expect<Test<typeof us, "equals", "US">>,
            Expect<Test<typeof ca, "equals", "CA">>,
            Expect<Test<typeof ca2, "equals", "CA">>,
            Expect<Test<typeof uk, "equals", "GB">>,
            Expect<Test<typeof usLower, "equals", "US">>,
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

        type cases = [
            Expect<Test<typeof us, "equals", "US">>,
            Expect<Test<typeof ca, "equals", "CA">>,
            Expect<Test<typeof uk, "equals", "GB">>,
            Expect<Test<typeof usLower, "equals", "US">>,
        ]
    });

    it("lookupCountryAlpha2() with numeric string", () => {
        const us = lookupCountryAlpha2("840");
        const ca = lookupCountryAlpha2("124");
        const uk = lookupCountryAlpha2("826");

        expect(us).toBe("US");
        expect(ca).toBe("CA");
        expect(uk).toBe("GB");

        type cases = [
            Expect<Test<typeof us, "equals", "US">>,
            Expect<Test<typeof ca, "equals", "CA">>,
            Expect<Test<typeof uk, "equals", "GB">>,
        ]
    });

    it("lookupCountryAlpha2() with country name", () => {
        const us = lookupCountryAlpha2("United States of America");
        const ca = lookupCountryAlpha2("Canada");
        const uk = lookupCountryAlpha2("United Kingdom");

        expect(us).toBe("US");
        expect(ca).toBe("CA");
        expect(uk).toBe("GB");

        type cases = [
            Expect<Test<typeof us, "equals", "US">>,
            Expect<Test<typeof ca, "equals", "CA">>,
            Expect<Test<typeof uk, "equals", "GB">>,
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

        type cases = [
            Expect<Test<typeof us, "equals", "USA">>,
            Expect<Test<typeof ca, "equals", "CAN">>,
            Expect<Test<typeof uk, "equals", "GBR">>,
            Expect<Test<typeof usLower, "equals", "USA">>,
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

        type cases = [
            Expect<Test<typeof us, "equals", "USA">>,
            Expect<Test<typeof ca, "equals", "CAN">>,
            Expect<Test<typeof uk, "equals", "GBR">>,
            Expect<Test<typeof usLower, "equals", "USA">>,
        ]
    });

    it("lookupCountryAlpha3() with numeric string", () => {
        const us = lookupCountryAlpha3("840");
        const ca = lookupCountryAlpha3("124");
        const uk = lookupCountryAlpha3("826");

        expect(us).toBe("USA");
        expect(ca).toBe("CAN");
        expect(uk).toBe("GBR");

        type cases = [
            Expect<Test<typeof us, "equals", "USA">>,
            Expect<Test<typeof ca, "equals", "CAN">>,
            Expect<Test<typeof uk, "equals", "GBR">>,
        ]
    });

    it("lookupCountryAlpha3() with country name", () => {
        const us = lookupCountryAlpha3("United States of America");
        const ca = lookupCountryAlpha3("Canada");
        const uk = lookupCountryAlpha3("United Kingdom");

        expect(us).toBe("USA");
        expect(ca).toBe("CAN");
        expect(uk).toBe("GBR");

        type cases = [
            Expect<Test<typeof us, "equals", "USA">>,
            Expect<Test<typeof ca, "equals", "CAN">>,
            Expect<Test<typeof uk, "equals", "GBR">>,
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

        type cases = [
            Expect<Test<typeof us, "equals", "840">>,
            Expect<Test<typeof ca, "equals", "124">>,
            Expect<Test<typeof uk, "equals", "826">>,
            Expect<Test<typeof usLower, "equals", "840">>,
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

        type cases = [
            Expect<Test<typeof us, "equals", "840">>,
            Expect<Test<typeof ca, "equals", "124">>,
            Expect<Test<typeof uk, "equals", "826">>,
            Expect<Test<typeof usLower, "equals", "840">>,
        ]
    });

    it("lookupCountryCode() with country name", () => {
        const us = lookupCountryCode("United States of America");
        const ca = lookupCountryCode("Canada");
        const uk = lookupCountryCode("United Kingdom");

        expect(us).toBe("840");
        expect(ca).toBe("124");
        expect(uk).toBe("826");

        type cases = [
            Expect<Test<typeof us, "equals", "840">>,
            Expect<Test<typeof ca, "equals", "124">>,
            Expect<Test<typeof uk, "equals", "826">>,
        ]
    });

})
