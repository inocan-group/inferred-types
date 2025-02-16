/* eslint-disable ts/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { EmptyObject, FnProps } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("FnProps", () => {

    it("happy path", () => {
        type Fn = () => "hi";
        type Obj = { foo: 1; bar: 2 };
        type Hybrid = Fn & Obj;

        type Props = FnProps<Hybrid>;
        type Empty = FnProps<Fn>;
        type Func = FnProps<Function>;

        type cases = [
            Expect<Equal<Props, { foo: 1; bar: 2 }>>,
            Expect<Equal<Empty, EmptyObject>>,
            Expect<Equal<Func, EmptyObject>>
        ];
        const cases: cases = [true, true, true];
    });

});
