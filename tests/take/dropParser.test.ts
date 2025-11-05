import { describe, expect, it } from "vitest";
import {
    AssertEqual,
    Expect,
    Test,
} from "inferred-types/types";
import { dropParser } from "inferred-types/runtime";

describe("dropParser", () => {

    it("simple test", () => {

        const result = dropParser(
            { enter: "F", exit: "B" }
        )("FooBar");

        const expected = {
            kind: "drop-result",
            kept: "Bar",
            dropped: [ "Foo" ],
            toString(): "Bar" {
                return "Bar"
            }
        }

        expect(result).toBe(expected);
        expect(String(result)).toBe("Bar");


        type cases = [
            Expect<AssertEqual<
                typeof result,
                typeof expected
            >>
        ];
    });

});
