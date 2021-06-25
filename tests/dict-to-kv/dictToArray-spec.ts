/* eslint-disable unicorn/consistent-function-scoping */
import { Equal, Expect } from "@type-challenges/utils";
import { DictArrayKv, ExpandRecursively } from "~/types";
import { dictToArray, arrayToDict, literal } from "~/utility";


describe("dictionary transforms", () => {

  it("dictToArray() provides iterable array with type structure preserved (though values are broad)", () => {
    const dict = { foo: 1, bar: 2, baz: "hi" };
    const arr = dictToArray({ foo: 1, bar: 2, baz: "hi" });

    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBe(Object.keys(dict).length);

    for (const t of arr) {
      expect(typeof t[0]).toBe("string");
      expect(typeof t[1]).toBe("object");


      if (t[0] === "foo") {
        // runtime checks out
        const [_, kv] = t;
        expect(typeof kv.foo).toBe("number");

        // type system checks out
        type Tuple = typeof t;
        type KV = typeof kv;
        type V = typeof kv["foo"];

        type cases = [
          // the Tuple element can be expressed as a `DictArrayKv`
          Expect<Equal<Tuple, DictArrayKv<"foo", typeof dict>>>,
          // or as just the tuple elements directly
          Expect<Equal<Tuple, ["foo", { foo: number }]>>,
          // The object's definition has been reduced 
          // just to key/value of the correct type
          Expect<Equal<KV, { foo: number }>>,
          // the value of the KV is correct
          Expect<Equal<V, number>>,
        ];
        const cases: cases = [true, true, true, true];
      }

      if (t[0] === "baz") {
        const [_, kv] = t;
        // runtime checks out
        expect(typeof kv.baz).toBe("string");

        // type system checks out
        type KV = typeof kv;
        type V = typeof kv["baz"];
        type cases = [
          // The object's definition has been reduced 
          // just to key/value of the correct type
          Expect<Equal<KV, { baz: string }>>,
          // the value of the KV is correct
          Expect<Equal<V, string>>
        ];
        const cases: cases = [true, true];
      }
    }


  });
  it("When combined with literal() we can get narrow type definitions", () => {
    const dict = { foo: 1, bar: 2, baz: "hi" };
    const arr = dictToArray(literal({ foo: 1, bar: 2, baz: "hi" }));
    type Arr = typeof arr;
    type Arr2 = ExpandRecursively<Arr>;

    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBe(Object.keys(dict).length);

    for (const t of arr) {
      expect(typeof t[0]).toBe("string");
      expect(typeof t[1]).toBe("object");


      if (t[0] === "foo") {
        // runtime checks out
        const [_, kv] = t;
        expect(typeof kv.foo).toBe("number");

        // type system checks out
        type KV = typeof kv;
        type V = typeof kv["foo"];
        type cases = [
          // The object's definition has been reduced 
          // just to key/value and value is narrowly typed
          Expect<Equal<KV, { foo: 1 }>>,
          // the value is narrowly typed correct
          Expect<Equal<V, 1>>,
          // of note, the type presented to user in vs-code
          // is much bulkier in "Arr" than "Arr2" but they
          // are representations of the same thing
          Expect<Equal<Arr, Arr2>>,
        ];
        const cases: cases = [true, true, true];
      }

      if (t[0] === "baz") {
        const [_, kv] = t;
        // runtime checks out
        expect(typeof kv.baz).toBe("string");

        // type system checks out
        type KV = typeof kv;
        type V = typeof kv["baz"];
        type cases = [
          // The object's definition has been reduced 
          // just to key/value of the correct type
          Expect<Equal<KV, { baz: "hi" }>>,
          // the value of the KV is correct
          Expect<Equal<V, "hi">>
        ];
        const cases: cases = [true, true];
      }
    }
  });


  it("arrayToDict() is inverse of dictToArray() with wide types", () => {
    const dict = { foo: 1, bar: 2, baz: "hi" };
    const arr = dictToArray(dict);
    const back = arrayToDict(arr);

    type cases = [
      Expect<Equal<typeof dict, typeof back>>
    ];

    const cases: cases = [true];
    expect(cases).toBe(cases);
  });


});

