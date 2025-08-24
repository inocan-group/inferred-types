import { describe, it } from "vitest";
import {
    Expect,
    FilterByNestingLevel,
    Test,
} from "inferred-types/types";

describe("FilterByNestingLevel<TContent,TOpt>", () => {
    describe("string output", () => {
        it("happy path", () => {
            type T1 = FilterByNestingLevel<"Bob(the father) was angry at Mary(the daughter).">;

            type cases = [
                Expect<Test<T1, "equals", "Bob was angry at Mary.">>
            ];
        });


        it("using the quotes strategy", () => {
            type T1 = FilterByNestingLevel<"[ 'foo', 'bar?', 'baz'? ]", { strategy: "quotes" }>;

            type cases = [
                Expect<Test<T1, "equals", "[ , , ? ]">>
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


        it("brackets-and-quotes strategy", () => {
            type T1 = FilterByNestingLevel<"Array['item'] and Object{'key': 'value'}.", { strategy: "brackets-and-quotes", level: 0 }>;
            type T2 = FilterByNestingLevel<"Array['item'] and Object{'key': 'value'}.", { strategy: "brackets-and-quotes", level: 1 }>;

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


        it("deep nesting - mixed brackets", () => {
            type T1 = FilterByNestingLevel<"Config[database{host: 'localhost'}] settings.", { strategy: "brackets-and-quotes", level: 0 }>;
            type T2 = FilterByNestingLevel<"Config[database{host: 'localhost'}] settings.", { strategy: "brackets-and-quotes", level: 1 }>;
            type T3 = FilterByNestingLevel<"Config[database{host: 'localhost'}] settings.", { strategy: "brackets-and-quotes", level: 2 }>;

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
            type T1 = FilterByNestingLevel<"Root[Level1{Level2('deep')} content] end.", { strategy: "brackets-and-quotes", level: 0 }>;
            type T2 = FilterByNestingLevel<"Root[Level1{Level2('deep')} content] end.", { strategy: "brackets-and-quotes", level: 1 }>;
            type T3 = FilterByNestingLevel<"Root[Level1{Level2('deep')} content] end.", { strategy: "brackets-and-quotes", level: 2 }>;
            type T4 = FilterByNestingLevel<"Root[Level1{Level2('deep')} content] end.", { strategy: "brackets-and-quotes", level: 3 }>;

            type cases = [
                Expect<Test<T1, "equals", "Root end.">>,
                Expect<Test<T2, "equals", "[Level1 end]">>,
                Expect<Test<T3, "equals", "{Level2 content}">>,
                Expect<Test<T4, "equals", "('deep')">>
            ];
        });


        it("complex template literal with multiple nesting types", () => {
            type T1 = FilterByNestingLevel<`Function call(param1, param2) with array[index] and object{key: "value"}.`, { strategy: "brackets-and-quotes", level: 0 }>;
            type T2 = FilterByNestingLevel<`Function call(param1, param2) with array[index] and object{key: "value"}.`, { strategy: "brackets-and-quotes", level: 1 }>;

            type cases = [
                Expect<Test<T1, "equals", "Function call with array and object.">>,
                Expect<Test<T2, "equals", "(param1, param2)[index]{key: \"value\"}">>
            ];
        });



    })

    describe("string[] output", () => {
        it.todo("happy path", () => {
            type T1 = FilterByNestingLevel<"Bob(the father) was angry at Mary(the daughter).", { output: "string[]" }>;

            type cases = [
                Expect<Test<T1, "equals", ["Bob", " was angry at ", "Mary", "."]>>
            ];
        });


        it.todo("using the quotes strategy", () => {
                type T1 = FilterByNestingLevel<"[ 'foo', 'bar?', 'baz'? ]", { strategy: "quotes"; output: "string[]" }>;

                type cases = [
                    Expect<Test<T1, "equals", [ "[ ", ", ", ", ", "? ]" ] >>
                ];
            });
        });

    describe("template output", () => {
        it.todo("happy path", () => {
            type T1 = FilterByNestingLevel<"Bob(the father) was angry at Mary(the daughter).", { output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `Bob${string} was angry at Mary${string}.`>>
            ];
        });


        it.todo("using the quotes strategy", () => {
            type T1 = FilterByNestingLevel<"[  'foo', 'bar?', 'baz'? ]", { strategy: "quotes"; output: "template" }>;

            type cases = [
                Expect<Test<T1, "equals", `[ ${string}, ${string}, ${string}? ]`>>
            ];
        });
    })

});
