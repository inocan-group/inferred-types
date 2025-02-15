import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { TypeReplace } from "inferred-types/types";

describe("TypeReplace", () => {

  it("on a scalar", () => {
    type Nada = TypeReplace<null, null, "nada">;
    type Undef = TypeReplace<undefined, undefined, "undefined">;

    type Narrow = TypeReplace<42, number, string>;
    type Narrow2 = TypeReplace<42, number, string, "narrow">;
    type Wide = TypeReplace<42, number, string, "wide">;
    type Medium = TypeReplace<42, number, string, "medium">;

    type cases = [
      Expect<Equal<Nada, "nada">>,
      Expect<Equal<Undef, "undefined">>,
      Expect<Equal<Narrow, "42">>,
      Expect<Equal<Narrow2, "42">>,
      Expect<Equal<Wide, string>>,
      Expect<Equal<Medium, `${number}`>>,
    ];
  });


  it("on an array", () => {
    type Narrow = TypeReplace<[42, 56, "foo", true], number, string>
    type Medium = TypeReplace<[42, 56, "foo", true], number, string, "medium">
    type Wide = TypeReplace<[42, 56, "foo", true], number, string, "wide">

    type cases = [
      Expect<Equal<Narrow, ["42", "56", "foo", true]>>,
      Expect<Equal<Medium, [`${number}`, `${number}`, "foo", true]>>,
      Expect<Equal<Wide, [string, string, "foo", true]>>,
    ];
  });



  it("with union type for find literal", () => {
    type Narrow = TypeReplace<[42, 56, "foo", true], number | string, string>
    type Narrow2 = TypeReplace<[42, 56, "foo", true], number | boolean, string>
    type Medium = TypeReplace<[42, 56, "foo", true], number | boolean, string, "medium">
    type Wide = TypeReplace<[42, 56, "foo", true], number | boolean, string, "wide">

    type cases = [
      Expect<Equal<Narrow, ["42", "56", "foo", true]>>,
      Expect<Equal<Narrow2, ["42", "56", "foo", "true"]>>,
      Expect<Equal<Medium, [`${number}`, `${number}`, "foo", true]>>,
      Expect<Equal<Wide, [string, string, "foo", true]>>,
    ];

    type cases = [
      /** type tests */
    ];
  });


});
