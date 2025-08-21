import { describe, it } from "vitest";
import {
    Expect,
    Test,
} from "inferred-types/types";
import { IT_TakeTokenGenerics } from "inferred-types/types";

describe("TakeTokenGenerics<T>", () => {

    it("happy path", () => {
        type Input1 = "<T extends string, U extends Record<string,string>>";
        type Input2 = "T extends string, U extends Record<string,string>>";

        type T1 = IT_TakeTokenGenerics<Input1>;
        type T2 = IT_TakeTokenGenerics<Input2>;

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
        ];
    });


    it("Generic with no type", () => {
        type Token = "<T>";
        type T1 = IT_TakeTokenGenerics<Token>;

        type cases = [
            /** type tests */
        ];
    });

    it("invalid tokens", () => {
        type E1 = IT_TakeTokenGenerics<"foobar">;
        type E2 = IT_TakeTokenGenerics<"<T extends string, U hates number>">;

        type cases = [
            Expect<Test<E1, "isError", `wrong-handler/generic`>>,
            Expect<Test<E2, "isError", `malformed-token/generic`>>,
        ];
    });


});
