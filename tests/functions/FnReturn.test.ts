import { describe, it } from "vitest";
import {
    Expect,
    Test,
    FnReturn
} from "inferred-types/types";



describe("FnReturn<TFn>", () => {

    it("union variant", () => {
        // non-readonly generics
        type F1 = (<T extends "Bob" | "Nancy">(name: T) => `hi ${T}`);
        // readonly variadic with string template
        type F2 = (<T extends readonly [name: "Bob" | "Nancy"]>(...name: T) => `hi ${string}`);
        // readonly variadic with matched template
        type F3 = (<T extends readonly [name: "Bob" | "Nancy"]>(...name: T) => `hi ${T[0]}`);
        // no generics
        type F4 = (name: "Bob" | "Nancy") => `hi ${typeof name}`;

        // runtime, no explicit return
        const f5 = (name: "Bob" | "Nancy") => `hi ${name}`;
        // runtime, explicit return
        const f6 = (name: "Bob" | "Nancy") => `hi ${name}` as `hi ${typeof name}`;

        type _RT1 = ReturnType<F1>; // =>
        type _RT2 = ReturnType<F2>; // =>
        type _RT3 = ReturnType<F3>; // =>
        type _RT5 = ReturnType<typeof f5>; // =>

        type R1 = FnReturn<F1>;
        type R2 = FnReturn<F2>;
        type R3 = FnReturn<F3>
        type R4 = FnReturn<F4>;
        type R5 = FnReturn<typeof f5>;
        type R6 = FnReturn<typeof f6>;

        type cases = [
            Expect<Test<R1, "equals", string>>,
            Expect<Test<R2, "equals", "hi Bob" | "hi Nancy">>,
            Expect<Test<R3, "equals", "hi Bob" | "hi Nancy">>,
            Expect<Test<R4, "equals", "hi Bob" | "hi Nancy">>,
            Expect<Test<R5, "equals", string>>,
            Expect<Test<R6, "equals", "hi Bob" | "hi Nancy">>,
        ];
    });


    it("numeric literal in return", () => {
        type F1 = <A extends number>(age: A) => `${A} years old`; // =>
        type F2 = <T extends readonly [age: number]>(...args: T) => `${T[0]} years old`;
        type F4 = (age: number) => `${typeof age} years old`;

        type RT1 = ReturnType<F1>; // =>
        type R1 = FnReturn<F1>;
        type R2 = FnReturn<F2>;
        type R4 = FnReturn<F4>;

        type cases = [
            Expect<Test<R1, "equals",  `${number} years old`>>,
            Expect<Test<R2, "equals",  `${number} years old`>>,
            Expect<Test<R4, "equals",  `${number} years old`>>,
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
