import { describe, expect, it } from "vitest";
import {
    Expect,
    UpperAlphaChar,
    StripSurround,
    Test,
    StripSurrounding
} from "inferred-types/types";
import { stripSurround } from "inferred-types/runtime";


describe("StripSurrounding<TContent,TStrip>", () => {

    it("happy path (deprecated syntax)", () => {
        type Hi = StripSurround<"(Hi)", "(" | ")">;
        type Lower = StripSurround<"Hello World", UpperAlphaChar>;

        type cases = [
            Expect<Test<Hi, "equals", "Hi">>,
            Expect<Test<Lower, "equals", "ello World">>,
        ];
    });

    it("happy path", () => {
        type ImplicitHi = StripSurrounding<"(Hi)", "(" | ")">;
        type ExplicitHi = StripSurrounding<"(Hi)", ["(" , ")"]>;

        type Lower = StripSurrounding<"Hello World", UpperAlphaChar>;
        type LowerBoth = StripSurrounding<"SoS", UpperAlphaChar>;

        type cases = [
            Expect<Test<ImplicitHi, "equals", "Hi">>,
            Expect<Test<ExplicitHi, "equals", "Hi">>,

            Expect<Test<Lower, "equals", "ello World">>,
            Expect<Test<LowerBoth, "equals", "o">>,
        ];
    });



});

describe("stripSurround(content, ...strip)", () => {

    it("happy path", () => {
        const removeParenthesis = stripSurround("(", ")");

        const hi = removeParenthesis("( hi )");
        const noChange = removeParenthesis(" hi ");

        expect(hi).toBe(" hi ");
        expect(noChange).toBe(" hi ");

        type cases = [
            Expect<Test<typeof hi, "equals", " hi ">>,
            Expect<Test<typeof noChange, "equals", " hi ">>,

        ];
    });

});
