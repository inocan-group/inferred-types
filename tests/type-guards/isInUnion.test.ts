
import { describe, expect, it } from "vitest";
import { isInUnion } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

describe("isInUnion(elements) => TypeGuard", () => {

    it("create type guard", () => {
        const tg = isInUnion(1, 2, 3);

        expect(typeof tg).toBe("function");

        type cases = [
            Expect<Test<typeof tg, "equals", (val: unknown) => val is 1 | 2 | 3>>,
        ];
    });

    it("happy path", () => {
        const fooBarBaz = isInUnion("foo", "bar", "baz")
        const foo = fooBarBaz("foo");
        const bax = fooBarBaz("bax")
        expect(foo).toBe(true);
        expect(bax).toBe(false);

        const num1 = isInUnion(1, 2, 3)(2);
        const notIn = isInUnion(1, 2, 3)(4);
        expect(num1).toBe(true);
        expect(notIn).toBe(false);

    });

});
