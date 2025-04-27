import { Expect, DomainName, Test } from "inferred-types/types";
import { describe, it } from "vitest";




describe("DomainName<TDomain,TPrefixes>", () => {

    it("happy path", () => {
        type Generic = DomainName;
        type Site = DomainName<"site.com">;

        type Bad1 = DomainName<"site.p">;
        type Bad2 = DomainName<"site%.com">;

        type cases = [
            Expect<Test<Generic, "equals",  `${string}.${string}`>>,
            Expect<Test<Site, "equals",  "site.com">>,
            Expect<Test<Bad1, "equals",  never>>,
            Expect<Test<Bad2, "equals",  never>>,

        ];
    });

});
