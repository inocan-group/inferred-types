import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { AsIndexOf, DoesExtend, ErrorCondition, Test } from "inferred-types/types";



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
            Expect<Test<T1, "equals",  1>>,
            Expect<Test<T2, "equals",  2>>,
            Expect<Test<T3, "equals",  number>>,

            Expect<DoesExtend<E1, ErrorCondition<"invalid-key">>>,
            Expect<Test<E2, "equals",  "you fool!">>
        ];
        const cases: cases = [
            true, true, true,
            true, true
        ];
    });

});
