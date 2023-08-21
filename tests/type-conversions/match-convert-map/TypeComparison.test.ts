import { Equal, Expect,  ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { DoesExtend, ErrorCondition, TypeComparison } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("TypeComparison", () => {

  it("comparison tests using extends operation", () => {
    type ExtendsStr = ["Extends", string];

    type Foobar = TypeComparison<"foobar", ExtendsStr>;
    type Empty = TypeComparison<"", ExtendsStr>;
    type Wide = TypeComparison<string, ExtendsStr>;
    type Num = TypeComparison<42, ExtendsStr>;
    type Bool = TypeComparison<boolean, ExtendsStr>;
    
    type cases = [
      ExpectTrue<Foobar>,
      ExpectTrue<Empty>,
      ExpectTrue<Wide>,

      ExpectTrue<DoesExtend<Num, ErrorCondition<"type-comparison-failure">>>,
      ExpectTrue<DoesExtend<Bool, ErrorCondition<"type-comparison-failure">>>,
    ];
    const cases: cases = [
      true, true, true,
      true, true
    ];
  });

  it("comparison tests using extends operation and 'skip' handler", () => {
    type ExtendsStr = ["Extends", string, "skip"];

    type Foobar = TypeComparison<"foobar", ExtendsStr>;
    type Empty = TypeComparison<"", ExtendsStr>;
    type Wide = TypeComparison<string, ExtendsStr>;
    type Num = TypeComparison<42, ExtendsStr>;
    type Bool = TypeComparison<boolean, ExtendsStr>;
    
    type cases = [
      ExpectTrue<Foobar>,
      ExpectTrue<Empty>,
      ExpectTrue<Wide>,

      Expect<Equal<Num, 42>>,
      Expect<Equal<Bool, boolean>>,
    ];
    const cases: cases = [
      true, true, true,
      true, true
    ];
  });

  it("comparison tests using equals operation", () => {
    type EqWide = ["Equals", string];
    type EqFoo = ["Equals", "foo"];

    type Foobar = TypeComparison<"foobar", EqWide>;
    type Empty = TypeComparison<"", EqWide>;

    type Foo = TypeComparison<"foo", EqFoo>;

    type Num = TypeComparison<42, EqWide>;
    type Bool = TypeComparison<boolean, EqFoo>;
    
    type cases = [
      ExpectTrue<DoesExtend<Foobar, ErrorCondition<"type-comparison-failure">>>,
      ExpectTrue<DoesExtend<Empty, ErrorCondition<"type-comparison-failure">>>,

      ExpectTrue<Foo>,

      ExpectTrue<DoesExtend<Num, ErrorCondition<"type-comparison-failure">>>,
      ExpectTrue<DoesExtend<Bool, ErrorCondition<"type-comparison-failure">>>,
    ];
    const cases: cases = [
      true, true,
      true,
      true, true
    ];
  });


  
  it("comparison tests using StartsWith operation", () => {
    type StartFoo = ["StartsWith", "foo"];

    type FooBar = TypeComparison<"foobar", StartFoo>;
    type BarFoo = TypeComparison<"barfoo", StartFoo>;
    type Num = TypeComparison<42, StartFoo>;
    
    type cases = [
      ExpectTrue<FooBar>,
      ExpectTrue<DoesExtend<BarFoo, ErrorCondition<"type-comparison-failure">>>,
      ExpectTrue<DoesExtend<Num, ErrorCondition<"invalid-type-for-operation">>>
    ];
    const cases: cases = [ true, true, true  ];
    
  });
  
});
