/* eslint-disable unicorn/consistent-function-scoping */
import { Equal, Expect, ExpectExtends, ExpectFalse } from "@type-challenges/utils";
import { ExpandRecursively } from "~/types";
import { keys, kvDictArray, kvMap, dictToArray, arrayToDict } from "~/utility";


describe("dictionary transforms", () => {

  it("dictToArray() works with ", () => {
    const dict = { foo: 1, bar: 2, baz: "hi" };
    const arr = dictToArray(dict);
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
          // just to key/value of the correct type
          Expect<Equal<KV, { foo: number }>>,
          // the value of the KV is correct
          Expect<Equal<V, number>>,
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
          Expect<Equal<KV, { baz: string }>>,
          // the value of the KV is correct
          Expect<Equal<V, string>>
        ];
        const cases: cases = [true, true];
      }

    }
  });

  it("arrayToDict() is inverse of dictToArray()", () => {
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

describe("kvDictArray", () => {

  it("dictionary is converted into KV format", () => {
    const dict = { foo: 1, bar: 2, baz: "hi" };
    const kv = kvDictArray(dict);

    expect(Array.isArray(kv)).toBe(true);
    for (const kvi of kv) {
      expect(keys(kvi)).toContain("key");
      expect(keys(kvi)).toContain("value");

      const { key, value } = kvi;

      type Key = typeof key;
      type Value = typeof value;

      type cases = [
        // the key extends string
        Expect<ExpectExtends<string, Key>>,
        // but is a narrower string literal
        ExpectFalse<Equal<string, Key>>,
        // expressed another way
        ExpectFalse<ExpectExtends<Key, string>>,
        // the value, at this stage is the full dictionary
        Expect<ExpectExtends<typeof dict, Value>>
      ];

      const cases: cases = [true, false, false, true];
      expect(cases).toBe(cases);

      if (key === "foo") {
        type FooValue = typeof value;

        type cases = [
          // value is an object of key/value
          Expect<ExpectExtends<object, FooValue>>,
          // the intent is that with isolating to a key, 
          // we would get the type of just the KV not
          // the dictionary
          Expect<Equal<{ foo: number }, FooValue>>
        ];

      }
    }
  });

  it.skip("kvDictArray() and kvToDictionary() are inverses of each other", () => {
    const dict = { foo: 1, bar: 2, color: { red: 1, blue: 2 } };
    const kv = kvDictArray(dict);
    console.log(Array.isArray(kv), kv[0]);

    // const inverse = kvToDictionary(kv);
  });


});

describe("kvMap", () => {
  it("Simple dictionary is converted to KV Map", () => {
    const dict = { foo: 1, bar: 2, baz: "hi", xyz: { a: 43 } };
    const map = kvMap(dict);




  });
});

describe("kvTupleArray", () => {
  it("Simple dictionary converted into kvTupleArray", () => {
    const dict = { foo: 1, bar: 2, baz: "hi" };
    const kv = dictToArray(dict);

    expect(Array.isArray(kv)).toBe(true);
    for (const kvi of kv) {
      // each array is a KV tuple
      expect(Array.isArray(kvi)).toBe(true);
      expect(kvi.length).toBe(2);

      type Key = typeof kvi[0];
      type Value = typeof kvi[1];

      type cases = [
        // the key extends string
        Expect<ExpectExtends<string, Key>>,
        // but is a narrower string literal
        ExpectFalse<Equal<string, Key>>,
        // expressed another way
        ExpectFalse<ExpectExtends<Key, string>>,
        // the value, however, is left wide versus forcing it into a literal
        Expect<ExpectExtends<string | number, Value>>
      ];
      const cases: cases = [true, false, false, true];
      expect(cases).toBe(cases);
    }
  });
})