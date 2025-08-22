import { describe, it } from "vitest";
import {
    Expect,
    FromNesting,
    Nest,
    Test,
    BracketNesting,
    QuoteNesting,
} from "inferred-types/types";

describe("FromNesting<T>", () => {

    it("roundtrip: simple case with default nesting", () => {
        type Original = `function doIt(name: string) { ... }; something else`;
        type Nested = Nest<Original>;
        type Reconstructed = FromNesting<Nested>;

        type cases = [
            Expect<Test<Reconstructed, "equals", Original>>
        ];
    });

    it("roundtrip: custom parentheses only", () => {
        type CustomNesting = { "(": ")" };
        type Original = `hello (world) and (foo bar) end`;
        type Nested = Nest<Original, CustomNesting>;
        type Reconstructed = FromNesting<Nested>;

        type cases = [
            Expect<Test<Reconstructed, "equals", Original>>
        ];
    });

    it("roundtrip: bracket nesting", () => {
        type Original = `array[0] and object[key] access`;
        type Nested = Nest<Original, BracketNesting>;
        type Reconstructed = FromNesting<Nested>;

        type cases = [
            Expect<Test<Reconstructed, "equals", Original>>
        ];
    });

    it("roundtrip: quote nesting", () => {
        type Original = `say "hello world" and 'goodbye'`;
        type Nested = Nest<Original, QuoteNesting>;
        type Reconstructed = FromNesting<Nested>;

        type cases = [
            Expect<Test<Reconstructed, "equals", Original>>
        ];
    });

    it("roundtrip: no nesting characters", () => {
        type Original = `just plain text with no special characters`;
        type Nested = Nest<Original>;
        type Reconstructed = FromNesting<Nested>;

        type cases = [
            Expect<Test<Reconstructed, "equals", Original>>
        ];
    });

    it("roundtrip: empty string", () => {
        type Original = ``;
        type Nested = Nest<Original>;
        type Reconstructed = FromNesting<Nested>;

        type cases = [
            Expect<Test<Reconstructed, "equals", Original>>
        ];
    });

    it("single NestedString with no children", () => {
        type SingleSegment = {
            content: "hello world";
            enterChar: null;
            exitChar: null;
            children: [];
            level: 0;
        };
        type Reconstructed = FromNesting<SingleSegment>;

        type cases = [
            Expect<Test<Reconstructed, "equals", "hello world">>
        ];
    });

    it("single NestedString with one child", () => {
        type SingleSegment = {
            content: "function doIt";
            enterChar: null;
            exitChar: null;
            children: [
                {
                    content: "name: string";
                    enterChar: "(";
                    exitChar: ")";
                    children: [];
                    level: 1;
                }
            ];
            level: 0;
        };
        type Reconstructed = FromNesting<SingleSegment>;

        type cases = [
            Expect<Test<Reconstructed, "equals", "function doIt(name: string)">>
        ];
    });

    it("single NestedString with multiple children", () => {
        type SingleSegment = {
            content: "if";
            enterChar: null;
            exitChar: null;
            children: [
                {
                    content: "condition";
                    enterChar: "(";
                    exitChar: ")";
                    children: [];
                    level: 1;
                },
                {
                    content: " code ";
                    enterChar: "{";
                    exitChar: "}";
                    children: [];
                    level: 1;
                }
            ];
            level: 0;
        };
        type Reconstructed = FromNesting<SingleSegment>;

        type cases = [
            Expect<Test<Reconstructed, "equals", "if(condition){ code }">>
        ];
    });

    it("multiple segments reconstruction", () => {
        type MultipleSegments = [
            {
                content: "start ";
                enterChar: null;
                exitChar: null;
                children: [
                    {
                        content: "nested";
                        enterChar: "(";
                        exitChar: ")";
                        children: [];
                        level: 1;
                    }
                ];
                level: 0;
            },
            {
                content: " middle ";
                enterChar: null;
                exitChar: null;
                children: [
                    {
                        content: "more";
                        enterChar: "{";
                        exitChar: "}";
                        children: [];
                        level: 1;
                    }
                ];
                level: 0;
            },
            {
                content: " end";
                enterChar: null;
                exitChar: null;
                children: [];
                level: 0;
            }
        ];
        type Reconstructed = FromNesting<MultipleSegments>;

        type cases = [
            Expect<Test<Reconstructed, "equals", "start (nested) middle {more} end">>
        ];
    });

    it("deeply nested structure", () => {
        type DeepNested = {
            content: "outer";
            enterChar: null;
            exitChar: null;
            children: [
                {
                    content: "middle";
                    enterChar: "(";
                    exitChar: ")";
                    children: [
                        {
                            content: "inner";
                            enterChar: "{";
                            exitChar: "}";
                            children: [];
                            level: 2;
                        }
                    ];
                    level: 1;
                }
            ];
            level: 0;
        };
        type Reconstructed = FromNesting<DeepNested>;

        type cases = [
            Expect<Test<Reconstructed, "equals", "outer(middle{inner})">>
        ];
    });

});