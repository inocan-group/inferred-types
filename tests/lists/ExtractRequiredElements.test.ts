import { Expect, ExtractRequiredElements, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("ExtractRequiredElements<T>", () => {
    it("non-variadic", () => {
        type NV_NoOptional = ExtractRequiredElements<[string, boolean]>;
        type NV_AllOptional = ExtractRequiredElements<[string?, boolean?]>;
        type NV_SomeOptional = ExtractRequiredElements<[string, boolean?]>;

        type cases = [
            Expect<Test<NV_NoOptional, "equals", [string, boolean]>>,
            Expect<Test<NV_AllOptional, "equals", []>>,
            Expect<Test<NV_SomeOptional, "equals", [string]>>,
        ];
    });


    it("variadic", () => {
        type V_NoOptional = ExtractRequiredElements<[string, boolean, ...number[]]>;
        type V_AllOptional = ExtractRequiredElements<[string?, boolean?, ...number[]]>;
        type V_SomeOptional = ExtractRequiredElements<[string, boolean?, ...number[]]>;

        type cases = [
            Expect<Test<V_NoOptional, "equals", [string, boolean]>>,
            Expect<Test<V_AllOptional, "equals", []>>,
            Expect<Test<V_SomeOptional, "equals", [string]>>,
        ];
    });
})
