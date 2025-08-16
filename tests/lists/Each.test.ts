import { describe, it } from "vitest";
import {
    Each,
    Expect,
    Test,
} from "inferred-types/types";

describe("Each<T,Op,Param>", () => {

    it("return type", () => {
        type Fns = [
            () => string,
            () => number,
            () => boolean
        ]
        type R = Each<Fns, "returnType">;

        type cases = [
            Expect<Test<R, "equals", [string, number, boolean]>>
        ];
    });



    it("get operation", () => {
        type People = [
            { id: 1, name: "Bob", about: { color: "blue"; age: 45 }},
            { id: 2, name: "Mary", about: { color: "green"; age: 34 }},
            { id: 1, name: "Chris", about: { color: "yellow"; age: 25 }},
        ]
        type Color = Each<People, "get", "about.color">

        type cases = [
            Expect<Test<Color,"equals", ["blue","green","yellow"]>>,
        ];
    });


    it("isLiteral operation", () => {
        type T1 = Each<[1,2,3], "isLiteral">;
        type T2 = Each<["a","b","c"], "isLiteral">;

        type F1 = Each<[1,2,string], "isLiteral">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
        ];
    });

    it("isWide operation", () => {
        type T1 = Each<[number,string], "isWide">;

        type F1 = Each<[1,2,3], "isWide">;
        type F2 = Each<["a","b","c", number], "isWide">;

        type cases = [
            Expect<Test<T1, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>
        ];
    });


});
