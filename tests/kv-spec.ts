/* eslint-disable unicorn/consistent-function-scoping */
import { Equal, Expect, ExpectExtends, ExpectFalse } from "@type-challenges/utils";
import { Keys, kvDictArray, kvMap, kvToDictionary, kvTupleArray } from "~/utility";

describe("kvDictArray", () => {

  it("dictionary is converted into KV format", () => {
    const dict = { foo: 1, bar: 2, baz: "hi" };
    const kv = kvDictArray(dict);

    expect(Array.isArray(kv)).toBe(true);
    for (const kvi of kv) {
      expect(Keys(kvi)).toContain("key");
      expect(Keys(kvi)).toContain("value");

      type Key = typeof kvi["key"];
      type Value = typeof kvi["value"];

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

  it("kvDictArray() and kvToDictionary() are inverses of each other", () => {
    const dict = { foo: 1, bar: 2, color: { red: 1, blue: 2 } };
    const kv = kvDictArray(dict);
    console.log(Array.isArray(kv), kv[0]);

    const inverse = kvToDictionary(kv);


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
    const kv = kvTupleArray(dict);

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