import { Equal, Expect, } from "@type-challenges/utils";
import { DotPath } from "../../src/types/string-literals/DotPath";

import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("DotPath<T>", () => {
  const builder = <S extends string>(input: S & DotPath<S>) => input ;

  it("happy path", () => {
    type T1 = DotPath<"foo.bar.baz">;
    type T2 = DotPath<"foo_bar.baz-me">;
    type T3 = DotPath<"foobar">;
    type T4 = DotPath<"foot123">;

    type F1 = DotPath<".foo.bar">;
    type F2 = DotPath<"foo.bar.">;
    type F3 = DotPath<".foo.bar.">;
    type F4 = DotPath<"/foobar">;
    type F5 = DotPath<"abc*">;
    type F6 = DotPath<"abc...def">;

    const t1 = builder("foo.bar.baz");

    type cases = [
      Expect<Equal<T1,"foo.bar.baz">>, //
      Expect<Equal<T2,"foo_bar.baz-me">>, 
      Expect<Equal<T3,"foobar">>, 
      Expect<Equal<T4,"foot123">>, 
      
      Expect<Equal<F1,never>>, 
      Expect<Equal<F2,never>>, 
      Expect<Equal<F3,never>>, 
      Expect<Equal<F4,never>>, 
      Expect<Equal<F5,never>>, 
      Expect<Equal<F6,never>>, 

      Expect<Equal<typeof t1, "foo.bar.baz">>, 
    ];
    const cases: cases = [true, true, true,true,true,true,true,true,true,true,true];
  });

});
