import { describe, expect, it } from "vitest";
import type { Expect, SomeEqual, Test } from "inferred-types/types";

import { equalsSome } from "inferred-types/runtime";

describe("equalsSome(v1, v2, v3)(compare)", () => {

    it("SomeEquals<T> happy path", () => {
        type T1 = SomeEqual<["foo","bar","baz"], "foo">;
        type T2 = SomeEqual<["foo","bar","baz"], "bar">;
        type T3 = SomeEqual<["foo","bar","baz"], "baz">;

        type F1 = SomeEqual<["foo","bar","baz"], "bat">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
        ];
    });

    it("runtime types and values", () => {
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
