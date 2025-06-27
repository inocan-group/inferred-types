import { describe, it } from "vitest";
import {
    Expect,
    Shortest,
    Test,
} from "inferred-types/types";

describe("Shortest<T>", () => {

    it("happy path", () => {
        type ClearWinner = Shortest<[
            "foobar",
            "foobarbaz",
            "foo",
            "bart"
        ]>;
        type Tie = Shortest<[
            "foobar",
            "foobarbaz",
            "foo",
            "bar"
        ]>;
        type Tie2 = Shortest<[
            "foobar",
            "foobarbaz",
            "bar",
            "foo",
        ]>;

        type Wide = Shortest<[string, string]>;

        type SomeWide = Shortest<[
            "Hello",
            string,
            "Robert"
        ]>

        type cases = [
            Expect<Test<ClearWinner, "equals", "foo">>,
            Expect<Test<Tie, "equals", "foo">>,
            Expect<Test<Tie2, "equals", "bar">>,

            Expect<Test<Wide, "equals", string>>,
            Expect<Test<SomeWide, "equals", "Hello">>,
        ];
    });

});
