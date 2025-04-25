import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import {  ContainsAll } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ContainsAll<TList,THasAll>", () => {

  it("happy path", () => {
    type Arr = ["foo", "bar", "baz"];
    type T1 = ContainsAll<Arr, ["foo", "bar"]>;

    type F1 = ContainsAll<Arr, ["foo","bar","baz","bax"]>;

    // @ts-ignore
    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<F1, false>>,
    ];
  });

  it("happy path for a string input", () => {

    type T1 = ContainsAll<"FooBar", ["Foo", "Bar"]>;
    type F1 = ContainsAll<"FooBar", ["Foo", "Bax"]>;


    type cases = [
        Expect<Equal<T1, true>>,
        Expect<Equal<F1, false>>,
    ];
  });

});


