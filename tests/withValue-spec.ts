import { withValue } from "~/utility";
import type { Expect, Equal } from "@type-challenges/utils";

describe("withValue()() utility", () => {
  it("reduce to just kv's with a particular type", () => {
    const obj = { foo: 1, bar: true, message: "hi there" };
    const str = withValue<string>()(obj);
    type Str = typeof str;
    const num = withValue<number>()(obj);
    type Num = typeof num;
    type cases = [
      Expect<Equal<Str, { message: string }>>,
      Expect<Equal<Num, { foo: number }>>,
    ];

    expect((str as any).foo).toBe(undefined);


  });
});