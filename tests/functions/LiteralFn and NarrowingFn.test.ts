import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";
import { AsFnMeta, AsLiteralFn, AsNarrowingFn,  IsErrorCondition, IsNarrowingFn, LiteralFn, NarrowingFn } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsNarrowingFn<T>", () => {

  it("happy path", () => {
    type T1 = IsNarrowingFn<<T extends string>(name: T) => `hi ${T}`>;
    type T2 = IsNarrowingFn<(<T extends string>(name: T) => `hi ${T}`) & {foo: 1}>;

    type F1 = IsNarrowingFn<() => `hi`>;
    type F2 = IsNarrowingFn<(() => `hi`) & {foo:1}>;
    type F3 = IsNarrowingFn<((name: string) => `hi ${string}`) & {foo:1}>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
    const cases: cases = [
      true, true,
      false, false,false
    ];
  });

});


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
    expect(cases).toEqual(cases);
  });

});

describe("AsLiteralFn<TParam,TReturn,TProps>", () => {

  it("happy path", () => {
    type Basic = AsLiteralFn<[], "hi">;
    type WithParams = AsLiteralFn<[name: string], "hi">;
    type WithProps = AsLiteralFn<[], "hi", { foo: 1}>;


    type cases = [
      Expect<Equal<Basic, () => "hi">>,
      Expect<Equal<WithParams, (...args: [name: string]) => "hi">>,
      Expect<Equal<WithProps, (() => "hi") & {foo: 1}>>,
    ];
    const cases: cases = [
      true, true, true
    ];

    expect(cases).toEqual(cases);
  });
});

describe("AsNarrowingFn<TParam,TReturn,TProps>", () => {

  it("happy path", () => {
    type Basic = AsNarrowingFn<[], "hi">;
    type WithParams = AsNarrowingFn<[name: string], "hi">;
    type WithProps = AsNarrowingFn<[name: string], "hi", { foo: 1}>;

    type cases = [
      Expect<Equal<Basic, () => "hi">>,
      Expect<Equal<WithParams, <T extends [name: string]>(...args: T) => "hi">>,
      Expect<Equal<
        WithProps,
        (<T extends [name: string]>(...args: T) => "hi") & {
          foo: 1;
      }>>,
    ];
    const cases: cases = [
      true, true, true
    ];
    expect(cases).toEqual(cases);

  });
});
