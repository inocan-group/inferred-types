import { describe, it } from "vitest";
import type { Err, Expect, IsolateErrors, Test } from "inferred-types/types";

describe("IsolateErrors<T,[U]>", () => {

    it("non-specific error", () => {
        type T1 = IsolateErrors<[ 1, 2, Error, Err<"oops">]>;

        type cases = [
            Expect<Test<
                T1, "equals",
                {
                    successes: [1,2];
                    errors: [Error, Err<"oops">];
                    otherErrors: []
                }
            >>
        ];
    });

    it("array - no errors", () => {
        type T = IsolateErrors<[1, 2, "a", { x: 1 }]>;

        type cases = [
            Expect<Test<
                T, "equals",
                {
                    successes: [1, 2, "a", { x: 1 }];
                    errors: [];
                    otherErrors: [];
                }
            >>
        ];
    });

    it("array - only errors (no U)", () => {
        type T = IsolateErrors<[Error, Err<"foo">, Err<"bar/baz">]>;

        type cases = [
            Expect<Test<
                T, "equals",
                {
                    successes: [];
                    errors: [Error, Err<"foo">, Err<"bar/baz">];
                    otherErrors: [];
                }
            >>
        ];
    });

    it("array - readonly with U filter", () => {
        type T = IsolateErrors<
            readonly [Err<"foo">, Error, 1, Err<"bar">, 2],
            "foo"
        >;

        type cases = [
            Expect<Test<
                T, "equals",
                {
                    successes: [1, 2];
                    errors: [Err<"foo">];
                    otherErrors: [Error, Err<"bar">];
                }
            >>
        ];
    });

    it("dictionary - mixed values (no U)", () => {
        type T = IsolateErrors<{
            a: 1;
            b: Error;
            c: "hi";
            d: Err<"oops">;
        }>;

        type S = T["successes"];
        type E = T["errors"];
        type O = T["otherErrors"];

        type cases = [
            Expect<Test<S, "hasSameValues", [1, "hi"]>>,
            Expect<Test<E, "hasSameValues", [Error, Err<"oops">]>>,
            Expect<Test<O, "equals", []>>,
        ];
    });

    it("dictionary - mixed values with U filter", () => {
        type T = IsolateErrors<{
            a: 1;
            b: Error;
            c: Err<"foo">;
            d: Err<"bar">;
        }, "foo">;

        type S = T["successes"];
        type E = T["errors"];
        type O = T["otherErrors"];

        type cases = [
            Expect<Test<S, "hasSameValues", [1]>>,
            Expect<Test<E, "hasSameValues", [Err<"foo">]>>,
            Expect<Test<O, "hasSameValues", [Error, Err<"bar">]>>,
        ];
    });

    it("dictionary - only successes", () => {
        type T = IsolateErrors<{ a: 1; b: "x"; c: true }>;
        type S = T["successes"];
        type E = T["errors"];
        type O = T["otherErrors"];

        type cases = [
            Expect<Test<S, "hasSameValues", [1, "x", true]>>,
            Expect<Test<E, "equals", []>>,
            Expect<Test<O, "equals", []>>,
        ];
    });

});
