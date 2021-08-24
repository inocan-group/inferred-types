import { createFnWithProps, type, withValue } from "~/utility";
import type { Expect, Equal } from "@type-challenges/utils";
import { WithValue } from "~/types/props";
import { FunctionType } from "~/types";

describe("withValue()() utility", () => {
  it("type reduction with WithValue<T> works as expected", () => {
    const obj = {
      foo: 1,
      foo2: 2 as const,
      foo3: 3 as const,
      bar: true,
      message: "hi there",
      numericArr: [1, 2, 3],
      fn: () => "hi",
      fnWithProp: createFnWithProps(() => "hi", { foo: "there" }),
      baz: { foo: 1, bar: 2 },
    };

    type Str = WithValue<string, typeof obj>;
    type Num = WithValue<number, typeof obj>;
    type NumWithExclusion = WithValue<number, typeof obj, 2>;
    type Fn = WithValue<FunctionType, typeof obj>;
    type Obj = WithValue<Record<string, any>, typeof obj, any[] | FunctionType>;

    type cases = [
      //
      Expect<Equal<Str, { message: string }>>,
      Expect<Equal<Num, { foo: number; foo2: 2; foo3: 3 }>>,
      Expect<Equal<keyof Fn, "fn" | "fnWithProp">>,
      Expect<Equal<NumWithExclusion, { foo: number; foo3: 3 }>>,
      Expect<Equal<keyof Fn, "fn" | "fnWithProp">>,
      Expect<Equal<keyof Obj, "baz">>
    ];
    const cases: cases = [true, true, true, true, true, true];
  });

  it("get a type from type() and using it in WithType<T>", () => {
    const obj = {
      // simple function
      foo: () => 1,
      // function with props
      foofoo: createFnWithProps(() => 2, { foo: "bar" }),
      bar: true,
      message: "hi there",
    } as const;
    type Obj = typeof obj;
    const t = type((t) => t.function);
    type Fn = typeof t.type;

    type Fns = WithValue<Fn, Obj>;
    type Keys = keyof Fns;

    type cases = [
      // keys are correct
      Expect<Equal<Keys, "foo" | "foofoo">>,
      // values too
      Expect<
        Equal<
          Fns,
          {
            readonly foo: () => number;
            readonly foofoo: (() => 2) & { foo: string };
          }
        >
      >
    ];

    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("withValue() can separate functions", () => {
    const fnWithProps = createFnWithProps(() => "hi", { foo: "bar" });
    const obj = {
      foo: () => 1,
      foofoo: 2,
      bar: true,
      barbar: false,
      message: "hi there",
      baz: fnWithProps,
    } as const;
    const fn = withValue((t) => t.function)(obj);
    type Fn = typeof fn;
    type Keys = keyof Fn;

    // run-time
    expect(Object.keys(fn)).toContain("foo");
    expect(Object.keys(fn)).toContain("baz");
    expect(Object.keys(fn)).not.toContain("foofoo");
    expect(Object.keys(fn)).not.toContain("bar");
    expect(Object.keys(fn)).not.toContain("message");

    // types
    type cases = [
      //
      Expect<Equal<Keys, "foo" | "baz">>
    ];

    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("withValue() passes runtime and type tests for scalar types", () => {
    const obj = {
      foo: 1,
      foofoo: 2,
      bar: true,
      barbar: false,
      message: "hi there",
      more: { a: 1, b: 3 },
    } as const;

    const str = withValue((t) => t.string)(obj);
    type Str = typeof str;
    const num = withValue((t) => t.number)(obj);
    type Num = typeof num;
    const bool = withValue((t) => t.boolean)(obj);
    type Bool = typeof bool;
    // const litNum = withValue((t) => t.literal(1))(obj);
    // type LitNum = typeof litNum;
    const truth = withValue((t) => t.true)(obj);
    type Truth = typeof truth;

    type cases = [
      Expect<Equal<Str, { readonly message: "hi there" }>>,
      Expect<Equal<Num, { readonly foo: 1; readonly foofoo: 2 }>>,
      Expect<Equal<Bool, { readonly bar: true; readonly barbar: false }>>,
      // Expect<Equal<LitNum, { readonly foo: 1 }>>,
      Expect<Equal<Truth, { readonly bar: true }>>
    ];
    const cases: cases = [true, true, true, true];

    expect(str.message).toBe("hi there");
    expect((str as any).foo).toBe(undefined);

    expect(num.foo).toBe(1);
    expect(num.foofoo).toBe(2);
    expect((num as any).message).toBe(undefined);

    // expect(litNum.foo).toBe(1);
    // expect((litNum as any).foofoo).toBe(undefined);
  });

  it("withValue() passes runtime and type tests with object type", () => {
    const fnWithProps = createFnWithProps(() => "hi", { foo: "bar" });
    const obj = {
      num: 1,
      obj: { left: "left", right: "right" },
      arr: [1, 2, 3],
      fnWithProps,
    } as const;

    const o = withValue((t) => t.object)(obj);

    type O = typeof o;
    type K = keyof O;

    expect(typeof o).toBe("object");
    expect(typeof o.obj).toBe("object");
    expect(o.obj.left).toBe("left");
    expect(o).not.toHaveProperty("num");
    expect(o).not.toHaveProperty("arr");
    expect(o).not.toHaveProperty("fnWithProps");

    type cases = [
      //
      Expect<Equal<K, "obj">>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });
});
