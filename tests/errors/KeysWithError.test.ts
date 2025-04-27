import { keysWithError } from "inferred-types/runtime";
import { Expect, KeysWithError, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("KeysWithError", () => {

    it("happy path", () => {
        type Obj = {
            foo: number;
            bar: {
                name: "InvalidToken";
                message: "An array token is missing the terminating '>' character: Array<number";
                stack?: string | undefined;
                cause?: unknown;
                type: "invalid-token";
                subType: "array";
            };
        }

        type Err = KeysWithError<Obj>;

        type cases = [
            Expect<Test<Err, "equals",  ["bar"]>>
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
