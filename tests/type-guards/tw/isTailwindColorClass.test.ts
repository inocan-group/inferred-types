import {
    Expect,
    Extends,
    Opt,
    Test,
    TwTarget__Color,
    TwTarget__ColorWithOptPrefixes
} from "inferred-types/types";
import { isTailwindColorClass } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

describe("isTailwindColorClass(val)", () => {

    it("happy path", () => {

        const t1 = isTailwindColorClass("bg-red-500");
        const t2 = isTailwindColorClass("border-red-500/25");
        const t3 = isTailwindColorClass("text-black");
        const t4 = isTailwindColorClass("border-black/10");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);

        const f1 = isTailwindColorClass("bg-red-5000");
        const f2 = isTailwindColorClass("border-red-500/255");
        const f3 = isTailwindColorClass("foobar");

        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);

        const test: string = "bg-red-500";

        if (isTailwindColorClass(test)) {
            type T = typeof test;
            type E = TwTarget__Color;

            type cases = [
                Expect<Test<T, "equals", E>>,
            ];
        }
    });


    it("with allowed modifier prefixes", () => {
        const t1 = isTailwindColorClass("dark:bg-red-500", "dark");
        const t2 = isTailwindColorClass("lg:bg-red-500", "dark", "lg");

        expect(t1).toBe(true);
        expect(t2).toBe(true);

        const test: string = "dark:bg-red-500";
        const test2: string = "lg:bg-red-500";

        if (isTailwindColorClass(test, "dark")) {
            type T = typeof test;
            type E = `${Opt<"dark">}:${TwTarget__Color}`;

            type cases = [
                Expect<Test<T, "equals", E>>
            ];
        }

        if (isTailwindColorClass(test2, "dark", "lg", "sm")) {
            type T = typeof test2;

            type cases = [
                // but with two allowed parameters we are still careful to
                // make the type strong enough not to allow _valid_ modifiers
                // which were _not_ included.
                Expect<Test<"lg:bg-red-600", "extends",  T>>,
                Expect<Test<"dark:bg-red-600", "extends", T>>,
                Expect<Test<"sm:bg-red-600", "extends", T>>,
            ];
        }

    });


});
