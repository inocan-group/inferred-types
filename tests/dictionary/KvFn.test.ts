import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { AnyFunction, DoesExtend, KvFn } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("KvFn", () => {

  it("happy path", () => {
    type Hi = KvFn<[
      "greet",
      [
        <N extends string, A extends number>(name: N, age: A) => `Hello ${N}, you are ${A}.`,
      "greet the user"
      ]
    ]>;

    type cases = [
      // greet prop is a function
      ExpectTrue<DoesExtend<Hi["greet"], AnyFunction>>,
      // greet prop also exposes a `desc` prop
      Expect<Equal<Hi["greet"]["desc"], "greet the user">>,
    ];
    const cases: cases = [
      true, true
    ];
  });

});
