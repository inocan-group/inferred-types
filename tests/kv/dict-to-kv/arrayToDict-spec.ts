

describe("arrayToDict()", () => {
  // TODO: re-enable these tests once strong typing is attained
  it.skip("Known DictArray<T> can be converted to strongly typed dictionary", () => {
    // type Dict = { foo: 1; bar: "hi" };
    // const arr = [["foo", { foo: 1 }], ["bar", { bar: "hi" }]] as const;
    // const dict = arrayToDict(arr);

    // // run time checks
    // expect(dict.foo).toBe(1);
    // expect(dict.bar).toBe("hi");

    // // type checks
    // type cases = [
    //   Expect<Equal<typeof dict, Dict>>,
    //   Expect<Equal<typeof dict.foo, 1>>
    // ];
    // const c: cases = [true, true];
    // expect(c).toBe(c);
  });

  it.skip("untyped DictArray can be inferred into a strongly typed dictionary", () => {
    // type Try = FromDictArray<[["foo", { foo: 1 }], ["bar", { bar: "hi" }]]>;

    // const dict = arrayToDict([["foo", { foo: 1 }], ["bar", { bar: "hi" }]]);
    // type Dict = typeof dict;

    // type cases = [
    //   Expect<Equal<Try["foo"], 1>>,
    //   Expect<Equal<Try["bar"], "hi">>,
    //   Expect<Equal<Dict["foo"], 1>>,
    //   Expect<Equal<Dict["bar"], "hi">>
    // ];

  });
});