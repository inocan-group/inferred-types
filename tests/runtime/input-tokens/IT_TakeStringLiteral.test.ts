import { describe, it } from "vitest";
import {
    Expect,
    IT_TakeStringLiteral,
    Test,
} from "inferred-types/types";

describe("IT_TakeStringLiteral<T>", () => {

    it("happy path", () => {
        type Foo = IT_TakeStringLiteral<`"foo"`>;
        type FooRemaining = IT_TakeStringLiteral<`"foo" | "bar"`>;

        type Foo2 = IT_TakeStringLiteral<`"foo"`>;
        type FooRemaining2 = IT_TakeStringLiteral<`String(foo) | String(bar)`>;

        type TemplateStr = IT_TakeStringLiteral<`"Hi ${string}, what's your name?"`>;
        type TemplateStr2 = IT_TakeStringLiteral<`"Hi {{string}}, what's your name?"`>;

        type cases = [
            Expect<Test<Foo["type"], "equals", "foo">>,
            Expect<Test<Foo2["type"], "equals", "foo">>,

            Expect<Test<FooRemaining["type"], "equals", "foo">>,
            Expect<Test<FooRemaining["rest"], "equals", `| "bar"`>>,
            Expect<Test<FooRemaining2["type"], "equals", "foo">>,
            Expect<Test<FooRemaining2["rest"], "equals", `| String(bar)`>>,

            Expect<Test<TemplateStr["token"], "equals", `"Hi {{string}}, what's your name?"`>>,
            Expect<Test<TemplateStr["type"], "equals", `Hi ${string}, what's your name?`>>,

            Expect<Test<TemplateStr2["token"], "equals", `"Hi {{string}}, what's your name?"`>>,
            Expect<Test<TemplateStr2["type"], "equals", `Hi ${string}, what's your name?`>>,
        ];
    });

});
