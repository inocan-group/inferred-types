/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect, ExpectExtends, ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import type { Contains, SharedKeys } from "src/types/index";
import { sharedKeys } from "src/runtime/dictionary/sharedKeys";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("SharedKeys", () => {

  it("happy path", () => {
    type A = { foo:1; bar: 23; color: "blue" };
    type B = { bar: 55; baz: 66; color: "red" };
    type Shared = SharedKeys<A,B>;
    type All = SharedKeys<A,A>;
    type None = SharedKeys<A,{}>;
    type None2 = SharedKeys<A,object>;

    type cases = [
      Expect<ExpectExtends< readonly ["bar", "color"], Shared>>,
      Expect<ExpectTrue<Contains<All, "foo">>>,
      Expect<Equal<None, []>>,
      Expect<Equal<None2,  []>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});

describe("sharedKeys(a,b)", () => {

  it("happy path", () => {
    const a = { foo:1, bar: 23, color: "blue" } ;
    const b = { bar: 55, baz: 66, color: "red" } ;

    const shared = sharedKeys(a,b);
    expect(shared).toEqual(["bar", "color"]);
  });

});

