import { Expect, ReturnValues, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("ReturnValues<T>", () => {

    it("happy path", () => {
        type T1 = ReturnValues<[]>;
        type T2 = ReturnValues<["foo", "bar", "baz"]>;
        type T3 = ReturnValues<["foo", () => false, () => true]>;
        type T4 = ReturnValues<["foo", () => false, () => boolean]>;
        type T5 = ReturnValues<["foo", () => false, () => "blue"]>;

        type cases = [
            Expect<Test<T1, "equals",  []>>, //
            Expect<Test<T2, "equals",  []>>,
            Expect<Test<T3, "equals", [false, true]>>,
            Expect<Test<T4, "equals", [false, boolean]>>,
            Expect<Test<T5, "equals", [false, "blue"]>>,
        ];
    });

});
