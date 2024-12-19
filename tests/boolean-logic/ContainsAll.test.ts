import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ContainsAll, ContainsSome } from "inferred-types/types";

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

});

describe("ContainsSome<TList,THasAll>", () => {

  it("happy path", () => {
    type Arr = ["foo", "bar", "baz"];
    type T1 = ContainsSome<["foo", "bar"], Arr>;

    type F1 = ContainsSome<Arr, ["uno","dos","tres"]>;

    // @ts-ignore
    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<F1, false>>,
    ];
  });

});
