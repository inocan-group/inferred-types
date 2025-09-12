
import { describe, it } from "vitest";
import type { Err, Expect, Test, ValidateLength } from "inferred-types/types";

describe("ValidateLength<T,O>", () => {

    it("validate max", () => {
        type T1 = ValidateLength<"hello", { max: 5 }>;
        type T2 = ValidateLength<[1, 2, 3, 4, 5], {max: 5}>;
        type T3 = ValidateLength<12345, {max: 5}>;

        type F1 = ValidateLength<"hello", {max: 4}>;
        type F2 = ValidateLength<[1, 2, 3, 4, 5], { max: 4 }>;
        type F3 = ValidateLength<12345, { max: 4 }>;

        type W = ValidateLength<string, { min: 4 }>;

        type cases = [
            Expect<Test<T1, "equals", "hello">>,
            Expect<Test<T2, "equals", [1, 2, 3, 4, 5]>>,
            Expect<Test<T3, "equals", 12345>>,

            Expect<Test<F1, "extends", Error>>,
            Expect<Test<F1, "extends", Err<"invalid-length">>>,
            Expect<Test<F1, "extends", Err<"invalid-length/max">>>,
            Expect<Test<F1, "isError", "invalid-length/max">>,
            Expect<Test<F2, "isError", "invalid-length/max">>,
            Expect<Test<F3, "isError", "invalid-length/max">>,

            Expect<Test<W, "equals", string | Err<"invalid-length/max" | "invalid-length/min"> >>,
        ];
    });

    it("validate min", () => {
        type T1 = ValidateLength<"hello", { min: 2 }>;
        type T2 = ValidateLength<[1, 2, 3, 4, 5], {min: 2}>;
        type T3 = ValidateLength<12345, {min: 2}>;

        type F1 = ValidateLength<"hello", {min: 6}>;
        type F2 = ValidateLength<[1, 2, 3, 4, 5], { min: 10 }>;
        type F3 = ValidateLength<12345, { max: 4 }>;

        type W = ValidateLength<string, { min: 4 }>;

        type cases = [
            Expect<Test<T1, "equals", "hello">>,
            Expect<Test<T2, "equals", [1, 2, 3, 4, 5]>>,
            Expect<Test<T3, "equals", 12345>>,

            Expect<Test<F1, "extends", Error>>,
            Expect<Test<F1, "extends", Err<"invalid-length">>>,
            Expect<Test<F1, "extends", Err<"invalid-length/min">>>,
            Expect<Test<F1, "isError", "invalid-length/min">>,
            Expect<Test<F2, "isError", "invalid-length/min">>,
            Expect<Test<F3, "isError", "invalid-length/max">>,

            Expect<Test<W, "equals", string | Err<"invalid-length/max" | "invalid-length/min"> >>,
        ];
    });

});
