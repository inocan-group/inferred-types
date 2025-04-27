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
      Expect<Test<Nada, "equals",  "nada">>,
      Expect<Test<Undef, "equals",  "undefined">>,
      Expect<Test<Narrow, "equals",  "42">>,
      Expect<Test<Narrow2, "equals",  "42">>,
      Expect<Test<Wide, "equals",  string>>,
      Expect<Test<Medium, "equals",  `${number}`>>,
    ];
  });


  it("on an array", () => {
    type Narrow = TypeReplace<[42, 56, "foo", true], number, string>
    type Medium = TypeReplace<[42, 56, "foo", true], number, string, "medium">
    type Wide = TypeReplace<[42, 56, "foo", true], number, string, "wide">

    type cases = [
      Expect<Test<Narrow, ["42", "56", "foo", "equals",  true]>>,
      Expect<Test<Medium, [`${number}`, `${number}`, "foo", "equals",  true]>>,
      Expect<Test<Wide, [string, string, "foo", "equals",  true]>>,
    ];
  });



  it("with union type for find literal", () => {
    type Narrow = TypeReplace<[42, 56, "foo", true], number | string, string>
    type Narrow2 = TypeReplace<[42, 56, "foo", true], number | boolean, string>
    type Medium = TypeReplace<[42, 56, "foo", true], number | boolean, string, "medium">
    type Wide = TypeReplace<[42, 56, "foo", true], number | boolean, string, "wide">

    type cases = [
      Expect<Test<Narrow, ["42", "56", "foo", "equals",  true]>>,
      Expect<Test<Narrow2, ["42", "56", "foo", "equals",  "true"]>>,
      Expect<Test<Medium, [`${number}`, `${number}`, "foo", "equals",  `${true}`]>>,
      Expect<Test<Wide, [string, string, "foo", "equals",  string]>>,
    ];

  });


});
