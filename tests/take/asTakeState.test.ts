import { describe, expect, it } from "vitest";
import {
    AsTakeState,
    Expect,
    TakeState,
    Test,
} from "inferred-types/types";
import { asTakeState } from "inferred-types/runtime";

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


describe("asTakeState(val)", () => {


    it("from string", () => {
        const t1 = asTakeState("foobar");

        expect(t1).toEqual({
            kind: "TakeState",
            parseString: "foobar",
            parsed: [],
            tokens: []
        })


        type cases = [
            Expect<Test<typeof t1, "equals", {
                kind: "TakeState";
                parseString: "foobar";
                parsed: [];
                tokens: [];
            }>>
        ];
    });


})
