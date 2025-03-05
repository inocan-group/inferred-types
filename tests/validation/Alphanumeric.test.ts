import { Equal, Expect } from "@type-challenges/utils";
import {  AlphaNumeric, AlphaNumericPlus, Err, Extends } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Alphanumeric<T>", () => {

  it("happy path", () => {
    type T1 = AlphaNumeric<"hello">;
    type T2 = AlphaNumeric<"HeLLo">;
    type T3 = AlphaNumeric<"HeLLo123">;

    type F1 = AlphaNumeric<"Hello-">;
    type F2 = AlphaNumeric<"Hell-o">;
    type F3 = AlphaNumeric<"-Hello">;

    type E1 = AlphaNumeric<"Hello-", Err<`invalid-char`>>;

    type cases = [
        Expect<Equal<T1, "hello">>,
        Expect<Equal<T2, "HeLLo">>,
        Expect<Equal<T3, "HeLLo123">>,

        Expect<Equal<F1, never>>,
        Expect<Equal<F2, never>>,
        Expect<Equal<F3, never>>,

        Expect<Extends<E1, Error>>
    ];
  });

});


describe("AlphanumericPlus<T,Plus>", () => {


    it("happy path", () => {
      type T1 = AlphaNumericPlus<"hello_", "_">

      type F1 = AlphaNumericPlus<"hello_", "-">

      type cases = [
        Expect<Equal<T1, "hello_">>,
        Expect<Equal<F1, never>>,
      ];
    });


})
