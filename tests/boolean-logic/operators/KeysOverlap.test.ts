
import { describe, it } from "vitest";
import type { Expect, ExplicitlyEmptyObject, KeysOverlap, Test } from "inferred-types/types";

describe("KeysOverlap<A,B>", () => {

  it("happy path", () => {
    type T1 = KeysOverlap<{foo: 1}, {foo: 2}>;
    type T2 = KeysOverlap<{foo: 1; bar: 2}, {bax: "hi", bar: "bye"}>;

    type F1 = KeysOverlap<{foo: 1}, {bar: 1}>;
    type F2 = KeysOverlap<{foo: 1}, ExplicitlyEmptyObject>;

    type B1 = KeysOverlap<{foo: 1}, {}>;
    type B2 = KeysOverlap<{}, {foo: 1}>;

    type cases = [
        Expect<Test<T1, "equals", true>>,
        Expect<Test<T2, "equals", true>>,

        Expect<Test<F1, "equals", false>>,

        Expect<Test<B1, "equals", boolean>>,
        Expect<Test<B2, "equals", boolean>>,
    ];
  });

});

