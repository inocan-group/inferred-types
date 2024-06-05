import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { KeyOf, PublicKeyOf } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("KeyOf<T> and PublicKeyOf<T>", () => {

  it("Happy Path", () => {
    type FooBarBaz = {_kind: "foo-bar-baz", foo: number; bar: string; baz: boolean};

    type KObj = KeyOf<FooBarBaz>;
    type KPubObj = PublicKeyOf<FooBarBaz>;

    type cases = [
      Expect<Equal<KObj, "_kind" | "foo" | "bar" | "baz">>,
      Expect<Equal<KPubObj, "foo" | "bar" | "baz">>,
    ];
    const cases: cases = [
      true, true
    ];
  });

});
