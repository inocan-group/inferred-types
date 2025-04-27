/* eslint-disable ts/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { Suggest } from "inferred-types/types";

describe("Suggest<T>", () => {

  it("type tests for Suggest<T>", () => {
    type FooBar = Suggest<["foo", "bar"]>;
    type FooBarUnion = Suggest<"foo" | "bar">;

    type cases = [
      Expect<Test<FooBar, "equals",  "foo" | "bar" | (string & {})>>,
      Expect<Test<FooBarUnion, "equals",  "foo" | "bar" | (string & {})>>,
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
      Expect<Test<PFn, "equals",  [choose: "foo" | "bar" | "baz" | (string & {})] >>,
      Expect<Test<typeof foo, "equals",  "foo">>,
      Expect<Test<typeof nuts, "equals",  "nuts">>,
    ];
    const cases: cases = [true, true, true];
  });

});
