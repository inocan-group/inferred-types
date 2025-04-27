import { describe, expect, it } from "vitest";
import { Expect, Surround, Test } from "inferred-types/types";
import { SurroundWith, surround } from "inferred-types/runtime";


describe("Surround<TContent,TPre,TPost>", () => {

    it("with singular content", () => {
        type Bracket = Surround<"foobar", "[", "]">;
        type Angles = Surround<"foobar", "<", ">">;
        type NumBracket = Surround<42, "[", "]">;
        type NumAngles = Surround<42, "<", ">">;

        type cases = [
            Expect<Test<Bracket, "equals", "[foobar]">>,
            Expect<Test<Angles, "equals", "<foobar>">>,
            Expect<Test<NumBracket, "equals", "[42]">>,
            Expect<Test<NumAngles, "equals", "<42>">>,
        ];
    });

    it("with array content", () => {
        type FooBar = Surround<["foo", "bar"], "(", ")">;
        type OneTwo = Surround<[1, 2], "(", ")">;

        type cases = [
            Expect<Test<FooBar, "equals", ["(foo)", "(bar)"]>>,
            Expect<Test<OneTwo, "equals", ["(1)", "(2)"]>>,
        ];
    });

});

describe("surround() runtime utility", () => {

    it("happy path", () => {
        const partial = surround("(", ")");
        const completed = partial("foobar");

        expect(completed).toBe("(foobar)");

        type cases = [
            Expect<Test<typeof partial, "equals", SurroundWith<"(", ")">>>,
            Expect<Test<typeof completed, "equals", "(foobar)">>
        ];
    });

});

