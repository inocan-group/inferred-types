import { Equal, Expect, NotEqual } from "@type-challenges/utils";
import { DictFromKv } from "~/types/kv/DictFromKv";
import { keys } from "~/utility";
import { dictToKv, kvToDict } from "~/utility/dictionary/kv";


describe("dictToKv()", () => {

  it("basic structure is correct", () => {
    const obj = { id: 123, foo: "bar" } as const;
    const val = dictToKv(obj);

    expect(Array.isArray(val)).toBeTruthy();
    expect(val).toHaveLength(2);
    expect(val.every(i => Object.keys(i).includes("key"))).toBeTruthy();
    expect(val.every(i => Object.keys(i).includes("value"))).toBeTruthy();

    for (const kv of val) {
      if (kv.key === "id") {

        type cases = [
          Expect<Equal<typeof kv.key, "id">>,
          Expect<Equal<typeof kv.value, 123>>
        ];
        const c: cases = [true, true];
        expect(c).toBe(c);
      }
    }

  });

});

describe("kvToDict()", () => {

  it("the DictFromKv<T> utility returns original object type", () => {
    const obj = { id: 123, foo: "bar" } as const;
    const val = dictToKv(obj);
    type Back = DictFromKv<typeof val>;

    type cases = [
      Expect<Equal<Back, { id: 123; foo: "bar" }>>
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

});

describe("kvToDict / dictToKv inverse", () => {

  it("run-time inverts correctly", () => {
    const obj = { id: 123, foo: "bar" } as const;
    const inverse = kvToDict(dictToKv(obj));

    expect(keys(inverse).every(i => inverse[i] === obj[i]));
  });

  it("typing inverts correctly", () => {
    const obj = { id: 123, foo: "bar" } as const;
    const inverse = kvToDict(dictToKv(obj));
    type Obj = typeof obj;
    type Inverse = typeof inverse;

    type cases = [
      // while not precisely equal (due to readonly)
      Expect<NotEqual<Inverse, Obj>>,
      // they are equal in each key/value pair
      Expect<Equal<Inverse["id"], Obj["id"]>>,
      Expect<Equal<Inverse["foo"], Obj["foo"]>>,
    ];
    const c: cases = [true, true, true];
    expect(c).toBe(c);
  });

});


