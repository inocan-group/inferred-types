import { Equal, Expect } from "@type-challenges/utils";
import { Iso3166Country } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Iso3166Lookup<T>", () => {

  it("happy path", () => {
    type US = Iso3166Country<"US">;
    type USA = Iso3166Country<"USA">;
    type US_CODE = Iso3166Country<"840">;

    // @ts-ignore
    type cases = [
      Expect<Equal<US, "United States of America">>,
      Expect<Equal<USA, "United States of America">>,
      Expect<Equal<US_CODE, "United States of America">>,
    ];
  });

});
