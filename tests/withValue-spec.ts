import { ifTypeOf, withValue } from "~/utility";
import type { Expect, Equal } from "@type-challenges/utils";
import { WithValue } from "~/types";

describe("withValue()() utility", () => {
  it("type reduction with WithValue<T> works as expected", () => {
    const obj = { foo: 1, bar: true, message: "hi there" };
    type Str = WithValue<string, typeof obj>;
    type Num = WithValue<number, typeof obj>;

    type cases = [
      Expect<Equal<Str, { message: string }>>,
      Expect<Equal<Num, { foo: number }>>,
    ];
    const cases: cases = [true, true];
  });


  it("runtime and type reduction with withValue() utility", () => {
    const obj = { foo: 1, bar: true, message: "hi there" };
    const str = withValue("" as string)(obj);
    type Str = typeof str;
    const num = withValue(0)(obj);
    type Num = typeof num;

    const check = ifTypeOf("hi there").extends(obj.message);

    type cases = [
      Expect<Equal<Str, { message: string }>>,
      Expect<Equal<Num, { foo: number }>>,
    ];

    expect((str as any).foo).toBe(undefined);


  });
});