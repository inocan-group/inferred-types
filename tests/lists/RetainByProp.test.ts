import {  Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import {  GetEach, HasSameValues, RetainByProp } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("RetainByProp<TList,TComparator,TProp,[TOp]>", () => {
  type Data1 = [
    { id: "foo"; color: "red" },
    { id: "bar"; color: "blue" },
    { id: "baz"; color: "blue" },
    { id: "basket-case"; color: "red" },
    { id: "lush"; color: "rose" },
  ]
  type Data2 = [
    { id: "foo"; value: 1 },
    { id: "bar"; value: 2 },
    { id: "baz"; value: 3 },
    { id: "basket-case"; value: 0 },
    { id: "lush"; value: 99 },
  ]

  it("happy path", () => {
    type Blue = RetainByProp<
      Data1,
      "blue",
      "color"
    >;

    type Foo = RetainByProp<
      Data1,
      "foo",
      "id"
    >;

    type StartingWithR = RetainByProp<Data1, "r", "color", "startsWith">;

    type cases = [
      Expect<HasSameValues<
        GetEach<Blue, "id">,
        [ "bar", "baz"]
      >>,
      Expect<HasSameValues<
        GetEach<Foo, "id">,
        [ "foo" ]
      >>,

      Expect<HasSameValues<
        GetEach<StartingWithR, "id">,
        [ "foo", "basket-case", "lush" ]
      >>,
    ];
    const cases: cases = [
      true, true,
      true,
    ];
  });

  it("testing lessThan op", () => {
    // filter out all object where value is less than 3
    type LT3 = RetainByProp<Data2, 3, "value", "lessThan">;
    type LTE3 = RetainByProp<Data2, 3, "value", "lessThanOrEqual">;
    type GT3 = RetainByProp<Data2, 3, "value", "greaterThan">;
    type GTE3 = RetainByProp<Data2, 3, "value", "greaterThanOrEqual">;

    // @ts-ignore
    type cases = [
      Expect<Equal<
        LT3,
        [{
            id: "foo";
            value: 1;
        }, {
            id: "bar";
            value: 2;
        }, {
            id: "basket-case";
            value: 0;
        }]
      >>,
      Expect<HasSameValues<
        LTE3,
        [
          ...LT3,
          { id: "baz"; value: 3 }
        ]
      >>,
      Expect<Equal<GT3, [
        {id: "lush"; value: 99}
      ]>>,
      Expect<HasSameValues<
        GTE3,
        [
          ...GT3,
          { id: "baz"; value: 3 }
        ]
    >>,

    ];

  });

});
