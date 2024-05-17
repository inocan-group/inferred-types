import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { AsFnMeta, IsErrorCondition, IsNarrowingFn, LiteralFn, NarrowingFn } from "../../src/inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("NarrowingFn<T>", () => {

  it("happy path", () => {
    type Fn1 = NarrowingFn<(name: string) => string>;
    type Idempotent = NarrowingFn<Fn1>;
    type Fn2 = <T extends string>(name: T) => string;

    type NoParams = NarrowingFn<() => string>;

    type Meta = AsFnMeta<Fn2>;

    type PropsMeta = AsFnMeta<(() => string) & {foo: 1}>;
    
    type cases = [
      Expect<Equal<Fn1, <T extends [name: string]>(...args: T) => string>>,
      Expect<Equal<Idempotent, Fn1>>,
      ExpectTrue<IsNarrowingFn<Fn1>>,
      ExpectTrue<IsNarrowingFn<Fn2>>,

      ExpectTrue<IsErrorCondition<NoParams, "no-parameters">>,

      ExpectFalse<Meta["hasProps"]>,
      ExpectTrue<Meta["isNarrowingFn"]>,
      ExpectTrue<Meta["hasArgs"]>,

      ExpectTrue<PropsMeta["hasProps"]>,
      Expect<Equal<PropsMeta["props"], { foo: 1 }>>
    ];
    const cases: cases = [
      true, true, true, true,
      true,
      false, true, true,
      true, true
    ];
  });

});

describe("LiteralFn<T>", () => {

  it("happy path", () => {
    type Base = (name: string) => string;
    type Fn1 = LiteralFn<Base>;
    type Idempotent = LiteralFn<Fn1>;
    type FromNarrowing = LiteralFn<NarrowingFn<Base>>;
    type MyNarrow = LiteralFn<<TName extends string, TAge extends number>(name: TName, age: TAge) => `${TName} is ${TAge} years old`>;

    type Meta = AsFnMeta<MyNarrow>;

    type cases = [
      Expect<Equal<Fn1, Base>>, 
      Expect<Equal<Idempotent, Base>>, 
      Expect<Equal<FromNarrowing, Base>>, 
      Expect<Equal<
        MyNarrow, 
        (name: string, age: number) => `${string} is ${number} years old`
       >>,
      ExpectFalse<Meta["hasProps"]>,
      ExpectFalse<Meta["isNarrowingFn"]>,
      ExpectTrue<Meta["hasArgs"]>
    ];
    const cases: cases = [ 
      true, true, true, true,
      false, false, true
    ];
  });

});
