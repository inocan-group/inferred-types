import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { createTypeMapRule } from "src/runtime/runtime/createTypeMatcher";
import { kind } from "src/runtime/runtime/kind";
import { ConvertType } from "src/types/type-conversion";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ConvertType<T,M>", () => {

  it("types map correctly", () => {
    const startWithF = createTypeMapRule(["StartsWith", "f"], ["StringLiteral", "started with f"]);
    const extendsStr = createTypeMapRule(["Extends", kind.string()], ["Identity"]);
    const startWith4 = createTypeMapRule(["StartsWith", "4"], ["Identity"]);
    const camelCase = createTypeMapRule(["Extends", kind.string()], ["CamelCase"]);
    const fallbackKebab = createTypeMapRule(["Any"], ["KebabCase"]);

    // single rule can be passed in bare
    type C1 = ConvertType<"foo", typeof startWithF>;
    // single rule can be passed in as array
    type C1b = ConvertType<"foo", [typeof startWithF]>;

    // rule works
    type C2 = ConvertType<"foo", typeof extendsStr>;
    // rule doesn't match
    type C2fail = ConvertType<number, [typeof extendsStr]>;
    // rule doesn't match but we have a default val
    type C2default = ConvertType<number, [typeof extendsStr], "huh?">;

    // conversion can leverage multiple rules
    type C3frank = ConvertType<"frank", [typeof startWithF, typeof extendsStr, typeof fallbackKebab]>;
    type C3frank2 = ConvertType<"frank", [typeof extendsStr, typeof startWithF, typeof fallbackKebab]>;
    type C3bob = ConvertType<"bob", [typeof startWithF, typeof extendsStr]>;
    type C3fail = ConvertType<number, [typeof startWithF, typeof extendsStr]>;
    type C3default = ConvertType<number, [typeof startWithF, typeof extendsStr], "huh?">;

    // StartsWith works for both numeric and string literals
    type C4numeric = ConvertType<42, [typeof startWith4]>;
    type C4string = ConvertType<"42", [typeof startWith4]>;
    type C4fail = ConvertType<55, [typeof startWith4]>;

    // Deep rule is matched
    type C5 = ConvertType<"bob", [typeof startWith4, typeof startWithF, typeof extendsStr]>;
    
    // Camel casing
    type C6 = ConvertType<"foo-bar-baz", typeof camelCase>;

    type cases = [
      Expect<Equal<C1, "started with f">>,
      Expect<Equal<C1b, "started with f">>,

      Expect<Equal<C2, "foo">>,
      Expect<Equal<C2fail, never>>,
      Expect<Equal<C2default, "huh?">>,

      Expect<Equal<C3frank, "started with f">>,
      Expect<Equal<C3frank2, "frank">>,
      Expect<Equal<C3bob, "bob">>,
      Expect<Equal<C3fail, never>>,
      Expect<Equal<C3default, "huh?">>,

      Expect<Equal<C4numeric, 42>>,
      Expect<Equal<C4string, "42">>,
      Expect<Equal<C4fail, never>>,

      Expect<Equal<C5, "bob">>,

      Expect<Equal<C6, "fooBarBaz">>
    ];
    const cases: cases = [
      true, true, true, true, true,
      true, true, true, true, true,
      true, true, true, true, true
    ];
  });
});
