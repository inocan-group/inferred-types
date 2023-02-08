import { Equal, Expect } from "@type-challenges/utils";
import {  RemoveFromList, RemoveNever, RemoveStrings, RetainFromList, RetainStrings } from "../../src/types/lists/extractors";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("RemoveNever", () => {

  it("type", () => {
    type Foo42Bar = RemoveNever<["foo", never, 42, "bar", never, never]>;
    type Foo42Bar_RO = RemoveNever<readonly ["foo", never, 42, "bar", never, never]>;
    type Never = RemoveNever<[never, never, never]>;
    type Never_RO = RemoveNever<readonly [never, never, never]>;
    
    type cases = [
      Expect<Equal<Foo42Bar, ["foo", 42, "bar"]>>,
      Expect<Equal<Foo42Bar_RO, readonly ["foo", 42, "bar"]>>,
      Expect<Equal<Never, []>>,
      Expect<Equal<Never_RO, readonly []>>,
    ];

    const cases: cases = [ true, true, true, true ];
  });

});

describe("RetainFromList / RemoveFromList", () => {
  type List = [false, boolean, never, string, 42, "foo", {}, "bar", never];
  type List_RO = readonly [false, boolean, never, string, 42, "foo", {}, "bar", never];

  it("type: retain/extends", () => {
    type StringFooBar = RetainFromList<List, "extends", string>;
    type StringFooBar2 = RetainStrings<List>;
    type FooBar = RetainFromList<List, "extends", "foo" | "bar">;
    type FooBar2 = RetainFromList<List, "extends", ["foo", "bar"]>;
    type False = RetainFromList<List, "extends", false>;
    type Bool = RetainFromList<List, "extends", boolean>;

    type StringFooBar_RO = RetainFromList<List_RO, "extends", string>;
    type StringFooBar2_RO = RetainStrings<List_RO>;
    type FooBar_RO = RetainFromList<List_RO, "extends", "foo" | "bar">;
    type FooBar2_RO = RetainFromList<List_RO, "extends", ["foo", "bar"]>;
    type False_RO = RetainFromList<List_RO, "extends", false>;
    type Bool_RO = RetainFromList<List_RO, "extends", boolean>;

    type cases = [
      Expect<Equal<StringFooBar, [string, "foo", "bar"]>>,
      Expect<Equal<StringFooBar2, [string, "foo", "bar"]>>,
      Expect<Equal<FooBar, ["foo", "bar"]>>,
      Expect<Equal<FooBar2, [ "foo", "bar"]>>,
      Expect<Equal<False, [false]>>,
      Expect<Equal<Bool, [false, boolean]>>,
      // explicit readonly 
      Expect<Equal<StringFooBar_RO, readonly [string, "foo", "bar"]>>,
      Expect<Equal<StringFooBar2_RO, readonly [string, "foo", "bar"]>>,
      Expect<Equal<FooBar_RO, readonly ["foo", "bar"]>>,
      Expect<Equal<FooBar2_RO, readonly [ "foo", "bar"]>>,
      Expect<Equal<False_RO, readonly [false]>>,
      Expect<Equal<Bool_RO, readonly [false, boolean]>>,
    ];

    const cases: cases = [ 
      true, true, true, true, true, true,
      true, true, true, true, true, true
    ];
  });
  
  it("type: retain/equals", () => {
    type Str = RetainFromList<List, "equals", string>;
    type Empty = RetainFromList<List, "equals", 1>;
    type Answer = RetainFromList<List, "equals", 42>;
    
    type cases = [
      Expect<Equal<Str, [string]>>,
      Expect<Equal<Empty, []>>,
      Expect<Equal<Answer, [42]>>,
    ];
    const cases: cases = [ true, true, true ];
  });

  it("type: remove/extends", () => {
    type NotStringFooBar = RemoveFromList<List, "extends", string>;
    type NotStringFooBar2 = RemoveStrings<List>;
    type NotFalse = RemoveFromList<List, "extends", false>;
    type NotBool = RemoveFromList<List, "extends", boolean>;
    
    type cases = [
      Expect<Equal<NotStringFooBar, [false, boolean, 42, {}]>>,
      Expect<Equal<NotStringFooBar2, [false, boolean, 42, {}]>>,
      Expect<Equal<NotFalse, [boolean, string, 42, "foo", {}, "bar"]>>,
      Expect<Equal<NotBool, [ string, 42, "foo", {}, "bar"]>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });
  
  
  it("type: retain/does-not-extend", () => {
    type NotBoolean = RetainFromList<List, "does-not-extend", boolean>;
    type NoStrOrBool = RetainFromList<List, "does-not-extend", [string, boolean]>;
    
    type cases = [
      Expect<Equal<NotBoolean, [string, 42, "foo", {}, "bar"]>>,
      Expect<Equal<NoStrOrBool, [42, {}]>>,
    ];
    const cases: cases = [ true, true ];
  });
  
  
  it("type: remove/does-not-extend", () => {
    type Bool = RemoveFromList<List, "does-not-extend", boolean>;
    
    type cases = [
      Expect<Equal<Bool, [false, boolean]>>,
    ];
    const cases: cases = [ true ];
    
  });

  it("type: remove/not-equal", () => {
    type Bool = RemoveFromList<List, "not-equal", boolean>;
    
    type cases = [
      Expect<Equal<Bool, [boolean]>>,
    ];
    const cases: cases = [ true ];
    
  });
  

});

