import { Expect, ObjectToJsString, Test } from "inferred-types/types";
import { describe, it } from "vitest";
import { Ref } from "vue";

describe("ObjectToJsString<T>", () => {

    it("happy path", () => {
        type FooBar = ObjectToJsString<{ foo: 1; bar: 2 }>;
        type StrBool = ObjectToJsString<{ foo: "bar"; bar: false }>;

        type cases = [
            Expect<Test<
                FooBar,
                "containsAll",
                [
                    `foo: 1`,
                    `bar: 2`
                ]
            >>,
            Expect<Test<
                StrBool,
                "containsAll",
                [
                    `foo: "bar"`,
                    `bar: false`
                ]
            >>,
        ];
    });


    it("object with symbol as key", () => {

        type Obj = Ref<{ foo: number; bar: number}>;
        type Str = ObjectToJsString<Obj>;

        const sym = Symbol("bespoke");

        type MultiProp = {
            [sym]: "symbol",
            foo: 1
        }
        type MultiPropStr = ObjectToJsString<MultiProp>;

        type cases = [
            Expect<Test<Str, "equals", "{ [key: symbol]: true }">>,
            Expect<Test<MultiPropStr, "containsAll", [
                `[key: symbol]: "symbol"`,
                `foo: 1`
            ]>>,

        ];
    });


});
