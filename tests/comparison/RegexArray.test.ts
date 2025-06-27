import { describe, it } from "vitest";
import { Expect, RegexArray, Test } from "inferred-types/types";

describe("RegexArray<T>", () => {

    it("happy path", () => {
        type T1 = RegexArray<`^Name: {{string}}; Age: {{number}}$`>;

        type cases = [
            Expect<Test<T1["length"], "equals",  2>>,
            Expect<Test<T1["template"], "equals",  "Name: {{string}}; Age: {{number}}">>,
            Expect<Test<T1[1], "equals",  string>>,
            Expect<Test<T1[2], "equals",  `${number}`>>,
        ];
    });

});
