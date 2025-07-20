import { IsSameYear } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsSameYear<A, B>", () => {

    it("using ISO Year strings", () => {
        type T1 = IsSameYear<"2023", "2023">;
        type T2 = IsSameYear<"3033", "3033">;
        type T3 = IsSameYear<"1999", "1999">;

        type F1 = IsSameYear<"2023", "2022">;

        type cases = [
            // Same year strings
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
        ];
    });

    it("ISO Date string", () => {
        type T1 = IsSameYear<"2023-01-01", "2023-01-01">;
        type T2 = IsSameYear<"2023-01-01", "2023-12-01">;
        type T3 = IsSameYear<"2023-07-12", "2023-12-01">;

        type F1 = IsSameYear<"2023-01-01", "2025-01-01">;


        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
        ];
    });


    it("Epoch dates return true when equal", () => {
        type T1 = IsSameYear<10000089, 10000089>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
        ];
    });


    it("Wide Types resolve to boolean", () => {
        type cases = [
            // Wide types need runtime determination
            Expect<Test<IsSameYear<number, 2023>, "equals", boolean>>,
            Expect<Test<IsSameYear<2023, number>, "equals", boolean>>,
        ];
    });

    it("Mixed ISO string types", () => {
        type T1 = IsSameYear<"2023", "2023-01-01T00:00:00Z">;
        type T2 = IsSameYear<"2023-01-01T00:00:00Z", "2023">;
        type T3 = IsSameYear<"-2023-12", "2023">;

        type F1 = IsSameYear<"2024", "2023-01-01T00:00:00Z">;
        type F2 = IsSameYear<"2024", "-2023-10">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });

});
