/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Suggest } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Suggest<T>", () => {

  it("happy path", () => {
    type Choice = Suggest<"foo" | "bar" | "baz">;

    const fn = <T extends Choice>(choose: T) => choose;
    type PFn = Parameters<typeof fn>;

    const foo = fn("foo");
    const nuts = fn("nuts");

    type cases = [
      Expect<Equal<PFn, [choose: "foo" | "bar" | "baz" | (string & {})] >>,
      Expect<Equal<typeof foo, "foo">>,
      Expect<Equal<typeof nuts, "nuts">>,
    ];
    const cases: cases = [true, true, true];
  });

});
