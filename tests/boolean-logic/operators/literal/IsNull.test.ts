import { describe, it } from "vitest";
import {
    Expect,
    IsNull,
    Test,
} from "inferred-types/types";


// NOTE: you must ensure that the `strictNullChecks` setting is set to `true` for edge cases to work.
describe("IsNull<T>", () => {

    it("obvious cases", () => {
        type T1 = IsNull<null>;

        type F1 = IsNull<string>;
        type F2 = IsNull<number>;
        type F3 = IsNull<string[]>;
        type F4 = IsNull<[null, null]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
        ];
    });


    it("compared with undefined", () => {
        type F1 = IsNull<undefined>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
        ];
    });

    it("compared with any", () => {
        type F1 = IsNull<any>;

        type cases = [
            Expect<Test<F1, "equals", boolean>>,
        ];
    });

    it("compared with never", () => {
        type F1 = IsNull<never>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
        ];
    });


});
