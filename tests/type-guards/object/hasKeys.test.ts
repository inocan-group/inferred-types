import { err, hasKeys } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

describe("hasKeys() runtime", () => {

    it("happy path", () => {
        const hasFooBar = hasKeys({ foo: 1 as number, bar: 1 as number });
        const hasFooBarArr = hasKeys("foo", "bar");

        const foobar = { foo: 1, bar: 3 } as { foo: 1 };
        const obj = { foo: 1, bar: 3 } as object;

        if (hasFooBar(foobar)) {
            // @ts-expect-error
            expect(foobar.bar).toEqual(3);
            expect(foobar.foo).toEqual(1);
        } else {
            throw err(`hasKeys/foobar`,``,{foobar, hasFooBar})
        }

        if (hasFooBar(obj)) {
            // @ts-expect-error
            expect(obj.bar).toEqual(3);
            // @ts-expect-error
            expect(obj.foo).toEqual(1);
        }

        if (hasFooBarArr(foobar)) {
            expect(foobar.bar).toEqual(3);
            expect(foobar.foo).toEqual(1);
        }

        if (hasFooBarArr(obj)) {
            expect(obj.bar).toEqual(3);
            expect(obj.foo).toEqual(1);
        }

    });

});
