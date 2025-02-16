import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { withDefaults } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("withDefaults(obj,defaults)", () => {

  it("happy path", () => {
    const base: { foo?: number; bar?: number } = { foo: 32 };
    const fooBar = withDefaults(base)({ bar: 1 });

    expect(fooBar.foo).toEqual(32);
    expect(fooBar.bar).toEqual(1);

    type cases = [
      Expect<Equal<typeof fooBar, { foo: number; bar: 1 }>>
    ];
    const cases: cases = [true];
  });

});
