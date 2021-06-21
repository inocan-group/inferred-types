import { withValue } from "~/utility";
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


  it.only("runtime and type reduction with withValue() utility", () => {
    const obj = { foo: 1, foofoo: 2, bar: true, message: "hi there" } as const;

    const str = withValue(t => t.string)(obj);
    type Str = typeof str;
    const num = withValue(t => t.number)(obj);
    type Num = typeof num;
    const lit = withValue(t => t.literal(1))(obj);
    type Lit = typeof lit;

    type cases = [
      Expect<Equal<Str, { readonly message: "hi there" }>>,
      Expect<Equal<Num, { readonly foo: 1; readonly foofoo: 2 }>>,
      Expect<Equal<Lit, { readonly foo: 1 }>>
    ];
    const cases: cases = [true, true, true];

    expect(str.message).toBe("hi there");
    expect((str as any).foo).toBe(undefined);

    expect(num.foo).toBe(1);
    expect(num.foofoo).toBe(2);
    expect((num as any).message).toBe(undefined);

  });
});