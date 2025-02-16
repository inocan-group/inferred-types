
import { Equal, Expect } from "@type-challenges/utils";
import { AnyArray, AnyObject, Scalar, ToContainer } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ToContainer<T>", () => {

    it("first test", () => {
        type Fn = () => "hi";
        type Obj = { foo: string; bar: string };
        type RoArr = readonly [1, 2, 3];
        type Arr = [1, 2, 3];
        type Never = AnyObject | AnyArray;

        type ScalarOrObject = ToContainer<Scalar | Obj>;
        type JustScalar = ToContainer<Scalar>;
        type FnOrObj = ToContainer<Fn | Obj>;
        type FnScalarAndObj = ToContainer<Scalar | Obj | Fn>;
        type RoArrScalar = ToContainer<RoArr | Scalar>;
        type ArrScalar = ToContainer<Arr | Scalar>;

        type Unknown = ToContainer<unknown>;
        type Any = ToContainer<any>;

        type cases = [
            Expect<Equal<ScalarOrObject, Obj>>,
            Expect<Equal<JustScalar, Never>>,
            Expect<Equal<FnOrObj, Obj>>,
            Expect<Equal<FnScalarAndObj, Obj>>,
            Expect<Equal<RoArrScalar, RoArr>>,
            Expect<Equal<ArrScalar, Arr>>,

            Expect<Equal<Unknown, [unknown]>>,
            Expect<Equal<Any, [any]>>,
        ];
        const cases: cases = [true, true, true, true, true, true, true, true];
    });

});
