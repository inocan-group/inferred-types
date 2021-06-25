import { Equal, Expect } from "@type-challenges/utils";
import { DictArray } from "~/types";
import { defineType, dictToArray, filterDictArray } from "~/utility";

describe("filterDictArray()", () => {

  it("an object converted into a DictArray can be filter down to a subset", () => {
    const obj = defineType({ id: 123 })({ color: "red", favorite: true });
    type Obj = typeof obj;
    const arr = dictToArray(obj);
    type Arr = typeof arr;

    const filtered = filterDictArray(arr, (k, _v) => {
      return k !== "color";
    });
    type Filtered = typeof filtered;

    // run time tests
    expect(arr).toHaveLength(3);
    expect(filtered).toHaveLength(2);
    expect(filtered.map(i => i[0])).toContain("id");
    expect(filtered.map(i => i[0])).toContain("favorite");
    expect(filtered.map(i => i[0])).not.toContain("color");

    // type tests
    type cases = [
      Expect<Equal<Filtered, DictArray<Exclude<Obj, "color">>>>,
    ];
    const cases: cases = [true, true];
  });

});