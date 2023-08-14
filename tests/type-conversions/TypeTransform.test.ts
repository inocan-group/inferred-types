import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { TypeTransform } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("TypeTransform<TInput, TOp, TParams>", () => {

  it("transform ops which require no params", () => {
    type IdentNum = TypeTransform<"Identity", 42>;
    type IdentStr = TypeTransform<"Identity", "foo">;
    type Camel1 = TypeTransform<"ToCamelCase", "foo_bar">;
    type Camel2 = TypeTransform<"ToCamelCase", "foo-bar">;
    type Pascal1 = TypeTransform<"ToPascalCase", "foo_bar">;
    type Pascal2 = TypeTransform<"ToPascalCase", "foo-bar">;
    type Caps = TypeTransform<"AllCaps", "foo-bar">;
    type More = TypeTransform<"Increment", 42>;
    type Less = TypeTransform<"Decrement", 42>;
    
    type cases = [
      Expect<Equal<IdentNum, 42>>,

      Expect<Equal<IdentStr, "foo">>,
      Expect<Equal<Camel1, "fooBar">>,
      Expect<Equal<Camel2, "fooBar">>,
      Expect<Equal<Pascal1, "FooBar">>,
      Expect<Equal<Pascal2, "FooBar">>,
      Expect<Equal<Caps, "FOO-BAR">>,

      Expect<Equal<More, 43>>,
      Expect<Equal<Less, 41>>,
    ];
    const cases: cases = [ 
      true, 
      true, true, true, true, true, true,
      true, true
    ];
  });

  
  it("transform ops which require props", () => {
    type Bracket = TypeTransform<"Surround", "foobar", ["[", "]"]>;
    type LeadActor = TypeTransform<"EnsureLeading", "Actor", ["Lead "]>;
    
    type cases = [
      Expect<Equal<Bracket, "[foobar]">>,
      Expect<Equal<LeadActor, "Lead Actor">>,
    ];
    const cases: cases = [
      true, true
    ];
    
  });
  

});
