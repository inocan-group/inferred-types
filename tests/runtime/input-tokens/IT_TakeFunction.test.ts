import { describe, it } from "vitest";
import {
    Expect,
    GetInputToken,
    Test,
} from "inferred-types/types";
import { IT_TakeFunction } from "types/runtime-types/type-defn/input-tokens/IT_TakeFunction";

describe("IT_TakeFunction<T>", () => {

    describe("arrow functions", () => {

        describe("sync", () => {

            it("no generics", () => {
                type Fn1 = `(name: string) => "hi"`
                type T1 = IT_TakeFunction<Fn1>;

                type Fn2 = `async (name: string) => Promise<"hi">`
                type T2 = IT_TakeFunction<Fn2>;

                type cases = [
                    /** type tests */
                ];
            });



        })


    })



});


