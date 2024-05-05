import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { Handle } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Handle<TContent,TPass,THandle,TSpecificity>", () => {

  it("extends specificity", () => {
    type Foo = Handle<"foo", number, false>;
    type Foo2 = Handle<"foo", number, false, "extends">;
    type UFoo = Handle<"foo", boolean | number, false>;
    type NarrowFoo = Handle<"foo", "foo" | number, false>;

    type Union = Handle<"foo" | 42 | "bar", number, false>;
    type Removal = Handle<"foo" | 42 | "bar", number, never>;

    type Nope = Handle<"foo", string, false>;
    
    type cases = [
      Expect<Equal<Foo, "foo">>,
      Expect<Equal<Foo2, "foo">>,
      Expect<Equal<UFoo, "foo">>,
      ExpectFalse<NarrowFoo>,

      Expect<Equal<Union, "foo" | "bar" | false>>,
      Expect<Equal<Removal, "foo" | "bar">>,

      ExpectFalse<Nope>
    ];
    const cases: cases = [
      true, true, true,false,
      true, true,
      false
    ];
  });

  
  it("equals specificity", () => {
    type WideCondition = Handle<"foo", string, "handled", "equals">;
    type WideValue = Handle<string, "foo", "handled", "equals">;

    type Foo = Handle<"foo", "foo", "handled", "equals">;
    type UnhandledFoo = Handle<"foo", "foo" | "bar", "handled", "equals">;
    
    type cases = [
      Expect<Equal<WideCondition, "foo">>,
      Expect<Equal<WideValue, string>>,

      Expect<Equal<Foo, "handled">>,
      Expect<Equal<UnhandledFoo, "foo">>,
    ];
    const cases: cases = [
      true, true,
      true, true,
    ];
    
  });
  

});
