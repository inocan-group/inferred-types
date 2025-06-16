import { describe, it } from "vitest";
import {
    Expect,
    Test,
    TakeNumeric
} from "inferred-types/types";
import { Equal } from "@type-challenges/utils";

describe("TakeNumeric<T,[TFollow]>", () => {

    it("positive numbers", () => {
        type T1 = TakeNumeric<"45 is a number">;
        type T2 = TakeNumeric<"45.67 is a decimal number">;
        type T3 = TakeNumeric<"455555 is a big number">;

        type cases = [
            Expect<Test<
                T1, "equals",
                ["45", " is a number"]
            >>,
            Expect<Test<
                T2, "equals",
                ["45.67", " is a decimal number"]
            >>,
            Expect<Test<
                T3, "equals",
                ["455555", " is a big number"]
            >>,
        ];
    });

    it("decimal numbers", () => {
        type T1 = TakeNumeric<"3.14159 pi">;
        type T2 = TakeNumeric<"0.5 half">;
        type T3 = TakeNumeric<"123.456.789">;
        type T4 = TakeNumeric<".5 starts with dot">;

        type cases = [
            Expect<Test<
                T1, "equals",
                ["3.14159", " pi"]
            >>,
            Expect<Test<
                T2, "equals",
                ["0.5", " half"]
            >>,
            Expect<Test<
                T3, "equals",
                ["123.456", ".789"]
            >>,
            Expect<Test<
                T4, "equals",
                [".5", " starts with dot"]
            >>,
        ];
    });

    it("negative numbers", () => {
        type T1 = TakeNumeric<"-123 negative integer">;
        type T2 = TakeNumeric<"-45.67 negative decimal">;
        type T3 = TakeNumeric<"-0 negative zero">;
        type T4 = TakeNumeric<"-999.999 big negative">;

        type cases = [
            Expect<Test<
                T1, "equals",
                ["-123", " negative integer"]
            >>,
            Expect<Test<
                T2, "equals",
                ["-45.67", " negative decimal"]
            >>,
            Expect<Test<
                T3, "equals",
                ["-0", " negative zero"]
            >>,
            Expect<Test<
                T4, "equals",
                ["-999.999", " big negative"]
            >>,
        ];
    });

    it("non-numeric strings", () => {
        type T1 = TakeNumeric<"abc123">;
        type T2 = TakeNumeric<"hello world">;
        type T3 = TakeNumeric<" 123 leading space">;
        type T4 = TakeNumeric<"-abc not numeric">;  // Minus without number

        type cases = [
            Expect<Equal<
                T1,
                [undefined, "abc123"]
            >>,
            Expect<Test<
                T2, "equals",
                [undefined, "hello world"]
            >>,
            Expect<Test<
                T3, "equals",
                [undefined, " 123 leading space"]
            >>,
            Expect<Test<
                T4, "equals",
                [undefined, "-abc not numeric"]
            >>,
        ];
    });

    it("edge cases", () => {
        type T1 = TakeNumeric<"">;  // Empty string
        type T2 = TakeNumeric<"123">;  // Only numbers
        type T3 = TakeNumeric<"456.789">;  // Only decimal
        type T4 = TakeNumeric<"0">;  // Single zero
        type T5 = TakeNumeric<".">;  // Only dot
        type T6 = TakeNumeric<"-123">;  // Only negative number
        type T7 = TakeNumeric<"-0.5">;  // Only negative decimal
        type T8 = TakeNumeric<"-">;  // Only minus sign

        type cases = [
            Expect<Equal<
                T1,
                [undefined, ""]
            >>,
            Expect<Test<
                T2, "equals",
                ["123", ""]
            >>,
            Expect<Test<
                T3, "equals",
                ["456.789", ""]
            >>,
            Expect<Test<
                T4, "equals",
                ["0", ""]
            >>,
            Expect<Test<
                T5, "equals",
                [undefined, "."]
            >>,
            Expect<Test<
                T6, "equals",
                ["-123", ""]
            >>,
            Expect<Test<
                T7, "equals",
                ["-0.5", ""]
            >>,
            Expect<Test<
                T8, "equals",
                [undefined, "-"]
            >>,
        ];
    });

    it("wide container types", () => {
        type T1 = TakeNumeric<string>;
        type T2 = TakeNumeric<`${string}123`>;
        type T3 = TakeNumeric<`${string}-123`>;

        type cases = [
            Expect<Test<
                T1, "equals",
                [`${number}` | undefined, string]
            >>,
            Expect<Test<
                T2, "equals",
                [`${number}` | undefined, string]
            >>,
            Expect<Test<
                T3, "equals",
                [`${number}` | undefined, string]
            >>,
        ];
    });

    it("mustFollow option - successful matches", () => {
        type T1 = TakeNumeric<"123px", { mustFollow: "px" }>;
        type T2 = TakeNumeric<"45.67em", { mustFollow: "em" }>;
        type T3 = TakeNumeric<"100%", { mustFollow: "%" }>;
        type T4 = TakeNumeric<"42 items", { mustFollow: " items" }>;
        type T5 = TakeNumeric<"-123px", { mustFollow: "px" }>;
        type T6 = TakeNumeric<"-45.67em", { mustFollow: "em" }>;

        type cases = [
            Expect<Test<
                T1, "equals",
                ["123", "px"]
            >>,
            Expect<Test<
                T2, "equals",
                ["45.67", "em"]
            >>,
            Expect<Test<
                T3, "equals",
                ["100", "%"]
            >>,
            Expect<Test<
                T4, "equals",
                ["42", " items"]
            >>,
            Expect<Test<
                T5, "equals",
                ["-123", "px"]
            >>,
            Expect<Test<
                T6, "equals",
                ["-45.67", "em"]
            >>,
        ];
    });

    it("mustFollow option - failed matches", () => {
        type T1 = TakeNumeric<"123em", { mustFollow: "px" }>;
        type T2 = TakeNumeric<"45.67", { mustFollow: "px" }>;
        type T3 = TakeNumeric<"100 percent", { mustFollow: "%" }>;
        type T4 = TakeNumeric<"-123em", { mustFollow: "px" }>;
        type T5 = TakeNumeric<"-45.67", { mustFollow: "px" }>;

        type cases = [
            Expect<Test<
                T1, "equals",
                [undefined, "123em"]
            >>,
            Expect<Test<
                T2, "equals",
                [undefined, "45.67"]
            >>,
            Expect<Test<
                T3, "equals",
                [undefined, "100 percent"]
            >>,
            Expect<Test<
                T4, "equals",
                [undefined, "-123em"]
            >>,
            Expect<Test<
                T5, "equals",
                [undefined, "-45.67"]
            >>,
        ];
    });

    it("ignore option", () => {
        type T1 = TakeNumeric<"1,234.56 dollars", { ignore: "," }>;
        type T2 = TakeNumeric<"1_000_000", { ignore: "_" }>;
        type T3 = TakeNumeric<"3.14,159", { ignore: "," }>;
        type T4 = TakeNumeric<"1,2,3,4", { ignore: "," }>;
        type T5 = TakeNumeric<"-1,234.56 debt", { ignore: "," }>;
        type T6 = TakeNumeric<"-1_000_000", { ignore: "_" }>;

        type cases = [
            Expect<Test<
                T1, "equals",
                ["1234.56", " dollars"]
            >>,
            Expect<Test<
                T2, "equals",
                ["1000000", ""]
            >>,
            Expect<Test<
                T3, "equals",
                ["3.14159", ""]
            >>,
            Expect<Test<
                T4, "equals",
                ["1234", ""]
            >>,
            Expect<Test<
                T5, "equals",
                ["-1234.56", " debt"]
            >>,
            Expect<Test<
                T6, "equals",
                ["-1000000", ""]
            >>,
        ];
    });

    it("combined options", () => {
        type T1 = TakeNumeric<"1,234px", { ignore: ",", mustFollow: "px" }>;
        type T2 = TakeNumeric<"1_000.50em", { ignore: "_", mustFollow: "em" }>;
        type T3 = TakeNumeric<"1,234rem", { ignore: ",", mustFollow: "px" }>;  // Should fail mustFollow
        type T4 = TakeNumeric<"-1,234px", { ignore: ",", mustFollow: "px" }>;
        type T5 = TakeNumeric<"-1_000.50em", { ignore: "_", mustFollow: "em" }>;
        type T6 = TakeNumeric<"-1,234rem", { ignore: ",", mustFollow: "px" }>;  // Should fail mustFollow

        type cases = [
            Expect<Test<
                T1, "equals",
                ["1234", "px"]
            >>,
            Expect<Test<
                T2, "equals",
                ["1000.50", "em"]
            >>,
            Expect<Test<
                T3, "equals",
                [undefined, "1234rem"]
            >>,
            Expect<Test<
                T4, "equals",
                ["-1234", "px"]
            >>,
            Expect<Test<
                T5, "equals",
                ["-1000.50", "em"]
            >>,
            Expect<Test<
                T6, "equals",
                [undefined, "-1234rem"]
            >>,
        ];
    });

    it("complex numeric patterns", () => {
        type T1 = TakeNumeric<"123.456.789.012">;  // Multiple dots
        type T2 = TakeNumeric<"0000123">;  // Leading zeros
        type T3 = TakeNumeric<"123abc456">;  // Numbers with letters in between
        type T4 = TakeNumeric<"9876543210.0987654321">;  // Long decimal
        type T5 = TakeNumeric<"-123.456.789.012">;  // Negative with multiple dots
        type T6 = TakeNumeric<"-0000123">;  // Negative with leading zeros
        type T7 = TakeNumeric<"-123abc456">;  // Negative with letters in between

        type cases = [
            Expect<Test<
                T1, "equals",
                ["123.456", ".789.012"]
            >>,
            Expect<Test<
                T2, "equals",
                ["0000123", ""]
            >>,
            Expect<Test<
                T3, "equals",
                ["123", "abc456"]
            >>,
            Expect<Test<
                T4, "equals",
                ["9876543210.0987654321", ""]
            >>,
            Expect<Test<
                T5, "equals",
                ["-123.456", ".789.012"]
            >>,
            Expect<Test<
                T6, "equals",
                ["-0000123", ""]
            >>,
            Expect<Test<
                T7, "equals",
                ["-123", "abc456"]
            >>,
        ];
    });

    it("ignore with multiple characters", () => {
        type T1 = TakeNumeric<"1,2,3.4,5", { ignore: "," | "_" }>;
        type T2 = TakeNumeric<"1_2_3,4_5", { ignore: "," | "_" }>;

        type cases = [
            Expect<Test<
                T1, "equals",
                ["123.45", ""]
            >>,
            Expect<Test<
                T2, "equals",
                ["12345", ""]
            >>,
        ];
    });

    it("mustFollow failures return [undefined, string] - explicit behavior test", () => {
        // When mustFollow is specified but the required string doesn't follow the numeric part,
        // the result should be [undefined, original_string] rather than an empty array
        type T1 = TakeNumeric<"123abc", { mustFollow: "px" }>;
        type T2 = TakeNumeric<"45.67rem", { mustFollow: "px" }>;
        type T3 = TakeNumeric<"100", { mustFollow: "%" }>;
        type T4 = TakeNumeric<"-42.5vh", { mustFollow: "px" }>;

        type cases = [
            Expect<Test<
                T1, "equals",
                [undefined, "123abc"]
            >>,
            Expect<Test<
                T2, "equals",
                [undefined, "45.67rem"]
            >>,
            Expect<Test<
                T3, "equals",
                [undefined, "100"]
            >>,
            Expect<Test<
                T4, "equals",
                [undefined, "-42.5vh"]
            >>,
        ];
    });

});

it("negative number edge cases", () => {
        type T1 = TakeNumeric<"--123 double negative">;  // Should not match
        type T2 = TakeNumeric<"- 123 space after minus">;  // Should not match
        type T3 = TakeNumeric<"-. dot after minus">;  // Should not match
        type T4 = TakeNumeric<"-.5 negative decimal starting with dot">;
        type T5 = TakeNumeric<"-0.0 negative zero decimal">;

        type cases = [
            Expect<Test<
                T1, "equals",
                [undefined, "--123 double negative"]
            >>,
            Expect<Test<
                T2, "equals",
                [undefined, "- 123 space after minus"]
            >>,
            Expect<Test<
                T3, "equals",
                [undefined, "-. dot after minus"]
            >>,
            Expect<Test<
                T4, "equals",
                ["-.5", " negative decimal starting with dot"]
            >>,
            Expect<Test<
                T5, "equals",
                ["-0.0", " negative zero decimal"]
            >>,
        ];
    });
