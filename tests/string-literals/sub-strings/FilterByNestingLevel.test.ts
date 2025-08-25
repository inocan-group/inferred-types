import { describe, it } from "vitest";
import {
    Err,
    Expect,
    FilterByNestingLevel,
    Nest,
    Test,
} from "inferred-types/types";

describe("FilterByNestingLevel<TContent,TOpt>", () => {
    describe("string output", () => {
        it("happy path", () => {
            type Str = "Bob(the father) was angry at Mary(the daughter).";
            type V1 = Nest<Str>;
            type T1 = FilterByNestingLevel<Str, {output: "string"}>;
            type T1b = FilterByNestingLevel<Str, {output: "string[]"}>;
            type T1c = FilterByNestingLevel<Str, {output: "template"}>;
            type T2 = FilterByNestingLevel<Str, { level: 1 }>;

            type cases = [
                Expect<Test<T1, "equals", "Bob was angry at Mary.">>,
                Expect<Test<T1b, "equals", ["Bob"," was angry at Mary", "."]>>,
                Expect<Test<T1c, "equals", `Bob${string} was angry at Mary${string}.`>>,

                Expect<Test<T2, "equals", "(the father)(the daughter)">>
            ];
        });


        it("using the quotes strategy", () => {
            type T1 = FilterByNestingLevel<"[ 'foo', 'bar?', 'baz'? ]", { strategy: "quotes" }>;

            type cases = [
                Expect<Test<T1, "equals", "[ , , ? ]">>
            ];
        });


        it("deep nesting", () => {
            type T1 = FilterByNestingLevel<"add(a: Map<string[str], string[str]>)">;
            type T2 = FilterByNestingLevel<"add(a: Map<string[str], string[str]>)", {level: 1}>;
            type T3 = FilterByNestingLevel<"add(a: Map<string[str], string[str]>)", {level: 2}>;
            type T4 = FilterByNestingLevel<"add(a: Map<string[str], string[str]>)", {level: 3}>;

            type cases = [
                /** type tests */
            ];
        });



        it("using different nesting levels", () => {
            type T1 = FilterByNestingLevel<"Bob(the father) was angry at Mary(the daughter).", { level: 0 }>;
            type T2 = FilterByNestingLevel<"Bob(the father) was angry at Mary(the daughter).", { level: 1 }>;

            type cases = [
                Expect<Test<T1, "equals", "Bob was angry at Mary.">>,
                Expect<Test<T2, "equals", "(the father)(the daughter)">>
            ];
        });


        it("using square brackets", () => {
            type T1 = FilterByNestingLevel<"Array[index] contains value[key].", { level: 0 }>;
            type T2 = FilterByNestingLevel<"Array[index] contains value[key].", { level: 1 }>;

            type cases = [
                Expect<Test<T1, "equals", "Array contains value.">>,
                Expect<Test<T2, "equals", "[index][key]">>
            ];
        });


        it("using curly braces", () => {
            type T1 = FilterByNestingLevel<"Object{property} has method{action}.", { level: 0 }>;
            type T2 = FilterByNestingLevel<"Object{property} has method{action}.", { level: 1 }>;

            type cases = [
                Expect<Test<T1, "equals", "Object has method.">>,
                Expect<Test<T2, "equals", "{property}{action}">>
            ];
        });


        it("using angle brackets", () => {
            type T1 = FilterByNestingLevel<"Generic<Type> implements Interface<Constraint>.", { level: 0 }>;
            type T2 = FilterByNestingLevel<"Generic<Type> implements Interface<Constraint>.", { level: 1 }>;

            type cases = [
                Expect<Test<T1, "equals", "Generic implements Interface.">>,
                Expect<Test<T2, "equals", "<Type><Constraint>">>
            ];
        });


        it("mixed bracket types", () => {
            type T1 = FilterByNestingLevel<"Map<Key, Value> with Set{Item}.", { level: 0 }>;
            type T2 = FilterByNestingLevel<"Map<Key, Value> with Set{Item}.", { level: 1 }>;

            type cases = [
                Expect<Test<T1, "equals", "Map with Set.">>,
                Expect<Test<T2, "equals", "<Key, Value>{Item}">>
            ];
        });


        it("nested brackets", () => {
            type T1 = FilterByNestingLevel<"Map<Key[1]>", { level: 0 }>;
            type T2 = FilterByNestingLevel<"Map<Key[1]>", { level: 1 }>;
            type T3 = FilterByNestingLevel<"Map<Key[1]>", { level: 2 }>;

            type cases = [
                Expect<Test<T1, "equals", "Map">>,
                Expect<Test<T2, "equals", "<Key>">>,
                Expect<Test<T3, "equals", "[1]">>,
            ];
        });

        it("brackets-and-quotes strategy", () => {
            type T1 = FilterByNestingLevel<"Array['item'] and Object{'key': 'value'}.", { strategy: "brackets-and-quotes", level: 0 }>;
            type T2 = FilterByNestingLevel<"Array['item'] and Object{'key': 'value'}.", { strategy: "brackets-and-quotes", level: 1 }>;
            type T3 = FilterByNestingLevel<"Array['item'] and Object{'key': 'value'}.", { strategy: "brackets-and-quotes", level: 2 }>;

            type cases = [
                Expect<Test<T1, "equals", "Array and Object.">>,
                Expect<Test<T2, "equals", "[]{: }">>,
                Expect<Test<T3, "equals", "'item''key''value'">>
            ];
        });


        it("deep nesting - level 2", () => {
            type T1 = FilterByNestingLevel<"Outer(Middle(Inner)) content.", { level: 0 }>;
            type T2 = FilterByNestingLevel<"Outer(Middle(Inner)) content.", { level: 1 }>;
            type T3 = FilterByNestingLevel<"Outer(Middle(Inner)) content.", { level: 2 }>;

            type cases = [
                Expect<Test<T1, "equals", "Outer content.">>,
                Expect<Test<T2, "equals", "(Middle)">>,
                Expect<Test<T3, "equals", "(Inner)">>
            ];
        });


        it("nested brackets", () => {
            type T1 = FilterByNestingLevel<"Map<Key[1]>", { level: 0, output: "string[]" }>;
            type T2 = FilterByNestingLevel<"Map<Key[1]>", { level: 1, output: "string[]" }>;
            type T3 = FilterByNestingLevel<"Map<Key[1]>", { level: 2, output: "string[]" }>;

            type cases = [
                Expect<Test<T1, "equals", ["Map"]>>,
                Expect<Test<T2, "equals", ["<Key>"]>>,
                Expect<Test<T3, "equals", ["[1]"]>>,
            ];
        });


        it("deep nesting - mixed brackets", () => {
            type T1 = FilterByNestingLevel<"Config[database{host: 'localhost'}] settings.", { strategy: "brackets-and-quotes", level: 0 }>;
            type T2 = FilterByNestingLevel<"Config[database{host: 'localhost'}] settings.", { strategy: "brackets-and-quotes", level: 1 }>;
            type T3 = FilterByNestingLevel<"Config[database{host: 'localhost'}] settings.", { strategy: "brackets-and-quotes", level: 2 }>;
            type T4 = FilterByNestingLevel<"Config[database{host: 'localhost'}] settings.", { strategy: "brackets-and-quotes", level: 3 }>;

            type cases = [
                Expect<Test<T1, "equals", "Config settings.">>,
                Expect<Test<T2, "equals", "[database]">>,
                Expect<Test<T3, "equals", "{host: }">>,
                Expect<Test<T4, "equals", "'localhost'">>
            ];
        });



        it("multiple nested elements at same level", () => {
            type T1 = FilterByNestingLevel<"List(item1, item2, item3) and Map[key1: value1, key2: value2].", { level: 0 }>;
            type T2 = FilterByNestingLevel<"List(item1, item2, item3) and Map[key1: value1, key2: value2].", { level: 1 }>;

            type cases = [
                Expect<Test<T1, "equals", "List and Map.">>,
                Expect<Test<T2, "equals", "(item1, item2, item3)[key1: value1, key2: value2]">>
            ];
        });


        it("nested quotes with different quote types", () => {
            type T1 = FilterByNestingLevel<`Template with "double quotes" and 'single quotes'.`, { strategy: "quotes", level: 0 }>;
            type T2 = FilterByNestingLevel<`Template with "double quotes" and 'single quotes'.`, { strategy: "quotes", level: 1 }>;

            type cases = [
                Expect<Test<T1, "equals", "Template with  and .">>,
                Expect<Test<T2, "equals", `"double quotes"'single quotes'`>>
            ];
        });


        it("empty string", () => {
            type T1 = FilterByNestingLevel<"">;

            type cases = [
                Expect<Test<T1, "equals", "">>
            ];
        });


        it("no nesting present", () => {
            type T1 = FilterByNestingLevel<"This is a simple string with no nesting. Level 0">;

            type cases = [
                Expect<Test<T1, "equals", "This is a simple string with no nesting. Level 0">>
            ];
        });


        it("only nested content, no root content", () => {
            type T1 = FilterByNestingLevel<"(only nested content)", { level: 0 }>;
            type T2 = FilterByNestingLevel<"(only nested content)", { level: 1 }>;

            type cases = [
                Expect<Test<T1, "equals", "">>,
                Expect<Test<T2, "equals", "(only nested content)">>
            ];
        });


        it("nested content at different levels with mixed strategies", () => {
            type T1 = FilterByNestingLevel<
                "Root[Level1{Level2('deep')} content] end.",
                { strategy: "brackets-and-quotes", level: 0 }
            >;
            type T2 = FilterByNestingLevel<
                "Root[Level1{Level2('deep')} content] end.",
                { strategy: "brackets-and-quotes", level: 1 }
            >;
            type T3 = FilterByNestingLevel<
                "Root[Level1{Level2('deep')} content] end.",
                { strategy: "brackets-and-quotes", level: 2 }
            >;
            type T4 = FilterByNestingLevel<
                "Root[Level1{Level2('deep')} content] end.",
                { strategy: "brackets-and-quotes", level: 3 }
            >;
            type T5 = FilterByNestingLevel<
                "Root[Level1{Level2('deep')} content] end.",
                { strategy: "brackets-and-quotes", level: 4 }
            >;

            type cases = [
                Expect<Test<T1, "equals", "Root end.">>,
                Expect<Test<T2, "equals", "[Level1 content]">>,
                Expect<Test<T3, "equals", "{Level2}">>,
                Expect<Test<T4, "equals", "()">>,
                Expect<Test<T5, "equals", "'deep'">>,
            ];
        });


        it("complex template literal with multiple nesting types", () => {
            type T1 = FilterByNestingLevel<
                `Function call(param1, param2) with array[index] and object{key: "value"}.`,
                { strategy: "brackets-and-quotes", level: 0 }
            >;
            type T2 = FilterByNestingLevel<
                `Function call(param1, param2) with array[index] and object{key: "value"}.`,
                { strategy: "brackets-and-quotes", level: 1 }
            >;
            type T3 = FilterByNestingLevel<
                `Function call(param1, param2) with array[index] and object{key: "value"}.`,
                { strategy: "brackets-and-quotes", level: 2 }
            >;

            type cases = [
                Expect<Test<T1, "equals", "Function call with array and object.">>,
                Expect<Test<T2, "equals", "(param1, param2)[index]{key: }">>,
                Expect<Test<T3, "equals", `"value"`>>
            ];
        });

    })

    describe("string[] output", () => {
        it("default strategy", () => {
            type T1 = FilterByNestingLevel<"Bob(the father) was angry at Mary(the daughter).", { output: "string[]" }>;
            type T2 = FilterByNestingLevel<"Bob(the father) was angry at Mary(the daughter).", { level: 1; output: "string[]" }>;

            type cases = [
                Expect<Test<T1, "equals", ["Bob", " was angry at Mary", "."]>>,
                Expect<Test<T2, "equals", ["(the father)", "(the daughter)"]>>
            ];
        });


        it("using the quotes strategy", () => {
            type T1 = FilterByNestingLevel<"[ 'foo', 'bar?', 'baz'? ]", { strategy: "quotes"; output: "string[]" }>;
            type T2 = FilterByNestingLevel<"[ 'foo', 'bar?', 'baz'? ]", { strategy: "quotes"; output: "string[]", level: 1 }>;

            type cases = [
                Expect<Test<T1, "equals", ["[ ", ", ", ", ", "? ]"]>>,
                Expect<Test<T2, "equals", ["'foo'", "'bar?'", "'baz'"]>>,
            ];
        });


        it("nested brackets", () => {
            type T1 = FilterByNestingLevel<"Map<Key[1]>", { level: 0, output: "string[]" }>;
            type T2 = FilterByNestingLevel<"Map<Key[1]>", { level: 1, output: "string[]" }>;
            type T3 = FilterByNestingLevel<"Map<Key[1]>", { level: 2, output: "string[]" }>;

            type cases = [
                Expect<Test<T1, "equals", ["Map"]>>,
                Expect<Test<T2, "equals", ["<Key>"]>>,
                Expect<Test<T3, "equals", ["[1]"]>>,
            ];
        });


        it("unbalanced brackets", () => {
            type T1 = FilterByNestingLevel<"Map<Key[1]>[", { level: 0, output: "string[]" }>;

            type cases = [
                Expect<Test<T1, "extends", Err<"unbalanced">>>
            ];
        });


        it("mixed bracket types", () => {
            type T1 = FilterByNestingLevel<"Map<Key, Value> with Set{Item}.", { level: 0; output: "string[]" }>;
            type T2 = FilterByNestingLevel<"Map<Key, Value> with Set{Item}.", { level: 1; output: "string[]" }>;

            type cases = [
                Expect<Test<T1, "equals", ["Map", " with Set", "."]>>,
                Expect<Test<T2, "equals", ["<Key, Value>", "{Item}"]>>,
            ];
        });

        it("empty string", () => {
            type T1 = FilterByNestingLevel<"", { output: "string[]" }>;

            type cases = [
                Expect<Test<T1, "equals", []>>
            ];
        });

        it("no nesting present", () => {
            type T1 = FilterByNestingLevel<"This is a simple string with no nesting.", { output: "string[]" }>;

            type cases = [
                Expect<Test<T1, "equals", ["This is a simple string with no nesting."]>>
            ];
        });

        it("only nested content at level 0", () => {
            type T1 = FilterByNestingLevel<"(only nested content)", { level: 0; output: "string[]" }>;

            type cases = [
                Expect<Test<T1, "equals", []>>
            ];
        });

        it("only nested content at level 1", () => {
            type T1 = FilterByNestingLevel<"(only nested content)", { level: 1; output: "string[]" }>;

            type cases = [
                Expect<Test<T1, "equals", ["(only nested content)"]>>
            ];
        });
    });

    describe("template output", () => {
        it("happy path", () => {
            type T1 = FilterByNestingLevel<"Bob(the father) was angry at Mary(the daughter).", { output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `Bob${string} was angry at Mary${string}.`>>
            ];
        });


        it("using the quotes strategy", () => {
            type T1 = FilterByNestingLevel<"[ 'foo', 'bar?', 'baz'? ]", { strategy: "quotes"; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `[ ${string}, ${string}, ${string}? ]`>>
            ];
        });


        it("using different nesting levels", () => {
            type T1 = FilterByNestingLevel<"Bob(the father) was angry at Mary(the daughter).", { level: 0; output: "template" }>;
            type T2 = FilterByNestingLevel<"Bob(the father) was angry at Mary(the daughter).", { level: 1; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `Bob${string} was angry at Mary${string}.`>>,
                Expect<Test<T2, "equals", `(the father)${string}(the daughter)`>>
            ];
        });


        it("using square brackets", () => {
            type T1 = FilterByNestingLevel<"Array[index] contains value[key].", { level: 0; output: "template" }>;
            type T2 = FilterByNestingLevel<"Array[index] contains value[key].", { level: 1; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `Array${string} contains value${string}.`>>,
                Expect<Test<T2, "equals", `[index]${string}[key]`>>
            ];
        });


        it("using curly braces", () => {
            type T1 = FilterByNestingLevel<"Object{property} has method{action}.", { level: 0; output: "template" }>;
            type T2 = FilterByNestingLevel<"Object{property} has method{action}.", { level: 1; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `Object${string} has method${string}.`>>,
                Expect<Test<T2, "equals", `{property}${string}{action}`>>
            ];
        });


        it("using angle brackets", () => {
            type T1 = FilterByNestingLevel<"Generic<Type> implements Interface<Constraint>.", { level: 0; output: "template" }>;
            type T2 = FilterByNestingLevel<"Generic<Type> implements Interface<Constraint>.", { level: 1; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `Generic${string} implements Interface${string}.`>>,
                Expect<Test<T2, "equals", `<Type>${string}<Constraint>`>>
            ];
        });


        it("mixed bracket types", () => {
            type T1 = FilterByNestingLevel<"Map<Key, Value> with Set{Item}.", { level: 0; output: "template" }>;
            type T2 = FilterByNestingLevel<"Map<Key, Value> with Set{Item}.", { level: 1; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `Map${string} with Set${string}.`>>,
                Expect<Test<T2, "equals", `<Key, Value>${string}{Item}`>>
            ];
        });


        it("brackets-and-quotes strategy", () => {
            type T1 = FilterByNestingLevel<
                "Array['item'] and Object{'key': 'value'}.",
                { strategy: "brackets-and-quotes"; level: 0; output: "template" }
            >;
            type T2 = FilterByNestingLevel<
                "Array['item'] and Object{'key': 'value'}.",
                { strategy: "brackets-and-quotes"; level: 1; output: "template" }
            >;
            type T3 = FilterByNestingLevel<
                "Array['item'] and Object{'key': 'value'}.",
                { strategy: "brackets-and-quotes"; level: 2; output: "template" }
            >;

            type cases = [
                Expect<Test<T1, "equals", `Array${string} and Object${string}.`>>,
                Expect<Test<T2, "equals", `[${string}]${string}{${string}: ${string}}`>>,
                Expect<Test<T3, "equals", `'item'${string}'key'${string}'value'`>>
            ];
        });


        it("deep nesting - level 2", () => {
            type T1 = FilterByNestingLevel<"Outer(Middle(Inner)) content.", { level: 0; output: "template" }>;
            type T2 = FilterByNestingLevel<"Outer(Middle(Inner)) content.", { level: 1; output: "template" }>;
            type T3 = FilterByNestingLevel<"Outer(Middle(Inner)) content.", { level: 2; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `Outer${string} content.`>>,
                Expect<Test<T2, "equals", `(Middle${string})`>>,
                Expect<Test<T3, "equals", "(Inner)">>
            ];
        });


        it("deep nesting - mixed brackets", () => {
            type T1 = FilterByNestingLevel<
                "Config[database{host: 'localhost'}] settings.",
                { strategy: "brackets-and-quotes"; level: 0; output: "template" }
            >;
            type T2 = FilterByNestingLevel<
                "Config[database{host: 'localhost'}] settings.",
                { strategy: "brackets-and-quotes"; level: 1; output: "template" }
            >;
            type T3 = FilterByNestingLevel<
                "Config[database{host: 'localhost'}] settings.",
                { strategy: "brackets-and-quotes"; level: 2; output: "template" }
            >;
            type T4 = FilterByNestingLevel<
                "Config[database{host: 'localhost'}] settings.",
                { strategy: "brackets-and-quotes"; level: 3; output: "template" }
            >;

            type cases = [
                Expect<Test<T1, "equals", `Config${string} settings.`>>,
                Expect<Test<T2, "equals", `[database${string}]`>>,
                Expect<Test<T3, "equals", `{host: ${string}}`>>,
                Expect<Test<T4, "equals", `'localhost'`>>
            ];
        });


        it("multiple nested elements at same level", () => {
            type T1 = FilterByNestingLevel<
                "List(item1, item2, item3) and Map[key1: value1, key2: value2].",
                { level: 0; output: "template" }
            >;
            type T2 = FilterByNestingLevel<
                "List(item1, item2, item3) and Map[key1: value1, key2: value2].",
                { level: 1; output: "template" }
            >;

            type cases = [
                Expect<Test<T1, "equals", `List${string} and Map${string}.`>>,
                Expect<Test<T2, "equals", `(item1, item2, item3)${string}[key1: value1, key2: value2]`>>
            ];
        });


        it("nested quotes with different quote types", () => {
            type T1 = FilterByNestingLevel<`Template with "double quotes" and 'single quotes'.`, { strategy: "quotes"; level: 0; output: "template" }>;
            type T2 = FilterByNestingLevel<`Template with "double quotes" and 'single quotes'.`, { strategy: "quotes"; level: 1; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `Template with ${string} and ${string}.`>>,
                Expect<Test<T2, "equals", `"double quotes"${string}'single quotes'`>>
            ];
        });


        it("empty string", () => {
            type T1 = FilterByNestingLevel<"", { output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", "">>
            ];
        });


        it("no nesting present", () => {
            type T1 = FilterByNestingLevel<"This is a simple string with no nesting. Level 0", { output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", "This is a simple string with no nesting. Level 0">>
            ];
        });


        it("only nested content, no root content (single nest)", () => {
            type T1 = FilterByNestingLevel<"(only nested content)", { level: 0; output: "template" }>;
            type T2 = FilterByNestingLevel<"(only nested content)", { level: 1; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `${string}`>>,
                Expect<Test<T2, "equals", "(only nested content)">>
            ];
        });

        it("only nested content, no root content (multi nest)", () => {
            type T1 = FilterByNestingLevel<"(only nested content)(part 2)", { level: 0; output: "template" }>;
            type T2 = FilterByNestingLevel<`(only nested content)${string}(part 2)`, { level: 1; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `${string}`>>,
                Expect<Test<T2, "equals", `(only nested content)${string}(part 2)`>>
            ];
        });


        it("nested content at different levels", () => {
            type T1 = FilterByNestingLevel<
                "Root[Level1{Level2('deep')} content] end.",
                { strategy: "brackets-and-quotes"; level: 0; output: "template" }
            >;
            type T2 = FilterByNestingLevel<
                "Root[Level1{Level2('deep')} content] end.",
                { strategy: "brackets-and-quotes"; level: 1; output: "template" }
            >;
            type T3 = FilterByNestingLevel<
                "Root[Level1{Level2('deep')} content] end.",
                { strategy: "brackets-and-quotes"; level: 2; output: "template" }
            >;
            type T4 = FilterByNestingLevel<
                "Root[Level1{Level2('deep')} content] end.",
                { strategy: "brackets-and-quotes"; level: 3; output: "template" }
            >;
            type T5 = FilterByNestingLevel<
                "Root[Level1{Level2('deep')} content] end.",
                { strategy: "brackets-and-quotes"; level: 4; output: "template" }
            >;

            type cases = [
                Expect<Test<T1, "equals", `Root${string} end.`>>,
                Expect<Test<T2, "equals", `[Level1${string} content]`>>,
                Expect<Test<T3, "equals", `{Level2${string}}`>>,
                Expect<Test<T4, "equals", `(${string})`>>,
                Expect<Test<T5, "equals", `'deep'`>>
            ];
        });


        it("complex template literal with multiple nesting types", () => {
            type T1 = FilterByNestingLevel<
                `Function call(param1, param2) with array[index] and object{key: "value"}.`,
                { strategy: "brackets-and-quotes"; level: 0; output: "template" }
            >;
            type T2 = FilterByNestingLevel<
                `Function call(param1, param2) with array[index] and object{key: "value"}.`,
                { strategy: "brackets-and-quotes"; level: 1; output: "template" }
            >;
            type T3 = FilterByNestingLevel<
                `Function call(param1, param2) with array[index] and object{key: "value"}.`,
                { strategy: "brackets-and-quotes"; level: 2; output: "template" }
            >;

            type cases = [
                Expect<Test<T1, "equals", `Function call${string} with array${string} and object${string}.`>>,
                Expect<Test<T2, "equals", `(param1, param2)${string}[index]${string}{key: ${string}}`>>, // TODO: the `${string}` spacer between `[index]` and `{key: ${string}}` isn't 100% wrong but we know there is no space here
                Expect<Test<T3, "equals", `"value"`>>
            ];
        });


        it("consecutive brackets of same type", () => {
            type T1 = FilterByNestingLevel<"Data[first][second][third] access.", { level: 0; output: "template" }>;
            type T2 = FilterByNestingLevel<"Data[first][second][third] access.", { level: 1; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `Data${string}${string}${string} access.`>>,
                Expect<Test<T2, "equals", `[first]${string}[second]${string}[third]`>>, // TODO: ideally we would not have the `${string}` separators because we know that there is no space between these items
            ];
        });

        it("complex quotes nesting with escapes", () => {
            type T1 = FilterByNestingLevel<
                `JSON: {"key": "value with 'quotes'"}`,
                { strategy: "brackets-and-quotes"; level: 0; output: "template" }
            >;
            type T2 = FilterByNestingLevel<
                `JSON: {"key": "value with 'quotes'"}`,
                { strategy: "brackets-and-quotes"; level: 1; output: "template" }
            >;
            type T3 = FilterByNestingLevel<
                `JSON: {"key": "value with 'quotes'"}`,
                { strategy: "brackets-and-quotes"; level: 2; output: "template" }
            >;
            type T4 = FilterByNestingLevel<
                `JSON: {"key": "value with 'quotes'"}`,
                { strategy: "brackets-and-quotes"; level: 3; output: "template" }
            >;

            type cases = [
                Expect<Test<T1, "equals", `JSON: ${string}`>>,
                Expect<Test<T2, "equals", `{${string}: ${string}}`>>,
                Expect<Test<T3, "equals", `"key"${string}"value with ${string}"`>>,
                Expect<Test<T4, "equals", "'quotes'">>
            ];
        });


        it("template with all bracket types", () => {
            type T1 = FilterByNestingLevel<
                "Test(paren)[square]{curly}<angle> combination.",
                { level: 0; output: "template" }
            >;
            type T2 = FilterByNestingLevel<
                "Test(paren)[square]{curly}<angle> combination.",
                { level: 1; output: "template" }
            >;

            type cases = [
                Expect<Test<T1, "equals", `Test${string}${string}${string}${string} combination.`>>,
                Expect<Test<T2, "equals", `(paren)${string}[square]${string}{curly}${string}<angle>`>>
            ];
        });


        it("asymmetric nesting depths", () => {
            type T1 = FilterByNestingLevel<"A(B(C(D))) and E[F] mixed.", { level: 0; output: "template" }>;
            type T2 = FilterByNestingLevel<"A(B(C(D))) and E[F] mixed.", { level: 1; output: "template" }>;
            type T3 = FilterByNestingLevel<"A(B(C(D))) and E[F] mixed.", { level: 2; output: "template" }>;
            type T4 = FilterByNestingLevel<"A(B(C(D))) and E[F] mixed.", { level: 3; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `A${string} and E${string} mixed.`>>,
                Expect<Test<T2, "equals", `(B${string})${string}[F]`>>,
                Expect<Test<T3, "equals", `(C${string})`>>,
                Expect<Test<T4, "equals", `(D)`>>
            ];
        });


        it("single character content at various levels", () => {
            type T1 = FilterByNestingLevel<"X(Y[Z{W}])", { level: 0; output: "template" }>;
            type T2 = FilterByNestingLevel<"X(Y[Z{W}])", { level: 1; output: "template" }>;
            type T3 = FilterByNestingLevel<"X(Y[Z{W}])", { level: 2; output: "template" }>;
            type T4 = FilterByNestingLevel<"X(Y[Z{W}])", { level: 3; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `X${string}`>>,
                Expect<Test<T2, "equals", `(Y${string})`>>,
                Expect<Test<T3, "equals", `[Z${string}]`>>,
                Expect<Test<T4, "equals", `{W}`>>
            ];
        });


        it("whitespace preservation in templates", () => {
            type T1 = FilterByNestingLevel<"  Space  (  inner  )  preserved  ", { level: 0; output: "template" }>;
            type T2 = FilterByNestingLevel<"  Space  (  inner  )  preserved  ", { level: 1; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `  Space  ${string}  preserved  `>>,
                Expect<Test<T2, "equals", "(  inner  )">>
            ];
        });
    })

});
