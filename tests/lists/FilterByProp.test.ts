import {  Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { FilterByProp } from "../../src/types/lists/FilterByProp";
import { GetEach, HasSameValues } from "src/types/index";

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

});
