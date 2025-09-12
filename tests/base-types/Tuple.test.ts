import { describe, it } from "vitest";
import type { Expect, Test, Tuple } from "inferred-types/types";

describe("Tuple<T,N>", () => {

    it("happy path", () => {
        type Default = Tuple;
        type FixedLength = Tuple<string, 4>;
        type FixedWithOptional = Tuple<string, [4, 2]>;
        type Expandable = Tuple<string, "3+">;
        type Explicit = Tuple<[string, number, boolean]>;

        type cases = [
            Expect<Test<Default, "equals",  readonly unknown[]>>,
            Expect<Test<
                FixedLength,
                "equals",
                readonly [string, string, string, string]
            >>,
            Expect<Test<
                FixedWithOptional,
                "equals",
                readonly [string, string, string, string, string | undefined, string | undefined]
            >>,
            Expect<Test<
                Expandable,
                "equals",
                readonly [string, string, string, ...string[]]
            >>,
            Expect<Test<
                Explicit,
                "equals",
                readonly [string, number, boolean]
            >>,
        ];
    });

});
