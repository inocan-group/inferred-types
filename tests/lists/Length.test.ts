import { Equal, Expect } from "@type-challenges/utils";

import { Length } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Length<T>", () => {
    it("happy-path", () => {
        const a1 = [1, 2, 3] as const;
        const a2 = [1, 2, 3, 4, 5, 6] as const;
        type A1 = typeof a1;
        type A2 = typeof a2;

        type StringArray = Length<string[]>;
        type Foo = Length<"foo">;
        type NumericLit = Length<1234>;
        type WideStr = Length<string>;
        type WideNum = Length<number>;

        type cases = [
            //
            Expect<Test<Length<A1>, "equals",  3>>,
            Expect<Test<Length<A2>, "equals",  6>>,
            Expect<Test<Length<[1, 2, 3, 4, 5]>, "equals",  5>>,
            Expect<Test<Length<string[]>, "equals",  number>>,
            Expect<Test<Length<readonly []>, "equals",  0>>,
            Expect<Test<Length<[]>, "equals",  0>>,
            Expect<Test<StringArray, "equals",  number>>,
            Expect<Test<Foo, "equals",  3>>,
            Expect<Test<WideStr, "equals",  number>>,
            Expect<Test<NumericLit, "equals",  4>>,
            Expect<Test<WideNum, "equals",  number>>,
        ];

    });
});
