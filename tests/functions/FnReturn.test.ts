import { describe, it } from "vitest";
import {
    Expect,
    Test,
} from "inferred-types/types";
import { FnReturn } from "types/functions/FnReturn";

describe("FnReturn<TFn>", () => {

    it("union variant", () => {
        type F1 = (<T extends "Bob" | "Nancy">(name: T) => `hi ${T}`);
        type F2 = (<T extends readonly [name: "Bob" | "Nancy"]>(...name: T) => `hi ${string}`);
        type F3 = (name: "Bob" | "Nancy") => `hi ${typeof name}`;

        type R1 = FnReturn<F1>;
        type R2 = FnReturn<F2>;
        type R3 = FnReturn<F3>;

        type cases = [
            Expect<Test<R1, "equals", string>>,
            Expect<Test<R2, "equals", "hi Bob" | "hi Nancy">>,
            Expect<Test<R3, "equals", "hi Bob" | "hi Nancy">>,
        ];
    });


    it("numeric literal in return", () => {
        type F1 = <A extends number>(age: A) => `${A} years old`;
        type F2 = (age: number) => `${typeof age} years old`;
        type F3 = <T extends readonly [age: number]>(...args: T) => `${T[1]} years old`;

        type R1 = FnReturn<F1>;
        type R2 = FnReturn<F2>;
        type R3 = FnReturn<F3>;

        type cases = [
            Expect<Test<R1, "equals",  `${number} years old`>>,
            Expect<Test<R2, "equals",  `${number} years old`>>,
            Expect<Test<R3, "equals",  `${number} years old`>>,
        ];
    });



    it("numeric and string literal in return", () => {
        type F1 = <T extends string, A extends number>(name: T, age: A) => `${T} is ${A} years old`;
        type F2 = (name: string, age: number) => `${typeof name} is ${typeof age} years old`;
        type F3 = <T extends readonly [name: string, age: number]>(...args: T) => `${T[0]} is ${T[1]} years old`;

        type R1 = FnReturn<F1>;
        type R2 = FnReturn<F2>;
        type R3 = FnReturn<F3>;

        type cases = [
            Expect<Test<R1, "equals",  `${string} is ${number} years old`>>,
            Expect<Test<R2, "equals",  `${string} is ${number} years old`>>,
            Expect<Test<R3, "equals",  `${string} is ${number} years old`>>,
        ];
    });


});
