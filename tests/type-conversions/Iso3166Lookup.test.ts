import { Equal, Expect } from "@type-challenges/utils";
import { Iso3166Alpha2Lookup, Iso3166CountryLookup } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Iso3166CountryLookup<T>", () => {

  it("happy path", () => {
    type US = Iso3166CountryLookup<"US">;
    type USA = Iso3166CountryLookup<"USA">;
    type US_CODE = Iso3166CountryLookup<"840">;

    // @ts-ignore
    type cases = [
      Expect<Equal<US, "United States of America">>,
      Expect<Equal<USA, "United States of America">>,
      Expect<Equal<US_CODE, "United States of America">>,
    ];
  });

});

describe("Iso3166Alpha2Lookup<T>", () => {

  it("happy path", () => {
    type US = Iso3166Alpha2Lookup<"US">;
    type USA = Iso3166Alpha2Lookup<"USA">;
    type US_CODE = Iso3166Alpha2Lookup<"840">;
    type US_NAME = Iso3166Alpha2Lookup<"United States of America">;

    // @ts-ignore
    type cases = [
      Expect<Equal<US, "US">>,
      Expect<Equal<USA, "US">>,
      Expect<Equal<US_CODE, "US">>,
      Expect<Equal<US_NAME, "US">>,
    ];
  });

});
