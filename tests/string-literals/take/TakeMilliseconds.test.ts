import { describe, it } from "vitest";
import type { Expect, TakeMilliseconds, Test, ThreeDigitMillisecond } from "inferred-types/types";

describe("TakeMilliseconds<T>", () => {

    it("happy path - strings starting with valid milliseconds", () => {
        type T1 = TakeMilliseconds<"123ms elapsed">;
        type T2 = TakeMilliseconds<"000 is the minimum">;
        type T3 = TakeMilliseconds<"999 is the maximum">;
        type T4 = TakeMilliseconds<"500ms halfway">;
        type T5 = TakeMilliseconds<"001 single millisecond">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: ThreeDigitMillisecond<"123">, rest: "ms elapsed" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: ThreeDigitMillisecond<"000">, rest: " is the minimum" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: ThreeDigitMillisecond<"999">, rest: " is the maximum" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: ThreeDigitMillisecond<"500">, rest: "ms halfway" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: ThreeDigitMillisecond<"001">, rest: " single millisecond" }
            >>,
        ];
    });

    it("non-matching - strings not starting with 3 digits", () => {
        type T1 = TakeMilliseconds<"abc123">;
        type T2 = TakeMilliseconds<"The milliseconds 123">;
        type T3 = TakeMilliseconds<" 123 has leading space">;
        type T4 = TakeMilliseconds<"Time: 123">;
        type T5 = TakeMilliseconds<"-123 is negative">;
        type T6 = TakeMilliseconds<"hello world">;
        type T7 = TakeMilliseconds<".123 starts with dot">;

        type cases = [
            Expect<Test<T1, "isError","parse-time">>,
            Expect<Test<T2, "isError","parse-time">>,
            Expect<Test<T3, "isError","parse-time">>,
            Expect<Test<T4, "isError","parse-time">>,
            Expect<Test<T5, "isError","parse-time">>,
            Expect<Test<T6, "isError","parse-time">>,
        ];
    });

    it("less than 3 digits", () => {
        type T1 = TakeMilliseconds<"1">;
        type T2 = TakeMilliseconds<"12">;
        type T3 = TakeMilliseconds<"12 not enough digits">;
        type T4 = TakeMilliseconds<"99 problems">;
        type T5 = TakeMilliseconds<"0">;
        type T6 = TakeMilliseconds<"00">;

        type cases = [
            Expect<Test<T1, "isError","parse-time">>,
            Expect<Test<T2, "isError","parse-time">>,
            Expect<Test<T3, "isError","parse-time">>,
            Expect<Test<T4, "isError","parse-time">>,
            Expect<Test<T5, "isError","parse-time">>,
            Expect<Test<T6, "isError","parse-time">>,
        ];
    });

    it("exactly 3 digits", () => {
        type T1 = TakeMilliseconds<"123">;
        type T2 = TakeMilliseconds<"000">;
        type T3 = TakeMilliseconds<"999">;
        type T4 = TakeMilliseconds<"555">;
        type T5 = TakeMilliseconds<"001">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: ThreeDigitMillisecond<"123">, rest: "" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: ThreeDigitMillisecond<"000">, rest: "" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: ThreeDigitMillisecond<"999">, rest: "" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: ThreeDigitMillisecond<"555">, rest: "" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: ThreeDigitMillisecond<"001">, rest: "" }
            >>,
        ];
    });

    it("more than 3 digits at start", () => {
        type T1 = TakeMilliseconds<"1234567">;
        type T2 = TakeMilliseconds<"0001234">;
        type T3 = TakeMilliseconds<"9999 has 4 digits">;
        type T4 = TakeMilliseconds<"123456789">;
        type T5 = TakeMilliseconds<"100000ms">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: ThreeDigitMillisecond<"123">, rest: "4567" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: ThreeDigitMillisecond<"000">, rest: "1234" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: ThreeDigitMillisecond<"999">, rest: "9 has 4 digits" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: ThreeDigitMillisecond<"123">, rest: "456789" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: ThreeDigitMillisecond<"100">, rest: "000ms" }
            >>,
        ];
    });

    it("mixed numeric and non-numeric in first 3 chars", () => {
        type T1 = TakeMilliseconds<"12a">;
        type T2 = TakeMilliseconds<"1.2">;
        type T3 = TakeMilliseconds<"12-">;
        type T4 = TakeMilliseconds<"12X">;
        type T5 = TakeMilliseconds<"a23">;
        type T6 = TakeMilliseconds<"1b3">;

        type cases = [
            Expect<Test<T1, "isError","parse-time">>,
            Expect<Test<T2, "isError","parse-time">>,
            Expect<Test<T3, "isError","parse-time">>,
            Expect<Test<T4, "isError","parse-time">>,
            Expect<Test<T5, "isError","parse-time">>,
            Expect<Test<T6, "isError","parse-time">>,
        ];
    });

    it("edge cases", () => {
        type T1 = TakeMilliseconds<"">;  // Empty string
        type T2 = TakeMilliseconds<".">;  // Single non-numeric
        type T3 = TakeMilliseconds<"   ">;  // Spaces
        type T4 = TakeMilliseconds<"ms">;  // Letters only

        type cases = [
            Expect<Test<T1, "isError","parse-time">>,
            Expect<Test<T2, "isError","parse-time">>,
            Expect<Test<T3, "isError","parse-time">>,
            Expect<Test<T4, "isError","parse-time">>
        ];
    });

    it("wide string types", () => {
        type T1 = TakeMilliseconds<string>;
        type T2 = TakeMilliseconds<`${string}123`>;
        type T3 = TakeMilliseconds<`123${string}`>;
        type T4 = TakeMilliseconds<`${number}`>;

        type cases = [
            Expect<Test<
                T1, "extends",
                Error | { take: ThreeDigitMillisecond<"branded">; rest: string }
            >>,
            Expect<Test<
                T2, "extends",
                Error | { take: ThreeDigitMillisecond<"branded">; rest: string}
            >>,
            Expect<Test<
                T3, "extends",
                { take: ThreeDigitMillisecond<"123">, rest: string }
            >>,
            Expect<Test<
                T4, "extends",
                Error | { take: ThreeDigitMillisecond<"branded">; rest: string}
            >>,
        ];
    });

    it("various millisecond formats in context", () => {
        type T1 = TakeMilliseconds<"123ms">;  // Common millisecond notation
        type T2 = TakeMilliseconds<"500Z">;  // Timezone-like ending
        type T3 = TakeMilliseconds<"001.123456">;  // Fractional seconds
        type T4 = TakeMilliseconds<"999+00:00">;  // With timezone offset
        type T5 = TakeMilliseconds<"250 milliseconds">;  // Full word

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: ThreeDigitMillisecond<"123">, rest: "ms" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: ThreeDigitMillisecond<"500">, rest: "Z" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: ThreeDigitMillisecond<"001">, rest: ".123456" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: ThreeDigitMillisecond<"999">, rest: "+00:00" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: ThreeDigitMillisecond<"250">, rest: " milliseconds" }
            >>,
        ];
    });

    it("ISO datetime millisecond context", () => {
        type T1 = TakeMilliseconds<"123Z">;  // ISO datetime ending
        type T2 = TakeMilliseconds<"456+00:00">;  // With timezone
        type T3 = TakeMilliseconds<"789-05:00">;  // Negative timezone
        type T4 = TakeMilliseconds<"000">;  // Exact zero
        type T5 = TakeMilliseconds<"999.999">;  // Microseconds follow

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: ThreeDigitMillisecond<"123">, rest: "Z" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: ThreeDigitMillisecond<"456">, rest: "+00:00" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: ThreeDigitMillisecond<"789">, rest: "-05:00" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: ThreeDigitMillisecond<"000">, rest: "" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: ThreeDigitMillisecond<"999">, rest: ".999" }
            >>,
        ];
    });

});
