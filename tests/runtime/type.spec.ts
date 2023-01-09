import { describe, it, expect } from "vitest";

import type { Expect, Equal, ExpectExtends } from "@type-challenges/utils";
import { box, createFnWithProps } from "src/runtime";
import { isFunction } from "src/runtime/type-checks/isFunction";
import { isObject } from "src/runtime/type-checks/isObject";
import { FromTypeDefn, Type, TypeDefn,  TypeHasDefaultValue,  TypeIsRequired,  TypeKind, TypeUnderlying } from "src/types/runtime-types";
import { NoDefaultValue } from "src/types/constants";
import { DoesExtend } from "src/types";
import { type } from "src/runtime/runtime/type";
import { TypeApi } from "src/types/runtime-types/api";

describe("testing type() utility and some pre-made conditions", () => {
  
  it("creating TypeDefn's", () => {
    const builder = <K extends TypeKind, R extends boolean, D extends string,T extends TypeDefn<K,R,D>>(type: T) => type;
    const t1 = builder({kind: "string"});
    const t2 = builder({kind: "string", isRequired: true });
    const t3 = builder({kind: "number", isRequired: true });
    const t4 = builder({kind: "number", isRequired: false });
    const t5 = builder({kind: "string", isRequired: true, description: "hi"});

    type cases = [
      // strings
      Expect<Equal<
        DoesExtend<typeof t1, TypeDefn<"string", true>>,
        true
      >>,
      Expect<Equal<
        DoesExtend<typeof t2, TypeDefn<"string", true>>,
        true
      >>,
      // numbers
      Expect<Equal<
      DoesExtend<typeof t3, TypeDefn<"number", true>>,
      true
    >>,
    Expect<Equal<
      DoesExtend<typeof t4, TypeDefn<"number", false>>,
      true
    >>,
    Expect<Equal<
      DoesExtend<typeof t5, TypeDefn<"string", true, "hi">>,
      true
    >>,
    ];
    const cases: cases = [true, true, true, true, true];
    
  });
  
  
  it("FromTypeDefn<T> utility", () => {
    type S1 = TypeDefn<"string", true, "my description", "no-underlying", NoDefaultValue, "no-validations">;
    type N1 = TypeDefn<"number", true, "a number", "no-underlying", NoDefaultValue, "no-validations">;
    type N2 = TypeDefn<"number", false, "a number", "no-underlying", NoDefaultValue, "no-validations">;
    type S2 = TypeDefn<"string">;

    type TS1 = FromTypeDefn<S1>;
    type TN1 = FromTypeDefn<N1>;
    type TN2 = FromTypeDefn<N2>;
    type TS2 = FromTypeDefn<S2>;
    
    type cases = [
      Expect<ExpectExtends<
        Type<"string", "required", "my description", "no-underlying", "no-default-value", "no-validations">,
        TS1
      >>,
      Expect<ExpectExtends<
        Type<"number", "required", "a number", "no-underlying", "no-default-value", "no-validations">,
        TN1
      >>,
      Expect<ExpectExtends<
        Type<"number", "not-required", "a number", "no-underlying", "no-default-value", "no-validations">,
        TN2
      >>,
      // check resultant types
      Expect<Equal<TS1["type"], string>>,
      Expect<Equal<TN1["type"], number>>,
      Expect<Equal<TN2["type"], number | undefined>>,
      Expect<Equal<TS2["type"], string>>,
    ];
    const cases: cases = [true, true, true, true, true, true, true];
  });

  
  it("defining type with a TypeDefn dictionary", () => {
    const s1 = type({kind: "string"});
    const s2 = type({kind: "string", isRequired: true });
    const s3 = type({kind: "string", isRequired: false });
    const s4 = type({kind: "string", isRequired: false, defaultValue: box("hi") });
    const s5 = type({kind: "string", isRequired: false, description: "hello" });
    
    type ReqString = Type<"string", "required", "", "no-underlying", "no-default-value", "no-validations">;
    type NotReqString<Desc extends string = "", DefVal extends TypeHasDefaultValue = "no-default-value"> = Type<"string", "not-required", Desc, "no-underlying", DefVal, "no-validations">;

    type cases = [
      Expect<Equal<typeof s1, ReqString>>,
      Expect<Equal<typeof s2, ReqString>>,
      Expect<Equal<typeof s3, NotReqString>>,
      Expect<Equal<typeof s4, NotReqString<"", "with-default-value">>>,
      Expect<Equal<typeof s5, NotReqString<"hello">>>,
    ];

    const cases: cases = [true, true, true, true, true];
  });

  
  it("use of TypeApi works as expected type wise", () => {
    const api = null as unknown as TypeApi; // fake implementation
    const b1 = api.boolean();
    const b2 = api.boolean({ isRequired: false });
    const s1 = api.string({ description: "i am a string"});
    const s2 = api.string({ defaultValue: box("foo") });
    const l1 = api.stringLiteral(["foo", "bar", "baz"]);

    type Expected<
      K extends TypeKind,
      R extends TypeIsRequired = "required",
      D extends string = "",
      U extends TypeUnderlying = "no-underlying",
      Val extends TypeHasDefaultValue = "no-default-value"
    > = Type<K,R,D,U,Val, "no-validations">;
    
    type cases = [
      Expect<Equal<typeof b1, Expected<"boolean">>>,
      Expect<Equal<typeof b2, Expected<"boolean", "not-required">>>,
      Expect<Equal<typeof s1, Expected<"string", "required", "i am a string">>>,
      Expect<Equal<
        typeof s2, 
        Expected<"string", "required", "", "no-underlying", "with-default-value">
      >>,
      Expect<Equal<
        typeof l1, 
        Expected<"stringLiteral", "required", "", readonly ["foo", "bar", "baz"]>
      >>,
      
    ];
    const cases: cases = [ true, true, true, true, true ];
  });
  
  
  
  
  it("defining scalar types", () => {
    const s = type(d => d.string({desc: "my lucky string"}));
    const n = type(d => d.number({desc: "my lucky number"}));
    const b = type(d => d.boolean({desc: "my lucky coin"}));

    // TODO: this needs to resolve correctly in impl and then test built property
    const _sl = type(d => d.stringLiteral(["foo", "bar"], {desc: "where is baz"}));
    const _nl = type(d => d.numericLiteral([1, 42, 99], {desc: "reasonable numbers"}));
    const _t = type(d => d.true({desc: "i am no liar"}));
    const _f = type(d => d.false({desc: "or am I?"}));

    type cases = [
      Expect<Equal<typeof s, StringType<string, "my lucky string">>>,
      Expect<Equal<typeof n, NumericType<number, "my lucky number">>>,
      Expect<Equal<typeof b, BooleanType<boolean, "my lucky coin">>>,
      
    ];
    const cases: cases = [true, true, true];
  });
  


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

  it.skip("an object can be detected using type() utility", () => {
    // const fnWithProps = createFnWithProps(() => "hi", { foo: "bar" });
    // const obj = {
    //   foo: 1,
    //   bar: { left: "left", right: "right" },
    //   baz: [1, 2, 3],
    //   fnWithProps,
    // } as const;
    // const o = type((t) => t.object);

    // const foo = o.is(obj.foo);
    // const bar = o.is(obj.bar);
    // const baz = o.is(obj.baz);
    // const fnWithProps2 = o.is(obj.fnWithProps);

    // // run-time
    // expect(foo).toBeFalsy();
    // expect(bar).toBeTruthy();
    // expect(baz).toBeFalsy();
    // expect(fnWithProps2).toBeFalsy();

    // // type checking
    // type cases = [
    //   // all tests should result in a discrete, literal true/false
    //   Expect<Equal<typeof foo, false>>,
    //   Expect<Equal<typeof bar, true>>,
    //   Expect<Equal<typeof baz, false>>,
    //   Expect<Equal<typeof fnWithProps2, false>>
    // ];

    // const c: cases = [true, true, true, true];
    // expect(c).toBe(c);
  });

  it.skip("defining a boolean type", () => {
    // const b = type((t) => t.boolean);

    // type TypeOf = typeof b.type;

    // expect(b.name).toBe("boolean");

    // const trueTest = b.is(true);
    // const falseTest = b.is(false);
    // const nadaTest = b.is("nada");

    // expect(trueTest).toBe(true);
    // expect(falseTest).toBe(true);
    // expect(nadaTest).toBe(false);

    // type cases = [
    //   //
    //   Expect<Equal<TypeOf, boolean>>,
    //   Expect<Equal<typeof trueTest, true>>,
    //   Expect<Equal<typeof falseTest, true>>,
    //   Expect<Equal<typeof nadaTest, false>>
    // ];

    // const c: cases = [true, true, true, true];
    // expect(c).toBe(c);
  });

  it.skip("defining true type", () => {
    // const t = type((t) => t.true);

    // const typeOf = t.type;
    // type TypeOf = typeof typeOf;

    // expect(t.name).toBe("true");

    // const trueIsTrue = t.is(true as true);
    // const falseNotTrue = t.is(false as false);
    // const nadaNotTrue = t.is("nada");
    // const b = true as boolean;
    // const booleanUnknown = t.is(b);

    // expect(trueIsTrue).toBe(true);
    // expect(falseNotTrue).toBe(false);
    // expect(nadaNotTrue).toBe(false);
    // // run-time can evaluate, but type system not sure
    // expect(booleanUnknown).toBe(true);

    // // TODO: return the final type test below to "unknown" versus "boolean" once there's a fix

    // type cases = [
    //   //
    //   Expect<Equal<TypeOf, true>>,
    //   Expect<Equal<typeof trueIsTrue, true>>,
    //   Expect<Equal<typeof falseNotTrue, false>>,
    //   Expect<Equal<typeof nadaNotTrue, false>>,
    //   // the type system has no way of knowing
    //   // because the wide type of "boolean" is
    //   // a union type which includes true
    //   Expect<Equal<typeof booleanUnknown, boolean>>
    // ];

    // const c: cases = [true, true, true, true, true];
    // expect(c).toBe(c);
  });

  it.skip("defining a function type", () => {
    // const t = type((t) => t.function);

    // const typeOf = t.type;
    // type TypeOf = typeof typeOf;

    // expect(t.name).toBe("function");

    // const basicFn = t.is(() => "hi");
    // const fnWithProps = t.is(createFnWithProps(() => "hi", { foo: "bar" }));
    // const nadaTest = t.is("nada");

    // expect(basicFn).toBe(true);
    // expect(fnWithProps).toBe(true);
    // expect(nadaTest).toBe(false);

    // type cases = [
    //   //
    //   Expect<Equal<TypeOf, FunctionType>>,
    //   Expect<Equal<typeof basicFn, true>>,
    //   Expect<Equal<typeof fnWithProps, true>>,
    //   Expect<Equal<typeof nadaTest, false>>
    // ];

    // const c: cases = [true, true, true, true];
    // expect(c).toBe(c);
  });
});
