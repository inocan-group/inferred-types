
import { describe, it } from "vitest";
import type { Expect, Iso3166Alpha2Lookup, Iso3166CountryLookup, Test } from "inferred-types/types";

describe("Iso3166CountryLookup<T>", () => {

    it("happy path", () => {
        type US = Iso3166CountryLookup<"US">;
        type USA = Iso3166CountryLookup<"USA">;
        type US_CODE = Iso3166CountryLookup<"840">;

        type cases = [
            Expect<Test<US, "equals",  "United States of America">>,
            Expect<Test<USA, "equals",  "United States of America">>,
            Expect<Test<US_CODE, "equals",  "United States of America">>,
        ];
    });

});

describe("Iso3166Alpha2Lookup<T>", () => {

    it("happy path", () => {
        type US = Iso3166Alpha2Lookup<"US">;
        type USA = Iso3166Alpha2Lookup<"USA">;
        type US_CODE = Iso3166Alpha2Lookup<"840">;
        type US_NAME = Iso3166Alpha2Lookup<"United States of America">;

        type cases = [
            Expect<Test<US, "equals",  "US">>,
            Expect<Test<USA, "equals",  "US">>,
            Expect<Test<US_CODE, "equals",  "US">>,
            Expect<Test<US_NAME, "equals",  "US">>,
        ];
    });

});
