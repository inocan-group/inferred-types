import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { UnconditionalTransform } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("TypeTransform<TInput, TOp, TParams>", () => {

  it("transform ops which require no params", () => {
    type IdentNum = UnconditionalTransform<"Identity", 42>;
    type IdentStr = UnconditionalTransform<"Identity", "foo">;
    type Camel1 = UnconditionalTransform<"ToCamelCase", "foo_bar">;
    type Camel2 = UnconditionalTransform<"ToCamelCase", "foo-bar">;
    type Pascal1 = UnconditionalTransform<"ToPascalCase", "foo_bar">;
    type Pascal2 = UnconditionalTransform<"ToPascalCase", "foo-bar">;
    type Caps = UnconditionalTransform<"AllCaps", "foo-bar">;
    type More = UnconditionalTransform<"Increment", 42>;
    type Less = UnconditionalTransform<"Decrement", 42>;
    
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
    type Bracket = UnconditionalTransform<"Surround", "foobar", ["[", "]"]>;
    type LeadActor = UnconditionalTransform<"EnsureLeading", "Actor", ["Lead "]>;
    
    type cases = [
      Expect<Equal<Bracket, "[foobar]">>,
      Expect<Equal<LeadActor, "Lead Actor">>,
    ];
    const cases: cases = [
      true, true
    ];
    
  });
  

});
