import { defineType, dictToArray, filterDictArray } from "~/utility";

describe("filterDictArray()", () => {

  it("an object converted into a DictArray can be filter down to a subset", () => {
    const obj = defineType({ id: 123 })({ color: "red", favorite: true });

    const arr = dictToArray(obj);

    const filtered = filterDictArray(arr, (k, _v) => {
      return k !== "color";
    });

    // run time tests
    expect(arr).toHaveLength(3);
    expect(filtered).toHaveLength(2);
    expect(filtered.map(i => i[0])).toContain("id");
    expect(filtered.map(i => i[0])).toContain("favorite");
    expect(filtered.map(i => i[0])).not.toContain("color");

    // TODO: uncomment type test below once working!

    // type tests
    type cases = [
      // now that "color" has been removed from `T` the type
      // should no longer be the same DictArray
      // ExpectFalse<Equal<Filtered, DictArray<Obj>>>,
      // Expect<Equal<Filtered, DictArray<Omit<Obj, "color">>>>,
    ];
    const cases: cases = [];
  });

  // TODO: return this test once functionality is working correctly

  it.skip("a filtered down DictArray can be converted back to an object", () => {
    // const obj = defineType({ id: 123 })({ color: "red", favorite: true });
    // type Obj = typeof obj;
    // const arr = dictToArray(obj);
    // type Arr = typeof arr;

    // const filtered = filterDictArray(arr, (k, _v) => {
    //   return k !== "color";
    // });
    // type Filtered = typeof filtered;

    // const reverted = arrayToDict(filtered);
    // type Reverted = typeof reverted;
  });

});