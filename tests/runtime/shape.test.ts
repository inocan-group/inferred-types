import { Equal, Expect } from "@type-challenges/utils";
import { shape } from "inferred-types/runtime";
import type { ZipCode } from "inferred-types/types";

import { describe, it } from "vitest";

describe("shape", () => {

  it("happy path", () => {
    const foobar = shape(s => s.dictionary({
      foo: o => o.string(),
      bar: o => o.string().zipCode()
    }))

    // @ts-ignore
    type cases = [
      Expect<Test<typeof foobar, "equals",  { foo: string; bar: ZipCode }>>
    ];
  });

});
