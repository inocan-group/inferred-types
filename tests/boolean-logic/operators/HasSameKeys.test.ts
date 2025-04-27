import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { Expect, HasSameKeys, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("HasSameKeys<A,B>", () => {

    it("testing with tuples", () => {
        type T1 = HasSameKeys<[1, 2, 3], [1, 2, 3]>;
        type T2 = HasSameKeys<[1, 2, 3], [3, 2, 1]>;

        type F1 = HasSameKeys<[1, 2, 3], [3, 1]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
        ];

    });


    it("testing with objects", () => {
        type T1 = HasSameKeys<{ foo: 1 }, { foo: 2 }>;
        type F1 = HasSameKeys<{ foo: 1 }, { bar: 2 }>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<F1, "equals", false>>,
        ];

    });
});
