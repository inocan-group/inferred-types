import { describe, it } from "vitest";
import { Expect, MakeKeysOptional, Test } from "inferred-types/types";



describe("MakeKeysOptional<TObj,TKeys>", () => {

  it("using a tuple of keys", () => {
    type Obj = { foo: 1; bar: 2 };
    type Opt = MakeKeysOptional<Obj, ["bar"]>;

    type cases = [
      Expect<Test<Opt, "equals",  { foo: 1; bar?: 2 | undefined }>>
    ];
    const cases: cases = [true];
  });



});
