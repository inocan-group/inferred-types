/* eslint-disable ts/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { Suggest } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Suggest<T>", () => {

  it("type tests for Suggest<T>", () => {
    type FooBar = Suggest<["foo", "bar"]>;
    type FooBarUnion = Suggest<"foo" | "bar">;

    type cases = [
      Expect<Equal<FooBar, "foo" | "bar" | (string & {})>>,
      Expect<Equal<FooBarUnion, "foo" | "bar" | (string & {})>>,
    ];
    const cases: cases = [
      true, true
    ];

  });


  it("runtime tests for Suggest<T>", () => {
    type Choice = Suggest<"foo" | "bar" | "baz">;

    const fn = <T extends Choice>(choose: T) => choose;
    type PFn = Parameters<typeof fn>;

    const foo = fn("foo");
    const nuts = fn("nuts");

    expect(foo).toBe("foo");
    expect(nuts).toBe("nuts");

    type cases = [
      Expect<Equal<PFn, [choose: "foo" | "bar" | "baz" | (string & {})] >>,
      Expect<Equal<typeof foo, "foo">>,
      Expect<Equal<typeof nuts, "nuts">>,
    ];
    const cases: cases = [true, true, true];
  });

});
