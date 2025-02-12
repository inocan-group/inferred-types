import { Equal, Expect } from "@type-challenges/utils";
import { createTokenSyntax } from "inferred-types/runtime";
import { Extends, TokenSyntax } from "inferred-types/types";
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
      Expect<Equal<Name, "Template">>,
      Expect<Equal<Start, "{{">>,
      Expect<Equal<Sep, "::">>,
      Expect<Equal<SepVal, "^sep!">>,

      Expect<Equal<Enc, `^open!string^close! is the best`>>,
      Expect<Equal<Dec, `{{string}} is the best`>>
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
      Expect<Equal<typeof encoded, `^start!string^end! is the ^sq!best^sq!`>>,
      Expect<Equal<typeof decoded, `{{string}} is the 'best'`>>,
    ];
  });

});
