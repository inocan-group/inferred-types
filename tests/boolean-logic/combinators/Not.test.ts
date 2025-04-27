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
            Expect<Test<Never, "equals",  never>>,
            Expect<Test<FnFalse, "equals",  false>>,
            Expect<Test<FnTrue, "equals",  true>>,
        ];
    });


    it("with tuple value", () => {
        type Tuple1 = [true, true, false, boolean, false];
        type Tuple2 = [true, true, () => false, never, boolean, false, never];

        type T1 = Not<Tuple1>;
        type T2 = Not<Tuple2>;

        type cases = [
            Expect<Test<T1, "equals", [false, false, true, boolean, true]>>,
            Expect<Test<T2, "equals", [false, false, true, never, boolean, true, never]>>
        ];
    });

});

