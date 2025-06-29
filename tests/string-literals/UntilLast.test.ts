import {
    Expect,
    Err,
    Test,
    UntilLast
} from "inferred-types/types";
import { describe, it } from "vitest";

describe("UntilLast<TText, TFind, [TBreak]>", () => {

    it("happy path", () => {
        type T1 = UntilLast<"Array<Record<string, string>>", ">">;
        type T2 = UntilLast<"Array<Record<string, string>>  ", ">">;
        type T3 = UntilLast<"Array<Record<string, string>>  abc", ">">;
        type T4 = UntilLast<`Array<Record<string, string >>  `, ">">;

        type T5 = UntilLast<"Foo, Bar, Baz, Bax", ",">;
        type T6 = UntilLast<
            "Array<Record<string, string> | Array<string>>", ">"
        >;


        type cases = [
            Expect<Test<T1, "equals", "Array<Record<string, string>">>,
            Expect<Test<T2, "equals", "Array<Record<string, string>">>,
            Expect<Test<T3, "equals", "Array<Record<string, string>">>,
            Expect<Test<T4, "equals", "Array<Record<string, string >">>,

            Expect<Test<T5, "equals", "Foo, Bar, Baz">>,
            Expect<Test<T6, "equals", "Array<Record<string, string> | Array<string>">>,
        ];
    });


    it("with break character", () => {
        type T1 = UntilLast<
            "Array<Record<string, string>> | Array<string>",
            ">",
            { break: "|" }
        >;
        type T2 = UntilLast<"Array<string>", ">", { break: "|" }>

        type cases = [
            Expect<Test<T1, "equals", "Array<Record<string, string>">>,
            Expect<Test<T2, "equals", "Array<string">>,
        ];
    });

    it("no match with TFind character (no break char)", () => {
        type T1 = UntilLast<"FooBar", ">">;
        type E1 = UntilLast<"FooBar", ">", { handle: Err<"oops"> }>;

        type cases = [
            Expect<Test<T1, "equals", "FooBar">>,
            Expect<Test<E1, "equals", Err<"oops">>>,
        ];
    });

    it("no match with TFind character (with break char)", () => {
        type T1 = UntilLast<"FooBar | Baz", ">", { break: "|" }>;
        type E1 = UntilLast<
            "FooBar | Baz",
            ">",
            { break: "|", handle: Err<"oops"> }
        >;

        type cases = [
            Expect<Test<T1, "equals", "FooBar ">>,
            Expect<Test<E1, "equals", Err<"oops">>>,
        ];
    });

});
