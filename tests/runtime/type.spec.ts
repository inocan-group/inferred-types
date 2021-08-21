import type { Expect, Equal } from "@type-challenges/utils";
import {
  type,
  createFnWithProps,
  isFunction,
  IsFunction,
  IsTrue,
  IsBoolean,
  IsFalse,
} from "~/utility";

describe("testing condition() utility and some pre-made conditions", () => {
  it("isFunction()", () => {
    const t1 = isFunction(() => "hello world");
    const t2 = isFunction(() => createFnWithProps(() => "hello world", { foo: "bar" }));
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
    const t = type((t) => t.boolean());

    const [name, typeOf, validator] = t;
    type TypeOf = typeof typeOf;

    expect(name).toBe("boolean");

    const trueTest = validator(true);
    const falseTest = validator(false);
    const nadaTest = validator("nada");

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

    const [name, typeOf, validator] = t;
    type TypeOf = typeof typeOf;

    expect(name).toBe("true");

    const trueIsTrue = validator(true);
    const falseNotTrue = validator(false);
    const nadaNotTrue = validator("nada");
    const b = true as boolean;
    const booleanUnknown = validator(b);

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
    const t = type((t) => t.function());

    const [name, typeOf, validator] = t;
    type TypeOf = typeof typeOf;

    expect(name).toBe("function");

    const basicFn = validator(() => "hi");
    const fnWithProps = validator(createFnWithProps(() => "hi", { foo: "bar" }));
    const nadaTest = validator("nada");

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
