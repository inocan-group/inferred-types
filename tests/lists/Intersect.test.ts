import { Equal, Expect } from "@type-challenges/utils";
import { Intersect } from "inferred-types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Intersect<TList>", () => {

  it("happy path", () => {
    type FooBar = Intersect<[
      { foo: 1 },
      { bar: 2 }
    ]>

    // @ts-ignore
    type cases = [
      Expect<Equal<FooBar, { foo: 1} & {bar: 2}>>,
    ];
  });

});

