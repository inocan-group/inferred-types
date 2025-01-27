import { Equal, Expect } from "@type-challenges/utils";

import { ifEqual, isEqual, mapOver, MapOverArray, MapOverObject, narrow, toKeyValue } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("mapOver(container,callback)", () => {
  const obj = narrow({ id: 1, color: "blue" });
  const arr = narrow("foo", "bar", "baz")

  it("partial application provides function and kind property", () => {
    const map = mapOver(obj);
    expect(map.kind).toEqual("MapOverObject");
    expect(typeof map).toEqual("function");

    const mapO2A = mapOver(obj, true);
    expect(mapO2A.kind).toEqual("MapOverObjectToArray")
    expect(typeof mapO2A).toEqual("function");

    const mapArr = mapOver(arr);
    expect(mapArr.kind).toEqual("MapOverArray");
    expect(typeof mapArr).toEqual("function");


    type cases = [
      Expect<Equal<
        typeof map,
        MapOverObject<{
          id: 1;
          color: "blue";
        }>
      >>,

      Expect<Equal<
        typeof mapArr,
        MapOverArray<readonly ["foo", "bar", "baz"]>
      >>,
    ];
  });

  it("mapping object to object", () => {
    const whenColor = ifEqual("color");
    const map = mapOver(obj);
    const arr = mapOver(obj, true);
    const kv = toKeyValue(obj);

    // TODO: this type is not narrow enough
    const red = map(kv => {
      return kv.key === "color" ? "red" : kv.value;
    });

    expect(red).toEqual({ id: 1, color: "red" })

    const redArr = arr

    type cases = [
      /** type tests */
    ];

  });


});
