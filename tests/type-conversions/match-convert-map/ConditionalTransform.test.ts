import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ConditionalTransform, ErrorCondition, IsErrorCondition } from "src/types";
import { Constant } from "src/constants";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ConditionalTransform<TTest,TInput,TOp,TParams>", () => {
  

  it("failing tests with variant handlers", () => {    
    type ThrowDefault = ConditionalTransform<false, "Identity", "hi">;
    type ThrowExplicit = ConditionalTransform<[false, "throw"], "Identity", "hi">;
    type ProxyError = ConditionalTransform<ErrorCondition<"test">, "Identity", "hi">;
    type Ignore = ConditionalTransform<[false, "skip"], "Identity", "hi">;
    type Exclusion = ConditionalTransform<[false, "exclude"], "Identity", "hi">;
    
    type cases = [
      ExpectTrue<IsErrorCondition<ThrowDefault, "condition-not-met">>,
      ExpectTrue<IsErrorCondition<ThrowExplicit, "condition-not-met">>,
      ExpectTrue<IsErrorCondition<ProxyError, "test">>,

      Expect<Equal<Ignore, "hi">>,
      Expect<Equal<Exclusion, Constant<"Exclusion", "hi">>>
    ];
    const cases: cases = [
      true, true,true,
      true, true,
    ];
  });
  
  it("successful test executes transform", () => {
    type IdentNum = ConditionalTransform<true, "Identity", 42>;
    type IdentStr = ConditionalTransform<true, "Identity", "foo">;
    type Camel1 = ConditionalTransform<true, "ToCamelCase", "foo_bar">;
    type Camel2 = ConditionalTransform<true, "ToCamelCase", "foo-bar">;
    type Pascal1 = ConditionalTransform<true, "ToPascalCase", "foo_bar">;
    type Pascal2 = ConditionalTransform<true, "ToPascalCase", "foo-bar">;
    type Caps = ConditionalTransform<true, "AllCaps", "foo-bar">;
    type More = ConditionalTransform<true, "Increment", 42>;
    type Less = ConditionalTransform<true, "Decrement", 42>;
    type Bracket = ConditionalTransform<true, "Surround", "foobar", ["[", "]"]>;
    
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
      Expect<Equal<Bracket, "[foobar]">>
    ];
    const cases: cases = [ 
      true, 
      true, true, true, true, true, true,
      true, true,
      true
    ];
  });
  

});
