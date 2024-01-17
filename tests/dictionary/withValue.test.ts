import { describe,  it } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";

import type {   WithValue } from "src/types/index";
import { createFnWithProps,  defineObj } from "src/runtime/index";

const obj = defineObj({
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

    type cases = [
      //
      Expect<Equal<Str, { id: "foobar"; message: string }>>,
      Expect<Equal<Num, { foo: number; foo2: 2; foo3: 3 }>>,
    ];
    const cases: cases = [true, true ];
  });
  
});

// describe("withValue() runtime utility", () => {

//   it("withValue() can separate string values", () => {
//     const partial = withValue(t => t.string());
//     const completed = partial(obj);
    
//     // run-time
//     expect(completed.id).toBe("foobar");
//     expect(completed.message).toBe("hi there");
//     expect(Object.keys(completed)).not.toContain("foofoo");
//     expect(Object.keys(completed)).not.toContain("bar");
//     expect(Object.keys(completed)).not.toContain("numericArr");

//     // types
//     type cases = [
//       Expect<Equal<typeof completed, { id: "foobar"; message: string }>>
//     ];

//     const c: cases = [true];
//     expect(c).toBe(c);
//   });

//   it("withValue() can separate numeric values", () => {
//     const partial = withValue(t => t.number());
//     const completed = partial(obj);
    
//     // run-time
//     expect(completed.foo).toBe(1);
//     expect(completed.foo2).toBe(2);
//     expect(completed.foo3).toBe(3);
//     expect(Object.keys(completed)).not.toContain("foofoo");
//     expect(Object.keys(completed)).not.toContain("bar");
//     expect(Object.keys(completed)).not.toContain("numericArr");

//     // types
//     type cases = [
//       Expect<Equal<typeof completed, { foo: number; foo2: 2; foo3: 3 }>>
//     ];

//     const c: cases = [true];
//     expect(c).toBe(c);
//   });

//   it("withValue() can separate boolean values", () => {
//     const bool_partial = withValue(t => t.boolean());
//     const bool = bool_partial(obj);
    
//     // run-time
//     expect(bool.bar).toBe(true);
//     expect(bool.success).toBe(true);
//     expect(bool.fail).toBe(false);
//     expect(Object.keys(bool)).not.toContain("foofoo");
//     expect(Object.keys(bool)).not.toContain("numericArr");

//     // types
//     type cases = [
//       Expect<Equal<typeof bool, { bar: boolean; success: true; fail: false }>>
//     ];

//     const c: cases = [true];
//     expect(c).toBe(c);
//   });

//   it("withValue() passes runtime and type tests for scalar types", () => {
//     const obj = defineObj({
//       foo: 1,
//       foofoo: 2,
//       bar: true,
//       barbar: false,
//       message: "hi there",
//       more: { a: 1, b: 3 },
//     })();

//     const str = withValue((t) => t.string())(obj);
//     expect(str).toEqual({ message: "hi there"});
//     type Str = typeof str;
//     const num = withValue((t) => t.number())(obj);
//     expect(num).toEqual({ foo: 1, foofoo: 2});
//     type Num = typeof num;
//     const bool = withValue((t) => t.boolean())(obj);
//     type Bool = typeof bool;
//     expect(bool).toEqual({ bar: true, barbar: false });
//     // const litNum = withValue((t) => t.literal(1 as const))(obj);
//     // type LitNum = typeof litNum;

//     const truth = withValue((t) => t.boolean(true))(obj);
//     type Truth = typeof truth;

//     type cases = [
//       Expect<Equal<Str, {  message: "hi there" }>>,
//       Expect<Equal<Num, {  foo: 1;  foofoo: 2 }>>,
//       Expect<Equal<Bool, {  bar: true;  barbar: false }>>,
//       // Expect<Equal<LitNum, { readonly foo: 1 }>>,
//       Expect<Equal<Truth, { bar: true }>>
//     ];
//     const cases: cases = [true, true, true, true];

//   });

//   it("withValue() passes runtime and type tests with object type", () => {
//     const obj = {
//       num: 1,
//       obj: { left: "left", right: "right" },
//       arr: [1, 2, 3],
//     } as const;

//     const o = withValue((t) => t.object())(obj);
//     type O = typeof o;
//     type K = keyof O;

//     expect(typeof o).toBe("object");
//     expect(typeof o.obj).toBe("object");
//     expect(o.obj.left).toBe("left");
//     expect(o).not.toHaveProperty("num");
//     expect(o).not.toHaveProperty("arr");

//     type cases = [
//       //
//       Expect<Equal<K, "obj">>
//     ];
//     const cases: cases = [true];
//     expect(cases).toBe(cases);
//   });
// });
