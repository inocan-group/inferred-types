import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import type { AreSameLength, Expect, Test } from "inferred-types/types";

import { describe, it } from "vitest";

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

    });

    it("string test", () => {
        type T1 = AreSameLength<"foo", "bar">;
        type F1 = AreSameLength<"foey", "bar">;
        type B1 = AreSameLength<"foo", string>;
        type B2 = AreSameLength<number[], [1, 2, 3]>;

        type cases = [
            ExpectTrue<T1>,
            ExpectFalse<F1>,

            Expect<Test<B1, "equals",  boolean>>,
            Expect<Test<B2, "equals",  boolean>>,
        ];

    });

});
