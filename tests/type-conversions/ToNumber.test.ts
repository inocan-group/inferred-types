import { describe, expect, it } from "vitest";
import { Expect, Test, ToNumber } from "inferred-types/types";
import { narrow, toNumber } from "inferred-types/runtime";



describe("ToNumber<T>", () => {

    it("happy path for scalars", () => {
        type Num = ToNumber<42>;
        type StrNum = ToNumber<"42">;
        type True = ToNumber<true>;
        type False = ToNumber<false>;
        type Bool = ToNumber<boolean>;
        type Nada = ToNumber<null>;
        type Nada2 = ToNumber<undefined>;
        type Nan = ToNumber<"foobar">;

        type cases = [
            Expect<Test<Num, "equals", 42>>,
            Expect<Test<StrNum, "equals", 42>>,
            Expect<Test<True, "equals", 1>>,
            Expect<Test<False, "equals", 0>>,
            Expect<Test<Bool, "equals", 1 | 0>>,
            Expect<Test<Nada, "equals", never>>,
            Expect<Test<Nada2, "equals", never>>,
            Expect<Test<Nan, "equals", never>>,
        ];
    });


    it("happy path for tuples and arrays", () => {
        type NumericArray = ToNumber<[1, 2, 3]>;
        type RoNumericArray = ToNumber<readonly [1, 2, 3]>;
        type StrNum = ToNumber<["1", "2", "3"]>;
        type RoStrNum = ToNumber<readonly ["1", "2", "3"]>;

        type PartBad = ToNumber<["1", 2, "foobar"]>;
        type AllBad = ToNumber<[null, undefined, "shit"]>;
        type Empty = ToNumber<[]>;

        type Bool = ToNumber<[boolean, boolean, boolean]>;
        type TrueFalse = ToNumber<[true, true, false]>;

        type cases = [
            Expect<Test<NumericArray, "equals", [1, 2, 3]>>,
            Expect<Test<RoNumericArray, "equals", readonly [1, 2, 3]>>,
            Expect<Test<StrNum, "equals", [1, 2, 3]>>,
            Expect<Test<RoStrNum, "equals", readonly [1, 2, 3]>>,

            Expect<Test<PartBad, "equals", [1, 2, never]>>,
            Expect<Test<AllBad, "equals", [never, never, never]>>,
            Expect<Test<Empty, "equals", []>>,

            Expect<Test<Bool, "equals", [0 | 1, 0 | 1, 0 | 1]>>,
            Expect<Test<TrueFalse, "equals", [1, 1, 0]>>,
        ];

    });


    it("runtime tests of toNumber()", () => {
        const str = toNumber("42");
        expect(str).toBe(42);
        const passthrough = toNumber(42);
        expect(passthrough).toBe(42);

        const emptyArr = toNumber([] as string[]);
        expect(emptyArr).toEqual([]);
        const goodArr = toNumber(narrow(["1", "2", "3"]));
        expect(goodArr).toEqual([1, 2, 3]);
        const mixedArr = toNumber(["1", "foo", "2"] as const);
        expect(mixedArr).toEqual([1, NaN, 2]);

        type GoodArr = typeof goodArr;

        type cases = [
            Expect<Test<typeof str, "equals", 42>>,
            Expect<Test<typeof passthrough, "equals", 42>>,
            Expect<Test<typeof emptyArr, "equals", readonly number[]>>,
            Expect<Test<GoodArr, "equals", readonly [1, 2, 3]>>,
            Expect<Test<typeof mixedArr, "equals", readonly [1, never, 2]>>,
        ];
    });

});
