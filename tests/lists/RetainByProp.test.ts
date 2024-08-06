import {  Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { GetEach, HasSameValues, RetainByProp } from "src/types/index";

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

});
