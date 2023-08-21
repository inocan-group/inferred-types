import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { createTypeRule , kind } from "src/runtime";
import {  MapType } from "src/types";


describe("MapType<T,M>", () => {

  it("types resolve", () => {
    type List = ["foo", "bar", "42", 42, 52, "baz"];
    const m1 = createTypeRule(["StartsWith", "f"], ["StringLiteral", "started with f"]);
    const m2 = createTypeRule(["Extends", kind.string()], ["Identity"]);
    const m3 = createTypeRule(["StartsWith", "4"], ["Identity"]);
    const m4 = createTypeRule(["Extends", kind.number()], ["Identity"]);
    const m5 = createTypeRule(["EndsWith", "2"], ["Identity"]);

    type T1 = MapType<List, [typeof m1,typeof m2]>;
    type T2 = MapType<List, [typeof m2]>;
    type T3 = MapType<List, [typeof m2], "huh?">;
    type T4 = MapType<List, [typeof m2, typeof m3], "huh?">;
    type T5 = MapType<List, [typeof m4]>;
    type T6 = MapType<List, [typeof m5]>;

    type cases = [
      Expect<Equal<T1, ["started with f", "bar", "42","baz"]>>,
      Expect<Equal<T2, ["foo", "bar", "42", "baz"]>>,
      Expect<Equal<T3, ["foo", "bar", "42", "huh?", "huh?", "baz"]>>,
      Expect<Equal<T4, ["foo", "bar", "42", 42, "huh?", "baz"]>>,
      Expect<Equal<T5, [42, 52]>>,
      Expect<Equal<T6, ["42", 42, 52]>>,
    ];
    
    const cases: cases = [ true, true, true, true, true, true ];
  });

});
