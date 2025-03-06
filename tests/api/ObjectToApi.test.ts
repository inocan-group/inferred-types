import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ObjectToApi } from "inferred-types/types";

type FooBar = { foo: 1; bar?: "hi"; greet: () => `hello` };

describe("ObjectToApi<T>", () => {

  it("happy path", () => {
    type Converted = ObjectToApi<FooBar>;
    type WithDone = ObjectToApi<FooBar, string>;

    // @ts-ignore
    type cases = [
      Expect<Equal<Converted, {
        __kind: "ObjectApi";
        done: () => never;
        foo: <T extends 1>() => T;
        bar: <T extends "hi" | undefined>() => T;
        greet: <T extends () => `hello`>() => T;
    }>>,
      Expect<Equal<WithDone, {
        __kind: "ObjectApi";
        done: () => string;
        foo: <T extends 1>() => T;
        bar: <T extends "hi" | undefined>() => T;
        greet: <T extends () => `hello`>() => T;
    }>>,
    ];
  });

})
