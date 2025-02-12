import { Equal, Expect } from "@type-challenges/utils";
import { createEncoder } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

describe("createEncoder()", () => {

  it("happy path", () => {
    const { encoder, decoder } = createEncoder({
      "{{": "^open!",
      "}}": "^close!",
      "::": "^sep!"
    });

    const text = "There I was, in the {{ string }}";
    const encoded = encoder(text);
    const decoded = decoder(encoded);

    expect(encoded).toEqual("There I was, in the ^open! string ^close!");
    expect(decoded).toEqual(text);

    type cases = [
      Expect<Equal<
        typeof encoded,
        "There I was, in the ^open! string ^close!"
      >>,

      Expect<Equal<
        typeof decoded,
        "There I was, in the {{ string }}"
      >>,
    ];
  });
});
