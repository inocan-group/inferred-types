import { describe, it } from "vitest";
import {
    Expect,
    IT_TakeParameters,
    Test,
} from "inferred-types/types";

describe("IT_TakeParameters<T>", () => {

    it("no generics", () => {
        type T1 = IT_TakeParameters<"(name: string) => string">; // =>

        type Expected = {
            parameters: [{
                name: "name";
                token: "string";
                fromGeneric: false;
                type: string;
            }];
            generics: [];
            rest: "=> string";
        }

        type cases = [
            Expect<Test<T1, "equals", Expected>>,
        ];
    });

    it("with generics", () => {
        type T1 = IT_TakeParameters<"<T extends string>(name: T) => string">;
        type T2 = IT_TakeParameters<"<T extends string, V>(name: T, value: V) => string">;
        type T3 = IT_TakeParameters<"<A extends number, B extends number>(a: A, b: B): number">;

        type T1_Expected = {
                parameters: [{
                    name: "name";
                    token: "string";
                    fromGeneric: "T";
                    type: string;
                }],
                generics: [{ name: "T"; token: "string"; type: string }]
                rest: "=> string"
            }

        type T2_Expected = {
            parameters: [{
                name: "name";
                token: "string";
                fromGeneric: "T";
                type: string;
            }, {
                name: "value";
                token: "unknown";
                fromGeneric: "V";
                type: unknown;
            }];
            generics: [
                {name: "T"; token: "string"; type: string },
                {name: "V"; token: "unknown"; type: unknown }
            ]
            rest: "=> string"
        }

        type T3_Expected = {
            parameters: [{
                name: "a";
                token: "number";
                fromGeneric: "A";
                type: number;
            }, {
                name: "b";
                token: "number";
                fromGeneric: "B";
                type: number;
            }];
            generics: [{
                name: "A";
                token: "number";
                type: number;
            }, {
                name: "B";
                token: "number";
                type: number;
            }];
            rest: ": number";
        }

        type cases = [
            Expect<Test<T1, "equals", T1_Expected>>,
            Expect<Test<T2, "equals", T2_Expected>>,
            Expect<Test<T3, "equals", T3_Expected>>,
        ];
    });


});
