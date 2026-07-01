import { describe, expect, it } from "vitest";
import type { Expect, ParameterlessFn, Test } from "inferred-types/types";

// NOTE: `isFnWithoutParams` is defined in
// `modules/runtime/src/type-guards/isFnWithoutParams.ts` but is NOT re-exported
// from the runtime barrel (`inferred-types/runtime`). It should be importable
// from the public entrypoint; until that export is added we import it directly
// from the source module so its behavior can be validated.
import { isFnWithoutParams } from "runtime/type-guards/isFnWithoutParams";

describe("isFnWithoutParams(value)", () => {

    it("happy path: functions declaring zero parameters are true", () => {
        expect(isFnWithoutParams(() => 1)).toBe(true);
        expect(isFnWithoutParams(function () { return 1; })).toBe(true);
        // default params and rest params do not count toward `Function.length`
        expect(isFnWithoutParams((a = 1) => a)).toBe(true);
        expect(isFnWithoutParams((...args: number[]) => args)).toBe(true);
    });

    it("false cases: functions declaring one or more parameters", () => {
        expect(isFnWithoutParams((a: number) => a)).toBe(false);
        expect(isFnWithoutParams((a: number, b: number) => a + b)).toBe(false);
        expect(isFnWithoutParams(function (a: number) { return a; })).toBe(false);
    });

    it("non-function values return false without throwing", () => {
        expect(isFnWithoutParams(42)).toBe(false);
        expect(isFnWithoutParams("fn")).toBe(false);
        expect(isFnWithoutParams(null)).toBe(false);
        expect(isFnWithoutParams(undefined)).toBe(false);
        expect(isFnWithoutParams({})).toBe(false);
        expect(isFnWithoutParams([])).toBe(false);
    });

    it("type guard narrows to ParameterlessFn", () => {
        const val: unknown = () => 1;

        if (isFnWithoutParams(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", ParameterlessFn>>,
            ];
        }
    });

});
