import { describe, expect, it } from "vitest";
import { createFnWithProps, defineObj } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

describe("defineObj(literals)(wide) runtime utility", () => {

    it("happy path", () => {
        const fooBarBaz = defineObj({ foo: 1 })({ bar: 2, baz: 3 });

        const narrowFn = defineObj({ fn: () => "hi" })();
        const wideFn = defineObj()({ fn: () => "hi" });

        const fnWithProps = createFnWithProps(() => "hi", { foo: 1, bar: 2 });

        const narrowFnWithProps = defineObj({ fn: fnWithProps })();
        const wideFnWithProps = defineObj()({ fn: fnWithProps });

        expect(fooBarBaz).toEqual({ foo: 1, bar: 2, baz: 3 });
        expect(narrowFn.fn()).toBe("hi");
        expect(narrowFnWithProps.fn.foo).toBe(1);
        expect(wideFnWithProps.fn.foo).toBe(1);

        type cases = [
            Expect<Test<
                typeof fooBarBaz, "equals",
                { foo: 1; bar: number; baz: number }
            >>,

            Expect<Test<
                typeof narrowFn, "equals",
                { fn: () => "hi" }
            >>,
            Expect<Test<
                typeof wideFn, "equals",
                { fn: () => string }
            >>,

            Expect<Test<
                typeof narrowFnWithProps, "equals",
                    {
                        fn: (() => string) &
                        {
                            foo: 1;
                            bar: 2;
                        }
                    }
            >>,
            Expect<Test<typeof wideFnWithProps, "equals",
                {
                    fn: (() => string) &
                    {
                        foo: number;
                        bar: number;
                    };
                }
            >>,
        ];
    });

});
