import { describe, it } from "vitest";

import type { FnWithProps } from "inferred-types/types";

describe("FnWithProps<TFn, TProps, TClone>", () => {
    it("first test", () => {
        type T1 = FnWithProps<() => "hi", { foo: 1 }>;

        type cases = [/** type tests */];
    });
});
