/* eslint-disable unicorn/consistent-function-scoping */
import type { Expect, Equal } from "@type-challenges/utils";
import { FunctionType } from "~/types";
import { type, createFnWithProps, isFunction, isObject } from "~/utility";

describe("testing type() utility and some pre-made conditions", () => {
  it("isFunction()", () => {
    const fn = () => "hello world";
    const fn2 = createFnWithProps(() => "hello world", { foo: "bar" });
    const t1 = isFunction(fn);
    const t2 = isFunction(fn2);
    type T1 = typeof t1;
    type T2 = typeof t2;

    expect(t1).toBe(true);
    expect(t2).toBe(true);

    type cases = [
      // a simple function is correctly typed (no surprise)
      Expect<Equal<T1, true>>,
      // but so is a function which has props; using just _typeof_
      // not work
      Expect<Equal<T2, true>>
    ];

    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("isObject detects object which are not arrays and not functions with props", () => {
    const fnWithProps = createFnWithProps(() => "hi", { foo: "bar" });
    const obj = {
      foo: 1,
      bar: { left: "left", right: "right" },
      baz: [1, 2, 3],
      fnWithProps,
    } as const;

    const foo = isObject(obj.foo);
    const bar = isObject(obj.bar);
    const baz = isObject(obj.baz);
    const fnWithProps2 = isObject(obj.fnWithProps);

    // run-time
    expect(foo).toBeFalsy();
    expect(bar).toBeTruthy();
    expect(baz).toBeFalsy();
    expect(fnWithProps2).toBeFalsy();

    // type checking
    type cases = [
      // all tests should result in a discrete, literal true/false
      Expect<Equal<typeof foo, false>>,
      Expect<Equal<typeof bar, true>>,
      Expect<Equal<typeof baz, false>>,
      Expect<Equal<typeof fnWithProps2, false>>
    ];

    const c: cases = [true, true, true, true];
    expect(c).toBe(c);
  });

  it("an object can be detected using type() utility", () => {
    const fnWithProps = createFnWithProps(() => "hi", { foo: "bar" });
    const obj = {
      foo: 1,
      bar: { left: "left", right: "right" },
      baz: [1, 2, 3],
      fnWithProps,
    } as const;
    const o = type((t) => t.object);

    const foo = o.is(obj.foo);
    const bar = o.is(obj.bar);
    const baz = o.is(obj.baz);
    const fnWithProps2 = o.is(obj.fnWithProps);

    // run-time
    expect(foo).toBeFalsy();
    expect(bar).toBeTruthy();
    expect(baz).toBeFalsy();
    expect(fnWithProps2).toBeFalsy();

    // type checking
    type cases = [
      // all tests should result in a discrete, literal true/false
      Expect<Equal<typeof foo, false>>,
      Expect<Equal<typeof bar, true>>,
      Expect<Equal<typeof baz, false>>,
      Expect<Equal<typeof fnWithProps2, false>>
    ];

    const c: cases = [true, true, true, true];
    expect(c).toBe(c);
  });

  it("defining a boolean type", () => {
    const b = type((t) => t.boolean);

    type TypeOf = typeof b.type;

    expect(b.name).toBe("boolean");

    const trueTest = b.is(true);
    const falseTest = b.is(false);
    const nadaTest = b.is("nada");

    expect(trueTest).toBe(true);
    expect(falseTest).toBe(true);
    expect(nadaTest).toBe(false);

    type cases = [
      //
      Expect<Equal<TypeOf, boolean>>,
      Expect<Equal<typeof trueTest, true>>,
      Expect<Equal<typeof falseTest, true>>,
      Expect<Equal<typeof nadaTest, false>>
    ];

    const c: cases = [true, true, true, true];
    expect(c).toBe(c);
  });

  it("defining true type", () => {
    const t = type((t) => t.true);

    const typeOf = t.type;
    type TypeOf = typeof typeOf;

    expect(t.name).toBe("true");

    const trueIsTrue = t.is(true);
    const falseNotTrue = t.is(false);
    const nadaNotTrue = t.is("nada");
    const b = true as boolean;
    const booleanUnknown = t.is(b);

    expect(trueIsTrue).toBe(true);
    expect(falseNotTrue).toBe(false);
    expect(nadaNotTrue).toBe(false);
    // run-time can evaluate, but type system not sure
    expect(booleanUnknown).toBe(true);

    // TODO: return the final type test below to "unknown" versus "boolean" once there's a fix

    type cases = [
      //
      Expect<Equal<TypeOf, true>>,
      Expect<Equal<typeof trueIsTrue, true>>,
      Expect<Equal<typeof falseNotTrue, false>>,
      Expect<Equal<typeof nadaNotTrue, false>>,
      // the type system has no way of knowing
      // because the wide type of "boolean" is
      // a union type which includes true
      Expect<Equal<typeof booleanUnknown, boolean>>
    ];

    const c: cases = [true, true, true, true, true];
    expect(c).toBe(c);
  });

  it("defining a function type", () => {
    const t = type((t) => t.function);

    const typeOf = t.type;
    type TypeOf = typeof typeOf;

    expect(t.name).toBe("function");

    const basicFn = t.is(() => "hi");
    const fnWithProps = t.is(createFnWithProps(() => "hi", { foo: "bar" }));
    const nadaTest = t.is("nada");

    expect(basicFn).toBe(true);
    expect(fnWithProps).toBe(true);
    expect(nadaTest).toBe(false);

    type cases = [
      //
      Expect<Equal<TypeOf, FunctionType>>,
      Expect<Equal<typeof basicFn, true>>,
      Expect<Equal<typeof fnWithProps, true>>,
      Expect<Equal<typeof nadaTest, false>>
    ];

    const c: cases = [true, true, true, true];
    expect(c).toBe(c);
  });
});
