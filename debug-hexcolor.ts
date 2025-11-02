import type {
    IsHexColor,
    Chars,
    Every,
    HexadecimalChar,
    IsBetweenInclusively
} from "inferred-types/types";

// Let's debug step by step
type Test1 = "#abc";
type Step1_ExtractRest = Test1 extends `#${infer Rest}` ? Rest : never;  // Should be "abc"
type Step2_GetChars = Chars<Step1_ExtractRest>;  // Should be ["a", "b", "c"]
type Step3_CheckEvery = Every<Chars<Step1_ExtractRest>, "extends", HexadecimalChar>;  // Should be true
type Step4_GetLength = Step1_ExtractRest["length"];  // Should be 3
type Step5_CheckLength = IsBetweenInclusively<Step1_ExtractRest["length"], 1, 6>;  // Should be true

// Final test
type Result = IsHexColor<"#abc">;

// Let's also check what HexadecimalChar is
type CheckHexChar_a = "a" extends HexadecimalChar ? true : false;
type CheckHexChar_A = "A" extends HexadecimalChar ? true : false;
type CheckHexChar_0 = "0" extends HexadecimalChar ? true : false;
type CheckHexChar_g = "g" extends HexadecimalChar ? true : false;

export type {
    Step1_ExtractRest,
    Step2_GetChars,
    Step3_CheckEvery,
    Step4_GetLength,
    Step5_CheckLength,
    Result,
    CheckHexChar_a,
    CheckHexChar_A,
    CheckHexChar_0,
    CheckHexChar_g
};
