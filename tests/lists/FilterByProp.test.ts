import {  Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { FilterByProp, GetEach, HasSameValues } from "@inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("FilterByProp<TList,TComparator,TProp,[TOp]>", () => {
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
    type NotBlue = FilterByProp<
      Data1,
      "blue",
      "color"
    >;

    type NoFoo = FilterByProp<
      Data1,
      "foo",
      "id"
    >;

    type NotStartingWithR = FilterByProp<Data1, "r", "color", "startsWith">;

    type cases = [
      Expect<HasSameValues<
        GetEach<NotBlue, "id">,
        [ "foo", "basket-case", "lush"]
      >>,
      Expect<HasSameValues<
        GetEach<NoFoo, "id">,
        [ "bar", "baz", "basket-case", "lush"]
      >>,

      Expect<HasSameValues<
        GetEach<NotStartingWithR, "id">,
        [ "bar", "baz" ]
      >>,
    ];
    const cases: cases = [
      true, true,
      true,
    ];
  });


  it("testing lessThan op", () => {
    // filter out all object where value is less than 3
    type LT3 = FilterByProp<Data2, 3, "value", "lessThan">;

    // @ts-ignore
    type cases = [
      Expect<Equal<LT3, [
        {id: "baz"; value: 3},
        {id: "lush"; value: 99}
      ]>>
    ];

  });
});



