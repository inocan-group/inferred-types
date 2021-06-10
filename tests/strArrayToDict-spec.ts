import { literal, strArrayToDict } from "~/utility";
import type { Expect, Equal, ExpectFalse } from "@type-challenges/utils";


describe("strArrayToDict() utility", () => {
  it("", () => {
    const result = strArrayToDict("a", "b", "c");
    type R = typeof result;

    const start = ["a", "b", "c"] as const;
    const result2 = strArrayToDict(...start);
    type R2 = typeof result2;

    const start3 = literal(["a", "b", "c"]);
    const result3 = strArrayToDict(...start3);
    type R3 = typeof result3;

    const start4 = ["a", "b", "c"];
    const result4 = strArrayToDict(...start4);
    type R4 = typeof result4;

    type cases = [
      // as long as we ensure that the array consists of literals
      // we are good for the conversion
      Expect<Equal<R, { a: true; b: true; c: true }>>,
      Expect<Equal<R2, { a: true; b: true; c: true }>>,
      Expect<Equal<R3, { a: true; b: true; c: true }>>,
      // but a non-literal array doesn't work
      // TODO: see if there's a way to force input to be literal
      ExpectFalse<Equal<R4, { a: true; b: true; c: true }>>,
      // and unfortunately it's lost all track of the keys
      // which are involved; just knowning that they are 
      // string based keys
      Expect<Equal<keyof R4, string>>,
    ];

    const cases: cases = [true, true, true, false, true];

  });
});