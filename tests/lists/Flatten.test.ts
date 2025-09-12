
import { describe, it } from "vitest";
import type { Expect, Flatten, Test } from "inferred-types/types";

describe("Flatten<T>", () => {

    it("Happy Path", () => {
        type F1 = Flatten<[1, 2, [3, 4]]>;
        type F1a = Flatten<[1, 2, [3, 4]], 2>;
        type F2 = Flatten<[1, 2, readonly [3, 4]]>;
        type F2a = Flatten<[1, 2, readonly [3, 4]], 2>;

        type D1 = Flatten<[[1, 2], [3, 4], [[5], 6]]>;
        type D2 = Flatten<[[1, 2], [3, 4], [[5], 6]], 2>;

        type DS = [[1, 2], [3, 4], [[5, 6], [7, [8, 9]]]];

        type DeeperStill1 = Flatten<DS, 1>;
        type DeeperStill2 = Flatten<DS, 2>;
        type DeeperStill3 = Flatten<DS, 3>;

        type cases = [
            Expect<Test<F1, "equals", [1, 2, 3, 4]>>,
            Expect<Test<F1a, "equals", [1, 2, 3, 4]>>,
            Expect<Test<F2, "equals", [1, 2, 3, 4]>>,
            Expect<Test<F2a, "equals", [1, 2, 3, 4]>>,

            Expect<Test<D1, "equals", [1, 2, 3, 4, [5], 6]>>,
            Expect<Test<D2, "equals", [1, 2, 3, 4, 5, 6]>>,

            Expect<Test<DeeperStill1, "equals", [1, 2, 3, 4, [5, 6], [7, [8, 9]]]>>,
            Expect<Test<DeeperStill2, "equals", [1, 2, 3, 4, 5, 6, 7, [8, 9]]>>,
            Expect<Test<DeeperStill3, "equals", [1, 2, 3, 4, 5, 6, 7, 8, 9]>>,
        ];

    });

    it("Union Types", () => {
        type U1 = Flatten<42 | [42, 56, [34, 77]]>;

        type cases = [
            Expect<Test<U1, "equals", 42 | [42, 56, 34, 77]>>
        ];
    });

    it("ToScalar types set to true", () => {
        type S1 = Flatten<[1, 2, [3, [4, 5]], "foo"], 1, true>;
        type S2 = Flatten<[1, 2, [3, [4, 5]], "foo"], 2, true>;
        type S3 = Flatten<string[], 1, true>;

        type cases = [
            Expect<Test<S1, "equals",  1 | 2 | 3 | [4, 5] | "foo">>,
            Expect<Test<S2, "equals",  1 | 2 | 3 | 4 | 5 | "foo">>,
            Expect<Test<S3, "equals",  string>>,
        ];

    });

    it("Wide Types", () => {
        type DeepNum = Flatten<number[][]>;
        type Num = Flatten<number[]>;
        type IntoScalar = Flatten<number[], 1, true>;
        type DeepUnion = Flatten<number | string[][]>;
        type Union = Flatten<number | string[]>;
        type UnionToScalar = Flatten<number | string[], 1, true>;

        type cases = [
            Expect<Test<DeepNum, "equals",  number[]>>,
            Expect<Test<Num, "equals",  number[]>>,
            Expect<Test<IntoScalar, "equals",  number>>,

            Expect<Test<DeepUnion, "equals",  number | string[]>>,
            Expect<Test<Union, "equals",  number | string[]>>,
            Expect<Test<UnionToScalar, "equals",  number | string>>,
        ];
    });

});
