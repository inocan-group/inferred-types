import { fromKeyValue } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";
import { describe, expect, it } from "vitest";

describe("fromKeyValue()", () => {


    it("happy path", () => {
        const kv = [
            { key: "foo", value: "hi", required: true },
            { key: "bar", value: 42, required: true },
        ] as const;
        const obj = fromKeyValue(kv);

        expect(obj).toEqual({ foo: "hi", bar: 42 })

        type cases = [
            Expect<Test<typeof obj, "equals", { foo: "hi", bar: 42 }>>,
        ]
    });

});
