import { describe, it } from "vitest";
import {
    DefaultNesting,
    Expect,
    RetainUntil__Nested,
    Test,
} from "inferred-types/types";
import { Default } from "inferred-types";

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


});
