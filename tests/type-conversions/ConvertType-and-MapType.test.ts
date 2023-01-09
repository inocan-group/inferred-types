import { Equal, Expect } from "@type-challenges/utils";
import { ifString } from "src/runtime/type-checks/isString";
import { IfString } from "src/types/boolean-logic/string";
import { ConvertType, MapType } from "src/types/type-conversion/MapType";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ConvertType<T,M>", () => {

  it("happy path", () => {
    type M1 = ["startsWith", "f", () => `started with f`];
    type M2 = ["extends", string];
    type M3 = ["startsWith", "4"];

    type C1 = ConvertType<"foo", [M1,M2]>;
    type C2 = ConvertType<"foo", [M2,M1]>;
    type C3 = ConvertType<number, [M2,M1], "huh?">;
    type C4 = ConvertType<42, [M3], "huh?">;
    type C5 = ConvertType<55, [M3], "huh?">;
    
    type cases = [
      Expect<Equal<C1, "started with f">>,
      Expect<Equal<C2, "foo">>,
      Expect<Equal<C3, "huh?">>,
      Expect<Equal<C4, 42>>,
      Expect<Equal<C5, "huh?">>,
    ];
    const cases: cases = [true, true, true, true, true];
  });

});

describe("MapType<T,M>", () => {

  it("happy path", () => {
    type List = ["foo", "bar", "42", 42, 52, "baz"];
    type M1 = ["startsWith", "f", () => `started with f`];
    type M2 = ["extends", string];
    type M3 = ["startsWith", "4"];
    type M4 = ["extends", number];
    const fn = <T extends string | number | boolean>(val: T) => ifString(
      val, 
      v => `string: ${v}`, 
      v => v
    );
    type M5 = ["endsWith", "2", typeof fn];


    type T1 = MapType<List, [M1,M2]>;
    type T2 = MapType<List, [M2]>;
    type T3 = MapType<List, [M2], "huh?">;
    type T4 = MapType<List, [M2,M3], "huh?">;
    type T5 = MapType<List, [M4]>;
    type T6 = MapType<List, [M5]>;

    type cases = [
      Expect<Equal<T1, ["started with f", "bar", "42","baz"]>>,
      Expect<Equal<T2, ["foo", "bar", "42", "baz"]>>,
      Expect<Equal<T3, ["foo", "bar", "42", "huh?", "huh?", "baz"]>>,
      Expect<Equal<T4, ["foo", "bar", "42", 42, "huh?", "baz"]>>,
      Expect<Equal<T5, [42, 52]>>,
      Expect<Equal<T6, ["two", "two", "two"]>>,
    ];
    
    const cases: cases = [ true, true, true, true, true, true ];
  });

});
