import { describe, it, expect } from "vitest";
import type { Abs, Expect, Test } from "inferred-types/types";

import { abs } from "inferred-types/runtime"

describe("Abs<T>", () => {

    it("happy path", () => {
        type Neg = Abs<-123>;
        type Pos = Abs<123>;
        type NegStr = Abs<"-123">;
        type PosStr = Abs<"123">;

        type cases = [
            Expect<Test<Neg, "equals", 123>>,
            Expect<Test<Pos, "equals", 123>>,
            Expect<Test<NegStr, "equals", "123">>,
            Expect<Test<PosStr, "equals", "123">>,
        ];
    });

});

describe("abs(num)", () => {

    it("positive number", () => {
        const test = abs(1);

        expect(test).toBe(1);

        type cases = [
            Expect<Test<typeof test, "equals", 1>>,
        ];
    });

    it("zero", () => {
        const test = abs(0);

        expect(test).toBe(0);

        type cases = [
            Expect<Test<typeof test, "equals", 0>>,
        ];
    });

    it("negative number", () => {
        const test = abs(-1);

        expect(test).toBe(1);

        type cases = [
            Expect<Test<typeof test, "equals", 1>>,
        ];
    });

    it("wide number", () => {
        const test = abs(-1 as number);

        expect(test).toBe(1);

        type cases = [
            Expect<Test<typeof test, "equals", number>>,
        ];
    });

})
