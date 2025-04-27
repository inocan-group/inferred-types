import { Equal, Expect } from "@type-challenges/utils";
import { toJSON } from "inferred-types/runtime";
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
            Expect<Test<typeof foo, "equals",  `"foo"`>>,
            Expect<Test<typeof num, "equals",  `42`>>,
            Expect<Test<typeof numLike, "equals",  `"42"`>>,
            Expect<Test<typeof quoted, "equals",  `"That's all "folks""`>>,
            Expect<Test<typeof singleQuoted, "equals",  `'That's all "folks"'`>>,
            Expect<Equal<
                typeof quotedEnc,
                `"That^<sq>s^<sp>all^<sp>^<dq>folks^<dq>"`
            >>,
        ];
    });


    it("object values", () => {
        const fooBarBaz = toJSON({ foo: 1, bar: "hi" });
        const fooBarBazSingle = toJSON({ foo: 1, bar: "hi" }, {quote: "'"});

      type cases = [
        /** type tests */
      ];
    });


});
