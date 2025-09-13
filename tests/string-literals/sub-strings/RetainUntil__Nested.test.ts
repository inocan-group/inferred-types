import { describe, expect, it } from "vitest";
import { QUOTE_NESTING, ALPHA_CHARS, NUMERIC_CHAR } from "inferred-types/constants";
import { isError, nesting, retainUntil__Nested } from "inferred-types/runtime";
import type { Expect, RetainUntil__Nested, Test } from "inferred-types/types";

describe("RetainUntil__Nested<TStr,TFind,TNesting>", () => {
    type Fn = `function greet(name: string) { return "hi" + name; };`
    type Basic = `hi there`;
    type ObjTup = `[ { foo: { bar: number } }, { bar: 42 } } ] | number`;
    type Obj = `{ foo: { bar: number } } | string`

    it("no nesting chars", () => {
        type T1 = RetainUntil__Nested<Basic, " ", false>;
        type T2 = RetainUntil__Nested<Basic, " ", true>;
        type T3 = RetainUntil__Nested<Basic, " ">;

        type cases = [
            Expect<Test<T1, "equals", "hi">>,
            Expect<Test<T2, "equals", "hi ">>,
            Expect<Test<T3, "equals", "hi ">>,
        ];
    });

    it("single nesting level", () => {
        type T1 = RetainUntil__Nested<Fn, "}">;
        type T2 = RetainUntil__Nested<Fn, "}", true>;
        type T3 = RetainUntil__Nested<Fn, "}", false>;

        type cases = [
            Expect<Test<
                T1, "equals",
                `function greet(name: string) { return "hi" + name; }`
            >>,
            Expect<Test<
            T2, "equals",
                `function greet(name: string) { return "hi" + name; }`
            >>,
            Expect<Test<
                T3, "equals",
                `function greet(name: string) { return "hi" + name; `
            >>,
        ];
    });

    it("multi nesting level", () => {
        type T1 = RetainUntil__Nested<
            ObjTup,
            "}",
            true,
            {
                "{": "}"
            }
        >;
        type T2 = RetainUntil__Nested<ObjTup, "]">;
        type T3 = RetainUntil__Nested<Obj, "}">;

        type cases = [
            Expect<Test<
                T1, "equals",
                `[ { foo: { bar: number } }`
            >>,
            Expect<Test<
                T2, "equals",
                `[ { foo: { bar: number } }, { bar: 42 } } ]`
            >>,
            Expect<Test<
                T3, "equals",
                `{ foo: { bar: number } }`
            >>,
        ];
    });

    it("error when can't find terminal char", () => {
        type E1 = RetainUntil__Nested<`abcd`, "}">;

        type cases = [
            Expect<Test<E1, "isError", "not-found">>,
        ];
    });

    it("error when nesting stack is unbalanced", () => {
        type E1 = RetainUntil__Nested<`{ foo {}`, "}">;

        type cases = [
            Expect<Test<E1, "isError", "unbalanced">>,
        ];
    });

    it("error when non-string value passed into TStr", () => {
        type E1 = RetainUntil__Nested<99, "}">;

        type cases = [
            Expect<Test<E1, "isError", "invalid-type">>,
        ];
    });

});

// RUNTIME
// -----------------------------------------------------------------

describe("retainUntil__Nested(str, find, incl, nesting)", () => {

    it("no nesting chars", () => {
        const t1 = retainUntil__Nested("Hi! Welcome.", "!");
        const t2 = retainUntil__Nested("Hi! Welcome.", "!", false);

        expect(t1).toBe("Hi!")
        expect(t2).toBe("Hi")

        type cases = [
            Expect<Test<typeof t1, "equals", "Hi!">>,
            Expect<Test<typeof t2, "equals", "Hi">>,
        ];
    });

    it("single nesting stack", () => {
        const t1 = retainUntil__Nested("Hi! { Welcome }.", "!");
        const t2 = retainUntil__Nested("Hi{! Welcome}.!", "!");
        const t3 = retainUntil__Nested("Hi{! Welcome}.! Welcome.", "!");

        expect(t1).toBe("Hi!")
        expect(t2).toBe("Hi{! Welcome}.!")
        expect(t3).toBe("Hi{! Welcome}.!")

        type cases = [
            Expect<Test<typeof t1, "equals", "Hi!">>,
            Expect<Test<typeof t2, "equals", "Hi{! Welcome}.!">>,
            Expect<Test<typeof t3, "equals", "Hi{! Welcome}.!">>,
        ];
    });

    it("multi-nesting stack with same START, END chars", () => {
        const t1 = retainUntil__Nested("Hi! {{ Welcome }}.", "!");
        const t2 = retainUntil__Nested("Hi{{! Welcome}}.!", "!");
        const t3 = retainUntil__Nested("Hi{{! Welcome}}.! Welcome.", "!");

        expect(t1).toBe("Hi!")
        expect(t2).toBe("Hi{{! Welcome}}.!")
        expect(t3).toBe("Hi{{! Welcome}}.!")

        type cases = [
            Expect<Test<typeof t1, "equals", "Hi!">>,
            Expect<Test<typeof t2, "equals", "Hi{{! Welcome}}.!">>,
            Expect<Test<typeof t3, "equals", "Hi{{! Welcome}}.!">>,
        ];
    });

    it("using NestingTuple with undefined for END", () => {
        const t1 = retainUntil__Nested(
            "Hi,12456 is a number", " ", true,
            [NUMERIC_CHAR, undefined]
        )

        expect(t1).toBe("Hi,12456 ");

        type cases = [
            Expect<Test<typeof t1, "equals", "Hi,12456 ">>,
        ];
    });

    it("using NestingTuple with START and END chars", () => {
        // the "1" character should add to the stack
        // the "i" character should remove from the stack
        const t1 = retainUntil__Nested(
            "Hi,12456 is a number", " ", true,
            [NUMERIC_CHAR, ALPHA_CHARS]
        )

        expect(t1).toBe("Hi,12456 is ");

        type cases = [
            Expect<Test<typeof t1, "equals", "Hi,12456 is ">>,
        ];
    });

    it("using quotes nesting config", () => {
        const t1 = retainUntil__Nested(
            `he said, "do it!", and of course we did! right?`,
            "!",
            true,
            QUOTE_NESTING
        )
        const t2 = retainUntil__Nested(
            `he said, 'do it!', and of course we did! right?`,
            "!",
            true,
            QUOTE_NESTING
        )
        const t3 = retainUntil__Nested(
            'he said, `do it!`, and of course we did! right?',
            "!",
            true,
            QUOTE_NESTING
        )

        expect(t1).toBe(`he said, "do it!", and of course we did!`);
        expect(t2).toBe(`he said, 'do it!', and of course we did!`);
        expect(t3).toBe('he said, `do it!`, and of course we did!');

        type cases = [
            Expect<Test<typeof t1, "equals", `he said, "do it!", and of course we did!`>>,
            Expect<Test<typeof t2, "equals", `he said, 'do it!', and of course we did!`>>,
            Expect<Test<typeof t3, "equals", 'he said, `do it!`, and of course we did!'>>,
        ];
    });

    it("one type of quote to start, another quote type in attempt to close results in error", () => {
        const t1 = retainUntil__Nested(
            `he said, 'do it!", and of course we did! right?`,
            "!",
            true,
            QUOTE_NESTING
        )

        expect(isError(t1)).toBe(true);

        type cases = [
            Expect<Test<typeof t1, "isError", "unbalanced">>,
        ];
    });

    it("multiple find chars", () => {
        const t1 = retainUntil__Nested(
            `Once tested. Twice tried!`,
            ["!", "."]
        )
        const t2 = retainUntil__Nested(
            `Once tested (a bit). Twice tried!`,
            ["!", "."]
        )

        expect(t1).toBe("Once tested.")
        expect(t2).toBe("Once tested (a bit).")

        type cases = [
            Expect<Test<typeof t1, "equals", "Once tested.">>,
            Expect<Test<typeof t2, "equals", "Once tested (a bit).">>,
        ];
    });

})

describe("calling via nesting(config) HOF", () => {

    it("no nesting chars", () => {
        const t1 = nesting("default").retainUntil("Hi! Welcome.", "!");
        const t2 = nesting("default").retainUntil("Hi! Welcome.", "!", false);

        expect(t1).toBe("Hi!")
        expect(t2).toBe("Hi")

        type cases = [
            Expect<Test<typeof t1, "equals", "Hi!">>,
            Expect<Test<typeof t2, "equals", "Hi">>,
        ];
    });

        it("using NestingTuple with START and END chars", () => {
        // the "1" character should add to the stack
        // the "i" character should remove from the stack
        const config = nesting([NUMERIC_CHAR, ALPHA_CHARS]);
        const t1 = config.retainUntil(
            "Hi,12456 is a number", " "
        )

        expect(t1).toBe("Hi,12456 is ");

        type cases = [
            Expect<Test<typeof t1, "equals", "Hi,12456 is ">>,
        ];
    });

        it("using quotes nesting config", () => {
            const quotes = nesting("quotes");
            const t1 = quotes.retainUntil(
                `he said, "do it!", and of course we did! right?`,
                "!"
            )
            const t2 = quotes.retainUntil(
                `he said, 'do it!', and of course we did! right?`,
                "!",
                true
            )
            const t3 = quotes.retainUntil(
                'he said, `do it!`, and of course we did! right?',
                "!"
            )

        expect(t1).toBe(`he said, "do it!", and of course we did!`);
        expect(t2).toBe(`he said, 'do it!', and of course we did!`);
        expect(t3).toBe('he said, `do it!`, and of course we did!');

        type cases = [
            Expect<Test<typeof t1, "equals", `he said, "do it!", and of course we did!`>>,
            Expect<Test<typeof t2, "equals", `he said, 'do it!', and of course we did!`>>,
            Expect<Test<typeof t3, "equals", 'he said, `do it!`, and of course we did!'>>,
        ];

    });

})
