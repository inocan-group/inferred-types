import { describe, it } from "vitest";
import {
    AsInputToken,
    Expect,
    FromInputToken,
    Test,
    ToStringLiteral,
} from "inferred-types/types";

describe("AsInputToken<T>", () => {

    it("atomics", () => {
        type Str = AsInputToken<string>;
        type Num = AsInputToken<number>;
        type True = AsInputToken<true>;
        type False = AsInputToken<false>;
        type Bool = AsInputToken<boolean>;
        type Null = AsInputToken<null>;
        type Undef = AsInputToken<undefined>;
        type Any = AsInputToken<any>;
        type Unknown = AsInputToken<unknown>;
        type Never = AsInputToken<never>;

        type cases = [
            Expect<Test<Str, "equals", "string">>,
            Expect<Test<Num, "equals", "number">>,
            Expect<Test<True, "equals", "true">>,
            Expect<Test<False, "equals", "false">>,
            Expect<Test<Bool, "equals", "boolean">>,
            Expect<Test<Null, "equals", "null">>,
            Expect<Test<Undef, "equals", "undefined">>,
            Expect<Test<Any, "equals", "any">>,
            Expect<Test<Unknown, "equals", "unknown">>,
            Expect<Test<Never, "equals", "never">>,
        ];
    });


    it("literals", () => {
        type Foo = AsInputToken<"foo">;
        type FooBar = AsInputToken<"foo" | "bar">;
        type Num = AsInputToken<42>;
        type NumUnion = AsInputToken<42 | 99>;

        type cases = [
            Expect<Test<Foo, "equals", "'foo'">>,
            Expect<Test<FooBar, "equals", "'foo' | 'bar'">>,

            Expect<Test<Num, "equals", "42">>,
            Expect<Test<NumUnion, "equals", "42 | 99">>,
        ];
    });


    it("template literals", () => {
        type Greet = AsInputToken<`Hi ${string}`>;
        type InvGreet = FromInputToken<Greet>;
        type Age = AsInputToken<"I am ${number} years old">;
        type InvAge = FromInputToken<Age>;

        type cases = [
            Expect<Test<Greet, "equals", "'Hi {{string}}'">>,
            Expect<Test<InvGreet, "equals", `Hi ${string}`>>,
            Expect<Test<Age, "equals", "'I am {{number}} years old'">>,
            Expect<Test<InvAge, "equals", `I am ${number} years old`>>
        ];
    });


    it("wide arrays", () => {
        type StrArr = AsInputToken<string[]>;
        type NumArr = AsInputToken<number[]>;
        type Union = AsInputToken<(string | number)[]>;

        type cases = [
            Expect<Test<StrArr, "equals", "string[]">>,
            Expect<Test<NumArr, "equals", "number[]">>,
            Expect<Test<Union, "equals", "(string | number)[]">>,
        ];
    });


    it("literal arrays", () => {
        type Tup1 = AsInputToken<[1,2,3]>;
        type InvTup1 = FromInputToken<Tup1>;
        type Tup2 = AsInputToken<["foo","bar", true]>;
        type InvTup2 = FromInputToken<Tup2>;

        type Opt1 = AsInputToken<[1,2,3?]>;
        type InvOpt1 = FromInputToken<Opt1>;

        type cases = [
            Expect<Test<Tup1, "equals", '[ 1, 2, 3 ]'>>,
            Expect<Test<InvTup1, "equals", [1,2,3]>>,

            Expect<Test<Tup2, "equals", '[ "foo", "bar", true ]'>>,
            Expect<Test<InvTup2, "equals", ["foo","bar",true]>>,


        ];
    });

});
