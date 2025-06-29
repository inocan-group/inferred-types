import { Equal, Expect } from "@type-challenges/utils";
import { Extends, IsBalanced, Test, TypedError } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsBalanced<T,U>", () => {

  it("happy path", () => {
    type T1 = IsBalanced<"[0] square brackets once", {"[":"]"}>;
    type T2 = IsBalanced<"[0] square brackets twice [*]", {"[":"]"}>;

    type F1 = IsBalanced<"[0]] square brackets once", {"[":"]"}>;
    type F2 = IsBalanced<"0] square brackets once", {"[":"]"}>;

    type cases = [
        Expect<Test<T1, "equals",  true>>,
        Expect<Test<T2, "equals",  true>>,
        Expect<Test<F1, "equals",  false>>,
        Expect<Test<F2, "equals",  false>>,
    ];
  });


  it("Invalid KV results in error", () => {
    type E = IsBalanced<"adfasdf", {"foo": "bar"}>;

    type cases = [
      Expect<Extends<E, TypedError<"invalid-key-value">>>
    ];
  });


  it("greater-than and less-than chars", () => {
    type Basic = IsBalanced<"<1> monkey went to the market, <0> bacon was purchased", { "<":">" }>;
    type Nested = IsBalanced<"<1 or <2>> monkey went to the market, <0> bacon was purchased", { "<":">" }>;
    type OuterNesting = IsBalanced<"<<1> monkey went to the market, <0> bacon was purchased>", { "<":">" }>;

    type Imbalanced = IsBalanced<"<<1> monkey went to the market, <0> bacon was purchased", { "<":">" }>;

    type cases = [
        Expect<Test<Basic, "equals",  true>>,
        Expect<Test<Nested, "equals",  true>>,
        Expect<Test<OuterNesting, "equals",  true>>,

        Expect<Test<Imbalanced, "equals",  false>>,
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
        Expect<Test<T1, "equals",  true>>,
        Expect<Test<F1, "equals",  false>>,
        Expect<Test<F2, "equals",  false>>,
    ];
  });



});
