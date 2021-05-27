/* eslint-disable unicorn/consistent-function-scoping */
import { MutationIdentity } from "../src/Mutation";
import type { Expect, Equal, ExpectExtends } from "@type-challenges/utils";

describe("MutationIdentity type", () => {
  it("MutationIdentity provides properly typed higher-order function", () => {
    type State = { foo: number; bar: number };
    const t1 = MutationIdentity<State>()((s) => () => s);
    const t2 = MutationIdentity<State>()((s) => (foo: number) => ({
      ...s,
      foo,
    }));

    type cases = [
      Expect<ExpectExtends<MutationIdentity<State, any>, typeof t1>>,
      Expect<ExpectExtends<MutationIdentity<State, any>, typeof t2>>,
      Expect<Equal<MutationIdentity<State, []>, typeof t1>>,
      Expect<Equal<MutationIdentity<State, [number]>, typeof t2>>
    ];

    const expected: cases = [true, true, true, true];
    expect(expected).toBe(expected);
  });
});
