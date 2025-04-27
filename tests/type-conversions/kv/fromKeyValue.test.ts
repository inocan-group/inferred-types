import { Equal, Expect } from "@type-challenges/utils";
import { fromKeyValue } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

describe("fromKeyValue()", () => {


    it("happy path", () => {
        const kv = [
            { key: "foo", value: "hi" },
            { key: "bar", value: 42 },
        ] as const;
        const obj = fromKeyValue(kv);

        expect(obj).toEqual({ foo: "hi", bar: 42 })

        // @ts-ignore
        type cases = [
            Expect<Test<typeof obj, { foo: "hi", "equals",  bar: 42 }>>,
        ]
    });

});
