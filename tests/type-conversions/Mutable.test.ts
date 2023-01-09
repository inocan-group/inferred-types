import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Mutable } from "../../src/types/type-conversion/Mutable";

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
    
    type cases = [
      Expect<Equal<
        Mutable<O>,
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