import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { defineObject } from "inferred-types/runtime"

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("defineObject()", () => {

  it("happy path", () => {
    const fooBar = defineObject({
      foo: "Opt<string>",
      bar: "string(foo,bar)"
    });

    expect(fooBar).toEqual({
      foo: "Opt<string>",
      bar: "string(foo,bar)"
    });

    type FooBar = typeof fooBar;

    // @ts-ignore
    type cases = [
      Expect<Equal<FooBar, {
        foo: string | undefined,
        bar: "foo" | "bar"
      }>>
    ];
  });

});
