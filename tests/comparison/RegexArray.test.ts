import { describe, it } from "vitest";
import { Expect, RegexArray, Test } from "inferred-types/types";

describe("RegexArray<T>", () => {

    it("happy path", () => {
        type Match = RegexArray<`^Name: {{string}}; Age: {{number}}$`, "Name: Bob Geldolf; Age: 72">;
        type NoMatch = RegexArray<`^Name: {{string}}; Age: {{number}}$`, "foobar">;

        type cases = [
            Expect<Test<Match["length"], "equals",  2>>,
            Expect<Test<Match["template"], "equals",  "Name: {{string}}; Age: {{number}}">>,
            Expect<Test<Match[1], "equals",  string>>,
            Expect<Test<Match[2], "equals",  `${number}`>>,
        ];
    });

});
