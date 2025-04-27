import { describe, expect, it } from "vitest";
import { list, ifArray } from "inferred-types/runtime"
import { Expect, List, Test } from "inferred-types/types";



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
      Expect<Test<typeof l1, "equals", List<number, "32123">>>,
      Expect<Test<typeof l2, "equals", List<number, "02">>>,
      Expect<Test<typeof l3, "equals", List<unknown, "04">>>,
      Expect<Test<typeof l3, "equals", typeof l4>>,
      Expect<Test<typeof mixed, "equals", List<number | string, "3921f2">>>,

      Expect<Test<typeof l1, "extends", List<number>>>,
      Expect<Test<typeof l2, "extends", List<number>>>,
      Expect<Test<typeof mixed, "extends", List<number | string>>>,
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
      Expect<Test<typeof m, "equals", List<string, "2212 -> mapped">>>,
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
      Expect<Test<typeof deep, "equals",  List<string | number | number[], "49312f">>>,
      Expect<Test<typeof flat, "equals",  List<string | number, "49312f -> flattened">>>,
      Expect<Test<typeof kindaFlat, "equals",  List<string | number | number[], "49312f -> flattened">>>,
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
      Expect<Test<typeof wide, "extends", List<string | number>>>,
      Expect<Test<typeof narrow, "extends", List<`found a ${string}` | `found a ${number}`>>>,
    ];
  });



});


