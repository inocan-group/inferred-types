import type {
    IsIsoDateTime,
    AsDateMeta,
    ParseDate,
    DateMeta
} from "inferred-types/types";

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

// Debug info
type DebugInfo = {
    parseDate: Step1_ParseDate;
    asDateMeta: Step2_AsDateMeta;
    isError: Step3_IsError;
    isDateMeta: Step4_IsDateMeta;
    dateType: Step5_DateType;
    isDateTime: Step6_IsDateTime;
    finalResult: FinalResult;
};