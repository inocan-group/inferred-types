import { describe, expect, it } from "vitest";
import {
    QUOTE_NESTING,
    ALPHA_CHARS,
    NUMERIC_CHAR
} from "inferred-types/constants";
import {
    isError,
    nesting,
    retainUntil__Nested
} from "inferred-types/runtime";
import type {
    AssertEqual,
    AssertExtends,
    Expect,
    NestingKeyValue,
    RetainUntil__Nested,
    Test
} from "inferred-types/types";
import { AssertError } from "transpiled";

describe("RetainUntil__Nested<TStr,TFind,TNesting>", () => {
    type Fn = `function greet(name: string) { return "hi" + name; };`
    type Basic = `hi there`;
    type ObjTup = `[ { foo: { bar: number } }, { bar: 42 } } ] | number`;
    type Obj = `{ foo: { bar: number } } | string`

    it("no nesting chars", () => {
        type T1 = RetainUntil__Nested<Basic, " ", {include: false}>;
        type T2 = RetainUntil__Nested<Basic, " ", {include: true}>;
        type T3 = RetainUntil__Nested<Basic, " ">;

        type cases = [
            Expect<Test<T1, "equals", "hi">>,
            Expect<Test<T2, "equals", "hi ">>,
            Expect<Test<T3, "equals", "hi ">>,
        ];
    });

    it("there are no exit tokens at the root level", () => {
        type T = `><(foo,bar)>`;
        // here the real test is that we're leading with the `>` character
        // but we're at root level so it does not created an "unbalanced"
        // condition.
        type A = RetainUntil__Nested<T, ",", {include: false}>;

        type cases = [
            Expect<AssertEqual<
                A,
                "><(foo"
            >>
        ];
    });



    it("exit only that what you enter", () => {
        // this expression throws two curve balls
        // 1. the `=>` where the `>` should NOT be treated as an exit token because
        //    it is at the ROOT level which has no exit tokens
        // 2. the _greater than_ symbol near the end
        //    it too is at root level
        type T = `const example = <T extends number>(foo: T) => foo + 5 > 9;`
        // the real test is to make sure we don't generate a "unbalanced" error
        // or somehow put the `+` operator onto a non-root level where it will
        // not be split on.
        type A = RetainUntil__Nested<T, '+', { config: "brackets" }>;


        type cases = [
            Expect<AssertEqual<
                A,
                ['const example = <T extends number>(foo: T) => foo ', ' 5 > 9;']
            >>
        ];
    });


    it("single nesting level", () => {
        type T1 = RetainUntil__Nested<Fn, "}", { include: true, config: "brackets" }>;
        type T2 = RetainUntil__Nested<Fn, "}", { include: true, config: "brackets" }>;
        type T3 = RetainUntil__Nested<Fn, "}", { include: false, config: "brackets" }>;

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
            {
                include: true,
                config: { "{": "}" }
            }
        >;
        type T2 = RetainUntil__Nested<ObjTup, "]", { include: true, config: "brackets" }>;
        type T3 = RetainUntil__Nested<Obj, "}", { include: true, "brackets" }>;

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
        type E1 = RetainUntil__Nested<`{ foo {}`, "}", {include: true, config: "brackets" }>;

        type cases = [
            Expect<AssertError<E1, "unbalanced">>,
        ];
    });

    it("error when non-string value passed into TStr", () => {
        type E1 = RetainUntil__Nested<99, "}">;

        type cases = [
            Expect<Test<E1, "isError", "invalid-type">>,
        ];
    });

    it("shallow-quotes: treats content inside quotes as literal", () => {
        type Text = `"Hello, world!", he said.`;
        type T1 = RetainUntil__Nested<Text, ".", { include: true, config: "shallow-quotes" }>;

        type cases = [
            Expect<Test<T1, "equals", `"Hello, world!", he said.`>>
        ];
    });

    it("shallow-brackets: treats content inside brackets as literal", () => {
        type Text = `Array(1, 2, 3). More text`;
        type T1 = RetainUntil__Nested<Text, ".", { include: true, config: "shallow-brackets" }>;

        type cases = [
            Expect<Test<T1, "equals", `Array(1, 2, 3).`>>
        ];
    });

    it("shallow-brackets-and-quotes: combined shallow nesting", () => {
        type Text1 = `func(a, b). "test.value". end`;
        type T1 = RetainUntil__Nested<Text1, ".", { include: true, config: "shallow-brackets-and-quotes" }>;

        type Text2 = `data(x, y). More`;
        type T2 = RetainUntil__Nested<Text2, ".", { include: true, "shallow-brackets-and-quotes" }>;

        type cases = [
            Expect<Test<T1, "equals", `func(a, b).`>>,
            Expect<Test<T2, "equals", `data(x, y).`>>
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

    it("shallow-quotes: treats content inside quotes as literal", () => {
        const text = `"Hello, world!", he said.` as const;
        const t1 = retainUntil__Nested(text, ".", true, "shallow-quotes");

        expect(t1).toBe(`"Hello, world!", he said.`);

        type cases = [
            Expect<Test<typeof t1, "equals", `"Hello, world!", he said.`>>
        ];
    });

    it("shallow-brackets: treats content inside brackets as literal", () => {
        const text = `Array(1, 2, 3). More text` as const;
        const t1 = retainUntil__Nested(text, ".", true, "shallow-brackets");

        expect(t1).toBe(`Array(1, 2, 3).`);

        type cases = [
            Expect<Test<typeof t1, "equals", `Array(1, 2, 3).`>>
        ];
    });

    it("shallow-brackets-and-quotes: combined shallow nesting", () => {
        const text1 = `func(a, b). "test.value". end` as const;
        const t1 = retainUntil__Nested(text1, ".", true, "shallow-brackets-and-quotes");

        const text2 = `data(x, y). More` as const;
        const t2 = retainUntil__Nested(text2, ".", true, "shallow-brackets-and-quotes");

        expect(t1).toBe(`func(a, b).`);
        expect(t2).toBe(`data(x, y).`);

        type cases = [
            Expect<Test<typeof t1, "equals", `func(a, b).`>>,
            Expect<Test<typeof t2, "equals", `data(x, y).`>>
        ];
    });

    it("hierarchical config: explicit shallow behavior", () => {
        const text = `{a, b, c}. result` as const;
        const t1 = retainUntil__Nested(text, ".", true, { "{": ["}", {}] });

        expect(t1).toBe(`{a, b, c}.`);

        type cases = [
            Expect<Test<typeof t1, "equals", `{a, b, c}.`>>
        ];
    });

    it("hierarchical config: nested levels with different tokens", () => {
        const text = `{inner, [nested. items]}. final` as const;
        const t1 = retainUntil__Nested(text, ".", true, { "{": ["}", { "[": "]" }] });

        expect(t1).toBe(`{inner, [nested. items]}.`);

        type cases = [
            Expect<Test<typeof t1, "equals", `{inner, [nested. items]}.`>>
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
