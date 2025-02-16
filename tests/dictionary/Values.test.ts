import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { valuesOf } from "inferred-types/runtime";
import { HasSameValues, Dictionary, ObjectKey, Values, EmptyObject } from "inferred-types/types";


describe("Values<T>", () => {

  type Obj = {
    foo: 1;
    bar: "bar";
    baz: true;
  }

  it("Values<T> where T is an object", () => {
    type VObj = Values<Obj>;
    type VEmpty = Values<Dictionary>;
    type VRecord = Values<Record<ObjectKey, unknown>>;

    type cases = [
      ExpectTrue<HasSameValues<VObj, [1, "bar", true]>>,
      Expect<Equal<VEmpty, []>>,
      Expect<Equal<VRecord, []>>,
    ];
    const cases: cases = [
      true, true, true
    ];
  });

  it("Values<T> where T is a tuple or array", () => {
    type VArr = Values<[1, 2, 3]>;
    type VEmpty = Values<[]>;
    type VStrArr = Values<string[]>;
    type VMixedTuple = Values<[number, string, boolean]>;
    type VUnion = Values<(string | number)[]>

    type cases = [
      Expect<Equal<VArr, [1, 2, 3]>>,
      Expect<Equal<VEmpty, []>>,
      Expect<Equal<VStrArr, string[]>>,
      Expect<Equal<VMixedTuple, [number, string, boolean]>>,
      Expect<Equal<VUnion, (string | number)[]>>,
    ];
    const cases: cases = [
      true, true, true,
      true, true,
    ];
  });
});

describe("valuesOf()", () => {
  const obj = {
    foo: 1,
    bar: "bar",
    baz: true
  } as const;

  it("Happy Path", () => {
    const v_obj = valuesOf(obj);
    const v_empty = valuesOf({} as EmptyObject);
    const v_infer = valuesOf({ foo: 1, bar: "bar", baz: true });

    expect(v_obj).toEqual([1, "bar", true]);
    expect(v_infer).toEqual([1, "bar", true]);
    expect(v_empty).toEqual([]);

    type cases = [
      ExpectTrue<HasSameValues<typeof v_obj, [1, "bar", true]>>,
      ExpectTrue<HasSameValues<typeof v_infer, [1, "bar", true]>>,
      Expect<Equal<typeof v_empty, []>>,
    ];
    const cases: cases = [true, true, true];
  });

});
