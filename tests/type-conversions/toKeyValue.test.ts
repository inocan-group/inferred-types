import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { toKeyValue } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("toKeyValue(obj)", () => {

  it("happy path", () => {
    const fooBar = toKeyValue({foo: 1, bar: "hi"});

    expect(fooBar).toEqual([
      {key: "foo", value: 1},
      {key: "bar", value: "hi"}
    ])

    // @ts-ignore
    type cases = [
      Expect<Equal<
        typeof fooBar,
        [
          { key: "foo", value: 1},
          { key: "bar", value: "hi"}
        ]
      >>
    ];
  });


  it("forcing a key to top", () => {
    const fooBar = toKeyValue({foo: 1, bar: "hi", id: 123}, o => o.toTop("id"));

    expect(fooBar, JSON.stringify(fooBar)).toEqual([
      { key: "id", value: 123},
      { key: "foo", value: 1},
      { key: "bar", value: "hi"},
    ])

    // @ts-ignore
    type cases = [
      Expect<Equal<
        typeof fooBar,
        [
          { key: "id", value: 123 },
          { key: "foo", value: 1 },
          { key: "bar", value: "hi" }
        ]
      >>
    ];

  });


});
