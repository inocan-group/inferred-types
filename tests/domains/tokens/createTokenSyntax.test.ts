import { Equal, Expect } from "@type-challenges/utils";
import { createTokenSyntax } from "inferred-types/runtime";
import { TokenSyntax } from "inferred-types/types";
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

    const encoded = syn.encode("{{string}} is the best");
    type Enc = typeof encoded;
    expect(encoded).toBe("^open!string^close! is the best");
    const decoded = syn.decode(encoded);
    type Dec = typeof decoded;
    expect(decoded).toBe("{{string}} is the best");

    type cases = [
      Expect<Equal<typeof syn, TokenSyntax<"Template", {
        "{{": "^open!",
        "}}": "^close!",
        "::": "^sep!"
      }>>>
    ];
  });
});
