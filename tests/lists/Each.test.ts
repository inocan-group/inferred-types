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

});
