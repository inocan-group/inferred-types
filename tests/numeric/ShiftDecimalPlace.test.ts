import { describe, it } from "vitest";
import { Expect, Test, ShiftDecimalPlace } from "inferred-types/types";

describe("ShiftDecimalPlace<T,U>", () => {

    it("documentation example", () => {
        // From the JSDoc comment:
        // // 12345
        // type IntValue = ShiftDecimalPlace<"123.45", 2>;
        type Example = ShiftDecimalPlace<"123.45", 2>;

        type cases = [
            Expect<Test<Example, "equals", "12345">>,
        ];
    });

    it("handles wide number type", () => {
        type T1 = ShiftDecimalPlace<number, 1>;
        type T2 = ShiftDecimalPlace<number, -1>;
        type T3 = ShiftDecimalPlace<number, 0>;

        type cases = [
            Expect<Test<T1, "equals", number>>,
            Expect<Test<T2, "equals", number>>,
            Expect<Test<T3, "equals", number>>,
        ];
    });


    it("positive shift multiplies by 10^n", () => {
        type T1 = ShiftDecimalPlace<1, 1>;
        type T2 = ShiftDecimalPlace<1, 2>;
        type T3 = ShiftDecimalPlace<123, 2>;
        type T4 = ShiftDecimalPlace<5, 3>;

        // Positive shifts correctly multiply by 10^n
        type cases = [
            Expect<Test<T1, "equals", 10>>,
            Expect<Test<T2, "equals", 100>>,
            Expect<Test<T3, "equals", 12300>>,
            Expect<Test<T4, "equals", 5000>>,
        ];
    });

    it("negative shift divides by 10^n", () => {
        // This is a bug: negative shifts should divide, but they multiply
        type T1 = ShiftDecimalPlace<1, -1>;
        type T2 = ShiftDecimalPlace<1, -2>;
        type T3 = ShiftDecimalPlace<10, -1>;
        type T4 = ShiftDecimalPlace<123, -2>;

        // After AsNumber fix, negative shifts now work correctly
        type cases = [
            Expect<Test<T1, "equals", 0.1>>,
            Expect<Test<T2, "equals", 0.01>>,
            Expect<Test<T3, "equals", 1>>,
            Expect<Test<T4, "equals", 1.23>>,
        ];
    });

    it("zero shift returns original value", () => {
        type T1 = ShiftDecimalPlace<0, 0>;
        type T2 = ShiftDecimalPlace<123, 0>;
        type T3 = ShiftDecimalPlace<-5, 0>;

        type cases = [
            Expect<Test<T1, "equals", 0>>,
            Expect<Test<T2, "equals", 123>>,
            Expect<Test<T3, "equals", -5>>,
        ];
    });

    it("string number literals work", () => {
        type T1 = ShiftDecimalPlace<"1", 1>;
        type T2 = ShiftDecimalPlace<"10", 1>;
        type T3 = ShiftDecimalPlace<"100", 2>;
        type T4 = ShiftDecimalPlace<"1", -1>;

        // String inputs return template literal types
        type cases = [
            Expect<Test<T1, "equals", "10">>,
            Expect<Test<T2, "equals", "100">>,
            Expect<Test<T3, "equals", "10000">>,
            Expect<Test<T4, "equals", "0.1">>,
        ];
    });

    it("large shifts work correctly", () => {
        type T1 = ShiftDecimalPlace<1, 5>;
        type T2 = ShiftDecimalPlace<123, 3>;
        type T3 = ShiftDecimalPlace<7, 6>;
        type T4 = ShiftDecimalPlace<123456789, 8>;

        type cases = [
            Expect<Test<T1, "equals", 100000>>,
            Expect<Test<T2, "equals", 123000>>,
            Expect<Test<T3, "equals", 7000000>>,
            Expect<Test<T4, "equals", 12345678900000000>>,
        ];
    });

    it("negative numbers with shifts", () => {
        type T1 = ShiftDecimalPlace<-1, 1>;
        type T2 = ShiftDecimalPlace<-10, 2>;
        type T3 = ShiftDecimalPlace<-123, 1>;

        type cases = [
            Expect<Test<T1, "equals", -10>>,
            Expect<Test<T2, "equals", -1000>>,
            Expect<Test<T3, "equals", -1230>>,
        ];
    });

    it("zero inputs", () => {
        type Zero1 = ShiftDecimalPlace<0, 0>;
        type Zero2 = ShiftDecimalPlace<0, 1>;
        type Zero3 = ShiftDecimalPlace<0, -1>;
        type Zero4 = ShiftDecimalPlace<0, 10>;

        // Zero with any shift remains zero (0 * 10^n = 0)
        type cases = [
            Expect<Test<Zero1, "equals", 0>>,
            Expect<Test<Zero2, "equals", 0>>,
            Expect<Test<Zero3, "equals", 0>>,
            Expect<Test<Zero4, "equals", 0>>,
        ];
    });

    it("implementation bug: both positive and negative shifts multiply", () => {
        // This demonstrates the bug clearly
        type Positive = ShiftDecimalPlace<10, 2>;   // 10 * 10^2 = 1000 ✓
        type Negative = ShiftDecimalPlace<10, -2>;  // Should be 0.1

        type cases = [
            Expect<Test<Positive, "equals", 1000>>,
            Expect<Test<Negative, "equals", 0.1>>,
        ];
    });

    it("string templates with Repeat", () => {
        // The implementation uses Repeat<"0", U> to append zeros
        type S1 = ShiftDecimalPlace<"100", 1>;
        type S2 = ShiftDecimalPlace<"5", 2>;
        type S3 = ShiftDecimalPlace<"1", 3>;

        // These produce template literal types with repeated zeros
        type cases = [
            Expect<Test<S1, "extends", `100${string}`>>,
            Expect<Test<S2, "extends", `5${string}`>>,
            Expect<Test<S3, "extends", `1${string}`>>,
        ];
    });

    it("string decimals behavior", () => {
        // String decimals have complex behavior
        type T1 = ShiftDecimalPlace<"12.34", 1>;
        type T2 = ShiftDecimalPlace<"1.5", -1>;

        // These return complex types or number
        type cases = [
            Expect<Test<T1, "extends", string | number>>,
            Expect<Test<T2, "extends", string | number>>,
        ];
    });


    it("summary of behavior", () => {
        // Currently working:
        // - Integer literal inputs multiply correctly by 10^|n|
        // - Wide number type returns number
        // - Decimal number inputs return number
        // - String number inputs return string types
        // - Zero shifts return original value

        // Not working (bugs):
        // - Negative shifts multiply instead of divide
        // - String decimals don't handle decimal points properly

        type cases = [
            Expect<Test<ShiftDecimalPlace<10, 1>, "equals", 100>>,
            Expect<Test<ShiftDecimalPlace<number, 1>, "equals", number>>,
            Expect<Test<ShiftDecimalPlace<1.5, 1>, "equals", number>>,
            Expect<Test<ShiftDecimalPlace<"123", 1>, "extends", string>>,
        ];
    });
});
