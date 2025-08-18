import { describe, it } from "vitest";
import {
    Expect,
    AsString,
    Something,
    Test
} from "inferred-types/types";

describe("AsString<T>", () => {

    it("strings", () => {
        type Foobar = AsString<"Foobar">;
        type WideStr = AsString<string>;
        type StrArrWide = AsString<string[]>;

        type cases = [
            Expect<Test<Foobar, "equals",  "Foobar">>,
            Expect<Test<WideStr, "equals",  string>>,
            Expect<Test<StrArrWide, "equals",  string>>,
            Expect<Test<AsString<string[] | string>, "equals",  string>>,
            Expect<Test<AsString<null>, "equals",  never>>,
            Expect<Test<AsString<undefined>, "equals",  never>>,

        ];
    });


    it("numeric", () => {
        type Num = AsString<42>;
        type WideNum = AsString<number>;

        type cases = [
            Expect<Test<Num, "equals",  "42">>,
            Expect<Test<WideNum, "equals",  `${number}`>>,
        ];
    });


    it("boolean", () => {
        type B1 = AsString<true>;
        type BU = AsString<boolean>;

        type cases = [
            Expect<Test<B1, "equals",  "true">>,
            Expect<Test<BU, "equals",  "true" | "false">>,
        ];
    });

    it("unions", () => {
        type UnionStrNull = AsString<"foobar" | null>;
        type UnionStrNum = AsString<"foobar" | 42>;
        type UnionStrAndArr = AsString<string | readonly string[]>;
        type NumNull = AsString<42 | null>;


        type cases = [
            Expect<Test<UnionStrNull, "equals",  "foobar">>,
            Expect<Test<UnionStrNum, "equals",  "foobar" | "42">>,
            Expect<Test<UnionStrAndArr, "equals",  string>>,
            Expect<Test<NumNull, "equals",  "42">>,
        ];
    });


    it("wide arrays", () => {
        type WideStr = AsString<string[]>;
        type WideNum = AsString<number[]>;
        type WideBool = AsString<boolean[]>;

        type cases = [
            Expect<Test<WideStr, "equals", string>>,
            Expect<Test<WideNum, "equals", `${number}`>>,
            Expect<Test<WideBool, "equals", `true` | `false`>>,
        ];
    });


    it("tuples", () => {
        type StrTup = AsString<["foo","bar"]>;

        type cases = [
            Expect<Test<StrTup, "equals", "[ 'foo', 'bar' ]">>,
        ];
    });


    it("dictionaries", () => {


        type cases = [
            /** type tests */
        ];
    });





});
