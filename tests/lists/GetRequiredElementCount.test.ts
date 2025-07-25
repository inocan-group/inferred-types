import { Expect, GetRequiredElementCount, Test } from "inferred-types/types";
import { describe, it } from "vitest";


describe("GetRequiredElementCount<T>", () => {
    it("non-variadic", () => {
        type NV_NoOptional = GetRequiredElementCount<[string, boolean]>;
        type NV_AllOptional = GetRequiredElementCount<[string?, boolean?]>;
        type NV_SomeOptional = GetRequiredElementCount<[string, boolean?]>;

        type cases = [
            Expect<Test<NV_NoOptional, "equals", 2>>,
            Expect<Test<NV_AllOptional, "equals", 0>>,
            Expect<Test<NV_SomeOptional, "equals", 1>>,
        ];
    });


    it("variadic", () => {
        type V_NoOptional = GetRequiredElementCount<[string, boolean, ...number[]]>;
        type V_AllOptional = GetRequiredElementCount<[string?, boolean?, ...number[]]>;
        type V_SomeOptional = GetRequiredElementCount<[string, boolean?, ...number[]]>;

        type cases = [
            Expect<Test<V_NoOptional, "equals", 2>>,
            Expect<Test<V_AllOptional, "equals", 0>>,
            Expect<Test<V_SomeOptional, "equals", 1>>,
        ];
    });

})
