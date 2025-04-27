import {
    asUnion,
    createToken,
    createTokenSyntax,
    ifEmpty,
    isNull,
    isString,
    isStringLiteral
} from "inferred-types/runtime";
import { Expect, Extends, Test, TokenSyntax } from "inferred-types/types";
import { describe, expect, it } from "vitest";

describe("createTokenSyntax()", () => {

    it("explicit encoding", () => {
        const syn = createTokenSyntax(
            "Template",
            "{{",
            "}}",
            "::",
            {
                "{{": "^open!",
                "}}": "^close!",
                "::": "^sep!"
            }
        );

        expect(syn.encodingDefinition).toEqual({
            "{{": "^open!",
            "}}": "^close!",
            "::": "^sep!"
        })

        const sep = syn.encodingDefinition["::"];
        expect(sep).toEqual("^sep!");

        type Name = typeof syn["name"];
        type Start = typeof syn["start"];
        type Sep = typeof syn["sep"];
        type SepVal = typeof syn["encodingDefinition"][Sep];

        const encoded = syn.encode("{{string}} is the best");
        type Enc = typeof encoded;
        expect(encoded).toBe("^open!string^close! is the best");
        const decoded = syn.decode(encoded);
        type Dec = typeof decoded;
        expect(decoded).toBe("{{string}} is the best");

        type cases = [
            Expect<Extends<typeof syn, TokenSyntax<"Template">>>,
            Expect<Test<Name, "equals", "Template">>,
            Expect<Test<Start, "equals", "{{">>,
            Expect<Test<Sep, "equals", "::">>,
            Expect<Test<SepVal, "equals", "^sep!">>,

            Expect<Test<Enc, "equals", `^open!string^close! is the best`>>,
            Expect<Test<Dec, "equals", `{{string}} is the best`>>
        ];
    });

    it("implicit encoding", () => {
        const syn = createTokenSyntax(
            "Template",
            "{{",
            "}}",
            "::"
        );

        const encoded = syn.encode("{{string}} is the 'best'");
        expect(encoded).toBe("^start!string^end! is the ^sq!best^sq!");
        const decoded = syn.decode(encoded);
        expect(decoded).toBe("{{string}} is the 'best'");

        type cases = [
            Expect<Test<typeof syn, "extends", TokenSyntax<"Template">>>,
            Expect<Test<typeof encoded, "equals", `^start!string^end! is the ^sq!best^sq!`>>,
            Expect<Test<typeof decoded, "equals", `{{string}} is the 'best'`>>,
        ];
    });


    it.skip("token shape -> static token", () => {
        const n = createToken("null", "static")("null", isNull);
        const syn = createTokenSyntax(
            "Template",
            "{{",
            "}}",
            "::"
        );

        const shape = syn.tokenShape(n);

        type cases = [
            Expect<Test<typeof shape, "equals", "{{null}}">>,
        ];
    });

    it.skip("token shape -> dynamic token", () => {
        const s = createToken("string", "dynamic")(
            ({ sep }) => (...p) => {
                return ifEmpty(
                    p,
                    {
                        type: "string" as string,
                        typeGuard: isString
                    },
                    {
                        type: asUnion(p, sep, { prefix: `string${sep}` }),
                        typeGuard: isStringLiteral(...p)
                    }
                )
            },
            <T extends readonly string[]>(...params: T) => params
        );
        const syn = createTokenSyntax(
            "Template",
            "{{",
            "}}",
            "::"
        );

        const shape = syn.tokenShape(s);

        type cases = [
            Expect<Test<
                typeof shape, "equals",
                "{{string}}" | `{{string::${string}}}`
            >>,
        ];
    });

});
