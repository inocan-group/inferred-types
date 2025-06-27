import { Expect, IsTuple, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("IsTuple<T>", () => {

    it("happy path", () => {
        type Scalar = IsTuple<42>;
        type Obj = IsTuple<{ foo: 1 }>;
        type StrArr = IsTuple<string[]>;
        type Tup = IsTuple<[1, 2, 3]>;
        type TupRo = IsTuple<readonly [1, 2, 3]>;
        type Empty = IsTuple<[]>;

        type cases = [
            Expect<Test<Scalar, "equals",  false>>,
            Expect<Test<Obj, "equals",  false>>,
            Expect<Test<StrArr, "equals",  false>>,
            Expect<Test<Tup, "equals",  true>>,
            Expect<Test<TupRo, "equals",  true>>,
            Expect<Test<Empty, "equals",  true>>,
        ];
    });

});
