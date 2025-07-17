import { describe, it } from "vitest";
import type {
    IsIsoDateTime,
    AsDateMeta,
    ParseDate,
    DateMeta,
    Expect,
    Test
} from "inferred-types/types";

describe("Debug IsIsoDateTime", () => {
    it("debug single datetime", () => {
        // Test a simple ISO datetime
        type TestString = "2023-01-01T00:00:00Z";
        
        // Step by step debugging
        type Step1_ParseDate = ParseDate<TestString>;
        type Step2_AsDateMeta = AsDateMeta<TestString>;
        type Step3_IsError = Step2_AsDateMeta extends Error ? true : false;
        type Step4_IsDateMeta = Step2_AsDateMeta extends DateMeta ? true : false;
        type Step5_DateType = Step2_AsDateMeta extends DateMeta ? Step2_AsDateMeta["dateType"] : never;
        type Step6_IsDateTime = Step5_DateType extends "datetime" ? true : false;
        
        // Final result
        type FinalResult = IsIsoDateTime<TestString>;
        
        // Additional debugging
        type CheckDateMeta = Step2_AsDateMeta extends { dateType: infer DT } ? DT : "no dateType property";
        type CheckParsedDate = Step1_ParseDate;
        
        type cases = [
            // These will help us understand what's happening
            Expect<Test<Step3_IsError, "equals", false>>, // Should not be an error
            Expect<Test<Step4_IsDateMeta, "equals", true>>, // Should be DateMeta
            // Commenting out the failing tests to see other results
            // Expect<Test<Step5_DateType, "equals", "datetime">>, // Should be "datetime"
            // Expect<Test<Step6_IsDateTime, "equals", true>>, // Should be true
            // Expect<Test<FinalResult, "equals", true>>, // Final should be true
        ];
    });
});