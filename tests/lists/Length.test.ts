import { Expect, Length, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Length<T>", () => {
    it("using arrays", () => {
        const a1 = [1, 2, 3] as const;
        const a2 = [1, 2, 3, 4, 5, 6] as const;
        type A1 = Length<typeof a1>;
        type A2 = Length<typeof a2>;
        type Tup1 = Length<[0,1,2,3,4,5,7,8,9]>;
        type Empty = Length<[]>;
        type Empty_RO = Length<readonly []>;

        type StrArr = Length<string[]>;

        type cases = [
            //
            Expect<Test<A1, "equals",  3>>,
            Expect<Test<A2, "equals",  6>>,
            Expect<Test<Tup1, "equals", 9>>,
            Expect<Test<Length<string[]>, "equals",  number>>,
            Expect<Test<Empty_RO, "equals",  0>>,
            Expect<Test<Empty, "equals",  0>>,
            Expect<Test<StrArr, "equals",  number>>,
        ];

    });


    it("using strings", () => {
        type Foo = Length<"foo">;
        type WideStr = Length<string>;

        type cases = [
            Expect<Test<Foo, "equals",  3>>,
            Expect<Test<WideStr, "equals",  number>>,
        ];
    });


    it("using numbers", () => {
        type NumericLit = Length<1234>;
        type Negative = Length<-1234>; // the minus sign is not counted
        type Float = Length<12.34>; // the decimal place is not counted

        type Wide = Length<number>;
        type WideErr = Length<number, true>;

        type cases = [
            Expect<Test<NumericLit, "equals", 4>>,
            Expect<Test<Negative, "equals", 4>>,
            Expect<Test<Float, "equals", 4>>,
            Expect<Test<Wide, "equals", number>>,
            Expect<Test<WideErr, "extends", Error>>,
            Expect<Test<WideErr, "isError", "invalid-type">>
        ];
    });


});
