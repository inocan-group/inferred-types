import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { NamedColorMinimal } from "inferred-types/types";
import {  createMapper, tuple } from "inferred-types/runtime";

type AgeColor = { age: number; color: NamedColorMinimal };
type IdAgeColor = { id: string; age: number; color: NamedColorMinimal; rando?: number };
const input  = tuple(
  { age: 12, color: "AliceBlue" },
  { age: 42, color: "FireBrick" }
 );

describe("createMapper<TFrom,TTo>()", () => {
  // TODO: determine whether to invest in this utility

  it("first test", () => {

    const mapper = createMapper<AgeColor,IdAgeColor>()(
      i => ({color: i.color, age: i.age,  id: `${i.color}-${i.age}`})
    );


    const result = mapper.map(input);
    const result2 = input.map(mapper);

    expect(result).toEqual([
      { id: "AliceBlue-12", age: 12, color: "AliceBlue" },
      { id: "FireBrick-42", age: 42, color: "FireBrick" }
    ])
    expect(result2).toEqual(result);


    // @ts-ignore
    type cases = [
      Expect<Test<typeof result, [IdAgeColor, "equals",  IdAgeColor]>>
    ];
  });

});


