import type { Expect, Test } from "inferred-types/types";
import { describe, expect, it } from "vitest";
import { freeze } from "inferred-types/runtime";

describe("freeze()", () => {
    it("preserves scalar values while deeply freezing containers", () => {
        const input = {
            foo: 1,
            bar: {
                baz: "hi",
            },
            list: [1, 2, 3],
        } as const;

        const result = freeze(input);

        expect(result).toEqual(input);
        expect(Object.isFrozen(result)).toBe(true);
        expect(Object.isFrozen(result.bar)).toBe(true);
        expect(Object.isFrozen(result.list)).toBe(true);

        type cases = [
            Expect<Test<typeof result["foo"], "equals", 1>>,
            Expect<Test<typeof result["bar"]["baz"], "equals", "hi">>,
            Expect<Test<typeof result["list"][number], "equals", 1 | 2 | 3>>,
        ];
    });
});
