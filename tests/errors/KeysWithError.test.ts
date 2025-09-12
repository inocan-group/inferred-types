import { keysWithError } from "inferred-types/runtime";
import type { Err, Expect, KeysWithError, Test } from "inferred-types/types";

import { describe, it } from "vitest";

describe("KeysWithError", () => {

    it("happy path", () => {
        type Obj = {
            foo: number;
            bar: Err<"oops">;
        }

        type K = KeysWithError<Obj>;

        type cases = [
            Expect<Test<K, "equals",  ["bar"]>>
        ];
    });

});

describe("keysWithError(obj)", () => {

    it("happy path", () => {

        const a = {
            foo: 1,
            bar: new Error("oops")
        }

        const e = keysWithError(a);

        type cases = [
            Expect<Test<typeof e, "equals",  ["bar"]>>
        ];
    });

})
