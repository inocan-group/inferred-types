import { Equal, Expect } from "@type-challenges/utils";
import { MaxLength } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("MaxLength<T>", () => {

  it("happy path", () => {
    type FooBar = MaxLength<["foo", "bar", "foobar", "baz"]>;
    type FooBar2 = MaxLength<["foo", "bar", "foobar"]>;
    type FooBar3 = MaxLength<["foobar", "bar", "foo", "baz"]>;
    type FooBar4 = MaxLength<["foobar"]>;


    // @ts-ignore
    type cases = [
      Expect<Equal<FooBar, "foobar">>,
      Expect<Equal<FooBar2, "foobar">>,
      Expect<Equal<FooBar3, "foobar">>,
      Expect<Equal<FooBar4, "foobar">>,
    ];
  });

});
