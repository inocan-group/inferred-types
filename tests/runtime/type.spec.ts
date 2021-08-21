/* eslint-disable unicorn/consistent-function-scoping */
import type { Expect, Equal } from "@type-challenges/utils";
import { type, createFnWithProps, isFunction } from "~/utility";

describe("testing condition() utility and some pre-made conditions", () => {
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

  it("defining a boolean type", () => {
    const b = type((t) => t.boolean());

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
    const t = type((t) => t.true());

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
      Expect<Equal<typeof t.type, true>>,
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
    const t = type((t) => t.function());

    type TypeOf = typeof t.type;

    expect(t.name).toBe("function");

    const basicFn = t.is(() => "hi");
    const fnWithProps = t.is(createFnWithProps(() => "hi", { foo: "bar" }));
    const nadaTest = t.is("nada");

    expect(basicFn).toBe(true);
    expect(fnWithProps).toBe(true);
    expect(nadaTest).toBe(false);

    type cases = [
      //
      Expect<Equal<TypeOf, Function>>,
      Expect<Equal<typeof basicFn, true>>,
      Expect<Equal<typeof fnWithProps, true>>,
      Expect<Equal<typeof nadaTest, false>>
    ];

    const c: cases = [true, true, true, true];
    expect(c).toBe(c);
  });
});
