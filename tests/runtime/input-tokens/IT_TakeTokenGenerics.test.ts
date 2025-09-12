import { describe, it } from "vitest";
import type { Expect, IT_TakeTokenGenerics, Test } from "inferred-types/types";

describe("TakeTokenGenerics<T>", () => {

    it("generics with type info", () => {
        type Input1 = "<T extends string, U extends Record<string,string>>";
        type Input2 = "T extends string, U extends Record<string,string>>";
        type Input3 = "T extends string, U extends Record<string,string>>(val: T) {}  ";

        type T1 = IT_TakeTokenGenerics<Input1>;
        type T2 = IT_TakeTokenGenerics<Input2>;
        type T3 = IT_TakeTokenGenerics<Input3>;
        type T4 = IT_TakeTokenGenerics<"<T extends string>(name: T) => string">;
        type T5 = IT_TakeTokenGenerics<"<A extends number, B extends number>(a: A, b: B): number">;

        type Expected = {
            generics: [
                { name: "T", token: "string", type: string },
                { name: "U", token: "Record<string,string>", type: Record<string,string>}
            ],
            rest: ""
        }

        type cases = [
            Expect<Test<T1, "equals", Expected>>,
            Expect<Test<T2, "equals", Expected>>,
            Expect<Test<T3["generics"], "equals", Expected["generics"]>>,
            Expect<Test<T3["rest"], "equals", "(val: T) {}">>,

            Expect<Test<
                T4, "equals",
                {
                    generics: [
                        { name: "T"; token: "string"; type: string }
                    ];
                    rest: "(name: T) => string"
                }
            >>,

            Expect<Test<
                T5, "equals",
                {
                    generics: [{
                        name: "A";
                        token: "number";
                        type: number;
                    }, {
                        name: "B";
                        token: "number";
                        type: number;
                    }];
                    rest: "(a: A, b: B): number"
                }
            >>
        ];
    });

    it("Generic with no type", () => {
        type Token = "<T>";
        type T1 = IT_TakeTokenGenerics<Token>;

        type cases = [
            Expect<Test<
                T1, "equals",
                { generics: [{name: "T"; token: "unknown"; type: unknown }]; rest: ""}
            >>,

        ];
    });

    it("mixed", () => {
        type Token = "<T extends string, V>(name: T, value: V) {}";
        type T1 = IT_TakeTokenGenerics<Token>;

        type Expected = {
            generics: [{
                name: "T";
                token: "string";
                type: string;
            }, {
                name: "V";
                token: "unknown";
                type: unknown;
            }];
            rest: "(name: T, value: V) {}";
        }

        type cases = [
            Expect<Test<T1, "equals", Expected>>
        ];
    });

    it("invalid tokens", () => {
        type E1 = IT_TakeTokenGenerics<"foobar!">;
        type E2 = IT_TakeTokenGenerics<"<T extends string, U hates number>">;

        type cases = [
            Expect<Test<E1, "isError", `malformed-token/generic`>>,
            Expect<Test<E2, "isError", `malformed-token/generic`>>,
        ];
    });

});

