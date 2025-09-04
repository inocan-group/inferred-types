import { describe, it } from "vitest";
import {
    Expect,
    IT_TakeFunction,
    IT_TakeIntersection,
    Test,
} from "inferred-types/types";

describe("IT_TakeIntersection<T,P>", () => {

    it("function intersected with key/value object", () => {
        type FnToken = IT_TakeFunction<"function greet(name: string): string">;
        type T1 = IT_TakeIntersection<FnToken, "& { foo: 1; bar: 2 }">

        type cases = [
            /** type tests */
        ];
    });

});
