import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import type { SetIndex, SetKeyForce, Test } from "inferred-types/types";

describe("SetKey<T,K,V>", () => {

  it("happy path", () => {
    type FooBar = SetIndex<{foo: 1; bar: "hi"}, "foo", 2>;

    // @ts-ignore
    type cases = [
      Expect<Test<FooBar, "equals",  { foo: 2; bar: "hi"}>>
    ];
  });

});

describe("ForceSetKey<T,K,V>", () => {

  it("happy path", () => {
    type FooBar = SetKeyForce<{foo: 1; bar: "hi"}, "foo", 2>;
    type Forced = SetKeyForce<{foo: 1; bar: "hi"}, "foo", "forced">;

    // @ts-ignore
    type cases = [
      Expect<Test<FooBar, "equals",  { foo: 2; bar: "hi"}>>,
      Expect<Test<Forced, "equals",  { foo: "forced"; bar: "hi"}>>,
    ];
  });

});
