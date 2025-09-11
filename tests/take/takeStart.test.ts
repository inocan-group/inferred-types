import { describe, expect, it } from "vitest";
import {
    AsTakeState,
    Expect,
    TakeStart,
    TakeState,
    Test,
} from "inferred-types/types";
import { takeStart } from "runtime/take/takeStart";


describe("TakeStart<TMatch, TContent>", () => {

    it("happy path", () => {
        type T1 = TakeStart<["foo","bar"], "foobar">;
        type T2 = TakeStart<["foo","bar"], T1>;

        type cases = [
            Expect<Test<T1, "extends", TakeState>>,
            Expect<Test<T1["parsed"], "equals", ["foo"]>>,
            Expect<Test<T1["parseString"], "equals", "bar">>,

            Expect<Test<T2, "extends", TakeState>>,
            Expect<Test<T2["parsed"], "equals", ["foo","bar"]>>,
            Expect<Test<T2["parseString"], "equals", "">>
        ];
    });

});


describe("takeStart(...matches)(content)", () => {

    it("happy path", () => {
        const content = "foobar forever";
        const take1 = takeStart("foo","bar")(content);

        expect(take1).toBe({
            kind: "TakeState",
            parsed: ["foo"],
            parseString: "bar forever",
            tokens: ["foo"]
        });

        const take2 = takeStart("foo","bar")(take1);

        expect(take2).toBe({
            kind: "TakeState",
            parsed: ["foo","bar"],
            parseString: " forever",
            tokens: ["foo","bar"]
        })

        type cases = [
            Expect<Test<typeof take1, "extends", TakeState>>,
            Expect<Test<typeof take1["parsed"], "equals", ["foo"]>>,
            Expect<Test<typeof take2["parsed"], "equals", ["foo", "bar"]>>,
            Expect<Test<typeof take2["parseString"], "equals", " forever">>,
        ];
    });

})
