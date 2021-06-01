import type { Expect, Equal } from "@type-challenges/utils";
import { OptionalKeys, RequiredKeys, RequiredProps, PartialOf } from "~/types/dictionaries";

describe("Dictionary Type Utils", () => {
  it("RequiredKeys<T> extracts the right keys", () => {
    type T0 = { foo: number; bar: number; baz: string };
    type T1 = { foo: number; bar: number; baz?: string };
    type T2 = { foo: number; bar?: number; baz?: string };
    type T3 = { foo?: number; bar?: number; baz?: string };

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
    type T0 = { foo: number; bar: number; baz: string };
    type T1 = { foo: number; bar: number; baz?: string };
    type T2 = { foo: number; bar?: number; baz?: string };
    type T3 = { foo?: number; bar?: number; baz?: string };

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
    type T0 = { foo: number; bar: number; baz: string };
    type T1 = { foo: number; bar: number; baz?: string };
    type T2 = { foo: number; bar?: number; baz?: string };
    type T3 = { foo?: number; bar?: number; baz?: string };

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
    type T0 = { foo: number; bar: number; baz: string };
    type T1 = { foo: number; bar: number; baz?: string };
    type T2 = { foo: number; bar?: number; baz?: string };
    type T3 = { foo?: number; bar?: number; baz?: string };

    type cases = [
      Expect<Equal<RequiredProps<T0>, T0>>,
      Expect<Equal<RequiredProps<T1>, Omit<T0, "baz">>>,
      Expect<Equal<RequiredProps<T2>, Omit<T2, "baz" | "bar">>>,
      Expect<Equal<RequiredProps<T3>, Omit<T3, "foo" | "bar" | "baz">>>
    ];
    const cases: cases = [true, true, true, true];
    expect(cases).toBe(cases);
  });


});
