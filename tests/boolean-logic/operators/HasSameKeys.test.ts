import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { HasSameKeys } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("HasSameKeys<A,B>", () => {

    it("testing with tuples", () => {
        type T1 = HasSameKeys<[1, 2, 3], [1, 2, 3]>;
        type T2 = HasSameKeys<[1, 2, 3], [3, 2, 1]>;

        type F1 = HasSameKeys<[1, 2, 3], [3, 1]>;

        type cases = [
            ExpectTrue<T1>,
            ExpectTrue<T2>,
            ExpectFalse<F1>
        ];
        const cases: cases = [
            true, true,
            false
        ];
    });


    it("testing with objects", () => {
        type T1 = HasSameKeys<{ foo: 1 }, { foo: 2 }>;
        type F1 = HasSameKeys<{ foo: 1 }, { bar: 2 }>;

        type cases = [
            ExpectTrue<T1>,
            ExpectFalse<F1>
        ];
        const cases: cases = [
            true, false
        ];

    });


});
