import { describe, it } from "vitest";
import {
    AsTakeState,
    Expect,
    TakeState,
    Test,
} from "inferred-types/types";

describe("AsTakeState", () => {

    it("from string", () => {
        type T1 = AsTakeState<"foobar">;

        type cases = [
            Expect<Test<T1, "extends", TakeState>>,

            Expect<Test<T1, "equals", {
                kind: "TakeState";
                parsed: [];
                parseString: "foobar";
                tokens: []
            }>>
        ];
    });

});
