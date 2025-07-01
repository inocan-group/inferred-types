import { describe, expect, it } from "vitest";
import {
    Expect,
    Test,
} from "inferred-types/types";
import { equalsSome } from "runtime/boolean-logic";

describe("equalsSome(v1, v2, v3)(compare)", () => {

    it("happy path", () => {
        const fooBarBaz = equalsSome("foo", "bar", "baz");

        const t1 = fooBarBaz("foo");
        const t2 = fooBarBaz("bar");
        const t3 = fooBarBaz("baz");

        const f1 = fooBarBaz("bax");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(f1).toBe(false);

        type cases = [
            Expect<Test<typeof t1, "equals", true>>,
            Expect<Test<typeof t2, "equals", true>>,
            Expect<Test<typeof t3, "equals", true>>,
            Expect<Test<typeof f1, "equals", false>>,
        ];
    });

});
