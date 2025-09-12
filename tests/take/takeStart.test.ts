import { describe, expect, it } from "vitest";
import {
    AsTakeState,
    Expect,
    TakeStart,
    TakeState,
    Test,
    UpdateTake,
} from "inferred-types/types";
import { takeStart } from "inferred-types/runtime";


describe("TakeStart<TMatch, TContent>", () => {

    it("with default matcher pattern", () => {
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


    it("with mapper", () => {
        type T1 = TakeStart<[{foo: "foey", bar: "barred"}], "foobar">; // =>
        type T2 = TakeStart<[{foo: "foey", bar: "barred"}], T1>;

        type cases = [
            Expect<Test<T1, "extends", TakeState>>,
            Expect<Test<T2, "extends", TakeState>>,

            Expect<Test<T1["tokens"], "equals", ["foey"]>>,
            Expect<Test<T2["tokens"], "equals", ["foey", "barred"]>>,
        ];
    });


    it("with callback", () => {
        type Cb = <M extends string, S extends TakeState>(val: M, state: S) => UpdateTake<S,M,Capitalize<M>>;

        type InitialState = AsTakeState<"foobar">;
        type T1 = TakeStart<[Cb, "foo", "bar"], "foobar">; // =>
        type T2 = TakeStart<[Cb, "foo", "bar"], T1>;

        type cases = [
            Expect<Test<T1, "extends", TakeState>>,
            Expect<Test<T2, "extends", TakeState>>,

            Expect<Test<T1["parsed"], "equals", ["foo"]>>,
            Expect<Test<T2["parsed"], "equals", ["foo","bar"]>>,

            // TODO: need to see if there's a way to do this with a callback
            // Expect<Test<T1["tokens"], "equals", ["Foo"]>>,
            // Expect<Test<T2["tokens"], "equals", ["Foo","Bar"]>>,
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
