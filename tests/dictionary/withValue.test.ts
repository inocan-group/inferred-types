import { describe,  it } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import { createFnWithProps,  defineObj } from "src/runtime/index";
import { EmptyObject, Dictionary, WithValue } from "src/types/index";

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
  fnWithProp: createFnWithProps(() => "hi",{ foo: "there" }),
  baz: { foo: 1, bar: 2 },
  emptyBaz: {}
});

describe("WithValue<TObj,TVal> type util", () => {
  
  it("using the default 'extends' comparison", () => {
    type Str = WithValue<typeof obj, string>;
    type Num = WithValue<typeof obj, number>;
    type Bool = WithValue<typeof obj, boolean>;
    type Wide = WithValue<Dictionary, string>;

    type cases = [
      Expect<Equal<Str, { id: "foobar"; message: string }>>,
      Expect<Equal<Num, { foo: number; foo2: 2; foo3: 3 }>>,
      Expect<Equal<Bool, { success: true; fail: false; bar: boolean }>>,
      Expect<Equal<Wide, EmptyObject>>
    ];
    const cases: cases = [true, true, true, true ];
  });

  it("using the 'equals' comparison", () => {
    type Str = WithValue<typeof obj, string>;
    type Num = WithValue<typeof obj, number>;
    type Bool = WithValue<typeof obj, boolean, "equals">;

    type cases = [
      //
      Expect<Equal<Str, { id: "foobar"; message: string }>>,
      Expect<Equal<Num, { foo: number; foo2: 2; foo3: 3 }>>,
      Expect<Equal<Bool, { bar: boolean }>>,
    ];
    const cases: cases = [true, true, true  ];
  });
  
});
