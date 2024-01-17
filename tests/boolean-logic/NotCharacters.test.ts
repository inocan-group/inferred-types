import { Equal, Expect } from "@type-challenges/utils";
import { NotCharacters } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("HasCharacter", () => {

  it("happy path", () => {
    type Without = "test";
    type With = "[test]";
    
    type HasBracket1 = NotCharacters<With, "]">;
    type HasBracket2 = NotCharacters<With, "[">;
    type HasBracket2b = NotCharacters<With, "[" | "]">;
    type HasBracket3 = NotCharacters<With, ["[", "]", "*"]>;

    type NoBracket1 = NotCharacters<Without, "]">;
    type NoBracket2 = NotCharacters<Without, "[">;
    type NoBracket3 = NotCharacters<Without, ["[", "]", "*"]>;

    type cases = [
      Expect<Equal<HasBracket1, false>>,
      Expect<Equal<HasBracket2, false>>,
      Expect<Equal<HasBracket2b, false>>,
      Expect<Equal<HasBracket3, false>>,

      Expect<Equal<NoBracket1, true>>,
      Expect<Equal<NoBracket2, true>>,
      Expect<Equal<NoBracket3, true>>,
    ];
    const cases: cases = [
      true, true, true, true,
      true, true, true
    ];
  });

});
