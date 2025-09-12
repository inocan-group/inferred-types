import { describe, it } from "vitest";
import type { AsRelativeDate, Expect, Test } from "inferred-types/types";

describe.skip("AsRelativeDate<T>", () => {

    it("first test", () => {
        type A = AsRelativeDate<"2023-12-20">;
        type B = AsRelativeDate<"2023-12-22">;

        type cases = [
            /** type tests */
        ];
    });

});
