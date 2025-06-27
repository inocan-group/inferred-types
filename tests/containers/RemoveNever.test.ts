import { Expect, EmptyObject, RemoveNever, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("RemoveNever<T>", () => {

  it("tuple tests", () => {
    type Identity = RemoveNever<[1, 2, 3]>;
    type OneGone = RemoveNever<[1, never, 2, 3]>;
    type AllGone = RemoveNever<[never, never]>;
    type Leading = RemoveNever<[never, 1, 2, 3]>;
    type Tailing = RemoveNever<[1, 2, 3, never]>;

    type cases = [
      Expect<Test<Identity, "equals", [1, 2,  3]>>,
      Expect<Test<OneGone, "equals", [1, 2,  3]>>,
      Expect<Test<AllGone, "equals", []>>,
      Expect<Test<Leading, "equals", [1, 2,  3]>>,
      Expect<Test<Tailing, "equals", [1, 2,  3]>>,
    ];

  });

  it("object tests", () => {
    type Identity = RemoveNever<{ foo: 1 }>;
    type NoBar = RemoveNever<{ foo: 1; bar: never }>;
    type NothingLeft = RemoveNever<{ foo: never; bar: never }>;
    type NothingToBegin = RemoveNever<EmptyObject>;

    type cases = [
      Expect<Test<Identity, "equals",  { foo: 1 }>>,
      Expect<Test<NoBar, "equals",  { foo: 1 }>>,
      Expect<Test<NothingLeft, "equals",  EmptyObject>>,
      Expect<Test<NothingToBegin, "equals",  EmptyObject>>,
    ];

  });
});
