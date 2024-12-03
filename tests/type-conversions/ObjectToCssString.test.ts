import { Equal, Expect } from "@type-challenges/utils";
import { ObjectToCssString } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ObjectToCssString<T>", () => {

  it("happy path", () => {
    type FooBar = ObjectToCssString<{ foo: 1; bar: 2 }>;
    type StrBool = ObjectToCssString<{ foo: "20px"; bar: "40px" }>;

    // @ts-ignore
    type cases = [
      Expect<Equal<FooBar, "{ foo: 1; bar: 2 }" >>,
      Expect<Equal<StrBool, `{ foo: 20px; bar: 40px }` >>,
    ];
  });

});
