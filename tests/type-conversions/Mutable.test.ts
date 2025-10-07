import { describe, it } from "vitest";
import type { Expect, AssertEqual, Mutable } from "inferred-types/types";
import { mutable } from "inferred-types/runtime";

describe("Mutable<T>", () => {

    it("object with scalar values", () => {
        type T1 = Mutable<{ foo: 1; bar: 2 }>;

        type cases = [
           Expect<AssertEqual<T1, { foo: 1; bar: 2 }>>
        ];
    });


    it("object with unions", () => {
        type T1 = Mutable<{readonly foo: 1|2; readonly bar: "one"|"two"}>

        type cases = [
            Expect<AssertEqual<T1, { foo: 1|2, bar: "one"|"two"}>>
        ];
    });



    it("object with readonly scalar values", () => {
        type T1 = Mutable<{ readonly foo: 1; readonly bar: 2 }>;
        type T2 = Mutable<{ foo: 1; readonly bar: 2 }>;

        type cases = [
           Expect<AssertEqual<T1, { foo: 1; bar: 2 }>>,
           Expect<AssertEqual<T2, { foo: 1; bar: 2 }>>
        ];
    });


    it("object with readonly arrays", () => {
        type O = {
            foo: number;
            bar: readonly string[];
            readonly baz: string;
            readonly literal: [1,2,3];
            fooBar: readonly ["foo","bar"]
        };
        type M = Mutable<O>;

        type cases = [
            Expect<AssertEqual<
                M,
                {
                    foo: number;
                    bar: string[];
                    baz: string;
                    literal: [1,2,3];
                    fooBar: ["foo", "bar"]
                }
            >>
        ];
    });

    it("nested object", () => {
        type O = {
            foo: {
                one: number;
                readonly fooBar: ["foo","bar"]
                readonly two: number;
                readonly union: "foo" | "bar";
                readonly nested: {
                    one: number;
                    readonly two: 2;
                    readonly literal: ["foo", "bar"];
                }
            }
        }

        type M = Mutable<O>;

        type cases = [
            Expect<AssertEqual<
                M,
                {
                    foo: {
                        one: number;
                        fooBar: ["foo", "bar"];
                        two: number;
                        union: [["foo" | "bar"]];
                        nested: {
                            one: number;
                            two: 2;
                            literal: ["foo", "bar"];
                        };
                    };
                }
            >>
        ];
    });


});


describe("mutable", () => {


    it("object with scalar values", () => {
        const fooBar = mutable({foo: 1, bar: 2} as { readonly foo: 1; readonly bar: 2})

        type cases = [
            Expect<AssertEqual<typeof fooBar, { foo: 1; bar: 2}>>
        ];
    });

    it("object with readonly arrays", () => {
        const fooBar = mutable({foo: [1,2,3], bar: 2} as { readonly foo: [1,2,3]; readonly bar: 2})

        type cases = [
            Expect<AssertEqual<typeof fooBar, { foo: [1,2,3]; bar: 2}>>
        ];
    });


})
