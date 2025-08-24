import { describe, it } from "vitest";
import {
    Expect,
    IT_TakeLiteralArray,
    Test,
} from "inferred-types/types";

describe("IT_TakeLiteralArray<T>", () => {

    it("happy path", () => {
        type FooBar = IT_TakeLiteralArray<"[ 'foo', 'bar' ]">

        type cases = [
            /** type tests */
        ];
    });

});
