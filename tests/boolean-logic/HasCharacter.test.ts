import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import {  HasCharacters } from "inferred-types";

import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("HasCharacter", () => {

  it("happy path", () => {
    type Without = "test";
    type With = "[test]";

    type HasBracket1 = HasCharacters<With, "]">;
    type HasBracket2 = HasCharacters<With, "[">;
    type HasBracket2b = HasCharacters<With, "[" | "]">;
    type HasBracket3 = HasCharacters<With, ["[", "]", "*"]>;

    type NoBracket1 = HasCharacters<Without, "]">;
    type NoBracket2 = HasCharacters<Without, "[">;
    type NoBracket3 = HasCharacters<Without, ["[", "]", "*"]>;

    type cases = [
      Expect<Equal<HasBracket1, true>>,
      Expect<Equal<HasBracket2, true>>,
      Expect<Equal<HasBracket2b, true>>,
      Expect<Equal<HasBracket3, true>>,

      Expect<Equal<NoBracket1, false>>,
      Expect<Equal<NoBracket2, false>>,
      Expect<Equal<NoBracket3, false>>,
    ];
    const cases: cases = [
      true, true, true, true,
      true, true, true
    ];
  });


  it("Tuple for character patterns", () => {
    type With = HasCharacters<"hi", ["h", "i"]>;
    type Without = HasCharacters<"42", ["h", "i"]>;

    type cases = [
      ExpectTrue<With>,
      ExpectFalse<Without>
    ];
    const cases: cases = [
      true, false
    ];

  });

  it("Union type for characters", () => {
    type With = HasCharacters<"hi", "h" | "i">;
    type Without = HasCharacters<"42", "h" | "i">;

    type cases = [
      ExpectTrue<With>,
      ExpectFalse<Without>
    ];
    const cases: cases = [ true, false ];

  });


});
