import { Expect, FromKv, Test, EmptyObject, KeyValue } from "inferred-types/types";
import { describe, it } from "vitest";


describe("FromKv<T>", () => {
    it("all required", () => {
        type Foobar = FromKv<[
            { key: "foo", value: 1, required: true },
            { key: "bar", value: "hi", required: true }
        ]>
        type Empty = FromKv<[]>;

        type cases = [
            Expect<Test<Foobar, "equals",  { foo: 1; bar: "hi" }>>,
            Expect<Test<Empty, "equals", EmptyObject>>
        ];
    });


    it("all optional", () => {
       type Foobar = FromKv<[
            { key: "foo", value: 1, required: false },
            { key: "bar", value: "hi", required: false }
        ]>

        type cases = [
            Expect<Test<Foobar, "equals",  { foo?: 1; bar?: "hi" }>>,
        ];
    });


    it("mixture of required and optional", () => {
        type Foobar = FromKv<[
            { key: "foo", value: 1, required: false },
            { key: "bar", value: "hi", required: true }
        ]>

        type cases = [
            Expect<Test<Foobar, "equals",  { foo?: 1; bar: "hi" }>>,
        ];
    });




    it("nested", () => {


        type cases = [
            /** type tests */
        ];
    });



    it("Pascalize", () => {
        type T = FromKv<[
            KeyValue<"FooBar", [KeyValue<"BarBaz", 2, true>], true>
        ]>;

        type cases = [
            T
        ];
    });


    it("with optional props", () => {
        type FooBar = FromKv<[
            { key: "foo", value: 1, required: false },
            { key: "bar", value: 2, required: true },
            { key: "baz", value: "baz", required: true }
        ]>;


        type MoreComplex = FromKv<[
            { key: "foo", value: 1, required: false },
            { key: "bar", value: 2, required: true },
            { key: "baz", value: "baz", required: false },
            { key: "bax", value: string | number, required: true }
        ]>;

        type cases = [
            Expect<Test<FooBar, "equals", { foo?: 1, bar: 2,  baz: "baz" }>>,

            Expect<Test<
                MoreComplex, "equals",
                { foo?: 1, bar: 2, baz?: "baz",  bax: string | number }
            >>,
        ];
    });
});
