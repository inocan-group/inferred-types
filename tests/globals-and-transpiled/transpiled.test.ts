import { AssertEqual, Expect } from "inferred-types/types";
import { fromDefineObject } from "transpiled";
import { describe, expect, it } from "vitest";

describe.skip("global imports from 'transpiled'", () => {
    it("fromDefineObject(token)", () => {
        const foo = fromDefineObject({
            foo: "Number(1) | Number(2) | Number(3)"
        });

        expect(foo).toEqual(`{ foo: Number(1) | Number(2) | Number(3) }`);

        type cases = [
            Expect<AssertEqual<typeof foo, { foo: 1 | 2 | 3 }>>
        ]
    });
});
