import { Equal, Expect } from "@type-challenges/utils";
import { DomainName } from "src/types/index";
import { describe, it } from "vitest";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("DomainName<TDomain,TPrefixes>", () => {

  it("happy path", () => {
    type Generic = DomainName;
    type Site = DomainName<"site.com">;
    type SiteWithPrefixes = DomainName<"site.com", ["www", "blog"]>;
    type MultipleSites = DomainName<["site.com", "alt.com"]>;
    
    type cases = [
      Expect<Equal<Generic, `${string}.${string}`>>,
      Expect<Equal<Site, "site.com" | "www.site.com">>,
      Expect<Equal<
        SiteWithPrefixes, 
        "site.com" | "www.site.com" | "blog.site.com"
      >>,
      Expect<Equal<
        MultipleSites, 
        "site.com" | "www.site.com" | "alt.com" | "www.alt.com"
      >>
    ];
    const cases: cases = [ true, true, true, true ];
  });

});
