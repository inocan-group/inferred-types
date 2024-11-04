import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Mutable } from "@inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Mutable<T>", () => {

  it("happy path", () => {
    type O = {
      foo: number;
      bar: readonly string[];
      readonly baz: string;
      nested: {
        one: number;
        readonly two: number;
        readonly literal: "foo" | "bar";
      };
    };
    type M = Mutable<O>;

    type cases = [
      Expect<Equal<
        M,
        {
          foo: number;
          bar: string[];
          baz: string;
          nested: {
            one: number;
            two: number;
            literal: "foo" | "bar";
          };
        }
      >>
    ];
    const cases: cases = [true];
  });

});
