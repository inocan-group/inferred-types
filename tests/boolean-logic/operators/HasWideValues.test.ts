import { describe, it } from "vitest";
import { Expect, HasWideValues, Test } from "inferred-types/types";




describe("HasWideValues<T>", () => {

    it("happy path", () => {
        type T1 = HasWideValues<["foo", 42, string]>;

        type F1 = HasWideValues<[]>;
        type F2 = HasWideValues<["foo", "bar", 42]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];

    });

});
