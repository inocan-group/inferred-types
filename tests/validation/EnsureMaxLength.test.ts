import { Expect, EnsureMaxLength, Test } from "inferred-types/types";
import { Extends, TypedError } from "inferred-types/types";
import { describe, it } from "vitest";

describe("MaxLength", () => {

    it("happy path", () => {
        type T1 = EnsureMaxLength<"hello", 5>;
        type T2 = EnsureMaxLength<[1, 2, 3, 4, 5], 5>;
        type T3 = EnsureMaxLength<12345, 5>;

        type F1 = EnsureMaxLength<"hello", 4>;
        type F2 = EnsureMaxLength<[1, 2, 3, 4, 5], 4>;
        type F3 = EnsureMaxLength<12345, 4>;

        type W = EnsureMaxLength<string, 4>;
        type W2 = EnsureMaxLength<"hello", number>;



        type cases = [
            Expect<Test<T1, "equals", "hello">>,
            Expect<Test<T2, "equals", [1, 2, 3, 4, 5]>>,
            Expect<Test<T3, "equals", 12345>>,

            Expect<Test<F1, "equals", never>>,
            Expect<Test<F2, "equals", never>>,
            Expect<Test<F3, "equals", never>>,

            Expect<Extends<W, TypedError<"invalid-verifier">>>,
            Expect<Extends<W2, TypedError<"invalid-verifier">>>,
        ];
    });

});
