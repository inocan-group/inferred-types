import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { EnsureKeys, HasSameKeys, Test } from "inferred-types/types";
import { hasKeys } from "inferred-types/runtime";



describe("EnsureKeys<TContainer,TKeys,TType>", () => {

  it("happy path", () => {
    type BASE = { foo: 1 };
    type FooBar = EnsureKeys<BASE, { bar: 3 }>;
    type Overlap = EnsureKeys<BASE, { foo: number; bar: 3 }>;
    type Overlap2 = EnsureKeys<BASE, [{ foo: number; bar: 3 }]>;

    type A_FooBar = EnsureKeys<BASE, ["foo", "bar"]>

    type Obj = EnsureKeys<NonNullable<unknown>, ["foo"]>;
    type Obj2 = EnsureKeys<object, ["foo"]>;

    type cases = [
      Expect<HasSameKeys<FooBar, { foo: 1; bar: 3 }>>,
      Expect<HasSameKeys<Overlap, { foo: 5; bar: 3 }>>,
      Expect<HasSameKeys<Overlap2, { foo: 5; bar: 3 }>>,

      Expect<Test<A_FooBar, "equals",  { foo: 1; bar: unknown }>>,

      Expect<Test<Obj, "equals",  { foo: unknown }>>,
      Expect<Test<Obj2, "equals",  { foo: unknown }>>,
    ];

  });

});

describe("hasKeys() runtime", () => {

  it("happy path", () => {
    const hasFooBar = hasKeys({ foo: 1 as number, bar: 1 as number });
    const hasFooBarArr = hasKeys("foo", "bar");

    const foobar = { foo: 1, bar: 3 } as { foo: 1 };
    const obj = { foo: 1, bar: 3 } as object;

    if (hasFooBar(foobar)) {
      expect(foobar.bar).toEqual(3);
      expect(foobar.foo).toEqual(1);
    }

    if (hasFooBar(obj)) {
      expect(obj.bar).toEqual(3);
      expect(obj.foo).toEqual(1);
    }

    if (hasFooBarArr(foobar)) {
      expect(foobar.bar).toEqual(3);
      expect(foobar.foo).toEqual(1);
    }

    if (hasFooBarArr(obj)) {
      expect(obj.bar).toEqual(3);
      expect(obj.foo).toEqual(1);
    }

  });

});
