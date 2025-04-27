import { describe, expect, it } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import { createFnWithProps } from "inferred-types/runtime";
import { EmptyObject, Dictionary, WithValue } from "inferred-types/types";
import {
    DictionaryWithValueFilter,
    withValue,
    defineObj
} from "inferred-types/runtime";


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
  fnWithProp: createFnWithProps(() => "hi", { foo: "there" }),
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
      Expect<Test<Str, "equals",  { id: "foobar"; message: string }>>,
      Expect<Test<Num, "equals",  { foo: number; foo2: 2; foo3: 3 }>>,
      Expect<Test<Bool, "equals",  { success: true; fail: false; bar: boolean }>>,
      Expect<Test<Wide, "equals",  EmptyObject>>
    ];
    const cases: cases = [true, true, true, true];
  });

  it("using the 'equals' comparison", () => {
    type Str = WithValue<typeof obj, string>;
    type Num = WithValue<typeof obj, number>;
    type Bool = WithValue<typeof obj, boolean, "equals">;

    type cases = [
      //
      Expect<Test<Str, "equals",  { id: "foobar"; message: string }>>,
      Expect<Test<Num, "equals",  { foo: number; foo2: 2; foo3: 3 }>>,
      Expect<Test<Bool, "equals",  { bar: boolean }>>,
    ];
    const cases: cases = [true, true, true];
  });

});

describe("withValue(wo) => (obj) => obj", () => {
  const obj = defineObj({ foo: "hi", bar: 42, baz: 99, bax: "bye" })();

  it("strings", () => {

    const wide = withValue("string");
    const narrow = withValue("string(hi,hello)");

    const wideObj = wide(obj);
    const narrowObj = narrow(obj);

    expect(wideObj).toEqual({ foo: "hi", bax: "bye" });
    expect(narrowObj).toEqual({ foo: "hi" });

    // @ts-ignore
    type cases = [
      Expect<Test<typeof wide, "equals",  DictionaryWithValueFilter<string>>>,
      Expect<Test<typeof narrow, "equals",  DictionaryWithValueFilter<"hi" | "hello">>>,

      Expect<Test<typeof wideObj, { foo: "hi", "equals",  bax: "bye" }>>,
      Expect<Test<typeof narrowObj, "equals",  { foo: "hi" }>>,
    ];
  });

});
