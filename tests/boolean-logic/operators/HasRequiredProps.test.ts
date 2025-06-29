/* eslint-disable ts/ban-ts-comment */
import type {
    Expect,
    EmptyObject,
    HasRequiredProps,
    Test
} from "inferred-types/types";
import { describe, it } from "vitest";

describe("HasRequiredProps<T>", () => {

    it("happy path", () => {
        type T1 = HasRequiredProps<{ foo: 1; bar: 2 }>;
        type T2 = HasRequiredProps<{ foo: 1; bar?: 2 }>;

        type F1 = HasRequiredProps<{ foo?: 1; bar?: 2 }>;
        type F2 = HasRequiredProps<EmptyObject>;

        type Wide = HasRequiredProps<Record<string, unknown>>;

        // @ts-ignore
        type _cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,

            Expect<Test<Wide, "equals", boolean>>
        ];
    });

});

