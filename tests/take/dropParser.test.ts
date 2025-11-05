import { describe, expect, it } from "vitest";
import {
    AssertEqual,
    Expect,
    Test,
} from "inferred-types/types";
import { DropParser, dropParser } from "inferred-types/runtime";
import { AssertExtends } from "transpiled";

describe("dropParser", () => {

    it("simple one-rule parse", () => {
        const partial = dropParser(
            { enter: "F", exit: "B" }
        );

        expect(typeof partial).toBe("function");
        expect(partial.kind).toBe("drop-parser");
        expect(partial.rules).toEqual([{ enter: "F", exit: "B" }]);

        const result = partial("FooBar");

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
            // partial application provides a reusable function
            // to test using the configured rule
            Expect<AssertExtends<
                typeof partial,
                DropParser<[{ enter: "F"; exit: "B"}]>
            >>,
            Expect<AssertEqual<typeof result["kind"],"drop-result">>,
            Expect<AssertEqual<typeof result["kept"],"Bar">>,
            Expect<AssertEqual<typeof result["dropped"],["Foo"]>>,
            Expect<AssertEqual<ReturnType<typeof result["toString"]>, "Bar">>,
        ];
    });


    it("exit condition marked as 'inclusive' means exit is removed from kept string", () => {
        const partial = dropParser(
            { enter: "F", exit: "B" }
        );

        type cases = [
            /** type tests */
        ];
    });


});

// const result: {
//     kind: "drop-result";
//     kept: "Far";
//     dropped: ["ooB", ""];
//     toString(): "Far";
// }
