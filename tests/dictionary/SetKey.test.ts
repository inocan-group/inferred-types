import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { ForceSetKey, SetKey } from "inferred-types/types";

describe("SetKey<T,K,V>", () => {

  it("happy path", () => {
    type FooBar = SetKey<{foo: 1; bar: "hi"}, "foo", 2>;

    // @ts-ignore
    type cases = [
      Expect<Equal<FooBar, { foo: 2; bar: "hi"}>>
    ];
  });

});

describe("ForceSetKey<T,K,V>", () => {

  it("happy path", () => {
    type FooBar = ForceSetKey<{foo: 1; bar: "hi"}, "foo", 2>;
    type Forced = ForceSetKey<{foo: 1; bar: "hi"}, "foo", "forced">;

    // @ts-ignore
    type cases = [
      Expect<Equal<FooBar, { foo: 2; bar: "hi"}>>,
      Expect<Equal<Forced, { foo: "forced"; bar: "hi"}>>,
    ];
  });

});
