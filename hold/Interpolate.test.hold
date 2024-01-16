import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Interpolate } from "src/types";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Interpolate<TText,TContainer>", () => {

  it.skip("with tuple container", () => {
    type Foobar = Interpolate<"The value must be [[0]] or [[1]]", ["foo", "bar"]>;
    type TMI = Interpolate<"The value must be [[0]] or [[1]]", ["foo", "bar", "baz"]>;
    type Overextended = Interpolate<"The value must be [[0]] or [[1]]; not [[2]]", ["foo", "bar"]>;
    type Cat = Interpolate<"The cat's name is [[0]]-[[0]]", ["foo", "bar"]>;
    
    type cases = [
      Expect<Equal<Foobar, "The value must be foo or bar">>,
      Expect<Equal<TMI, "The value must be foo or bar">>,
      Expect<Equal<Overextended, "The value must be foo or bar; not [[2]]">>,
      Expect<Equal<Cat, "The cat's name is foo-foo">>
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });

});
