/* eslint-disable ts/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { Suggest } from "inferred-types/types";

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
function asCamelCase(arg0: string) {
  throw new Error("Function not implemented.");
}

function asPascalCase(arg0: string) {
  throw new Error("Function not implemented.");
}
