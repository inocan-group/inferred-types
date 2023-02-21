/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { AsFn, ErrorCondition, FnMeta, ToFn } from "src/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("AsFn<T>", () => {

  it("AnyFunction", () => {
    type Fn1 = () => `hi`;
    type Fn2 = <T extends string>(name: T) => `hi ${T}`;
    type Obj = { foo: 1; bar: 2 };
    type Fn3 = Fn2 & Obj;

    type As1 = AsFn<Fn1>;
    type As2 = AsFn<Fn2>;
    type As3 = AsFn<Fn3>;
    type To1 = ToFn<Fn1>;
    type To2 = ToFn<Fn2>;
    type To3 = ToFn<Fn3>;
    
    type cases = [
      Expect<Equal<As1, Fn1>>,
      Expect<Equal<As2, (name: string) => `hi ${string}`>>,
      Expect<Equal<As3, ((name: string) => `hi ${string}`) & { foo: 1; bar: 2}>>,

      Expect<Equal<To1, Fn1>>,
      Expect<Equal<To2, (name: string) => `hi ${string}`>>,
      Expect<Equal<To3, ((name: string) => `hi ${string}`) & { foo: 1; bar: 2}>>,
    ];
    const cases: cases = [ true, true, true, true, true, true ];
  });

  
  it("FnMeta", () => {
    type Fn1 = FnMeta<[], "hi", "no-props">;
    type Fn2 = FnMeta<[string], `hi ${string}`, { foo: 1 }>;

    type As1 = AsFn<Fn1>;
    type As2 = AsFn<Fn2>;
    type To1 = ToFn<Fn1>;
    type To2 = ToFn<Fn2>;

    type cases = [
      Expect<Equal<As1, () => `hi`>>, //
      Expect<Equal<As2, ((args_0: string) => `hi ${string}`) & { foo: 1 }>>,

      Expect<Equal<To1, () => `hi`>>, //
      Expect<Equal<To2, ((args_0: string) => `hi ${string}`) & { foo: 1 }>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

  it("Fn with props defined manually", () => {
    const hybrid = () => "secret" as const;
    hybrid.foo = 42;
    type As1 = AsFn<typeof hybrid>;

    type cases = [
      Expect<Equal<As1, (() => "secret") & { foo: number }>>, //
    ];
    const cases: cases = [ true ];
  });

  
  it("non function", () => {
    type ErrCond = ToFn<ErrorCondition<"testing">>;
    type Never = ToFn<never>;
    type Num = ToFn<42>;
    type Str = ToFn<"foobar">;

    type ErrCond2 = AsFn<ErrorCondition<"testing">>;
    type Never2 = AsFn<never>;
    type Num2 = AsFn<42>;
    type Str2 = AsFn<"foobar">;
    
    type cases = [
      Expect<Equal<ErrCond, ErrorCondition<"testing", string, string, {}>>>,
      Expect<Equal<Never, never>>,
      Expect<Equal<Num, () => 42>>,
      Expect<Equal<Str, () => "foobar">>,

      Expect<Equal<ErrCond2, ErrorCondition<"testing", string, string, {}>>>,
      Expect<Equal<Never2, never>>,
      Expect<Equal<Num2, never>>,
      Expect<Equal<Str2, never>>,
    ];
    const cases: cases = [ true, true, true, true, true, true, true, true ];
  });
  
  

});
