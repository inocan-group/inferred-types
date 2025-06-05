import { describe, expect, it } from "vitest";
import { isTypeToken } from "inferred-types/runtime";
import { Expect, AsOutputToken, Test } from "inferred-types/types";

describe("isTypeToken(val)", () => {

  it.todo("positive test", () => {
    const str = "" as string;

    type cases = [
      // the `TypeToken` is seen as a string
      // by the type system
      Expect<Test<typeof str, "equals",  string>>
    ];
    const cases: cases = [true];

    if (isTypeToken(str)) {
      type Token = typeof str;
    //   type cases2 = [
    //     Expect<Test<Token, "equals",  AsOutputToken>>
    //   ];

      // runtime sees the token "as is"
      expect(str).toEqual("<<string>>");
    }
  });

});
