import { describe, it } from "vitest";
import {
    Expect,
    Inverse,
    Test,
} from "inferred-types/types";

describe("Inverse<T>", () => {

    it("Happy path", () => {
        type Tuple1 = [true, true, false, boolean, false];
        type Tuple2 = [true, true, () => false, boolean, false ];

        type T1 = Inverse<Tuple1>;
        type T2 = Inverse<Tuple2>;

        type cases = [
            Expect<Test<
                T1, "equals",
                [false, false, true, boolean, true]
            >>,
            Expect<Test<
                T2, "equals",
                [false, false, true, boolean, true]
            >>
        ];
    });

});



