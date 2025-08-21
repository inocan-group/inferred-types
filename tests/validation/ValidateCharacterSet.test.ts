import { AlphaChar } from "inferred-types";
import { Expect, Err, Test, ValidateCharacterSet, AlphanumericChar } from "inferred-types/types";
import { describe, it } from "vitest";

describe("ValidateCharacterSet<TContent,TCharset,[E]>", () => {

    it("Alpha characters", () => {
        type T1 = ValidateCharacterSet<"hello", AlphaChar>;
        type T2 = ValidateCharacterSet<"HeLLo", AlphaChar>;

        type F1 = ValidateCharacterSet<"Hello-", AlphaChar>;
        type F2 = ValidateCharacterSet<"Hell-o", AlphaChar>;
        type F3 = ValidateCharacterSet<"-Hello", AlphaChar>;

        type E1 = ValidateCharacterSet<"Hello-", AlphaChar, Err<`invalid-char`>>;

        type cases = [
            Expect<Test<T1, "equals", "hello">>,
            Expect<Test<T2, "equals", "HeLLo">>,

            Expect<Test<F1, "isError", "invalid-character">>,
            Expect<Test<F2, "isError", "invalid-character">>,
            Expect<Test<F3, "isError", "invalid-character">>,

            Expect<Test<E1, "isError", "invalid-char">>,
        ];
    });

    it("AlphaNumericPlus", () => {
        type T1 = ValidateCharacterSet<"123hello_", AlphanumericChar | "_">
        type F1 = ValidateCharacterSet<"123hello_", AlphanumericChar | "-">

        type cases = [
            Expect<Test<T1, "equals", "123hello_">>,
            Expect<Test<F1, "isError", "invalid-character">>,
        ];
    });



});


