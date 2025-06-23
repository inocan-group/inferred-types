/* eslint-disable ts/ban-ts-comment */
import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import {  IsIsoDate, IsIsoTime } from "inferred-types/types";
import { describe, it } from "vitest";



describe("Operators", () => {

  it("IsIsoTime<T>", () => {
    type T1 = IsIsoTime<"12:34:56">;
    type T2 = IsIsoTime<"12:34:56Z">;
    type T3 = IsIsoTime<"12:34:56.123">;
    type T4 = IsIsoTime<"12:34:56.123Z">;
    type T5 = IsIsoTime<"12:34:56.123+00:00">;
    type T6 = IsIsoTime<"12:34:56.123-00:00">;

    type T7 = IsIsoTime<"T12:34:56">;
    type T8 = IsIsoTime<"T12:34:56Z">;
    type T9 = IsIsoTime<"T12:34:56.123">;
    type T10 = IsIsoTime<"T12:34:56.123Z">;
    type T11 = IsIsoTime<"T12:34:56.123+00:00">;
    type T12 = IsIsoTime<"T12:34:56.123-00:00">;


    type F1 = IsIsoTime<"12:34:56.123+00:00:00">;
    type F2 = IsIsoTime<"12:34:56.123-00:00:00">;
    type F3 = IsIsoTime<"12:74:56">;
    type F4 = IsIsoTime<"12:34:5">;
    type F5 = IsIsoTime<"T12:34:5">;

    type _cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,
      ExpectTrue<T5>,
      ExpectTrue<T6>,

      ExpectTrue<T7>,
      ExpectTrue<T8>,
      ExpectTrue<T9>,
      ExpectTrue<T10>,
      ExpectTrue<T11>,
      ExpectTrue<T12>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
      ExpectFalse<F4>,
      ExpectFalse<F5>,
    ];
  });

  it("IsIsoExplicitDate<T>", () => {
    type T1 = IsIsoDate<"2024-12-25">;
    type T2 = IsIsoDate<"0000-01-01">;
    type T3 = IsIsoDate<"9999-12-31">;

    type F1 = IsIsoDate<"2024-12-55">;
    type F2 = IsIsoDate<"2024-42-25">;
    type F3 = IsIsoDate<"2024a-12-25">;
    type F4 = IsIsoDate<"20241225">;

    type _cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
      ExpectFalse<F4>,
    ];
  });

  it("IsIsoImplicitDate<T>", () => {
    type T1 = IsIsoDate<"20241225">;
    type T2 = IsIsoDate<"00000101">;
    type T3 = IsIsoDate<"99991231">;

    type F1 = IsIsoDate<"20241255">;
    type F2 = IsIsoDate<"20244225">;
    type F3 = IsIsoDate<"2024a1225">;
    type F4 = IsIsoDate<"2024-12-25">;


    type _cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
      ExpectFalse<F4>,
    ];
  });

});
