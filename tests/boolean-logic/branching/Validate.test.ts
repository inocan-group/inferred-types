import { Equal, Expect, } from "@type-challenges/utils";
import { DoesExtend, ErrorCondition, IsDotPath, Validate } from "src/types/index";
import { describe, it } from "vitest";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Validate<T>", () => {
  it("happy path", () => {
    type T1 = Validate<IsDotPath<"foo.bar.baz", "foo.bar.baz">>;
    type T2 = Validate<IsDotPath<"foo_bar.baz-me","foo_bar.baz-me">>;
    type T3 = Validate<IsDotPath<"foobar","foobar">>;
    type T4 = Validate<IsDotPath<"foot123", "foot123">>;

    type F1 = Validate<IsDotPath<".foo.bar",".foo.bar">>;
    type F2 = Validate<IsDotPath<"foo.bar.","foo.bar.">>;
    type F3 = Validate<IsDotPath<".foo.bar.",".foo.bar.">>;
    type F4 = Validate<IsDotPath<"/foobar", "/foobar">>;
    type F5 = Validate<IsDotPath<"abc*", "/foobar">>;
    type F6 = Validate<IsDotPath<"abc...def","abc...def">>;

    type E1 = Validate<IsDotPath<"foobar",string>>;


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

      Expect<DoesExtend<E1, ErrorCondition<"wide-return-not-allowed">>>,
    ];
    const cases: cases = [
      true, true, true,true,
      true,true,true,true,true,true,
      true
    ];
  });

});
