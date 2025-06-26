import {
    Expect,
    Extends,
    IsBalanced,
    Test,
    TypedError
} from "inferred-types/types";
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
        Expect<Test<F1, "isError",  "unbalanced">>,
        Expect<Test<F2, "isError",  "unbalanced">>,
    ];
  });

  it("Invalid KV results in error", () => {
    type E = IsBalanced<"apple", {"foo": "bar"}>;

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
        Expect<Test<T1, "equals",  true>>,
        Expect<Test<F1, "equals",  false>>,
        Expect<Test<F2, "equals",  false>>,
    ];
  });



});
