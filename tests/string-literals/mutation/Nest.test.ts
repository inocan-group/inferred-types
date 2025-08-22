import { describe, it } from "vitest";
import {
    Expect,
    Nest,
    Test,
    BracketNesting,
    QuoteNesting,
} from "inferred-types/types";

describe("Nest<T>", () => {

    it("basics using default nesting config", () => {
        type Str = `function doIt(name: string) { ... }; something else`
        type N1 = Nest<Str>

        type cases = [
            Expect<Test<
                N1, "equals",
                [
                    {
                        content: "function doIt",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: [
                            {
                                content: "name: string",
                                enterChar: "(",
                                exitChar: ")",
                                children: [],
                                level: 1
                            }
                        ]
                    },
                    {
                        content: " ",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: [
                            {
                                content: " ... ",
                                enterChar: "{",
                                exitChar: "}",
                                children: [],
                                level: 1
                            }
                        ]
                    },
                    {
                        content: "; something else",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: []
                    }
                ]
            >>
        ];
    });

    it("custom nesting with only parentheses", () => {
        type CustomNesting = { "(": ")" };
        type Str = `hello (world) and (foo bar) end`;
        type N1 = Nest<Str, CustomNesting>;

        type cases = [
            Expect<Test<
                N1, "equals",
                [
                    {
                        content: "hello ",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: [
                            {
                                content: "world",
                                enterChar: "(",
                                exitChar: ")",
                                level: 1,
                                children: []
                            }
                        ]
                    },
                    {
                        content: " and ",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: [
                            {
                                content: "foo bar",
                                enterChar: "(",
                                exitChar: ")",
                                level: 1,
                                children: []
                            }
                        ]
                    },
                    {
                        content: " end",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: []
                    }
                ]
            >>
        ];
    });

    it("bracket nesting only", () => {
        type Str = `array[0] and object[key] access`;
        type N1 = Nest<Str, BracketNesting>;

        type cases = [
            Expect<Test<
                N1, "equals",
                [
                    {
                        content: "array",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: [
                            {
                                content: "0",
                                enterChar: "[",
                                exitChar: "]",
                                level: 1,
                                children: []
                            }
                        ]
                    },
                    {
                        content: " and object",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: [
                            {
                                content: "key",
                                enterChar: "[",
                                exitChar: "]",
                                level: 1,
                                children: []
                            }
                        ]
                    },
                    {
                        content: " access",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: []
                    }
                ]
            >>
        ];
    });

    it("quote nesting", () => {
        type Str = `say "hello world" and 'goodbye'`;
        type N1 = Nest<Str, QuoteNesting>;

        type cases = [
            Expect<Test<
                N1, "equals",
                [
                    {
                        content: "say ",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: [
                            {
                                content: "hello world",
                                enterChar: "\"",
                                exitChar: "\"",
                                level: 1,
                                children: []
                            }
                        ]
                    },
                    {
                        content: " and ",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: [
                            {
                                content: "goodbye",
                                enterChar: "'",
                                exitChar: "'",
                                level: 1,
                                children: []
                            }
                        ]
                    }
                ]
            >>
        ];
    });

    it("custom nesting with curly braces only", () => {
        type CurlyOnly = { "{": "}" };
        type Str = `if condition { do something } else { do other }`;
        type N1 = Nest<Str, CurlyOnly>;

        type cases = [
            Expect<Test<
                N1, "equals",
                [
                    {
                        content: "if condition ",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: [
                            {
                                content: " do something ",
                                enterChar: "{",
                                exitChar: "}",
                                level: 1,
                                children: []
                            }
                        ]
                    },
                    {
                        content: " else ",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: [
                            {
                                content: " do other ",
                                enterChar: "{",
                                exitChar: "}",
                                level: 1,
                                children: []
                            }
                        ]
                    }
                ]
            >>
        ];
    });

    it("mixed custom nesting", () => {
        type MixedNesting = { "[": "]", "<": ">" };
        type Str = `tag<content> with array[index]`;
        type N1 = Nest<Str, MixedNesting>;

        type cases = [
            Expect<Test<
                N1, "equals",
                [
                    {
                        content: "tag",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: [
                            {
                                content: "content",
                                enterChar: "<",
                                exitChar: ">",
                                level: 1,
                                children: []
                            }
                        ]
                    },
                    {
                        content: " with array",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: [
                            {
                                content: "index",
                                enterChar: "[",
                                exitChar: "]",
                                level: 1,
                                children: []
                            }
                        ]
                    }
                ]
            >>
        ];
    });

    it("no nesting characters present", () => {
        type Str = `just plain text with no special characters`;
        type N1 = Nest<Str>;

        type cases = [
            Expect<Test<
                N1, "equals",
                [
                    {
                        content: "just plain text with no special characters",
                        enterChar: null,
                        exitChar: null,
                        level: 0,
                        children: []
                    }
                ]
            >>
        ];
    });

    it("empty string", () => {
        type Str = ``;
        type N1 = Nest<Str>;

        type cases = [
            Expect<Test<N1, "equals", []>>
        ];
    });

});
