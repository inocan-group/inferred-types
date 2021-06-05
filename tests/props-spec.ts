import type { Expect, Equal } from "@type-challenges/utils";
import { KeysWithValue, OptionalKeys, RequiredKeys, RequiredProps, WithValue } from "~/types/props";

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

  it("KeysWithValue<type, obj> identifies keys of the given object which have a value of specified type", () => {
    type Literal = { foo: 1; bar: true; baz: false; baz2: false };

    type S = KeysWithValue<string, T0>;
    type N = KeysWithValue<number, T0>;
    type LT = KeysWithValue<true, Literal>;
    type LF = KeysWithValue<false, Literal>;

    type cases = [
      Expect<Equal<S, "baz">>,
      Expect<Equal<N, "foo" | "bar">>,
      Expect<Equal<LT, "bar">>,
      Expect<Equal<LF, "baz" | "baz2">>
    ];
    const cases: cases = [true, true, true, true];
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
});
