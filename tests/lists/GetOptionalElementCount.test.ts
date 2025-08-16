import { Expect, GetOptionalElementCount, Test } from "inferred-types/types";
import { describe, it } from "vitest";


describe("GetOptionalElementCount<T>", () => {


    it("non-variadic", () => {
        type NV_NoOptional = GetOptionalElementCount<[string, boolean]>;
        type NV_AllOptional = GetOptionalElementCount<[string?, boolean?]>;
        type NV_SomeOptional = GetOptionalElementCount<[string, boolean?]>;

        type cases = [
            Expect<Test<NV_NoOptional, "equals", 0>>,
            Expect<Test<NV_AllOptional, "equals", 2>>,
            Expect<Test<NV_SomeOptional, "equals", 1>>,
        ];
    });


    it("variadic", () => {
        type V_NoOptional = GetOptionalElementCount<[string, boolean, ...number[]]>;
        type V_AllOptional = GetOptionalElementCount<[string?, boolean?, ...number[]]>;
        type V_SomeOptional = GetOptionalElementCount<[string, boolean?, ...number[]]>;

        type cases = [
            Expect<Test<V_NoOptional, "equals", 0>>,
            Expect<Test<V_AllOptional, "equals", 2>>,
            Expect<Test<V_SomeOptional, "equals", 1>>,
        ];
    });
})
