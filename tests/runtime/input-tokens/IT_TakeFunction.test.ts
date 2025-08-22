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
                type F1 = `(name: string) => "hi"`
                type T1 = IT_TakeFunction<F1>;

                type cases = [
                    /** type tests */
                ];
            });
        })


    })



});


