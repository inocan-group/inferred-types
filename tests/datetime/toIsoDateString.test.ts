import { describe, expect, it } from "vitest";
import {
    Expect,
    Test,
} from "inferred-types/types";

import { parseIsoDate, toIsoDateString } from "inferred-types/runtime";

describe("toIsoDateString()", () => {

    it("ISO Date", () => {
        const d1 = parseIsoDate("2022-07-14");
        const t1 = toIsoDateString(d1);

        expect(t1, "2022-07-04")

        type cases = [
            /** type tests */
        ];
    });

});
