import { Equal, Expect } from "@type-challenges/utils";
import { DomainName } from "inferred-types";
import { describe, it } from "vitest";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("DomainName<TDomain,TPrefixes>", () => {

  it("happy path", () => {
    type Generic = DomainName;
    type Site = DomainName<"site.com">;

    type Bad1 = DomainName<"site.p">;
    type Bad2 = DomainName<"site%.com">;


    type cases = [
      Expect<Equal<Generic, `${string}.${string}`>>,
      Expect<Equal<Site, "site.com">>,
      Expect<Equal<Bad1, never>>,
      Expect<Equal<Bad2, never>>,

    ];
    const cases: cases = [ true, true, true, true ];
  });

});
