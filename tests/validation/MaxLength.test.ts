import { Equal, Expect } from "@type-challenges/utils";
import { MaxLength } from "inferred-types/types";
import { Extends, TypedError } from "inferred-types/types";
import { describe, it } from "vitest";

describe("MaxLength", () => {

  it("happy path", () => {
    type T1 = MaxLength<"hello", 5>;
    type T2 = MaxLength<[1,2,3,4,5], 5>;
    type T3 = MaxLength<12345, 5>;

    type F1 = MaxLength<"hello", 4>;
    type F2 = MaxLength<[1,2,3,4,5], 4>;
    type F3 = MaxLength<12345, 4>;

    type W = MaxLength<string, 4>;
    type W2 = MaxLength<"hello", number>;



    type cases = [
        Expect<Equal<T1, "hello">>,
        Expect<Equal<T2, [1,2,3,4,5]>>,
        Expect<Equal<T3, 12345>>,

        Expect<Equal<F1, never>>,
        Expect<Equal<F2, never>>,
        Expect<Equal<F3, never>>,

        Expect<Extends<W, TypedError<"invalid-verifier">>>,
        Expect<Extends<W2, TypedError<"invalid-verifier">>>,
    ];
  });

});
