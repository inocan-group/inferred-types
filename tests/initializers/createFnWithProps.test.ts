import { Equal, Expect } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";

import { createFnWithProps, createFnWithPropsExplicit } from "inferred-types/runtime";

const fn = () => "hi" as const;
const fnWithParam = (name: string) => `hi ${name}` as const;
const fnWithTwoParam = (name: string, age: number) => `hi ${name}, you are ${age}` as const;
const fnNarrowing = <T extends string>(name: T) => `hi ${name}` as const;

describe("createFnWithProps()", () => {
  it("happy path", () => {
    const foo = createFnWithProps(fn, {foo: 42});
    expect(foo.foo).toBe(42);
    const fooWithParam = createFnWithProps(fnWithParam, {foo: 42});
    const fooWithTwo = createFnWithProps(fnWithTwoParam, {foo: 42});
    const fooNarrowing = createFnWithProps(fnNarrowing, {foo: 42});

    const n_foo = createFnWithProps(fn, {foo: 42}, true);
    const n_fooWithParam = createFnWithProps(fnWithParam, {foo: 42}, true);
    const n_fooWithTwo = createFnWithProps(fnWithTwoParam, {foo: 42}, true);
    const n_fooNarrowing = createFnWithProps(fnNarrowing, {foo: 42}, true);

    type cases = [
      Expect<Equal<typeof foo, (() => "hi") & { foo: 42 }>>,
      Expect<Equal<
        typeof fooWithParam,
        ((name: string) => `hi ${string}`) & { foo: 42 }
      >>,
      Expect<Equal<
        typeof fooWithTwo,
        ((name: string, age: number) => `hi ${string}, you are ${number}`) & { foo: 42 }
      >>,
      Expect<Equal<
        typeof fooNarrowing,
        ((name: string) => `hi ${string}`) & { foo: 42 }
      >>,


      Expect<Equal<
        typeof n_foo,
        (<A extends []>(...args: A) => "hi") & { foo: 42 }
      >>,
      Expect<Equal<
        typeof n_fooWithParam,
        (<A extends [name: string]>(...args: A) => `hi ${string}`) & { foo: 42 }
      >>,
      Expect<Equal<
        typeof n_fooWithTwo,
        (<A extends [name: string, age: number]>(...args: A) => `hi ${string}, you are ${number}`) & { foo: 42 }
      >>,
      Expect<Equal<
        typeof n_fooNarrowing,
        (<A extends [name: string]>(...args: A) => `hi ${string}`) & { foo: 42 }
      >>,
    ];
    const cases: cases = [
      true, true, true, true,
      true, true, true, true,
    ];
  });
});

describe("createFnWithPropsExplicit()", () => {

  it("non-explicit works but with wider type discovery", () => {
    const foo = createFnWithPropsExplicit(() => "hi", { foo: 1 });
    type Foo = typeof foo;

    expect(foo()).toBe("hi");
    expect(foo.foo).toBe(1);

    // @ts-ignore
    type cases = [
      Expect<Equal<Foo["foo"], number>>,
      Expect<Equal<ReturnType<Foo>, string>>,
    ]

  });


  it("explicit typing gives full shape", () => {
    type Fn = () => "hi";
    type Prop = { foo: 1 };

    const foo = createFnWithPropsExplicit<Fn,Prop>(() => "hi", { foo: 1 });
    type Foo = typeof foo;

    expect(foo()).toBe("hi");
    expect(foo.foo).toBe(1);

    // @ts-ignore
    type cases = [
      Expect<Equal<Foo["foo"], 1>>,
      Expect<Equal<ReturnType<Foo>, "hi">>,
    ]

  });


});

