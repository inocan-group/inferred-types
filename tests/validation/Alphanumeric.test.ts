import {  Expect, AlphaNumeric, AlphaNumericPlus, Err, Extends, Test } from "inferred-types/types";
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
        Expect<Test<T1, "equals",  "hello">>,
        Expect<Test<T2, "equals",  "HeLLo">>,
        Expect<Test<T3, "equals",  "HeLLo123">>,

        Expect<Test<F1, "equals",  never>>,
        Expect<Test<F2, "equals",  never>>,
        Expect<Test<F3, "equals",  never>>,

        Expect<Extends<E1, Error>>
    ];
  });

});


describe("AlphanumericPlus<T,Plus>", () => {


    it("happy path", () => {
      type T1 = AlphaNumericPlus<"hello_", "_">

      type F1 = AlphaNumericPlus<"hello_", "-">

      type cases = [
        Expect<Test<T1, "equals",  "hello_">>,
        Expect<Test<F1, "equals",  never>>,
      ];
    });


})
