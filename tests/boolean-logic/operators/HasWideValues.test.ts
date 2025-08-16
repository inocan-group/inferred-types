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

    it("literal number arrays should not be considered wide", () => {
        type F1 = HasWideValues<[5, 10]>;
        type F2 = HasWideValues<[1, 2, 3]>;
        type F3 = HasWideValues<[42]>;
        
        // These should be false as they contain only literal numbers
        type T1 = HasWideValues<[number, 5]>;
        type T2 = HasWideValues<[5, number]>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
        ];

    });

});
