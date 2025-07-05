import { describe, expect, it } from "vitest";
import {
    Expect,
    Test,
} from "inferred-types/types";
import { dateObjectToIso, parseIsoDate } from "inferred-types/runtime";
import { log } from "console";
import moment from "moment";

describe("dateObjectToIso(d)", () => {

    it("from UTC Javascript Object", () => {
        const t1 = dateObjectToIso(new Date("2020-07-22"));

        expect(t1).toBe("2020-07-22");

        type cases = [
            /** type tests */
        ];
    });



    it("from moment date object", () => {
        const t1 = dateObjectToIso(moment("2020-07-22"));

        expect(t1).toBe("2020-07-22");

        type cases = [
            /** type tests */
        ];
    });


});
