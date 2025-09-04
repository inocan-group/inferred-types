import { describe, it } from "vitest";
import {
    Expect,
    IT_TakeObjectLiteral,
    IT_Token,
    Test,
} from "inferred-types/types";

describe("IT_TakeObjectLiteral<T>", () => {

    it("happy path", () => {
        type Foo = IT_TakeObjectLiteral<"{ foo: 1 }">;
        type FooBar = IT_TakeObjectLiteral<"{ foo: 1; bar: 2 }">;


        type cases = [
            Expect<Test<Foo, "extends", IT_Token<"object-literal">>>,
            Expect<Test<FooBar, "extends", IT_Token<"object-literal">>>,

            Expect<Test<Foo["type"], "equals", { foo: 1 }>>,
            Expect<Test<FooBar["type"], "equals", { foo: 1; bar: 2 }>>,
        ];
    });


    it("optional properties", () => {
        type Some = IT_TakeObjectLiteral<"{ foo: 1; bar?: 2 }">;
        type All = IT_TakeObjectLiteral<"{ foo?: 1; bar?: 2 }">;

        type cases = [
            Expect<Test<Some, "extends", IT_Token<"object-literal">>>,
            Expect<Test<All, "extends", IT_Token<"object-literal">>>,

            Expect<Test<Some["type"], "equals", { foo: 1; bar?: 2 }>>,
            Expect<Test<All["type"], "equals", { foo?: 1; bar?: 2 }>>,
        ];
    });


    it("nested", () => {
        type Nested = IT_TakeObjectLiteral<"{ foo: { bar: { baz: 42 } } }">;

        type cases = [
            Expect<Test<Nested, "extends", IT_Token<"object-literal">>>,
            Expect<Test<Nested["type"], "equals", {foo: {bar: {baz: 42}}}>>
        ];
    });


    it("key/value invalid", () => {
        type Invalid = IT_TakeObjectLiteral<"{ foo: 1; bar: abc }">;

        type cases = [
            Expect<Test<Invalid, "isError", "malformed-token">>
        ];
    });


});


