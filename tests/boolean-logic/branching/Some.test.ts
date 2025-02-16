import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { Some } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Some<TContainer,TOp,TComparator>", () => {

    it("testing tuples", () => {
        type T1 = Some<[string, string, number, boolean], "extends", number>;
        type T2 = Some<[string, string, number, boolean], "equals", number>;
        type T3 = Some<[1, 2, 3, 42, 105], "greaterThan", 100>;
        type T4 = Some<[string, number, "foo", false], "equals", "foo">;
        type T5 = Some<[string, number, "foo", false], "startsWith", "f">;

        type F1 = Some<[string, string, object, boolean], "extends", number>;
        type F2 = Some<[string, string, 42, boolean], "equals", number>;
        type F3 = Some<[1, 2, 3, 42, 99], "greaterThan", 100>;
        type F4 = Some<[string, number, "foot", false], "equals", "foo">;
        type F5 = Some<["baz", "bar", false], "startsWith", "c">;

        type cases = [
            ExpectTrue<T1>,
            ExpectTrue<T2>,
            ExpectTrue<T3>,
            ExpectTrue<T4>,
            ExpectTrue<T5>,

            ExpectFalse<F1>,
            ExpectFalse<F2>,
            ExpectFalse<F3>,
            ExpectFalse<F4>,
            ExpectFalse<F5>,
        ];
        const cases: cases = [
            true, true, true, true, true,
            false, false, false, false, false,
        ];
    });

});
