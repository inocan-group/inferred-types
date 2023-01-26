import { Equal, Expect } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";
import { createConverter } from "runtime/lists";

// Note: while type tests fail visible inspection they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("createConverter()", () => {
  it("basic converter setup", () => {
    const convert = createConverter({
      string: (s) => `Hello ${s}`,
      number: (n) => `The number was ${n}`,
      object: (o) => `An object with keys ${Object.keys(o).join(", ")}`,
    });

    const t1 = convert("foo");
    const t2 = convert(42);
    const t3 = convert({ foo: 42, bar: 12 });
    expect(t1).toBe("Hello foo");
    expect(t2).toBe("The number was 42");

    type cases = [
      // TODO: get the final narrowness resolved ... this should be doable
      Expect<Equal<typeof t1, `Hello ${string}`>>,
      Expect<Equal<typeof t2, `The number was ${number}`>>,
      Expect<Equal<typeof t3, `An object with keys ${string}`>>
    ];
    const cases: cases = [true, true, true];
  });
});
