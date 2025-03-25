import { Equal, Expect } from "@type-challenges/utils";
import { Extends, IsBalanced, TypedError } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsBalanced<T,U>", () => {

  it("happy path", () => {
    type T1 = IsBalanced<"[0] square brackets once", {"[":"]"}>;
    type T2 = IsBalanced<"[0] square brackets twice [*]", {"[":"]"}>;

    type F1 = IsBalanced<"[0]] square brackets once", {"[":"]"}>;
    type F2 = IsBalanced<"0] square brackets once", {"[":"]"}>;

    type cases = [
        Expect<Equal<T1, true>>,
        Expect<Equal<T2, true>>,
        Expect<Equal<F1, false>>,
        Expect<Equal<F2, false>>,
    ];
  });


  it("Invalid KV results in error", () => {
    type E = IsBalanced<"adfasdf", {"foo": "bar"}>;

    type cases = [
      Expect<Extends<E, TypedError<"invalid-key-value">>>
    ];
  });


  it("Nested brackets", () => {
    type T1 = IsBalanced<"{ foo: (name: string) => `hi ${name}` }", {
        "{":"}",
        "(":")"
    }>;

    type F1 = IsBalanced<"{ foo: (name: string) => `hi ${name}` ", {
        "{":"}",
        "(":")"
    }>;
    type F2 = IsBalanced<"{ foo: )(name: string) => `hi ${name}` }", {
        "{":"}",
        "(":")"
    }>;

    type cases = [
        Expect<Equal<T1, true>>,
        Expect<Equal<F1, false>>,
        Expect<Equal<F2, false>>,
    ];
  });



});
