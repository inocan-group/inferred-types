import { Equal, Expect } from "@type-challenges/utils";
import { AfterFirst, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("AfterFirst", () => {

    it("happy path for lists", () => {
        type Foobar = AfterFirst<["foo", "bar"]>;
        type Foobar2 = AfterFirst<readonly ["foo", "bar"]>;

        type cases = [
            Expect<Test<Foobar, "equals",  readonly ["bar"]>>,
            Expect<Test<Foobar2, "equals",  readonly ["bar"]>>,
        ];
    });

});
