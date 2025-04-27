import {  ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { AnyFunction, AsLiteralFn, Extends } from "inferred-types/types";



describe("AnyFunction", () => {

  it("happy path", () => {
    type T1 = Extends<Function,AnyFunction>;
    type T2 = Extends<() => "hi",AnyFunction>;
    type T3 = Extends<(name: string) => "hi",AnyFunction>;
    type T4 = Extends<<T extends string>(name: T) => "hi",AnyFunction>;
    type T5 = Extends<(<T extends string>(name: T) => "hi") & { foo: 1},AnyFunction>;
    type T6 = Extends<AsLiteralFn<[name: string, age: number],string, {foo:1}>, AnyFunction>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,
      ExpectTrue<T5>,
      ExpectTrue<T6>,
    ];
    const cases: cases = [
      true, true, true, true, true, true
    ];
  });

});
