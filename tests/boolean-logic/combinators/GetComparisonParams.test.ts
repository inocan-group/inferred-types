import { describe, it } from "vitest";
import {
    ComparisonInputDefault,
    Expect,
    GetComparisonParamInput,
    Test,
    GetOpConfig,
    InputTokenLike
} from "inferred-types/types";

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

    it("equalsSome", () => {
        type C1 = GetOpConfig<"equalsSome">;
        type I1 = GetComparisonParamInput<"equalsSome">;
        type D1 = ComparisonInputDefault<"equalsSome">;

        type cases = [
            Expect<Test<C1["params"], "equals", [unknown, unknown, ...unknown[]]>>,
            Expect<Test<I1, "equals", [values: unknown, unknown, ...unknown[]]>>,
            Expect<Test<D1, "extends", Error>>,
        ];
    });

    it("extends", () => {
        type C1 = GetOpConfig<"extends">;
        type I1 = GetComparisonParamInput<"extends">;
        type D1 = ComparisonInputDefault<"extends">;


        type cases = [
            Expect<Test<C1["params"], "equals", [unknown, ...unknown[]]>>,
            Expect<Test<I1, "equals", unknown>>,
            Expect<Test<D1, "extends", Error>>,
        ];
    });



    it("truthy", () => {
        type C1 = GetOpConfig<"truthy">;
        type I1 = GetComparisonParamInput<"truthy">;
        type D1 = ComparisonInputDefault<"truthy">;

        type cases = [
            Expect<Test<C1["params"], "equals", []>>,
            Expect<Test<I1, "equals", []>>,
            Expect<Test<D1, "equals", []>>,
        ];
    });

    it("startsWith", () => {
        type C1 = GetOpConfig<"startsWith">;
        type I1 = GetComparisonParamInput<"startsWith">;
        type D1 = ComparisonInputDefault<"startsWith">;

        type cases = [
            Expect<Test<
                C1["params"], "equals",
                [string | number, ...readonly (string | number)[]]
            >>,
            Expect<Test<C1["convert"], "equals", "stringUnion">>,
            Expect<Test<
                I1, "equals",
                string | number | [string | number, ...(string | number)[]]
            >>,
            Expect<Test<D1, "extends", Error>>,
        ];
    });


    it("objectKeyExtends", () => {
        type C1 = GetOpConfig<"objectKeyExtends">;
        type I1 = GetComparisonParamInput<"objectKeyExtends">;
        type D1 = ComparisonInputDefault<"objectKeyExtends">;

        type cases = [
            Expect<Test<C1["params"], "equals", [key: string, type: unknown]>>,
            Expect<Test<I1, "equals", [key: string, type: unknown]>>,
            Expect<Test<D1, "extends", Error>>,
        ];
    });

    it("containsSome", () => {
        type C1 = GetOpConfig<"containsSome">;
        type I1 = GetComparisonParamInput<"containsSome">;
        type D1 = ComparisonInputDefault<"containsSome">;

        type cases = [
            Expect<Test<C1["params"], "equals", [key: string, type: unknown]>>,
            Expect<Test<I1, "equals", [key: string, type: unknown]>>,
            Expect<Test<D1, "extends", Error>>,
        ];
    });

});
