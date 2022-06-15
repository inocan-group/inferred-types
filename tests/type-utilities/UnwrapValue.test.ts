import type { UnwrapValue } from "~/types/type-conversion";
import type { Expect, Equal } from "@type-challenges/utils";

describe("UnwrapValue<T>", () => {

  it("happy path", () => {
    const api = {
        hi: (name: string) => `hi ${name}`,
        bye: (name: string) => `bye ${name}`
    };

    type Api = typeof api;
    type T = UnwrapValue<Api>;
    type Expected = { hi: string; bye: string };

    type cases = [
      Expect<Equal<T, Expected>>
    ];
    const cases: cases = [true];
  });

  it("object which has non-function based props", () => {
    const api = {
        theAnswer: 42,
        hi: (name: string) => `hi ${name}`,
        bye: (name: string) => `bye ${name}`
    };

    type Api = typeof api;
    type T1 = UnwrapValue<Api>;
    type T2 = UnwrapValue<Api, true>;
    type T3 = UnwrapValue<Api, false>;
    type Expected = { hi: string; bye: string };
    type Expected3 = { theAnswer: number; hi: string; bye: string };

    type cases = [
      Expect<Equal<T1, Expected>>,
      Expect<Equal<T2, Expected>>,
      Expect<Equal<T3, Expected3>>,
    ];
    const cases: cases = [true, true, true];
  });
});