import { describe, expect, it } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";

import type {  AnyObject, WithValue } from "src/types";
import { createFnWithProps, withValue, defineType } from "src/runtime";

const obj = defineType({
  id: "foobar",
  foo2: 2,
  foo3: 3,
  success: true,
  fail: false
})({
  foo: 1,
  bar: true,
  message: "hi there",
  numericArr: [1, 2, 3],
  strArr: ["foo", "bar"],
  fn: () => "hi",
  fnWithProp: createFnWithProps(() => "hi")({ foo: "there" }),
  baz: { foo: 1, bar: 2 },
  emptyBaz: {}
});

describe("WithValue<TObj,TVal> type util", () => {
  
  it("WithValue<T> type utility works as expected", () => {
    type Str = WithValue<typeof obj, string>;
    type Num = WithValue<typeof obj, number>;
    type Obj = WithValue<typeof obj, AnyObject>;

    type cases = [
      //
      Expect<Equal<Str, { id: "foobar"; message: string }>>,
      Expect<Equal<Num, { foo: number; foo2: 2; foo3: 3 }>>,

      Expect<Equal<keyof Obj, "baz" | "fn" | "fnWithProp">>
    ];
    const cases: cases = [true, true, true];
  });
  
});

describe("withValue() runtime utility", () => {

  it("withValue() can separate string values", () => {
    const partial = withValue(t => t.string());
    const completed = partial(obj);
    
    // run-time
    expect(completed.id).toBe("foobar");
    expect(completed.message).toBe("hi there");
    expect(Object.keys(completed)).not.toContain("foofoo");
    expect(Object.keys(completed)).not.toContain("bar");
    expect(Object.keys(completed)).not.toContain("numericArr");

    // types
    type cases = [
      Expect<Equal<typeof completed, { id: "foobar"; message: string }>>
    ];

    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("withValue() can separate numeric values", () => {
    const partial = withValue(t => t.number());
    const completed = partial(obj);
    
    // run-time
    expect(completed.foo).toBe(1);
    expect(completed.foo2).toBe(2);
    expect(completed.foo3).toBe(3);
    expect(Object.keys(completed)).not.toContain("foofoo");
    expect(Object.keys(completed)).not.toContain("bar");
    expect(Object.keys(completed)).not.toContain("numericArr");

    // types
    type cases = [
      Expect<Equal<typeof completed, { foo: number; foo2: 2; foo3: 3 }>>
    ];

    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("withValue() can separate boolean values", () => {
    const bool_partial = withValue(t => t.boolean());
    const bool = bool_partial(obj);
    
    // run-time
    expect(bool.bar).toBe(true);
    expect(bool.success).toBe(true);
    expect(bool.fail).toBe(false);
    expect(Object.keys(bool)).not.toContain("foofoo");
    expect(Object.keys(bool)).not.toContain("bar");
    expect(Object.keys(bool)).not.toContain("numericArr");

    // types
    type cases = [
      Expect<Equal<typeof bool, { bar: boolean; success: true; fail: false }>>
    ];

    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("withValue() passes runtime and type tests for scalar types", () => {
    const obj = defineType({
      foo: 1,
      foofoo: 2,
      bar: true,
      barbar: false,
      message: "hi there",
      more: { a: 1, b: 3 },
    })();

    const str = withValue((t) => t.string())(obj);
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

    expect(litNum.foo).toBe(1);
    expect((litNum as any).foofoo).toBe(undefined);
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
