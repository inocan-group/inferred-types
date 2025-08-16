import { IsIsoDate } from "inferred-types";
import { Expect, Test, IsDateLike, EmptyObject, IsIsoYear } from "inferred-types/types";
import { describe, it } from "vitest";
import { IsIsoFullDate } from "../../../../modules/types/dist";

describe("IsDateLike<T>", () => {

    it("JavaScript Date Objects", () => {
        const d = new Date();
        type D = typeof d;
        type cases = [
            // JS Date objects should be DateLike
            Expect<Test<IsDateLike<D>, "equals", true>>,
        ];
    });

    it("IsoYear", () => {
        type T1 = IsDateLike<"2023">;
        type T1a = IsIsoYear<"2023">;
        type T2 = IsDateLike<"2024">;
        type T3 = IsDateLike<"1999">;
        type T4 = IsDateLike<"2025">;

        type F1 = IsDateLike<"23">;
        type F2 = IsDateLike<"20234">;
        type F3 = IsDateLike<"abcd">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });


    it("valid ISO partial dates", () => {
        type YearMonth = IsDateLike<"-2023-06">;
        type YearMonthImplicit = IsDateLike<"-202306">;

        type MonthDate = IsDateLike<"--11-01">;
        type MonthDateImplicit = IsDateLike<"--1101">;

        type cases = [
            Expect<Test<YearMonth, "equals", true>>,
            Expect<Test<YearMonthImplicit, "equals", true>>,
            Expect<Test<MonthDate, "equals", true>>,
            Expect<Test<MonthDateImplicit, "equals", true>>,
        ];
    });


    it("ISO Full Date Strings", () => {
        type T1 = IsDateLike<"2023-01-01">;
        type T2 = IsDateLike<"2023-12-31">
        type T3 = IsDateLike<"2024-02-29">; // leap day


        type F1 = IsDateLike<"2023-1-1">;
        type F2 = IsDateLike<"23-01-01">;
        type F3 = IsDateLike<"January 1, 2023">;
        type F4 = IsDateLike<"1999-02-29">; // leap day in non-leap year
        type F5 = IsDateLike<"2000-06-31">; // June only has 30 days

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
        ];
    });

    it("ISO DateTime Strings", () => {
        type T1 = IsDateLike<"2023-01-01T00:00:00Z">;
        type T2 = IsDateLike<"2023-12-25T12:30:45Z">;
        type T3 = IsDateLike<"2023-06-15T18:45:30.123Z">;
        type T4 = IsDateLike<"2023-01-01T12:00:00+05:00">;

        type F1 = IsDateLike<"2023-01-01 12:00:00">; // invalid space, no `T`
        type F2 = IsDateLike<"2023-01-01T25:00:00Z">; // invalid hours
        type F3 = IsDateLike<"2023-01-01T12:60:00Z">

        type cases = [
            // Valid ISO datetime formats
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            // Invalid datetime formats
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });

    it("Numbers", () => {
        type cases = [
            // Integer numbers (timestamps) should be DateLike
            Expect<Test<IsDateLike<1234567890>, "equals", true>>,
            Expect<Test<IsDateLike<0>, "equals", true>>,
            Expect<Test<IsDateLike<1640995200>, "equals", true>>,
            // Non-integer numbers should not be DateLike
            Expect<Test<IsDateLike<12.34>, "equals", false>>,
            Expect<Test<IsDateLike<123.456>, "equals", false>>,
            // Negative numbers of any sort are not DateLike
            Expect<Test<IsDateLike<-123>, "equals", false>>,
            Expect<Test<IsDateLike<-123.15>, "equals", false>>,
        ];
    });

    it("Wide String Types", () => {
        type cases = [
            // Wide string type should return boolean (runtime determination needed)
            Expect<Test<IsDateLike<string>, "equals", false>>,
        ];
    });

    it("Wide Number Types", () => {
        type cases = [
            // Wide number type should return boolean (runtime determination needed)
            Expect<Test<IsDateLike<number>, "equals", boolean>>,
        ];
    });

    it("Non-DateLike Types", () => {
        type Bool = IsDateLike<boolean>;
        type EmptyObj = IsDateLike<EmptyObject>;
        type Obj = IsDateLike<{ date: string }>;

        type cases = [
            // Primitive non-DateLike types
            Expect<Test<Bool, "equals", false>>,
            Expect<Test<EmptyObj, "equals", false>>,
            Expect<Test<Obj, "equals", false>>,
            Expect<Test<IsDateLike<Array<any>>, "equals", false>>,
            // Function types
            Expect<Test<IsDateLike<() => void>, "equals", false>>,
            Expect<Test<IsDateLike<Function>, "equals", false>>,
        ];
    });

    it("Invalid String Literals", () => {
        type cases = [
            // Various invalid string formats
            Expect<Test<IsDateLike<"hello">, "equals", false>>,
            Expect<Test<IsDateLike<"12345">, "equals", false>>,
            Expect<Test<IsDateLike<"123">, "equals", false>>,
            Expect<Test<IsDateLike<"">, "equals", false>>,
            Expect<Test<IsDateLike<"2023-13-01">, "equals", false>>,
            Expect<Test<IsDateLike<"2023-01-32">, "equals", false>>,
            Expect<Test<IsDateLike<"not-a-date">, "equals", false>>,
        ];
    });

    it("Union Types", () => {
        type Every = IsDateLike<"2023" | "2024">;
        type Every2 = IsDateLike<"2023" | "2024-12-12">;
        type Some = IsDateLike<"2023" | "hello">;
        type None = IsDateLike<"foo" | "bar">;

        type cases = [
            Expect<Test<Every, "equals", true>>,
            Expect<Test<Every2, "equals", true>>,
            Expect<Test<Some, "equals", boolean>>,
            Expect<Test<None, "equals", false>>,
        ];
    });

    it("Complex Edge Cases", () => {
        type cases = [
            // Edge cases with various formats
            Expect<Test<IsDateLike<"0000">, "equals", true>>,
            Expect<Test<IsDateLike<"9999">, "equals", true>>,
            Expect<Test<IsDateLike<"2024-02-29">, "equals", true>>,  // Valid leap year
            // Negative numbers (still integers)
            Expect<Test<IsDateLike<-1>, "equals", true>>, // Still an integer
            Expect<Test<IsDateLike<-123.45>, "equals", false>>, // Not an integer
        ];
    });

});
