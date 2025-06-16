import { describe, expect, it } from "vitest";
import { getSeason } from "inferred-types/runtime";

describe("getSeason(date, hemisphere)", () => {

    it("happy path", () => {
        const jan = getSeason("2012-01-02");
        const july = getSeason("2012-07-04");

        expect(jan).toBe("Winter");
        expect(july).toBe("Summer");


    });

});
