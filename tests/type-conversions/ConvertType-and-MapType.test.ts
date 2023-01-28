import { Equal, Expect } from "@type-challenges/utils";
import { createTypeMapRule } from "src/runtime/runtime/createTypeMatcher";
import { t } from "src/runtime/runtime/type-shorthand";
import { ConvertType, MapType } from "src/types/type-conversion/MapType";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ConvertType<T,M>", () => {

  it("types map correctly", () => {
    const m1 = createTypeMapRule(["StartsWith", "f"], ["StringLiteral", "started with f"]);
    const m2 = createTypeMapRule(["Extends", t.string()], ["Identity"]);
    const m3 = createTypeMapRule(["StartsWith", "4"], ["Identity"]);

    type C1 = ConvertType<"foo", [typeof m1]>;
    type C2 = ConvertType<"foo", [typeof m2]>;
    type C3 = ConvertType<number, [typeof m2, typeof m1], "huh?">;
    type C4 = ConvertType<42, [typeof m3], "huh?">;
    type C5 = ConvertType<55, [typeof m3], "huh?">;
    
    type cases = [
      Expect<Equal<C1, "started with f">>,
      Expect<Equal<C2, "foo">>,
      Expect<Equal<C3, "huh?">>,
      Expect<Equal<C4, 42>>,
      Expect<Equal<C5, "huh?">>,
    ];
    const cases: cases = [true, true, true, true, true];
  });

  
  it("runtime works", () => {
    
  });
  

});

describe("MapType<T,M>", () => {

  it("types resolve", () => {
    type List = ["foo", "bar", "42", 42, 52, "baz"];
    const m1 = createTypeMapRule(["StartsWith", "f"], ["StringLiteral", "started with f"]);
    const m2 = createTypeMapRule(["Extends", t.string()], ["Identity"]);
    const m3 = createTypeMapRule(["StartsWith", "4"], ["Identity"]);
    const m4 = createTypeMapRule(["Extends", t.number()], ["Identity"]);
    const m5 = createTypeMapRule(["EndsWith", "2"], ["Identity"]);

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
