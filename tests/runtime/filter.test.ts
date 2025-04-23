import { Equal, Expect } from "@type-challenges/utils";
import { filter, FilterFn } from "inferred-types/runtime";
import { describe, it } from "vitest";

describe("filter()", () => {

    it("partial application of startsWith (parameters suggest fn parameters)", () => {
        const startWith = filter("startsWith", "foo");
        const startWithMulti = filter("startsWith", "foo", "bar");

        type Single = typeof startWith;
        type SingleParam = Parameters<Single>[0];
        type SingleReturns = ReturnType<Single>;

        type Multi = typeof startWithMulti;
        type MultiParam = Parameters<Multi>[0];

        type cases = [
            Expect<Equal<typeof startWith, FilterFn<"startsWith", ["foo"]>>>,
            Expect<Equal<typeof startWithMulti, FilterFn<"startsWith", ["foo", "bar"]>>>,

            Expect<Equal<SingleParam, string | readonly string[]>>,
            Expect<Equal<MultiParam, string | readonly string[]>>,
        ];
    });


    it("partial application of truthy (no params, no accept clause)", () => {
        const truthy = filter("truthy");

        type Truthy = typeof truthy;
        type TruthyParam = Parameters<Truthy>[0];

        type cases = [
            /** type tests */
        ];
    });


    it("partial application of keyEndsWith (has accept clause)", () => {
        const keyEndsWith = filter("keyEndsWith", "_");

        type cases = [
            /** type tests */
        ];
    });



});
