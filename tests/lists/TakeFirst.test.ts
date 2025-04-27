import { Expect, TakeFirst, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("TakeFirst<TContent,TLen,[THandle]>", () => {

  it("happy path", () => {
    type Arr = [1, 2, 3, "foo", "bar"];

    type Two = TakeFirst<Arr, 2>;
    type Three = TakeFirst<Arr, 3>;
    type Biggie = TakeFirst<Arr, 100>;

    type cases = [
      Expect<Test<Two, "equals", [1, 2]>>,
      Expect<Test<Three, "equals", [1, 2, 3]>>,
      Expect<Test<Biggie, "equals",  Arr>>,
    ];
  });

});
