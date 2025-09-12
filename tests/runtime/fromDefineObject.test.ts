
import { describe, expect, it } from "vitest";
import { fromDefineObject, isInputToken, isInputToken__String } from "inferred-types/runtime"
import type { Expect, FromDefineObject, Test } from "inferred-types/types";

describe("FromDefineObject<T>", () => {
    it("happy path", () => {
        type FooBar = FromDefineObject<{ foo: "number", bar?: "string | number" }>;

        type cases = [
            Expect<Test<
                FooBar, "equals",
                { foo: number; bar?: string | number | undefined }
            >>,

        ];
    });
})

describe("fromDefineObject", () => {
    it("type tests", () => {
        const preTest = isInputToken__String(
            "Number(1) | Number(2) | Number(3)"
        );
        expect(preTest).toBe(true);

        const foo = fromDefineObject({
            foo: "Number(1) | Number(2) | Number(3)"
        });

        const nested = fromDefineObject({
            foo: {
                bar: "number",
                baz: "String(hi) | String(bye)"
            }
        });

        expect(foo).toBe(`{ foo: Number(1) | Number(2) | Number(3) }`);

        type cases = [
            Expect<Test<typeof foo, "equals", { foo: 1 | 2 | 3 }>>,
            Expect<Test<
                typeof nested, "equals",
                { foo: { bar: number; baz: "hi" | "bye" } }
            >>,
        ];
    });

});
