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





});
