import { describe, expect, it } from "vitest";
import type { Expect, Pluralize, Test } from "inferred-types/types";
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
      Expect<Test<Bugs, "equals",  "bugs">>,
      Expect<Test<Cases, "equals",  "cases">>,
      Expect<Test<Bunnies, "equals",  "bunnies">>,
      Expect<Test<Elves, "equals",  "elves">>,
      Expect<Test<Man, "equals",  "men">>,
      Expect<Test<People, "equals",  "people">>
    ];
  });


  it("wide string is left as a string type", () => {
    type Wide = Pluralize<string>;

    type cases = [
      Expect<Test<Wide, "equals",  string>>
    ];
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
      Expect<Test<typeof man, "equals",  "men">>, //
      Expect<Test<typeof person, "equals",  "people">>, //
    ];
  });



  it("ending in 'is' is treated appropriately", () => {
    const miss = pluralize("miss");

    expect(miss).toBe("misses");

    type cases = [
      Expect<Test<typeof miss, "equals",  "misses">>,
    ];
  });


  it("words ending in singular noun", () => {
    const rich = pluralize("rich");
    expect(rich).toBe("riches");

    type cases = [
      Expect<Test<typeof rich, "equals",  "riches">>
    ];
  });

  it("words ending in f", () => {
    const elf = pluralize("elf");
    expect(elf).toBe("elves");

    type cases = [
      Expect<Test<typeof elf, "equals",  "elves">>
    ];
  });

  it("words ending in fe", () => {
    const knife = pluralize("knife");
    const knife_sp = pluralize("knife  ");
    expect(knife).toBe("knives");
    expect(knife_sp).toBe("knives  ");

    type cases = [
      Expect<Test<typeof knife, "equals",  "knives">>,
      Expect<Test<typeof knife_sp, "equals",  "knives  ">>
    ];
  });


  it("words ending in y", () => {
    const currency = pluralize("currency");
    const c2 = pluralize("currency ");
    const Currency = pluralize("Currency");

    expect(currency).toEqual("currencies");
    expect(c2).toEqual("currencies ");
    expect(Currency).toEqual("Currencies");

    type cases = [
      Expect<Test<typeof currency, "equals",  "currencies">>,
      Expect<Test<typeof c2, "equals",  "currencies ">>,
      Expect<Test<typeof Currency, "equals",  "Currencies">>,
    ];

  });


  it("words ending in a consonant and then y", () => {
    const money = pluralize("money");
    expect(money).toBe("monies");

    type cases = [
      Expect<Test<typeof money, "equals",  "monies">>
    ];
  });

  it("fallback pluralization", () => {
    const cat = pluralize("cat");
    expect(cat).toBe("cats");

    type cases = [
      Expect<Test<typeof cat, "equals",  "cats">>
    ];
  });

});

