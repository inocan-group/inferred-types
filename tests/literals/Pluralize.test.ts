import { describe, expect, it } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import type { Pluralize } from "inferred-types/types";
import { pluralize } from "inferred-types/runtime";

type Bugs = Pluralize<"bug">;
type Cases = Pluralize<"case">;
type Bunnies = Pluralize<"bunny">;
type Elves = Pluralize<"elf">;
type People = Pluralize<"person">;
type Man = Pluralize<"man">;

describe("Pluralize<T>", () => {
  it("string literals converted to plural equivalent", () => {
    type cases = [
      Expect<Equal<Bugs, "bugs">>,
      Expect<Equal<Cases, "cases">>,
      Expect<Equal<Bunnies, "bunnies">>,
      Expect<Equal<Elves, "elves">>,
      Expect<Equal<Man, "men">>,
      Expect<Equal<People, "people">>
    ];
    const cases: cases = [true, true, true, true, true, true];
  });


  it("wide string is left as a string type", () => {
    type Wide = Pluralize<string>;

    type cases = [
      Expect<Equal<Wide, string>>
    ];
    const cases: cases = [true];
  });

});

describe("pluralize(word)", () => {

  it("exception rules are utilized", () => {
    const man = pluralize("man");
    const person = pluralize("person");
    const basis = pluralize("basis");
    const oasis = pluralize("oasis");

    expect(basis).toBe("bases");
    expect(oasis).toBe("oases");

    expect(man).toBe("men");
    expect(person).toBe("people");

    type cases = [
      Expect<Equal<typeof man, "men">>, //
      Expect<Equal<typeof person, "people">>, //
    ];
    const cases: cases = [true, true];
  });



  it("ending in 'is' is treated appropriately", () => {
    const miss = pluralize("miss");

    expect(miss).toBe("misses");

    type cases = [
      Expect<Equal<typeof miss, "misses">>,
    ];
    const cases: cases = [true];
  });


  it("words ending in singular noun", () => {
    const rich = pluralize("rich");
    expect(rich).toBe("riches");

    type cases = [
      Expect<Equal<typeof rich, "riches">>
    ];
    const cases: cases = [true];
  });

  it("words ending in f", () => {
    const elf = pluralize("elf");
    expect(elf).toBe("elves");

    type cases = [
      Expect<Equal<typeof elf, "elves">>
    ];
    const cases: cases = [true];
  });

  it("words ending in fe", () => {
    const knife = pluralize("knife");
    const knife_sp = pluralize("knife  ");
    expect(knife).toBe("knives");
    expect(knife_sp).toBe("knives  ");

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof knife, "knives">>,
      Expect<Equal<typeof knife_sp, "knives  ">>
    ];
  });


  it("words ending in y", () => {
    const currency = pluralize("currency");
    const c2 = pluralize("currency ");
    const Currency = pluralize("Currency");

    expect(currency).toEqual("currencies");
    expect(c2).toEqual("currencies ");
    expect(Currency).toEqual("Currencies");

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof currency, "currencies">>,
      Expect<Equal<typeof c2, "currencies ">>,
      Expect<Equal<typeof Currency, "Currencies">>,
    ];

  });


  it("words ending in a consonant and then y", () => {
    const money = pluralize("money");
    expect(money).toBe("monies");

    type cases = [
      Expect<Equal<typeof money, "monies">>
    ];
    const cases: cases = [true];
  });

  it("fallback pluralization", () => {
    const cat = pluralize("cat");
    expect(cat).toBe("cats");

    type cases = [
      Expect<Equal<typeof cat, "cats">>
    ];
    const cases: cases = [true];
  });

});

