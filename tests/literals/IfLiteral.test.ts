import { describe, it } from "vitest";
import {
    Expect,
    Test,
    IsLiteralLike,
    EmptyObject,
    ExplicitlyEmptyObject,
    Dictionary,
    IsLiteralObject
} from "inferred-types/types";
import { IsWideType, Keys } from "inferred-types";



describe("IsLiteral<T>", () => {

    it("positive tests", () => {
        type T1 = IsLiteralLike<"foo">;
        type T2 = IsLiteralLike<42>;
        type T3 = IsLiteralLike<true>;
        type T4 = IsLiteralLike<false>;
        type T5 = IsLiteralLike<{ foo: number }>;
        type T6 = IsLiteralLike<["foo", "bar", "baz"]>;

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
        type F1 = IsLiteralLike<string>;
        type F2 = IsLiteralLike<number>;
        type F4 = IsLiteralLike<object>;
        type F5 = IsLiteralLike<string[]>;
        type F6 = IsLiteralLike<readonly string[]>;


        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
            Expect<Test<F6, "equals", false>>,
        ];
    });


    it("Edge Cases", () => {
        type Empty = IsLiteralLike<EmptyObject>;
        type Explicit = IsLiteralLike<ExplicitlyEmptyObject>;
        type BaseDictionary = IsLiteralLike<Dictionary>;
        // eslint-disable-next-line @typescript-eslint/ban-types
        type Curly = IsLiteralLike<{}>;

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
