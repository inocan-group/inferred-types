import { Equal, Expect } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";
import { createConverter } from "inferred-types/runtime";


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
      Expect<Test<typeof t1, "equals",  `Hello ${string}`>>,
      Expect<Test<typeof t2, "equals",  `The number was ${number}`>>,
      Expect<Test<typeof t3, "equals",  `An object with keys ${string}`>>
    ];
    const cases: cases = [true, true, true];
  });
});
