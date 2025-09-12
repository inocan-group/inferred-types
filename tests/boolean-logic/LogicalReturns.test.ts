import { describe, it } from "vitest";
import type { Expect, LogicalReturns, Test } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("LogicalReturns<TValues,TParams>", () => {

    it("happy path", () => {
        const f = <A extends readonly unknown[]>(...args: A) => args;
        const t = f(true as const, () => true);

        type T1 = LogicalReturns<[true, () => true]>;
        type T2 = LogicalReturns<[false, () => false]>;
        type T3 = LogicalReturns<[true, true, false, boolean, () => true, () => false]>;

        type cases = [
            Expect<Test<T1, "equals", [true, true]>>,
            Expect<Test<LogicalReturns<typeof t>, "equals", [true, true]>>,
            Expect<Test<T2, "equals", [false, false]>>,
            Expect<Test<T3, "equals", [true, true, false, boolean, true, false]>>,
        ];
    });
});
