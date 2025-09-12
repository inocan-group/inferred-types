
import { describe, it } from "vitest";
import type { Expect, HasParameters, Test } from "inferred-types/types";

// Note: type tests fail visible inspection but pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("HasParameters<T>", () => {
    it("happy path", () => {
        const fn1 = (foo: string) => `${foo}bar`;
        const fn2 = (foo: string) => `${foo}bar` as const;
        const fn3 = () => `hello world`;
        const fn4 = () => `hello world` as const;
        const fn5 = (r: string, g: string, b: string) => `${r},${g},${b}` as const;

        type F1 = HasParameters<typeof fn1>;
        type F2 = HasParameters<typeof fn2>;

        type cases = [
            // single
            Expect<Test<F1, "equals",  true>>,
            Expect<Test<F2, "equals",  true>>,
            // none
            Expect<Test<HasParameters<typeof fn3>, "equals",  false>>,
            Expect<Test<HasParameters<typeof fn4>, "equals",  false>>,
            // multiple
            Expect<Test<HasParameters<typeof fn5>, "equals",  true>>
        ];
    });
});
