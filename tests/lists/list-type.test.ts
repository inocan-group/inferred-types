import { Expect, Equal } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { list, ifArray } from "inferred-types/runtime"
import { Extends, List } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("list() utility", () => {

  it("Happy Path", () => {
    let arr = [1, 2, 3] as const;
    let l1 = list(1, 2, 3);
    let l2 = list([1, 2, 3]);
    let l2b = list(...arr);
    let l3 = list();
    let l4 = list([]);
    let mixed = list(1, "foo", 2);

    // is iterable
    for (const item of l1) {
      expect(typeof item).toBe("number");
    }

    expect(l1).toEqual([1, 2, 3]);
    expect(l2).toEqual([1, 2, 3]);
    expect(l2b).toEqual([1, 2, 3]);
    expect(l3).toEqual([]);
    expect(mixed).toEqual([1, "foo", 2]);

    expect(l1[0]).toEqual(1);
    expect(l2[0]).toEqual(1);
    expect(l1.at(0)).toEqual(1);
    expect(l2.at(0)).toEqual(1);

    expect(l1.push(4)).toEqual(4);
    expect(l2.push(4)).toEqual(4);

    expect(l1).toEqual([1, 2, 3, 4]);
    expect(l2).toEqual([1, 2, 3, 4]);

    expect(l1.pop()).toEqual(4);
    expect(l2.pop()).toEqual(4);

    expect(l1).toEqual([1, 2, 3]);
    expect(l2).toEqual([1, 2, 3]);

    type cases = [
      Expect<Equal<typeof l1, List<number, "32123">>>,
      Expect<Equal<typeof l2, List<number, "02">>>,
      Expect<Equal<typeof l3, List<unknown, "04">>>,
      Expect<Equal<typeof l3, typeof l4>>,
      Expect<Equal<typeof mixed, List<number | string, "3921f2">>>,

      Expect<Extends<typeof l1, List<number>>>,
      Expect<Extends<typeof l2, List<number>>>,
      Expect<Extends<typeof mixed, List<number | string>>>,
    ];
    const cases: cases = [
      true, true, true, true, true,
      true, true, true
    ];
  });


  it("Mapping", () => {
    const cb = <T extends number>(v: T) => `${v} is a number`;
    let m = list(1, 2).map(cb);

    expect(m).toEqual([
      "1 is a number",
      "2 is a number",
    ]);

    type cases = [
      Expect<Equal<typeof m, List<string, "2212 -> mapped">>>,
    ];
    const cases: cases = [true];

  });


  it("Flattening", () => {
    let deep = list(1, 2, [3, 4], "foo");
    let deeper = list(1, 2, [3, [4, 5]], "foo");
    let flat = deep.flat();
    let kindaFlat = deeper.flat();
    let superFlat = deeper.flat(2);

    expect(deep).toEqual([1, 2, [3, 4], "foo"]);
    expect(flat).toEqual([1, 2, 3, 4, "foo"]);
    expect(kindaFlat).toEqual([1, 2, 3, [4, 5], "foo"]);
    expect(superFlat).toEqual([1, 2, 3, 4, 5, "foo"]);

    type cases = [
      Expect<Equal<typeof deep, List<string | number | number[], "49312f">>>,
      Expect<Equal<typeof flat, List<string | number, "49312f -> flattened">>>,
      Expect<Equal<typeof kindaFlat, List<string | number | number[], "49312f -> flattened">>>,
    ];
    const cases: cases = [
      true, true, true
    ];

  });


  it("toLocaleString", () => {
    let english = list(1000, 2000, 3000).toLocaleString("en");
    // let uzbek = list(1000,2000,3000).toLocaleString("uz");
    expect(english).toEqual("1,000,2,000,3,000");
    // expect(uzbek).toEqual("1 000,2 000,3 000");
  });



  it("FlatMap", () => {
    let narrowCb = <T extends number | number[] | string>(v: T) =>
      ifArray(v, v => v, v => `found a ${v}`);
    let cb = <T extends number | number[] | string>(v: T) => typeof v === "number"
      ? `${v}`
      : v;

    let deep = list(1, 2, [3, 4], "foo");
    let wide = deep.flatMap(cb);
    let narrow = deep.flatMap(narrowCb);

    type cases = [
      Expect<Extends<typeof wide, List<string | number>>>,
      Expect<Extends<typeof narrow, List<`found a ${string}` | `found a ${number}`>>>,
    ];
    const cases: cases = [
      true, true
    ];

  });



});


