import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { AreSameLength } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("OfEqualLength<A,B>", () => {

    it("tuple test", () => {
        type T1 = AreSameLength<[1, 2, 3], ["foo", "bar", "baz"]>;
        type T2 = AreSameLength<[], []>;
        type T3 = AreSameLength<[never], [1]>;

        type F1 = AreSameLength<[1, 2, 3], [1, 2]>;

        type cases = [
            ExpectTrue<T1>,
            ExpectTrue<T2>,
            ExpectTrue<T3>,
            ExpectFalse<F1>
        ];
        const cases: cases = [
            true, true, true,
            false
        ];
    });

    it("string test", () => {
        type T1 = AreSameLength<"foo", "bar">;
        type F1 = AreSameLength<"foey", "bar">;
        type B1 = AreSameLength<"foo", string>;
        type B2 = AreSameLength<number[], [1, 2, 3]>;

        type cases = [
            ExpectTrue<T1>,
            ExpectFalse<F1>,

            Expect<Equal<B1, boolean>>,
            Expect<Equal<B2, boolean>>,
        ];
        const cases: cases = [
            true, false,
            true, true
        ];
    });

});
