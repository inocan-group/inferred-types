import {  ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import {  IsErrorCondition, IsWideContainer, IsWideScalar, IsWideType, Dictionary, Throw } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsWideScalar<T>", () => {

  it("happy path", () => {
    type T1 = IsWideScalar<string>;
    type T2 = IsWideScalar<boolean>;
    type T3= IsWideScalar<number>;
    type T4= IsWideScalar<null>;

    type F1 = IsWideScalar<"foo">;
    type F2 = IsWideScalar<true>;
    type F3= IsWideScalar<42>;


    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,
      
      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
    const cases: cases = [ 
      true, true, true, true,
      false, false, false
    ];
  });
});

describe("IsWideContainer<T>", () => {

  it("happy path", () => {
    type T1 = IsWideContainer<object>;
    type T2 = IsWideContainer<Dictionary>;
    type T3 = IsWideContainer<Record<string, string>>;
    type T4 = IsWideContainer<string[]>;
    type T5 = IsWideContainer<readonly string[]>;
    type T6 = IsWideContainer<readonly unknown[]>;

    type F1 = IsWideContainer<{foo:1}>;
    type F2 = IsWideContainer<[1,2]>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,
      ExpectTrue<T5>,
      ExpectTrue<T6>,
      
      ExpectFalse<F1>,
      ExpectFalse<F2>,
    ];
    const cases: cases = [ 
      true, true, true, true, true, true,
      false, false
    ];
  });

});



describe("IsWideType<T>", () => {

  it("Scalars", () => {
    type T1 = IsWideType<string>;
    type T2 = IsWideType<boolean>;
    type T3 = IsWideType<object>;
    type T4 = IsWideType<string[]>;
    type T5 = IsWideType<unknown[]>;
    type T6 = IsWideType<readonly string[]>;
    // union with only wide values
    type T7 = IsWideType<string | number>;

    type F1 = IsWideType<"foo">;
    // union with literal values
    type F2 = IsWideType<string | 42>;
    type F3 = IsWideType<{foo: 1; bar: 2}>;

    // never with and without modification of TNever
    type E1 = IsWideType<never>;
    type E2 = IsWideType<never, false>;
    // proxy errors passed in
    type E3 = IsWideType<Throw<"testing">>
    
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,
      ExpectTrue<T5>,
      ExpectTrue<T6>,
      ExpectTrue<T7>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,

      ExpectTrue<IsErrorCondition<E1, "invalid-never">>,
      ExpectFalse<E2>,

      ExpectTrue<IsErrorCondition<E3, "testing">>
    ];
    const cases: cases = [
      true, true, true, true, true, true, true,
      false, false, false,
      true, false,
      true
    ];
  });

});

