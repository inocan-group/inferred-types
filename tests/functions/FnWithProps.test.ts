import { describe, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";

import { FnWithProps } from "inferred-types";

describe("FnWithProps<TFn, TProps, TClone>", () => {

    it("first test", () => {
        type T1 = FnWithProps<() => 'hi', { foo: 1}>

        type cases = [
            /** type tests */
        ];
    });

});
