import { mapValues, literal } from "../src/utility";
import type { Expect, Equal, ExpectFalse } from "@type-challenges/utils";

describe("mapValues() utility", () => {
  it("simple transform while maintaining wide type through transform", () => {
    const colors = { red: 4, blue: 2, green: 3 };
    const x2 = mapValues(colors, v => v * 2);

    expect(x2.red).toBe(colors.red * 2);
    expect(x2.blue).toBe(colors.blue * 2);
    expect(x2.green).toBe(colors.green * 2);

    type cases = [
      // although not always the case, because the value
      // isn't changed in it's type properties they are
      // equal in _type_ after transform
      Expect<Equal<typeof colors, typeof x2>>,
      // what always should be true is that both dictionaries
      // share the same keys
      Expect<Equal<keyof typeof colors, keyof typeof x2>>
    ];
    const cases: cases = [true, true];
    expect(cases).toBe(cases);
  });

  it("simple transform but with input type set to literals", () => {
    const colors = literal({ red: 4, blue: 2, green: 3 });
    const x2 = mapValues(colors, v => v * 2);

    expect(x2.red).toBe(colors.red * 2);
    expect(x2.blue).toBe(colors.blue * 2);
    expect(x2.green).toBe(colors.green * 2);

    type cases = [
      // by making the initial type take on literal values
      // instead of generalizing to "number" we no longer
      // have equality of types after the transform
      ExpectFalse<Equal<typeof colors, typeof x2>>,
      // note that the transformed values are wide,
      // unlike the input to the process
      Expect<Equal<typeof x2["blue"], number>>,
      // As always, the keys remain the same
      Expect<Equal<keyof typeof colors, keyof typeof x2>>
    ];
    const cases: cases = [false, true, true];
    expect(cases).toBe(cases);
  });
});