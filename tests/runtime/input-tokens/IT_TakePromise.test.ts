import { describe, it } from "vitest";
import {
    Expect,
    IT_TakePromise,
    IT_Token,
    Test,
} from "inferred-types/types";

describe("IT_TakePromise<T>", () => {

    it("happy path", () => {
        type T1 = IT_TakePromise<"Promise<string>">;
        type T2 = IT_TakePromise<"Promise<string | number> | string">;
        type T3 = IT_TakePromise<`Promise<"hi">`>;

        type cases = [
            Expect<Test<T1, "extends", IT_Token<"promise">>>,
            Expect<Test<T2, "extends", IT_Token<"promise">>>,

            Expect<Test<T1["type"], "equals", Promise<string>>>,
            Expect<Test<T1["rest"], "equals", "">>,

            Expect<Test<T2["type"], "equals", Promise<string | number>>>,
            Expect<Test<T2["rest"], "equals", "| string">>,
        ];
    });

});
