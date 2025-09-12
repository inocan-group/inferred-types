import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import type { Mutable } from "inferred-types/types";

describe("Mutable<T>", () => {

    it("happy path", () => {
        type O = {
            foo: number;
            bar: readonly string[];
            readonly baz: string;
            nested: {
                one: number;
                readonly two: number;
                readonly literal: "foo" | "bar";
            };
        };
        type M = Mutable<O>;

        type cases = [
            Expect<Equal<
                M,
                {
                    foo: number;
                    bar: string[];
                    baz: string;
                    nested: {
                        one: number;
                        two: number;
                        literal: "foo" | "bar";
                    };
                }
            >>
        ];
        const cases: cases = [true];
    });

});
