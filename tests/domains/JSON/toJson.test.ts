import { toJSON } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";
import { describe, expect, it } from "vitest";

describe("toJSON()", () => {

    it("scalar values", () => {

        const foo = toJSON("foo");
        const num = toJSON(42);
        const numLike = toJSON("42");
        const quoted = toJSON(`That's all "folks"`)
        const singleQuoted = toJSON("That's all \"folks\"", { quote: "'" })
        const quotedEnc = toJSON("That's all \"folks\"", { quote: "\"", encode: true });

        expect(foo).toBe("\"foo\"");
        expect(num).toBe("42");
        expect(numLike).toBe(`\"42\"`)

        type cases = [
            Expect<Test<typeof foo, "equals", `"foo"`>>,
            Expect<Test<typeof num, "equals", `42`>>,
            Expect<Test<typeof numLike, "equals", `"42"`>>,
            Expect<Test<typeof quoted, "equals", `"That's all "folks""`>>,
            Expect<Test<typeof singleQuoted, "equals", `'That's all "folks"'`>>,
            Expect<Test<
                typeof quotedEnc,
                "equals",
                `"That^<sq>s^<sp>all^<sp>^<dq>folks^<dq>"`
            >>,
        ];
    });


    it("object values", () => {
        const obj = { foo: 1, bar: "hi" } as const;
        const fooBarBaz = toJSON(obj);
        const fooBarBazSingle = toJSON(obj, { quote: "'" });

        type cases = [
            Expect<Test<
                typeof fooBarBaz, "equals",
                "{ \"foo\": 1, \"bar\": \"hi\" }"
            >>,
            Expect<Test<
                typeof fooBarBazSingle, "equals",
                "{ 'foo': 1, 'bar': 'hi' }"
            >>,
        ];
    });


});
