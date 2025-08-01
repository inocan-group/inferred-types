import { describe, it } from "vitest";
import {
    Expect,
    AsFnMeta,
    AsLiteralFn,
    AsNarrowingFn,
    IsNarrowingFn,
    StaticFn,
    NarrowingFn,
    Test
} from "inferred-types/types";
import { IsEqual } from "inferred-types/types";



describe("IsNarrowingFn<T>", () => {

  it("happy path", () => {
    type T1 = IsNarrowingFn<<T extends string>(name: T) => `hi ${T}`>;
    type T2 = IsNarrowingFn<(<T extends string>(name: T) => `hi ${T}`) & {foo: 1}>;

    type F1 = IsNarrowingFn<() => `hi`>;
    type F2 = IsNarrowingFn<(() => `hi`) & {foo:1}>;
    type F3 = IsNarrowingFn<((name: string) => `hi ${string}`) & {foo:1}>;

    type cases = [
        Expect<Test<T1, "equals", true>>,
        Expect<Test<T2, "equals", true>>,

        Expect<Test<F1, "equals", false>>,
        Expect<Test<F2, "equals", false>>,
        Expect<Test<F3, "equals", false>>,
    ];

  });

});


describe("NarrowingFn<T>", () => {

  it("happy path", () => {
    type Fn1 = NarrowingFn<(name: string) => string>;
    // calling type utility multiple times creates no change to type
    type Idempotent = NarrowingFn<Fn1>;

    type Fn2 = <T extends readonly [name: string]>(...args: T) => string;
    type Fn3 = NarrowingFn<(<T extends string>(name: T) => string)>;

    type NoParams = NarrowingFn<() => string>;

    type Meta = AsFnMeta<Fn2>;

    type PropsMeta = AsFnMeta<(() => string) & {foo: 1}>;

    type cases = [
        Expect<Test<
            Fn1,
            "equals",
            <T extends readonly [name: string]>(...args: T) => string
        >>,
        Expect<Test<Idempotent, "equals",  Fn1>>,
        Expect<Test<IsNarrowingFn<Fn1>, "equals", true>>,
        Expect<Test<IsNarrowingFn<Idempotent>, "equals", true>>,
        Expect<Test<IsNarrowingFn<Fn2>, "equals", true>>,
        Expect<Test<IsNarrowingFn<Fn3>, "equals", true>>,

        // no parameter functions have no _narrowing_ variant
        Expect<Test<NoParams, "equals", () => string>>,

        Expect<Test<Meta["hasProps"], "equals", false>>,
        Expect<Test<Meta["hasArgs"], "equals", true>>,
        Expect<Test<Meta["isNarrowingFn"], "equals", true>>,

        Expect<Test<PropsMeta["hasProps"], "equals", true>>,
        Expect<Test<PropsMeta["props"], "equals", { foo: 1 }>>,
    ];

  });

});

describe("LiteralFn<T>", () => {

  it("happy path", () => {
    type Base = (name: string) => string;
    type Fn1 = StaticFn<Base>;
    type Idempotent = StaticFn<Fn1>;
    type FromNarrowing = StaticFn<NarrowingFn<Base>>;
    type MyNarrow = StaticFn<<TName extends string, TAge extends number>(name: TName, age: TAge) => `${TName} is ${TAge} years old`>;

    type Meta = AsFnMeta<MyNarrow>;

    type cases = [
        Expect<Test<Fn1, "equals",  Base>>,
        Expect<Test<Idempotent, "equals",  Base>>,
        Expect<Test<FromNarrowing, "equals",  Base>>,
        Expect<Test<
            MyNarrow,
            "equals",
            (name: string, age: number) => `${string} is ${number} years old`
        >>,
        Expect<Test<Meta["hasProps"], "equals", false>>,
        Expect<Test<Meta["isNarrowingFn"], "equals", false>>,
        Expect<Test<Meta["hasArgs"], "equals", true >>
    ];
  });

});

describe("AsLiteralFn<TParam,TReturn,TProps>", () => {

  it("happy path", () => {
    type Basic = AsLiteralFn<[], "hi">;
    type WithParams = AsLiteralFn<[name: string], "hi">;
    type WithProps = AsLiteralFn<[], "hi", { foo: 1}>;


    type cases = [
      Expect<Test<Basic, "equals",  () => "hi">>,
      Expect<Test<WithParams, "equals",  (...args: [name: string]) => "hi">>,
      Expect<Test<WithProps, "equals",  (() => "hi") & {foo: 1}>>,
    ];
  });
});

describe("AsNarrowingFn<TParam,TReturn,TProps>", () => {

  it("happy path", () => {
    type Basic = AsNarrowingFn<[], "hi">;
    type WithParams = AsNarrowingFn<[name: string], "hi">;
    type WithProps = AsNarrowingFn<[name: string], "hi", { foo: 1}>;

    type cases = [
      Expect<Test<Basic, "equals",  () => "hi">>,
      Expect<Test<WithParams, "equals",  <T extends readonly [name: string]>(...args: T) => "hi">>,
      Expect<Test<
        WithProps,
        "equals",
        (<T extends readonly [name: string]>(...args: T) => "hi") & {
          foo: 1;
      }>>,
    ];

  });
});
