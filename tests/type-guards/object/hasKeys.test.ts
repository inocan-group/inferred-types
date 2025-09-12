import { defineObj, err, hasKeys } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

import { describe, expect, it } from "vitest";

describe("hasKeys() runtime", () => {

    it("happy path", () => {
        const o = defineObj()({foo: 1, bar: 1});
        const hasFooBar = hasKeys(o);
        const hasFooBarArr = hasKeys("foo", "bar");

        const foobar = { foo: 1, bar: 3 } as { foo: 1 };
        const obj = { foo: 1, bar: 3 } as object;

        if (hasFooBar(foobar)) {
            expect(foobar.foo).toEqual(1);
            expect(foobar.bar).toEqual(3);

            type T1 = typeof foobar;

            type cases = [
                Expect<Test<T1, "equals", { foo: 1; bar: number }>>
            ]
        } else {
            throw err(`hasKeys/foobar`,``,{foobar, hasFooBar})
        }

        if (hasFooBar(obj)) {
            expect(obj.bar).toEqual(3);
            expect(obj.foo).toEqual(1);

            type T1 = typeof obj;

            type cases = [
                Expect<Test<T1, "equals", { foo: number; bar: number }>>
            ]
        }

        if (hasFooBarArr(foobar)) {
            expect(foobar.bar).toEqual(3);
            expect(foobar.foo).toEqual(1);

            type T1 = typeof foobar;

            type cases = [
                Expect<Test<T1, "equals", { foo: 1; bar: number }>>
            ]
        }

        if (hasFooBarArr(obj)) {
            expect(obj.bar).toEqual(3);
            expect(obj.foo).toEqual(1);

            type T1 = typeof obj;

            type cases = [
                Expect<Test<T1, "equals", { foo: unknown; bar: unknown }>>
            ]
        }

    });

});
