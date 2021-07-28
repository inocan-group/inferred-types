import { Equal, Expect } from "@type-challenges/utils";
import { FromDictArray } from "~/types";
import { arrayToDict } from "~/utility";


describe("arrayToDict()", () => {
  // TODO: re-enable these tests once strong typing is attained
  it("Known DictArray<T> can be converted to strongly typed dictionary", () => {
    const dict = arrayToDict([["foo", { foo: 1 }], ["bar", { bar: "hi" }]]);

    // run time checks
    expect(dict.foo).toBe(1);
    expect(dict.bar).toBe("hi");

    // type checks
    type cases = [
      Expect<Equal<typeof dict, { foo: number; bar: string }>>,
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("untyped DictArray can be inferred into a strongly typed dictionary", () => {
    type Try = FromDictArray<[["foo", { foo: 1 }], ["bar", { bar: "hi" }]]>;
    const dict = arrayToDict([["foo", { foo: 1 }], ["bar", { bar: "hi" }]]);
    type Dict = typeof dict;

    type cases = [
      Expect<Equal<Try["foo"], 1>>,
      Expect<Equal<Try["bar"], "hi">>,
      // TODO getting this to do strong typing is almost surely possible but with dictToKv() and kvToDict() we probably have a better solution
      // Expect<Equal<Dict["foo"], 1>>,
      // Expect<Equal<Dict["bar"], "hi">>
    ];

  });
});