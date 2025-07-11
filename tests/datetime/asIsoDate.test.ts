import { describe, expect, it } from "vitest";
import {
    Expect,
    Test,
} from "inferred-types/types";
import { asIsoDate } from "inferred-types/runtime";

describe("asIsoDate(d)", () => {

    it("from JS Object", () => {
        const t1 = asIsoDate(new Date("2024-09-14"));

        expect(t1).toBe("2024-09-14")

        type cases = [
            /** type tests */
        ];
    });

});
