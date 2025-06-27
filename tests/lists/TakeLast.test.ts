import { Expect, TakeLast, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("TakeLast<TContent,TLen,[THandle]>", () => {

  it("happy path", () => {
    type Arr = [1, 2, 3, "foo", "bar"];

    type Two = TakeLast<Arr, 2>;
    type Three = TakeLast<Arr, 3>;
    type Biggie = TakeLast<Arr, 100>;

    type cases = [
      Expect<Test<Two, "equals", ["foo", "bar"]>>,
      Expect<Test<Three, "equals", [3, "foo", "bar"]>>,
      Expect<Test<Biggie, "equals", Arr>>,

    ];
  });

});
