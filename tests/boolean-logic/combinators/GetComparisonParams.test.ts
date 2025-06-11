import { describe, it } from "vitest";
import {
    ComparisonInputDefault,
    Expect,
    GetComparisonParamInput,
    Test,
} from "inferred-types/types";
import { GetOpConfig, TupleMeta } from "transpiled/types";

describe("GetComparisonParamInput<TOp,TInput>", () => {

    it("equals", () => {
        type C1 = GetOpConfig<"equals">;
        type I1 = GetComparisonParamInput<"equals">;
        type D1 = ComparisonInputDefault<"equals">;


        type cases = [
            Expect<Test<C1["params"], "equals", [unknown]>>,
            Expect<Test<I1, "equals", unknown>>,
            Expect<Test<D1, "extends", Error>>,
        ];
    });

    it("extends (design-time)", () => {
        type C1 = GetOpConfig<"extends">;
        type I1 = GetComparisonParamInput<"extends">;
        type D1 = ComparisonInputDefault<"extends">;


        type cases = [
            Expect<Test<C1["params"], "equals", [unknown]>>,
            Expect<Test<I1, "equals", unknown>>,
            Expect<Test<D1, "extends", Error>>,
        ];
    });

});
