import { describe, it } from "vitest";
import type { Expect, RegexArray, Test } from "inferred-types/types";

describe("RegexArray<T>", () => {

    it("happy path", () => {
        type Match = RegexArray<`^Name: {{string}}; Age: {{number}}$`, "Name: Bob Geldolf; Age: 72">;
        type NoMatch = RegexArray<`^Name: {{string}}; Age: {{number}}$`, "foobar">;

        type cases = [
            Expect<Test<Match["length"], "equals", 3>>, // 0 index is full match string
            Expect<Test<Match[0], "equals", "Name: Bob Geldolf; Age: 72">>,
            Expect<Test<Match[1], "equals", "Bob Geldolf">>, // this matches correctly
            Expect<Test<Match[2], "equals", 72>>, // this matches on the string literal "72" but it should bring back a number
            Expect<Test<Match["template"], "equals",  "Name: {{string}}; Age: {{number}}">>,

            Expect<Test<NoMatch, "isError", "no-match">>
        ];
    });

});
