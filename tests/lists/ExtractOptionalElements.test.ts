
import { describe, it } from "vitest";
import type { Expect, ExtractOptionalElements, Test } from "inferred-types/types";

describe("ExtractOptionalElements<T>", () => {
    it("non-variadic", () => {
        type NV_NoOptional = ExtractOptionalElements<[string, boolean]>;
        type NV_AllOptional = ExtractOptionalElements<[string?, boolean?]>;
        type NV_SomeOptional = ExtractOptionalElements<[string, boolean?]>;

        type cases = [
            Expect<Test<NV_NoOptional, "equals", []>>,
            Expect<Test<NV_AllOptional, "equals", [string?, boolean?]>>,
            Expect<Test<NV_SomeOptional, "equals", [boolean?]>>,
        ];
    });

    it("variadic", () => {
        type V_NoOptional = ExtractOptionalElements<[string, boolean, ...number[]]>;
        type V_AllOptional = ExtractOptionalElements<[string?, boolean?, ...number[]]>;
        type V_SomeOptional = ExtractOptionalElements<[string, boolean?, ...number[]]>;

        type cases = [
            Expect<Test<V_NoOptional, "equals", []>>,
            Expect<Test<V_AllOptional, "equals", [string?, boolean?]>>,
            Expect<Test<V_SomeOptional, "equals", [boolean?]>>,
        ];
    });
})
