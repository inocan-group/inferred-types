import { Expect, Test, TwModifiers } from "inferred-types/types";
import { describe, it } from "vitest";



describe("TwModifiers<T>", () => {

  it("happy path", () => {
    type None = TwModifiers<"bg-green-500">;
    type One = TwModifiers<"dark:bg-green-500">;
    type Two = TwModifiers<"sm:dark:bg-green-500">;
    type Three = TwModifiers<"sm:active:dark:bg-green-500">;

    type cases = [
      Expect<Test<None, "equals",  "">>,
      Expect<Test<One, "equals",  "dark:">>,
      Expect<Test<Two, "equals",  "sm:dark:">>,
      Expect<Test<Three, "equals",  "sm:active:dark:">>,

    ];
  });

});
