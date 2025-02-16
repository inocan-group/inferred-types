import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { omit } from "inferred-types/runtime";
import { EmptyObject } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("omit()", () => {

  it("happy path", () => {
    const all = omit({ foo: 1, bar: 2, baz: 3 }, "");
    const noFoo = omit({ foo: 1, bar: 2, baz: 3 }, "foo");
    const justBar = omit({ foo: 1, bar: 2, baz: 3 }, "foo", "baz");
    const none = omit({ foo: 1, bar: 2, baz: 3 }, "foo", "bar", "baz");


    expect(all).toEqual({ foo: 1, bar: 2, baz: 3 });
    expect(noFoo).toEqual({ bar: 2, baz: 3 });
    expect(none).toEqual({});
    // runtime valid value
    expect(noFoo).toEqual({ bar: 2, baz: 3 });

    type cases = [
      Expect<Equal<typeof all, { foo: 1; bar: 2; baz: 3 }>>,
      Expect<Equal<typeof noFoo, { bar: 2; baz: 3 }>>,
      Expect<Equal<typeof justBar, { bar: 2 }>>,
      Expect<Equal<typeof none, EmptyObject>>,
    ];
    const cases: cases = [true, true, true, true];
  });


  it("Narrowing a typed object", () => {
    const input: { foo: 1; bar: 2; baz: 3 } = { foo: 1, bar: 2, baz: 3 };
    const test = omit(input, "foo");

    type cases = [
      Expect<Equal<typeof test, { bar: 2; baz: 3 }>>
    ];
    const cases: cases = [true];

    expect(test).toEqual({ bar: 2, baz: 3 });
  });

  it("Narrowing a typed object with an array property", () => {
    const input: { foo: 1; bar: 2; baz: ["testing", "something"] } = {
      foo: 1,
      bar: 2,
      baz: ["testing", "something"]
    };

    const test = omit(input, "foo");

    type cases = [
      Expect<Equal<typeof test, { bar: 2; baz: ["testing", "something"] }>>
    ];
    const cases: cases = [true];

    expect(test).toEqual({ bar: 2, baz: ["testing", "something"] });
  });


});
