import { describe, it } from "vitest";
import {
    Expect,
    IT_TakeParameters,
    Test,
} from "inferred-types/types";

describe("IT_TakeParameters<T>", () => {

    it("no generics", () => {
        type T1 = IT_TakeParameters<"(name: string) => string">;

        type cases = [
            /** type tests */
        ];
    });

});
