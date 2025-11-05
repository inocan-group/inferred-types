import { describe, expect, it } from "vitest";
import {
    AssertEqual,
    Expect,
    Test,
} from "inferred-types/types";
import { DropParser, dropParser, narrow } from "inferred-types/runtime";
import { AssertExtends } from "transpiled";

describe("dropParser", () => {

    describe("configure", () => {


        it("partial application", () => {
            const partial = dropParser(
                { enter: "F", exit: "B" }
            );

            expect(partial.rules).toEqual([{ enter: ["F"], exit: ["B"], policy: "inclusive"}])

            type cases = [
                Expect<AssertEqual<
                    typeof partial,
                    DropParser<[{ enter: ["F"], exit: ["B"], policy: "inclusive"}]>
                >>
            ];
        });
    })


    describe("simple rule", () => {

        it("drop-enter policy", () => {
            const partial = dropParser(
                { enter: "F", exit: "B", policy: "drop-enter" }
            );

            expect(typeof partial).toBe("function");
            expect(partial.kind).toBe("drop-parser");
            expect(partial.rules).toEqual([{ enter: ["F"], exit: ["B"], policy: "drop-enter" }]);

            const result = partial("FooBar");
            const _temp = result.kept; // =>
            const expected = narrow({
                kind: "drop-result",
                kept: "FBar",
                dropped: ["oo"],
                toString(): "FBar" {
                    return "FBar"
                }
            })

            expect(result).toBe(expected);
            expect(String(result)).toBe("Bar");


            type cases = [
                // partial application provides a reusable function
                // to test using the configured rule
                Expect<AssertExtends<
                    typeof partial,
                    DropParser<[{ enter: ["F"]; exit: ["B"]; policy: "drop-enter" }]>
                >>,
                Expect<AssertEqual<typeof result["kind"], "drop-result">>,
                Expect<AssertEqual<typeof result["kept"], "FBar">>,
                Expect<AssertEqual<typeof result["dropped"], ["oo"]>>,
                Expect<AssertEqual<ReturnType<typeof result["toString"]>, "FBar">>,
            ];

        });

        it("inclusive policy (implicit)", () => {
            const partial = dropParser(
                { enter: "F", exit: "B" }
            );

            expect(typeof partial).toBe("function");
            expect(partial.kind).toBe("drop-parser");
            expect(partial.rules).toEqual([{ enter: ["F"], exit: ["B"], policy: "inclusive" }]);

            const result = partial("FooBar");
            const _temp = result.kept; // =>

            const expected = narrow({
                kind: "drop-result",
                kept: "FBar",
                dropped: ["oo"],
                toString(): "FBar" {
                    return "FBar"
                }
            })

            expect(result).toBe(expected);
            expect(String(result)).toBe("Bar");


            type cases = [
                // partial application provides a reusable function
                // to test using the configured rule
                Expect<AssertExtends<
                    typeof partial,
                    DropParser<[{ enter: ["F"]; exit: ["B"]; policy: "inclusive" }]>
                >>,
                Expect<AssertEqual<typeof result["kind"], "drop-result">>,
                Expect<AssertEqual<typeof result["kept"], "FBar">>,
                Expect<AssertEqual<typeof result["dropped"], ["oo"]>>,
                Expect<AssertEqual<ReturnType<typeof result["toString"]>, "FBar">>,
            ];
        });


        it("inclusive policy (explicit)", () => {
            const partial = dropParser(
                { enter: "F", exit: "B", policy: "inclusive" }
            );

            expect(typeof partial).toBe("function");
            expect(partial.kind).toBe("drop-parser");
            expect(partial.rules).toEqual([{ enter: "F", exit: "B", policy: "inclusive" }]);

            const result = partial("FooBar");
            const _temp = result.kept; // =>

            const expected = {
                kind: "drop-result",
                kept: "Bar",
                dropped: ["Foo"],
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
                    DropParser<[{ enter: ["F"]; exit: ["B"]; policy: "inclusive" }]>
                >>,
                Expect<AssertEqual<typeof result["kind"], "drop-result">>,
                Expect<AssertEqual<typeof result["kept"], "Bar">>,
                Expect<AssertEqual<typeof result["dropped"], ["Foo"]>>,
                Expect<AssertEqual<ReturnType<typeof result["toString"]>, "Bar">>,
            ];
        });



        it("exclusive policy", () => {
            const partial = dropParser(
                { enter: "F", exit: "B", policy: "exclusive" }
            );

            type cases = [
                /** type tests */
            ];
        });

    })




});

// const result: {
//     kind: "drop-result";
//     kept: "Far";
//     dropped: ["ooB", ""];
//     toString(): "Far";
// }
