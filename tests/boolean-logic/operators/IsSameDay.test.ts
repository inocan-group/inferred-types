import { describe, it } from "vitest";
import {
    Expect,
    IsSameDay,
    Test,
} from "inferred-types/types";

describe("IsSameDay<A,B>", () => {

    it("happy path", () => {
        type T1 = IsSameDay<"2022", "2022">;
        type T2 = IsSameDay<"2024-12-12","2024-12-12">;
        type T3 = IsSameDay<2341234, 2341234>;

        type B1 = IsSameDay<"2024-12-12", Date>;

        type F1 = IsSameDay<12.2, 12.2>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,

            Expect<Test<B1, "equals", boolean>>,

            Expect<Test<F1, "equals", false>>,
        ];
    });

});
