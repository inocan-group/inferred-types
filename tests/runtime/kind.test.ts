import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { kind } from "src/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("kind API surface", () => {

  it("string types as tokens", () => {
    const str = kind.string();
    const strLiteral = kind.string("literal");
    const strUnion = kind.string("foo", "bar");
    // union types which have a `,` must have their comma character
    // encoded to preserve the ability to restore the type from purely
    // text.
    const encoded = kind.string("foo,bar", "baz");

    expect(str).toBe("<<string>>");
    expect(strLiteral).toBe("<<stringLiteral:literal>>");
    expect(strUnion).toBe("<<stringLiteral:foo,bar>>");
    expect(encoded).toBe("<<stringLiteral:foo&comma;bar,baz>>");
    
    type cases = [
      Expect<Equal<typeof str, string>>,
      Expect<Equal<typeof strLiteral, "literal">>,
      Expect<Equal<typeof strUnion, "foo" | "bar">>,
      Expect<Equal<typeof encoded, "foo,bar" | "baz">>
    ];
    const cases: cases = [ true, true, true, true ];
  });

  it("numeric types as tokens", () => {
    const num = kind.number();
    const numLiteral = kind.number(42);
    const numUnion = kind.number(1,2,3);
    const numericStr = kind.numericString();

    expect(num).toBe("<<number>>");
    expect(numLiteral).toBe("<<numericLiteral:42>>");
    expect(numUnion).toBe("<<numericLiteral:1,2,3>>");
    expect(numericStr).toBe("<<numericString>>");
    
    type cases = [
      Expect<Equal<typeof num, number>>,
      Expect<Equal<typeof numLiteral, 42>>,
      Expect<Equal<typeof numUnion, 1 | 2 | 3>>,
      Expect<Equal<typeof numericStr, `${number}`>>,
    ];
    const cases: cases = [ true, true, true, true  ];
  });
  
  it("boolean types as tokens", () => {
    const wide = kind.boolean();
    const t = kind.boolean(true);
    const f = kind.boolean(false);
    const bs = kind.booleanString();

    expect(wide).toBe("<<boolean>>");
    expect(t).toBe("<<true>>");
    expect(f).toBe("<<false>>");
    expect(bs).toBe("<<booleanString>>");
    
    type cases = [
      Expect<Equal<typeof wide, boolean>>,
      Expect<Equal<typeof t, true>>,
      Expect<Equal<typeof f, false>>,
      Expect<Equal<typeof bs, "true" | "false">>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

  
  it("hybrid string types", () => {
    const start = kind.startsWith("_");
    const end = kind.endsWith("!");
    const camel = kind.camelCase("fooBar");

    expect(start).toBe("<<startsWith:_>>");
    expect(end).toBe("<<endsWith:!>>");
    
    type cases = [
      Expect<Equal<typeof start, `_${string}`>>,
      Expect<Equal<typeof end, `${string}!`>>,
      Expect<Equal<typeof camel, `fooBar`>>,
    ];
    const cases: cases = [ true, true, true ];
    
  });
  
  

});
