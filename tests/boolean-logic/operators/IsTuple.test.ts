import { Equal, Expect } from "@type-challenges/utils";
import { IsTuple } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsTuple<T>", () => {

    it("happy path", () => {
        type Scalar = IsTuple<42>;
        type Obj = IsTuple<{ foo: 1 }>;
        type StrArr = IsTuple<string[]>;
        type Tup = IsTuple<[1, 2, 3]>;
        type TupRo = IsTuple<readonly [1, 2, 3]>;
        type Empty = IsTuple<[]>;

        type cases = [
            Expect<Equal<Scalar, false>>,
            Expect<Equal<Obj, false>>,
            Expect<Equal<StrArr, false>>,
            Expect<Equal<Tup, true>>,
            Expect<Equal<TupRo, true>>,
            Expect<Equal<Empty, true>>,
        ];
        const cases: cases = [true, true, true, true, true, true];
    });

});
