import { describe, expect, it } from "vitest";
import type { Expect, TakeTimezone, Test, TimezoneOffset } from "inferred-types/types";
import { Equal } from "@type-challenges/utils";

describe("TakeTimezone", () => {
    describe("happy path", () => {

        it("validation using just TimezoneOffset type", () => {
            type V1 = TimezoneOffset<"Z">;
            type V2 = TimezoneOffset<"+01">;
            type V3 = TimezoneOffset<"+01:00">;
            type V4 = TimezoneOffset<"-01:00">;
            type V5 = TimezoneOffset<"+0100">;
            type V6 = TimezoneOffset<"-0100">;

            type IV1 = TimezoneOffset<"Z1">;
            type IV2 = TimezoneOffset<"+1">;
            type IV3 = TimezoneOffset<"-1">;

            type cases = [
                Expect<Test<V1, "extends", TimezoneOffset<"branded">>>,
                Expect<Test<V2, "extends", TimezoneOffset<"branded">>>,
                Expect<Test<V3, "extends", TimezoneOffset<"branded">>>,
                Expect<Test<V4, "extends", TimezoneOffset<"branded">>>,
                Expect<Test<V5, "extends", TimezoneOffset<"branded">>>,
                Expect<Test<V6, "extends", TimezoneOffset<"branded">>>,

                Expect<Test<IV1, "equals", never>>,
                Expect<Test<IV2, "equals", never>>,
                Expect<Test<IV3, "equals", never>>,
            ];
        });



        it("accepts UTC timezone 'Z'", () => {
            type T1 = TakeTimezone<"Z">;
            type T2 = TakeTimezone<"Z anything">;

            // ^?
            type cases = [
                Expect<Equal<T1, { take: TimezoneOffset<"Z">, rest: "" }>>,
                Expect<Equal<T2, { take: TimezoneOffset<"Z">, rest: " anything" }>>,
            ];
            const cases: cases = [true, true];
            expect(cases).toEqual([true, true]);
        });

        it("accepts positive timezone offsets with hours only", () => {
            type T1 = TakeTimezone<"+00">;
            type T2 = TakeTimezone<"+05">;
            type T3 = TakeTimezone<"+12">;
            type T4 = TakeTimezone<"+14">;
            type T5 = TakeTimezone<"+07 something">;

            // ^?
            type cases = [
                Expect<Equal<T1, { take: TimezoneOffset<"+00">, rest: "" }>>,
                Expect<Equal<T2, { take: TimezoneOffset<"+05">, rest: "" }>>,
                Expect<Equal<T3, { take: TimezoneOffset<"+12">, rest: "" }>>,
                Expect<Equal<T4, { take: TimezoneOffset<"+14">, rest: "" }>>,
                Expect<Equal<T5, { take: TimezoneOffset<"+07">, rest: " something" }>>,
            ];
            const cases: cases = [true, true, true, true, true];
            expect(cases).toEqual([true, true, true, true, true]);
        });

        it("accepts negative timezone offsets with hours only", () => {
            type T1 = TakeTimezone<"-00">;
            type T2 = TakeTimezone<"-05">;
            type T3 = TakeTimezone<"-12">;
            type T4 = TakeTimezone<"-14">;
            type T5 = TakeTimezone<"-08 something">;

            // ^?
            type cases = [
                Expect<Equal<T1, { take: TimezoneOffset<"-00">, rest: "" }>>,
                Expect<Equal<T2, { take: TimezoneOffset<"-05">, rest: "" }>>,
                Expect<Equal<T3, { take: TimezoneOffset<"-12">, rest: "" }>>,
                Expect<Equal<T4, { take: TimezoneOffset<"-14">, rest: "" }>>,
                Expect<Equal<T5, { take: TimezoneOffset<"-08">, rest: " something" }>>,
            ];
            const cases: cases = [true, true, true, true, true];
            expect(cases).toEqual([true, true, true, true, true]);
        });

        it("accepts timezone offsets with hours and minutes (colon format)", () => {
            type T1 = TakeTimezone<"+00:00">;
            type T2 = TakeTimezone<"+05:30">;
            type T3 = TakeTimezone<"-08:00">;
            type T4 = TakeTimezone<"+12:45">;
            type T5 = TakeTimezone<"-14:00">;
            type T6 = TakeTimezone<"+09:30 something">;

            // ^?
            type cases = [
                Expect<Equal<T1, { take: TimezoneOffset<"+00:00">, rest: "" }>>,
                Expect<Equal<T2, { take: TimezoneOffset<"+05:30">, rest: "" }>>,
                Expect<Equal<T3, { take: TimezoneOffset<"-08:00">, rest: "" }>>,
                Expect<Equal<T4, { take: TimezoneOffset<"+12:45">, rest: "" }>>,
                Expect<Equal<T5, { take: TimezoneOffset<"-14:00">, rest: "" }>>,
                Expect<Equal<T6, { take: TimezoneOffset<"+09:30">, rest: " something" }>>,
            ];
            const cases: cases = [true, true, true, true, true, true];
            expect(cases).toEqual([true, true, true, true, true, true]);
        });

        it("accepts timezone offsets with hours and minutes (no colon format)", () => {
            type T1 = TakeTimezone<"+0000">;
            type T2 = TakeTimezone<"+0530">;
            type T3 = TakeTimezone<"-0800">;
            type T4 = TakeTimezone<"+1245">;
            type T5 = TakeTimezone<"-1400">;
            type T6 = TakeTimezone<"+0930 something">;

            // ^?
            type cases = [
                Expect<Equal<T1, { take: TimezoneOffset<"+0000">, rest: "" }>>,
                Expect<Equal<T2, { take: TimezoneOffset<"+0530">, rest: "" }>>,
                Expect<Equal<T3, { take: TimezoneOffset<"-0800">, rest: "" }>>,
                Expect<Equal<T4, { take: TimezoneOffset<"+1245">, rest: "" }>>,
                Expect<Equal<T5, { take: TimezoneOffset<"-1400">, rest: "" }>>,
                Expect<Equal<T6, { take: TimezoneOffset<"+0930">, rest: " something" }>>,
            ];
            const cases: cases = [true, true, true, true, true, true];
            expect(cases).toEqual([true, true, true, true, true, true]);
        });

        it("handles remaining content after timezone", () => {
            type T1 = TakeTimezone<"Z[America/New_York]">;
            type T2 = TakeTimezone<"+05:30 IST">;
            type T3 = TakeTimezone<"-08:00 PST">;
            type T4 = TakeTimezone<"+0530IST">;

            // ^?
            type cases = [
                Expect<Equal<T1, { take: TimezoneOffset<"Z">, rest: "[America/New_York]" }>>,
                Expect<Equal<T2, { take: TimezoneOffset<"+05:30">, rest: " IST" }>>,
                Expect<Equal<T3, { take: TimezoneOffset<"-08:00">, rest: " PST" }>>,
                Expect<Equal<T4, { take: TimezoneOffset<"+0530">, rest: "IST" }>>,
            ];
            const cases: cases = [true, true, true, true];
            expect(cases).toEqual([true, true, true, true]);
        });
    });

    describe("error cases", () => {
        it("returns null for invalid hour offsets", () => {
            type T1 = TakeTimezone<"+15">;  // Hour too high
            type T2 = TakeTimezone<"+20">;  // Hour too high
            type T3 = TakeTimezone<"-15">;  // Hour too high
            type T4 = TakeTimezone<"-99">;  // Invalid hour

            // ^?
            type cases = [
                Expect<Equal<T1, { take: null, rest: "+15" }>>,
                Expect<Equal<T2, { take: null, rest: "+20" }>>,
                Expect<Equal<T3, { take: null, rest: "-15" }>>,
                Expect<Equal<T4, { take: null, rest: "-99" }>>,
            ];
            const cases: cases = [true, true, true, true];
            expect(cases).toEqual([true, true, true, true]);
        });

        it("returns null for invalid formats", () => {
            type T1 = TakeTimezone<"GMT">;  // No Z or sign
            type T2 = TakeTimezone<"UTC">;  // No Z or sign
            type T3 = TakeTimezone<"5:30">;  // Missing sign
            type T4 = TakeTimezone<"++05">;  // Double sign
            type T5 = TakeTimezone<"+5">;  // Single digit hour
            type T6 = TakeTimezone<"+0">;  // Single digit hour

            // ^?
            type cases = [
                Expect<Equal<T1, { take: null, rest: "GMT" }>>,
                Expect<Equal<T2, { take: null, rest: "UTC" }>>,
                Expect<Equal<T3, { take: null, rest: "5:30" }>>,
                Expect<Equal<T4, { take: null, rest: "++05" }>>,
                Expect<Equal<T5, { take: null, rest: "+5" }>>,
                Expect<Equal<T6, { take: null, rest: "+0" }>>,
            ];
            const cases: cases = [true, true, true, true, true, true];
            expect(cases).toEqual([true, true, true, true, true, true]);
        });

        it("stops at invalid minutes when present", () => {
            type T1 = TakeTimezone<"+05:60">;  // Minutes too high
            type T2 = TakeTimezone<"+05:99">;  // Minutes too high
            type T3 = TakeTimezone<"+0560">;  // Minutes too high
            type T4 = TakeTimezone<"+0599">;  // Minutes too high

            // These should extract just the hours part
            // ^?
            type cases = [
                Expect<Equal<T1, { take: TimezoneOffset<"+05">, rest: ":60" }>>,
                Expect<Equal<T2, { take: TimezoneOffset<"+05">, rest: ":99" }>>,
                Expect<Equal<T3, { take: TimezoneOffset<"+05">, rest: "60" }>>,
                Expect<Equal<T4, { take: TimezoneOffset<"+05">, rest: "99" }>>,
            ];
            const cases: cases = [true, true, true, true];
            expect(cases).toEqual([true, true, true, true]);
        });

        it("returns null for empty string", () => {
            type T1 = TakeTimezone<"">;
            //   ^?

            type cases = [
                Expect<Equal<T1, { take: null, rest: "" }>>,
            ];
            const cases: cases = [true];
            expect(cases).toEqual([true]);
        });
    });

    describe("edge cases", () => {
        it("handles partial timezone formats", () => {
            type T1 = TakeTimezone<"+05:">;  // Colon but no minutes
            type T2 = TakeTimezone<"+05:3">;  // Only one minute digit
            type T3 = TakeTimezone<"+053">;  // Only three digits

            type cases = [
                Expect<Equal<T1, { take: TimezoneOffset<"+05">, rest: ":" }>>,
                Expect<Equal<T2, { take: TimezoneOffset<"+05">, rest: ":3" }>>,
                Expect<Equal<T3, { take: TimezoneOffset<"+05">, rest: "3" }>>,
            ];
        });

        it("handles wide string types", () => {
            type Wide = string;
            type T1 = TakeTimezone<Wide>;
            //   ^?

            type cases = [
                Expect<Equal<T1,
                    { take: null; rest: string }
                    | { take: TimezoneOffset<"branded">; rest: string }
                >>,
            ];
        });

        it("handles template literal strings", () => {
            type T1 = TakeTimezone<`${string}`>;
            // Template literals are handled by HasLeadingTemplateLiteral check

            // ^?
            type cases = [
                Expect<Equal<
                    T1,
                    { take: null; rest: string }
                    | { take: TimezoneOffset<"branded">; rest: string }
                >>,
            ];
        });

        it("correctly handles all valid minute values", () => {
            type T1 = TakeTimezone<"+05:00">;
            type T2 = TakeTimezone<"+05:15">;
            type T3 = TakeTimezone<"+05:30">;
            type T4 = TakeTimezone<"+05:45">;
            type T5 = TakeTimezone<"+05:59">;

            // ^?
            type cases = [
                Expect<Equal<T1, { take: TimezoneOffset<"+05:00">, rest: "" }>>,
                Expect<Equal<T2, { take: TimezoneOffset<"+05:15">, rest: "" }>>,
                Expect<Equal<T3, { take: TimezoneOffset<"+05:30">, rest: "" }>>,
                Expect<Equal<T4, { take: TimezoneOffset<"+05:45">, rest: "" }>>,
                Expect<Equal<T5, { take: TimezoneOffset<"+05:59">, rest: "" }>>,
            ];
        });

        it("works with specific timezone offset values", () => {
            // Test with specific timezone offset values
            type TestZ = TakeTimezone<"Z">;
            type TestPlus = TakeTimezone<"+05:30">;
            type TestMinus = TakeTimezone<"-08:00">;
            type TestNoColon = TakeTimezone<"+0530">;

            // ^?
            type cases = [
                Expect<Equal<TestZ, { take: TimezoneOffset<"Z">, rest: "" }>>,
                Expect<Equal<TestPlus, { take: TimezoneOffset<"+05:30">, rest: "" }>>,
                Expect<Equal<TestMinus, { take: TimezoneOffset<"-08:00">, rest: "" }>>,
                Expect<Equal<TestNoColon, { take: TimezoneOffset<"+0530">, rest: "" }>>,
            ];
        });
    });
});

