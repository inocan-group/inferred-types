import { describe, it } from "vitest";
import type { BracketNesting, Err, Expect, Nest, QuoteNesting, Test } from "inferred-types/types";

describe("Nest<T>", () => {

    it("basics", () => {
        type Str = "hi(there), who are you?";
        type T1 = Nest<Str>;

        type Expected = {
            content: `hi{{child}}, who are you?`;
            level: 0;
            enterChar: null;
            exitChar: null;
            children: [
                {
                    content: "there";
                    level: 1;
                    enterChar: "(";
                    exitChar: ")";
                    children: []
                }
            ]
        }

        type cases = [
            Expect<Test<T1, "equals", Expected>>,
        ];
    });

    it("multiple level 1 entrants", () => {
        type Str = `function doIt(name: string) { ... }; something else`
        type T1 = Nest<Str>;

        type Expected = {
            content: "function doIt{{child}} {{child}}; something else";
            level: 0;
            enterChar: null;
            exitChar: null;
            children: [{
                content: "name: string";
                level: 1;
                enterChar: "(";
                exitChar: ")";
                children: [];
            }, {
                content: " ... ";
                level: 1;
                enterChar: "{";
                exitChar: "}";
                children: [];
            }];
        };

        type SideBySide = Nest<`intro()()`>;

        type cases = [
            Expect<Test<T1, "equals", Expected>>,
        ];
    });

    it("deeply nested", () => {
        type Str = "a(b(c+d), foo)"
        type T1 = Nest<Str>;

        type Expected = {
            content: "a{{child}}";
            level: 0;
            enterChar: null;
            exitChar: null;
            children: [{
                content: "b{{child}}, foo";
                level: 1;
                enterChar: "(";
                exitChar: ")";
                children: [{
                    content: "c+d";
                    level: 2;
                    enterChar: "(";
                    exitChar: ")";
                    children: [];
                }];
            }];
        }

        type cases = [
            Expect<Test<T1, "equals", Expected>>
        ];
    });

    it("unbalanced brackets", () => {
        type Str = `function add() {`;
        type T1 = Nest<Str>;

        type cases = [
            Expect<Test<T1, "extends", Err<"unbalanced">>>,
        ];
    });

    it("custom nesting with only parentheses", () => {
        type CustomNesting = { "(": ")" };
        type Str = `hello (world) and (foo bar) end`;
        type T1 = Nest<Str, CustomNesting>;

        type cases = {
            content: "hello {{child}} and {{child}} end";
            level: 0;
            enterChar: null;
            exitChar: null;
            children: [{
                content: "world";
                level: 1;
                enterChar: "(";
                exitChar: ")";
                children: [];
            }, {
                content: "foo bar";
                level: 1;
                enterChar: "(";
                exitChar: ")";
                children: [];
            }];
        }
    });

    it("bracket nesting only", () => {
        type Str = `array[0] and object[key] access`;
        type N1 = Nest<Str, BracketNesting>;

        type Expected = {
            content: "array{{child}} and object{{child}} access";
            level: 0;
            enterChar: null;
            exitChar: null;
            children: [{
                content: "0";
                level: 1;
                enterChar: "[";
                exitChar: "]";
                children: [];
            }, {
                content: "key";
                level: 1;
                enterChar: "[";
                exitChar: "]";
                children: [];
            }];
        }

        type cases = [
            Expect<Test<N1, "equals", Expected>>
        ]

    });

    it("quote nesting", () => {
        type Str = `say "hello world" and 'goodbye'`;
        type N1 = Nest<Str, QuoteNesting>;

        type Expected = {
            content: "say {{child}} and {{child}}";
            level: 0;
            enterChar: null;
            exitChar: null;
            children: [{
                content: "hello world";
                level: 1;
                enterChar: "\"";
                exitChar: "\"";
                children: [];
            }, {
                content: "goodbye";
                level: 1;
                enterChar: "'";
                exitChar: "'";
                children: [];
            }];
        }

        type cases = [
            Expect<Test<N1, "equals", Expected>>
        ];
    });

    it("custom nesting with curly braces only", () => {
        type CurlyOnly = { "{": "}" };
        type Str = `if condition { do something } else { do other }`;
        type N1 = Nest<Str, CurlyOnly>;

        type Expected = {
            content: "if condition {{child}} else {{child}}";
            level: 0;
            enterChar: null;
            exitChar: null;
            children: [{
                content: " do something ";
                level: 1;
                enterChar: "{";
                exitChar: "}";
                children: [];
            }, {
                content: " do other ";
                level: 1;
                enterChar: "{";
                exitChar: "}";
                children: [];
            }];
        }

        type cases = [
            Expect<Test<N1, "equals", Expected>>
        ];
    });

    it("mixed custom nesting", () => {
        type MixedNesting = { "[": "]", "<": ">" };
        type Str = `tag<content> with array[index]`;
        type N1 = Nest<Str, MixedNesting>;

        type Expected = {
            content: "tag{{child}} with array{{child}}";
            level: 0;
            enterChar: null;
            exitChar: null;
            children: [{
                content: "content";
                level: 1;
                enterChar: "<";
                exitChar: ">";
                children: [];
            }, {
                content: "index";
                level: 1;
                enterChar: "[";
                exitChar: "]";
                children: [];
            }];
        }

        type cases = [
            Expect<Test<N1, "equals", Expected>>
        ];
    });

    it("no nesting characters present", () => {
        type Str = `just plain text with no special characters`;
        type N1 = Nest<Str>;

        type Expected = {
            content: "just plain text with no special characters";
            level: 0;
            enterChar: null;
            exitChar: null;
            children: [];
        }

        type cases = [
            Expect<Test<N1, "equals", Expected>>
        ];
    });

    it("empty string", () => {
        type Str = ``;
        type N1 = Nest<Str>;
        type Expected = {
            content: "";
            level: 0;
            enterChar: null;
            exitChar: null;
            children: [];
        }

        type cases = [
            Expect<Test<N1, "equals", Expected>>
        ];
    });

});
