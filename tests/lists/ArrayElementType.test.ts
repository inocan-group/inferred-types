import { describe, it } from "vitest";
import { Expect, ArrayElementType, Test } from "inferred-types/types";

describe("ArrayElementType<T>", () => {

    it("happy path", () => {
        type S = ArrayElementType<string[]>;
        type N = ArrayElementType<number[]>;
        type B = ArrayElementType<boolean[]>;
        type U = ArrayElementType<(string | number)[]>;

        type cases = [
            Expect<Test<S, "equals",  string>>,
            Expect<Test<N, "equals",  number>>,
            Expect<Test<B, "equals",  boolean>>,
            Expect<Test<U, "equals",  string | number>>
        ];
    });


    it("tuple as input", () => {
        type S = ArrayElementType<["foo", "bar"]>;
        type N = ArrayElementType<[1, 2, 3]>;
        type B = ArrayElementType<[true, false]>;
        type U = ArrayElementType<["foo", 42]>;

        type cases = [
            Expect<Test<S, "equals",  string>>,
            Expect<Test<N, "equals",  number>>,
            Expect<Test<B, "equals",  boolean>>,
            Expect<Test<U, "equals",  string | number>>
        ];

    });


});
