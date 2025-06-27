import { describe, it, expect } from "vitest";
import { isFnWithParams } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";

describe("isFnWithParams(val) type-guard", () => {

    it("happy path", () => {
        const t1 = isFnWithParams((name: string) => `Hi ${name}`);
        const t2 = isFnWithParams((name: string) => `Hi ${name}`, "string");

        expect(t1).toBe(true);
        expect(t2).toBe(true);

        const f1 = isFnWithParams((name: string) => `Hi ${name}`, "string", "number");
        const f2 = isFnWithParams(() => "hi");

        expect(f1).toBe(false);
        expect(f2).toBe(false);

        const fn: ((name: string) => `Hi ${string}`) | undefined = (name: string) => `Hi ${name}`;
        const fn2: unknown = (name: string) => `Hi ${name}`;
        const unknown: unknown = null as unknown;

        if (isFnWithParams(fn, 1)) {
            const rtn = fn("Bob");
            type Rtn = typeof rtn;

            type cases = [
                Expect<Test<Rtn, "equals", `Hi ${string}`>>
            ];
        }

        if (isFnWithParams(fn2)) {
            type Fn = typeof fn;

            type cases = [
                Expect<Test<Fn, "equals", (name: string) => `Hi ${string}`>>
            ];
        }
        if (isFnWithParams(unknown, 1)) {
            type Fn = typeof unknown;

            type cases = [
                Expect<Test<Fn, "equals", <T extends readonly [any]>(...args: T) => unknown>>
            ];
        }
        if (isFnWithParams(unknown, 2)) {
            type Fn = typeof unknown;

            type cases = [
                Expect<Test<Fn, "equals", <T extends readonly [any, any]>(...args: T) => unknown>>
            ];
        }
        if (isFnWithParams(unknown, "string", "number")) {
            type Fn = typeof unknown;

            type cases = [
                Expect<Test<Fn, "equals", <T extends readonly [string, number]>(...args: T) => unknown>>
            ];
        }

    });

});
