import { describe, it } from "vitest";
import {
    Expect,
    Test,
    IT_Token_Function,
    IT_Token,
} from "inferred-types/types";
import { IT_TakeFunction } from "types/runtime-types/type-defn/input-tokens/IT_TakeFunction";

describe("IT_TakeFunction<T>", () => {

    describe("arrow functions", () => {

        it("no generics", () => {
            type Fn1 = `(name: string) => "hi"`
            type T1 = IT_TakeFunction<Fn1>;

            // explicit async
            type Fn2 = `async (name: string) => Promise<"hi">`
            type T2 = IT_TakeFunction<Fn2>;

            // implicit async (sync arrow returning Promise)
            type Fn3 = `(name: string) => Promise<"hi">`
            type T3 = IT_TakeFunction<Fn3>;

            type cases = [
                // all three test functions should be IT_Token_Function
                Expect<Test<T1, "extends", IT_Token_Function>>,
                Expect<Test<T2, "extends", IT_Token_Function>>,
                Expect<Test<T3, "extends", IT_Token_Function>>,

                // Fn1 is synchronous arrow function
                Expect<Test<T1["kind"], "equals", "function">>,
                Expect<Test<T1["name"], "equals", null>>,
                Expect<Test<T1["token"], "equals", `(name: string) => "hi"`>>,
                Expect<Test<T1["returnToken"], "equals", `"hi"`>>,
                Expect<Test<T1["rest"], "equals", "">>,

                // Fn2 is an explicit asynchronous function (using "async" keyword)
                Expect<Test<T2["kind"], "equals", "function">>,
                Expect<Test<T2["name"], "equals", null>>,
                Expect<Test<T2["token"], "equals", `async (name: string) => Promise<"hi">`>>,
                Expect<Test<T2["returnToken"], "equals", `Promise<"hi">`>>,
                Expect<Test<T2["rest"], "equals", "">>,

                // Fn3 is a sync arrow function that returns Promise
                Expect<Test<T3["kind"], "equals", "function">>,
                Expect<Test<T3["name"], "equals", null>>,
                Expect<Test<T3["token"], "equals", `(name: string) => Promise<"hi">`>>,
                Expect<Test<T3["returnToken"], "equals", `Promise<"hi">`>>,
                Expect<Test<T3["rest"], "equals", "">>,
            ];
        });

        it("with generics", () => {
            // no generic use in return type
            type Fn1 = `<T>(value: T) => string`
            type T1 = IT_TakeFunction<Fn1>;

            // generic using inside string literal of return type
            type Fn2 = "<T extends string>(value: T) => 'Hi ${T}'"
            type T2 = IT_TakeFunction<Fn2>;

            // generic directly assigned to return type
            type Fn3 = "<T,U>(value: T) => U"
            type T3 = IT_TakeFunction<Fn3>;

            // explicit async fn
            type AsyncFn1 = `async <T, U>(value: T) => Promise<U>`
            type A1 = IT_TakeFunction<AsyncFn1>;

            // implicit async fn
            type AsyncFn2 = `<T, U>(value: T) => Promise<U>`
            type A2 = IT_TakeFunction<AsyncFn2>;

            type cases = [
                // sync functions
                Expect<Test<T1, "extends", IT_Token_Function>>,
                Expect<Test<T2, "extends", IT_Token_Function>>,
                Expect<Test<T3, "extends", IT_Token_Function>>,
                // async functions
                Expect<Test<A1, "extends", IT_Token_Function>>,
                Expect<Test<A2, "extends", IT_Token_Function>>,

                // Fn1 is generic synchronous arrow function
                Expect<Test<T1["kind"], "equals", "function">>,
                Expect<Test<T1["name"], "equals", null>>,
                Expect<Test<T1["returnToken"], "equals", "string">>,
                Expect<Test<T1["returnType"], "equals", string>>,
                Expect<Test<T1["isAsync"], "equals", false>>,



                // Fn2 is generic async arrow function
                Expect<Test<A1["kind"], "equals", "function">>,
                Expect<Test<A1["name"], "equals", null>>,
                Expect<Test<A1["narrowing"], "equals", true>>,
                Expect<Test<A1["returnToken"], "equals", "Promise<U>">>,
            ];
        });

    });

    describe("named functions", () => {

        it("synchronous named functions", () => {
            type Fn1 = `function greet(name: string): string`
            type T1 = IT_TakeFunction<Fn1>;

            type Fn2 = `function add<A extends number, B extends number>(a: A, b: B): number`
            type T2 = IT_TakeFunction<Fn2>;

            type Fn3 = `function greet<T extends string>(name: T): T`;
            type T3 = IT_TakeFunction<Fn3>;

            type cases = [
                Expect<Test<T1, "extends", IT_Token<"function">>>,
                Expect<Test<T2, "extends", IT_Token<"function">>>,

                // Fn1 is named sync function
                Expect<Test<T1["kind"], "equals", "function">>,
                Expect<Test<T1["name"], "equals", "greet">>,
                Expect<Test<T1["narrowing"], "equals", false>>,
                Expect<Test<T1["returnToken"], "equals", "string">>,
                Expect<Test<T1["returnType"], "equals", string>>,
                Expect<Test<T1["isAsync"], "equals", false>>,

                // Fn2 is generic named sync function
                Expect<Test<T2["kind"], "equals", "function">>,
                Expect<Test<T2["name"], "equals", "add">>,
                Expect<Test<T2["narrowing"], "equals", true>>,
                Expect<Test<T2["returnToken"], "equals", "T">>,
            ];
        });


        it("implicitly async named functions", () => {
            type Fn1 = `function greet(name: string): Promise<string>`
            type T1 = IT_TakeFunction<Fn1>;

            type cases = [
                Expect<Test<T1, "extends", IT_Token<"function">>>,

                Expect<Test<T1["kind"], "equals", "function">>,
                Expect<Test<T1["name"], "equals", "greet">>,
                Expect<Test<T1["narrowing"], "equals", false>>,
                Expect<Test<T1["returnToken"], "equals", "Promise<string>">>,
                Expect<Test<T1["returnType"], "equals", Promise<string>>>,
                Expect<Test<T1["isAsync"], "equals", true>>,
            ];
        });


        it("explicitly async named functions", () => {
            type Fn1 = `async function fetchData(url: string): Promise<string>`
            type T1 = IT_TakeFunction<Fn1>;

            type cases = [
                Expect<Test<T1, "extends", IT_Token_Function>>,

                // Fn1 is async named function
                Expect<Test<T1["kind"], "equals", "function">>,
                Expect<Test<T1["name"], "equals", "fetchData">>,
                Expect<Test<T1["narrowing"], "equals", false>>,
                Expect<Test<T1["returnToken"], "equals", "Promise<string>">>,
            ];
        });

    });

    describe("anonymous functions", () => {

        it("synchronous anonymous functions", () => {
            type Fn1 = `function (name: string): string`
            type T1 = IT_TakeFunction<Fn1>;

            type cases = [
                Expect<Test<T1, "extends", IT_Token<"function">>>,

                // Fn1 is anonymous sync function
                Expect<Test<T1["kind"], "equals", "function">>,
                Expect<Test<T1["name"], "equals", null>>,
                Expect<Test<T1["narrowing"], "equals", false>>,
                Expect<Test<T1["returnToken"], "equals", "string">>,
            ];
        });

        it("asynchronous anonymous functions", () => {
            type Fn1 = `async function (url: string): Promise<string>`
            type T1 = IT_TakeFunction<Fn1>;

            type cases = [
                Expect<Test<T1, "extends", IT_Token_Function>>,

                // Fn1 is async anonymous function
                Expect<Test<T1["kind"], "equals", "function">>,
                Expect<Test<T1["name"], "equals", null>>,
                Expect<Test<T1["narrowing"], "equals", false>>,
                Expect<Test<T1["returnToken"], "equals", "Promise<string>">>,
            ];
        });

    });

});


