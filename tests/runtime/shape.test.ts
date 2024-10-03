import { Equal, Expect } from "@type-challenges/utils";
import { shape } from "src/runtime/index";
import { ZipCode } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("shape", () => {

  it("happy path", () => {
    const foobar = shape(s => s.dictionary({
      foo: o => o.string(),
      bar: o => o.string().zipCode()
    }))

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof foobar, { foo: string; bar: ZipCode}>>
    ];
  });

});
