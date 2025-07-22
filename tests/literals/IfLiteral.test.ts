import { describe, it } from "vitest";
import {
    Expect,
    Test,
    IsLiteral,
    EmptyObject,
    IsObjectLiteral,
    ExplicitlyEmptyObject,
    Dictionary
} from "inferred-types/types";
import { IsWideType, Keys } from "inferred-types";



describe("IsLiteral<T>", () => {

    it("positive tests", () => {
        type T1 = IsLiteral<"foo">;
        type T2 = IsLiteral<42>;
        type T3 = IsLiteral<true>;
        type T4 = IsLiteral<false>;
        type T5 = IsLiteral<{ foo: number }>;
        type T6 = IsLiteral<["foo", "bar", "baz"]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
            Expect<Test<T6, "equals", true>>,
        ];
    });


    it("negative tests", () => {
        type F1 = IsLiteral<string>;
        type F2 = IsLiteral<number>;
        type F3 = IsLiteral<boolean>;
        type F4 = IsLiteral<object>;
        type F5 = IsLiteral<string[]>;
        type F6 = IsLiteral<readonly string[]>;


        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
            Expect<Test<F6, "equals", false>>,
        ];
    });


    it("Edge Cases", () => {
        type Empty = IsLiteral<EmptyObject>;
        type Explicit = IsLiteral<ExplicitlyEmptyObject>;
        type BaseDictionary = IsObjectLiteral<Dictionary>;
        // eslint-disable-next-line @typescript-eslint/ban-types
        type Curly = IsLiteral<{}>;

        type cases = [
            // an empty object still allows key/value pairs to be added after it
            // is declared so it is NOT a literal
            Expect<Test<Empty, "equals", true>>,
            // an explicitly empty object -- which has it's index keys set to _never_
            // -- can never have any key/values and therefore IS a literal
            Expect<Test<Explicit, "equals", true>>,
            // a type marked at `Dictionary` is generic; it can take any normal key/value
            // pair that an object is allowed so therefore it is NOT literal
            Expect<Test<BaseDictionary, "equals", false>>,
        ];

    });



});
