/* eslint-disable unicorn/consistent-function-scoping */
import type { Expect, Equal } from "@type-challenges/utils";
import {
  KeysWithValue,
  OptionalKeys,
  RequiredKeys,
  RequiredProps,
  WithValue,
  WithStringKeys,
  StringKeys,
  NumericKeys,
  NonStringKeys,
  WithNumericKeys,
} from "~/types/props";

type T0 = { foo: number; bar: number; baz: string };
type T1 = { foo: number; bar: number; baz?: string };
type T2 = { foo: number; bar?: number; baz?: string };
type T3 = { foo?: number; bar?: number; baz?: string };

describe("Dictionary Type Utils", () => {
  it("RequiredKeys<T> extracts the right keys", () => {
    type cases = [
      Expect<Equal<RequiredKeys<T0>, "foo" | "bar" | "baz">>,
      Expect<Equal<RequiredKeys<T1>, "foo" | "bar">>,
      Expect<Equal<RequiredKeys<T2>, "foo">>,
      Expect<Equal<RequiredKeys<T3>, never>>
    ];
    const cases: cases = [true, true, true, true];
    expect(cases).toBe(cases);
  });

  it("OptionalKeys<T> extracts the right keys", () => {
    type cases = [
      Expect<Equal<OptionalKeys<T0>, never>>,
      Expect<Equal<OptionalKeys<T1>, "baz">>,
      Expect<Equal<OptionalKeys<T2>, "baz" | "bar">>,
      Expect<Equal<OptionalKeys<T3>, "foo" | "bar" | "baz">>
    ];
    const cases: cases = [true, true, true, true];
    expect(cases).toBe(cases);
  });

  it("OptionalKeys<T> extracts the right keys", () => {
    type cases = [
      Expect<Equal<OptionalKeys<T0>, never>>,
      Expect<Equal<OptionalKeys<T1>, "baz">>,
      Expect<Equal<OptionalKeys<T2>, "baz" | "bar">>,
      Expect<Equal<OptionalKeys<T3>, "foo" | "bar" | "baz">>
    ];
    const cases: cases = [true, true, true, true];
    expect(cases).toBe(cases);
  });

  it("RequiredProps<T> extracts the KV's", () => {
    type cases = [
      Expect<Equal<RequiredProps<T0>, T0>>,
      Expect<Equal<RequiredProps<T1>, Omit<T0, "baz">>>,
      Expect<Equal<RequiredProps<T2>, Omit<T2, "baz" | "bar">>>,
      Expect<Equal<RequiredProps<T3>, Omit<T3, "foo" | "bar" | "baz">>>
    ];
    const cases: cases = [true, true, true, true];
    expect(cases).toBe(cases);
  });

  type LiteralType = {
    foo: 1;
    foo2: number;
    bar: true;
    baz: false;
    baz2: false;
    wide: boolean;
    greet: "hi";
  };

  const narrowType = { foo: 1, foo2: 2, bar: true, baz: false, baz2: false, greet: "hi" } as const;
  type NarrowType = typeof narrowType;
  const wideType = { foo: 1, foo2: 2, bar: true, baz: false, baz2: false, greet: "hi" };
  type WideType = typeof wideType;

  it("KeysWithValue<type, obj> identifies keys of the given object which have a value of specified type", () => {
    type SL = KeysWithValue<string, LiteralType>;
    type SN = KeysWithValue<string, NarrowType>;
    type SW = KeysWithValue<string, WideType>;

    type StrLiteralNarrow = KeysWithValue<"hi", NarrowType>;
    type StrLiteralWide = KeysWithValue<"hi", WideType>;

    type Num = KeysWithValue<number, LiteralType>;
    type NumNarrow = KeysWithValue<number, NarrowType>;
    type NumWide = KeysWithValue<number, WideType>;

    type LT = KeysWithValue<true, LiteralType>;
    type LF = KeysWithValue<false, LiteralType>;
    type LB = KeysWithValue<boolean, LiteralType>;

    type TrueNarrow = KeysWithValue<true, NarrowType>;
    type TrueWide = KeysWithValue<true, WideType>;

    type BooleanNarrow = KeysWithValue<boolean, NarrowType>;
    type BooleanWide = KeysWithValue<boolean, WideType>;

    type cases = [
      Expect<Equal<SL, "greet">>,
      Expect<Equal<SN, "greet">>,
      Expect<Equal<SW, "greet">>,

      // the type "hi" IS matched with a narrow type definition
      Expect<Equal<StrLiteralNarrow, "greet">>,
      // the type "hi" is not matched to the wider type string
      Expect<Equal<StrLiteralWide, never>>,

      Expect<Equal<Num, "foo" | "foo2">>,
      Expect<Equal<NumNarrow, "foo" | "foo2">>,
      Expect<Equal<NumWide, "foo" | "foo2">>,

      Expect<Equal<LT, "bar">>,
      Expect<Equal<LF, "baz" | "baz2">>,
      Expect<Equal<LB, "bar" | "baz" | "baz2" | "wide">>,

      // the literal type "true" can be matched when dealing a literal type
      Expect<Equal<TrueNarrow, "bar">>,
      // but no keys are matched when the key's value has been broadened to "boolean"
      Expect<Equal<TrueWide, never>>,
      // regardless of whether a type is `true`, `false`, or `boolean` they all
      // match up with the `boolean` type
      Expect<Equal<BooleanNarrow, "bar" | "baz" | "baz2">>,
      Expect<Equal<BooleanWide, "bar" | "baz" | "baz2">>
    ];
    const cases: cases = [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ];
    expect(cases).toBe(cases);
  });

  it("WithValue<type, obj> reduces the types on the object effectively", () => {
    type Literal = { foo: 1; bar: true; baz: false; baz2: false };

    type S = WithValue<string, T0>;
    type N = WithValue<number, T0>;
    type LT = WithValue<true, Literal>;
    type LF = WithValue<false, Literal>;

    type cases = [
      Expect<Equal<S, { baz: string }>>,
      Expect<Equal<N, { foo: number; bar: number }>>,
      Expect<Equal<LT, { bar: true }>>,
      Expect<Equal<LF, { baz: false; baz2: false }>>
    ];
    const cases: cases = [true, true, true, true];
    expect(cases).toBe(cases);
  });

  it("WithValue<type, obj> reduces the non-literal types from typeof", () => {
    const t = { foo: 1, bar: true, baz: false, baz2: false, xyz: "hi" };
    type T = typeof t;

    type S = WithValue<string, T>;
    type N = WithValue<number, T>;
    type B = WithValue<boolean, T>;

    type cases = [
      Expect<Equal<S, { xyz: string }>>,
      Expect<Equal<N, { foo: number }>>,
      Expect<Equal<B, { bar: boolean; baz: boolean; baz2: boolean }>>
    ];
    const cases: cases = [true, true, true];
    expect(cases).toBe(cases);
  });

  it("WithValue<t,o> reduces to literal types when runtime var set as 'const'", () => {
    const t = { foo: 1, bar: true, baz: false, baz2: false, xyz: "hi" } as const;
    type T = typeof t;

    type S = WithValue<string, T>;
    type N = WithValue<number, T>;
    type F = WithValue<false, T>;

    type cases = [
      Expect<Equal<S, { readonly xyz: "hi" }>>,
      Expect<Equal<N, { readonly foo: 1 }>>,
      Expect<Equal<F, { readonly baz: false; readonly baz2: false }>>
    ];
    const cases: cases = [true, true, true];
    expect(cases).toBe(cases);
  });

  it("WithValue<Function, O> reduces to kv's with a function but retains functions signatuer", () => {
    type T = WithValue<Function, { a: number; b: string; c: () => "hello"; d: () => "world" }>;

    type cases = [Expect<Equal<T, { c: () => "hello"; d: () => "world" }>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("WithStringKeys<T> and WithNumericKeys<T> reduce type to appropriate subset", () => {
    const t1 = { foo: 456, bar: "hi", 1: "a number", 2: "another pesky number" };
    type T1 = typeof t1;
    type SK = StringKeys<T1>;
    type NK = NumericKeys<T1>;
    type NonString = NonStringKeys<T1>;
    type StringKeysOnly = WithStringKeys<T1>;
    type NumericKeysOnly = WithNumericKeys<T1>;

    type cases = [
      // the building blocks is being able to determine the string
      // and numeric keys on an object
      Expect<Equal<SK, "foo" | "bar">>,
      Expect<Equal<NK, 1 | 2>>,
      Expect<Equal<NonString, 1 | 2>>,
      // they key based primitives allows us to to then just ask
      // for the object with only string-based keys represented
      Expect<Equal<StringKeysOnly, { foo: number; bar: string }>>,
      Expect<Equal<NumericKeysOnly, { 1: string; 2: string }>>
    ];
    const cases: cases = [true, true, true, true, true];
    expect(cases).toBe(cases);
  });
});
