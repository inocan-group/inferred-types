import { Equal, Expect } from "@type-challenges/utils";
import { SafeEncode, IsStringLiteral } from "inferred-types/types";
import { describe, it } from "vitest";


describe("SafeEncode<T,G>", () => {
  type test = `There I was, "in the jungle (or maybe forest)"`;


  it("with just quotes", () => {
    type T1 = SafeEncode<test, ["quotes"]>;
    type Brand = T1["__brand"];
    type Groups = T1["groups"];
    type Val = T1["encoded"];


    type cases = [
      Expect<Equal<Brand, "SafeString">>,
      Expect<Equal<Groups, ["quotes"]>>,
      Expect<Equal<Val, "There I was, ^<dq>in the jungle (or maybe forest)^<dq>">>,
    ];
  });


  it("with just brackets", () => {
    type T1 = SafeEncode<test, ["brackets"]>;
    type Brand = T1["__brand"];
    type Groups = T1["groups"];
    type Val = T1["encoded"];

    type cases = [
      Expect<Equal<Brand, "SafeString">>,
      Expect<Equal<Groups, ["brackets"]>>,
      Expect<Equal<Val, "There I was, \"in the jungle ^<op>or maybe forest^<cp>\"">>,
    ];
  });


  it("SafeString literal passes test as string literal", () => {
    type T1 = SafeEncode<test, ["quotes"]>;
    type T2 = IsStringLiteral<T1>;

    type cases = [
      Expect<Equal<T2, true>>
    ];

  });


});
