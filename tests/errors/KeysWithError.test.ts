import { Equal, Expect } from "@type-challenges/utils";
import { keysWithError } from "inferred-types/runtime";
import { KeysWithError } from "inferred-types/types";
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
            Expect<Equal<Err, ["bar"]>>
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
            Expect<Equal<typeof e, ["bar"]>>
        ];
    });

})
