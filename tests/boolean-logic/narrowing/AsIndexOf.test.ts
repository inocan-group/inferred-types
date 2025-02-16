import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { AsIndexOf, DoesExtend, ErrorCondition } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("AsIndexOf<T,K>", () => {

    it("happy path", () => {
        type O1 = { foo: 1; bar: 2 };
        type O2 = { bar: number; baz: string };

        type T1 = AsIndexOf<O1, "foo">;
        type T2 = AsIndexOf<O1, "bar">;
        type T3 = AsIndexOf<O2, "bar">;

        type E1 = AsIndexOf<O1, "foobar">;
        type E2 = AsIndexOf<O1, "foobar", "you fool!">;

        type cases = [
            Expect<Equal<T1, 1>>,
            Expect<Equal<T2, 2>>,
            Expect<Equal<T3, number>>,

            Expect<DoesExtend<E1, ErrorCondition<"invalid-key">>>,
            Expect<Equal<E2, "you fool!">>
        ];
        const cases: cases = [
            true, true, true,
            true, true
        ];
    });

});
