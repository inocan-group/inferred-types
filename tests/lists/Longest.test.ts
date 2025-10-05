import { describe, it } from "vitest";
import type { Expect, Longest, Test } from "inferred-types/types";

describe("Longest<T>", () => {

    it("happy path", () => {
        type ClearWinner = Longest<[
            "foobar",
            "foobarbaz",
            "foo",
            "bart"
        ]>;
        type Tie = Longest<[
            "bar",
            "Robert",
            "purple",
            "foo",
        ]>;
        type Tie2 = Longest<[
            "bar",
            "purple",
            "Robert",
            "foo",
        ]>;

        type Wide = Longest<[string, string]>;

        type SomeWide = Longest<[
            "Hello",
            string,
            "Robert"
        ]>

        type cases = [
            Expect<Test<ClearWinner, "equals", "foobarbaz">>,
            Expect<Test<Tie, "equals", "Robert">>,
            Expect<Test<Tie2, "equals", "purple">>,

            Expect<Test<Wide, "equals", string>>,
            Expect<Test<SomeWide, "equals", "Robert">>,
        ];
    });

});
