import { Api, FluentApi, ToFluent } from "~/types";
import type { Expect, ExpectExtends, ExpectFalse, Equal } from "@type-challenges/utils";
import { createStateIdentityApi } from "../../tests/data";
import { MutationApi } from "~/Builder";

type TypedApi = {
  /** says hello */
  hi: () => string;
  bye: () => string;
  luckyNumber: (n: number) => number;
  /** the meaning of life */
  meaningOfLife: number;
  repeat: () => TypedApi;
};


const api = {
  hi: () => "hi",
  bye: () => "bye",
  luckyNumber: (n) => n,
  meaningOfLife: 42,
  repeat: () => api
};


describe("Api<T> type", () => {

  it("Api utility type does not change type but inferred and explicit do deviate with fluent API", () => {

    type Untyped = typeof api;
    type ATyped = Api<TypedApi>;
    type AUntyped = Api<Untyped>;

    type cases = [
      // inferred type is same as the inferred type wrapped by Api utility
      Expect<Equal<AUntyped, Untyped>>,
      // explicit type T is same as Api<T>
      Expect<Equal<ATyped, TypedApi>>,
      // the implicit and explicit types do vary because 
      // the explicit can refer to a named type when
      // a fluent API is employed
      ExpectFalse<Equal<ATyped, AUntyped>>,
      // still, the two API's are in effect the same
      Expect<ExpectExtends<ATyped, AUntyped>>,
      Expect<ExpectExtends<AUntyped, ATyped>>,
    ];
    const cases: cases = [true, true, false, true, true];
    expect(cases).toBe(cases);

  });

  it("A identity API converted to a fluent API can then be converted to an Api", () => {
    const api = createStateIdentityApi();
    type MutApi = MutationApi<typeof api>;
    type Fluent = FluentApi<ToFluent<MutApi>, {}, "">;
    type AnApi = Api<Fluent>;


  });

});