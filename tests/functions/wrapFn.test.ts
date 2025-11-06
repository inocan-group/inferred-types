import { describe, expect, it } from "vitest";
import {
    AssertEqual,
    DropParser,
    Expect,
    HasIndex,
    Test,
    TypedFunction,
} from "inferred-types/types";
import { dropParser } from "runtime/take";
import { AfterFirst, AssertExtends, AssertTrue } from "transpiled";
import { narrow, wrapFn } from "inferred-types/runtime";

const fn = <T extends string>(name: T) => narrow(name);

describe("wrapFn(fn) -> (cb) -> (...params) -> result", () => {


    describe("step-by-step", () => {


        it("Identity", () => {
            expect(typeof fn).toBe("function");

            type cases = [
                Expect<AssertExtends<typeof fn, TypedFunction>>,
            ];
        });


        it("Wrapped Function", () => {
            const wrappedFn = wrapFn(fn);

            expect(typeof wrappedFn).toBe("function");

            type P = Parameters<typeof wrappedFn>[0];

            type cases = [
                Expect<AssertExtends<P, TypedFunction>>
            ];
        });


        it("Callback Provided", () => {
            const partial =  wrapFn(fn);
            type ApiParam = Parameters<typeof partial>[0];

            // identity callback just returns the same thing as the wrapped function
            // this activates the `done()` function which returns the return type of
            // the wrapped function.
            const withCallback = partial(a => a.done());

            expect(typeof withCallback).toBe("function");

            /** the original function's parameters */
            type P = Parameters<typeof fn>;
            /** the configured wrapped function; should have same params */
            type WP = Parameters<typeof withCallback>;

            type R = ReturnType<typeof withCallback>;

            type cases = [
                Expect<AssertEqual<P,WP>>,
                Expect<AssertExtends<
            ];
        });


        it("Results", () => {
            const partial = wrapFn(fn)((f, ...args) => ({fn: f, args}));
            const result = partial("Hello World");

            console.log(JSON.stringify(result))

            expect(typeof (result as any).fn).toBe("function");
            expect((result as any).args, JSON.stringify((result as any).args)).toEqual(["Hello World"]);

            type R = typeof result;

            type cases = [
                Expect<AssertTrue<HasIndex<R, "fn">>>,
                Expect<AssertTrue<HasIndex<R, "args">>>,
            ];
        });



    })



});
