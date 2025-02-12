import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { defineObject } from "inferred-types/runtime"

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("defineObject()", () => {

  it("using tokens to define", () => {
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

  it("using callbacks to define", () => {
    const fooBar = defineObject({
      foo: t => t.string().endsWith("bar"),
      bar: t => t.string("foo", "bar")
    });

    type FooBar = typeof fooBar;

    // @ts-ignore
    type cases = [
      Expect<Equal<FooBar, {
        foo: `${string}bar`,
        bar: "foo" | "bar"
      }>>
    ];
  });


  it("using optional property syntax", () => {
    const fooBar = defineObject({
      foo: "Opt<string>",
      bar: "string(foo,bar)"
    }, "foo", "bar");


    // @ts-ignore
    type cases = [
      Expect<Equal<typeof fooBar, {
        foo?: string | undefined,
        bar?: "foo" | "bar" | undefined
      }>>
    ];

  });



});
