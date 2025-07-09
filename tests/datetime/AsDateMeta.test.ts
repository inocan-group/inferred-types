import { describe, it } from "vitest";
import {
    AsDateMeta,
    Expect,
    ParseDate,
    Test,
    TwoDigitDate,
    TwoDigitMonth,
} from "inferred-types/types";
import { DateMeta, FourDigitYear } from "../../modules/types/dist";

describe("AsDateMeta<T>", () => {

    it("from a parsed date", () => {
        type P = ParseDate<"2022-12-24">;
        type M = AsDateMeta<P>;


        type cases = [
            Expect<Test<
                M, "extends",
                DateMeta
            >>,
            Expect<Test<
                M["year"], "equals",
                FourDigitYear<"2022">
            >>,
            Expect<Test<
                M["month"], "equals",
                TwoDigitMonth<"12">
            >>,
            Expect<Test<
                M["date"], "equals",
                TwoDigitDate<"24">
            >>,
        ];
    });

});
