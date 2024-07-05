import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { isShape, shape, parse } from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("parse(value)", () => {

  it("Happy path", () => {
    const foo = "foo";
    const typeFoo = shape(s => s.string("foo"));

    expect(isShape(foo)).toBe(false);
    expect(isShape(typeFoo)).toBe(true);

    const parseFoo = parse(foo);
    const parseTypeFoo = parse(typeFoo);

    expect((parseFoo as any).isToken).toEqual(false);
    expect((parseTypeFoo as any).isToken).toEqual(true);


    type cases = [
      Expect<Equal<typeof foo, "foo">>,
      Expect<Equal<typeof typeFoo, "foo">>,
    ];
    const cases: cases = [
      true, true,

    ];
  });

});
