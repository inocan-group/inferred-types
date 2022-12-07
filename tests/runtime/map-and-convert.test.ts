import { Equal, Expect } from "@type-challenges/utils";
import { boxDictionaryValues, keys } from "src/runtime";
import { createConverter } from "src/runtime/lists/createConverter";
import { Narrowable } from "src/types";
import { ConverterShape } from "src/types/lists/ConvertAndMap";
import { describe, it, expect } from "vitest";

// Note: type tests fail visible inspection but pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("createConverter()", () => {
  it("basic converter setup", () => {
    const convert = createConverter({
      string: (s) => `Hello ${s}`,
      number: (n) => `The number was ${n}`,
      // object: (o) => `An object with keys ${Object.keys(o).join(", ")}`,
    });

    const t1 = convert("foo");
    const t2 = convert(42);
    expect(t1).toBe("Hello foo");
    expect(t2).toBe("The number was 42");

    type cases = [
      // TODO: get the final narrowness resolved ... this should be doable
      Expect<Equal<typeof t1, `Hello ${string}`>>,
      Expect<Equal<typeof t2, `The number was ${number}`>>
    ];
    const cases: cases = [true, true];
  });
});
