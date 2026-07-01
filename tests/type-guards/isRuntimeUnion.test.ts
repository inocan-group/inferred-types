import { describe, expect, it } from "vitest";
import type { Expect, RuntimeUnion, Test } from "inferred-types/types";
// NOTE: `isRuntimeUnion` is not re-exported from the `inferred-types/runtime`
// barrel, so it is imported directly via the deep `runtime/*` alias.
import { isRuntimeUnion } from "runtime/type-guards/isRuntimeUnion";

function makeRuntimeUnion(): RuntimeUnion<[string, number]> {
    return {
        kind: "Union",
        members: ["string", "number"] as unknown as [string, number],
        type: "string" as string | number,
        includes: () => false,
    };
}

describe("isRuntimeUnion(val)", () => {

    it("returns true for a RuntimeUnion-shaped object", () => {
        const ru = makeRuntimeUnion();

        expect(isRuntimeUnion(ru)).toBe(true);
        // the guard only checks that it is an object with `kind === "Union"`
        expect(isRuntimeUnion({ kind: "Union" })).toBe(true);
    });

    it("returns false for objects without kind === 'Union'", () => {
        expect(isRuntimeUnion({ kind: "Intersection" })).toBe(false);
        expect(isRuntimeUnion({ members: [] })).toBe(false);
        expect(isRuntimeUnion({})).toBe(false);
    });

    it("returns false for non-object primitives", () => {
        expect(isRuntimeUnion(42)).toBe(false);
        expect(isRuntimeUnion("Union")).toBe(false);
        expect(isRuntimeUnion(undefined)).toBe(false);
    });

    it("returns false (does not throw) for null", () => {
        // A type guard receiving `unknown` should safely reject `null`
        // rather than throw when using the `in` operator.
        expect(isRuntimeUnion(null)).toBe(false);
    });

    it("narrows to a RuntimeUnion", () => {
        const val = makeRuntimeUnion() as unknown;

        if (isRuntimeUnion(val)) {
            type cases = [
                Expect<Test<typeof val, "extends", { kind: "Union" }>>
            ];
        }
    });

});
