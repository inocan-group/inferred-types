import { Equal, Expect } from "@type-challenges/utils";
import { Api, PrivateKeys, PublicKeys } from "~/types";
import { defineType } from "~/utility";
import { api } from "~/utility/api/api";

describe("Api<T> type", () => {
  it("PublicKeys<T> and PrivateKeys<T> type utils extract the right keys", () => {
    const api = {
      _state: 123,
      _name: "hey ho",
      greet: "hi",
      age: 12,
    };

    const f = string;

    type Test = typeof api;
    type Private = PrivateKeys<Test>;
    type Public = PublicKeys<Test>;

    type cases = [
      Expect<Equal<Private, "_state" | "_name">>,
      Expect<Equal<Public, "greet" | "age">>
    ];
    const cases: cases = [true, true];
    expect(cases).toBe(cases);
  });

  it.skip("privateApi() creates a definition for a private API", () => {
    const food = api({ _model: "food", _description: "let's eat" })({
      category: string,
      stars: 5 as number,
    });
    const pub = food();
  });

  it("The Api<T> utility hides all private keys while preserving type info", () => {
    const simple = {
      _state: 123,
      _name: "hey ho",
      greet: "hi",
      age: 12,
    };
    type Simple = Api<typeof simple>;

    const midling = defineType({ id: 123 })({
      _state: 123,
      _name: "hey ho",
      greet: "hi",
      age: 12,
    });
    type Midling = Api<typeof midling>;

    const advanced = defineType({ id: 123, _exclude: ["greet"] })({ greet: "hi", age: 12 });
    type Advanced = Api<typeof advanced>;

    type cases = [
      // a simple API with no literals doesn't need generics
      // to preserve state
      Expect<Equal<Simple, { greet: string; age: number }>>,
      // if the public interface has type literals this is
      // accommodated without any special effort
      Expect<Equal<Midling, { greet: string; age: number; id: 123 }>>,
      Expect<Equal<Midling, { greet: string; age: number; id: 123 }>>
      // in the situation where the private members have
      // literals that need preservation, we need be assured
      // the API implementation can preserve this strong typing
      // However, to start the public API is quite easily preserved
    ];
    const cases: cases = [true, true];
    expect(cases).toBe(cases);
  });
});
