import {  Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Not, Test } from "inferred-types/types";



describe("Not<T>", () => {

    it("with singular value", () => {
        type False = Not<true>;
        type True = Not<false>;
        type Bool = Not<boolean>;
        type Never = Not<never>;
        type FnTrue = Not<() => false>;
        type FnFalse = Not<() => true>;

        type cases = [
            Expect<Test<False, "equals",  false>>,
            Expect<Test<True, "equals",  true>>,
            Expect<Test<Bool, "equals",  boolean>>,
            Expect<Test<Never, "equals",  false>>,
            Expect<Test<FnFalse, "equals",  false>>,
            Expect<Test<FnTrue, "equals",  true>>,
        ];
    });

});

