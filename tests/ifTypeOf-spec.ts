/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Expect, Equal } from "@type-challenges/utils";
import { ifTypeOf, defineType, literal } from "~/utility";

describe("ifTypeOf() utility", () => {
  it("base validation with extends() returns true/false", () => {
    const target = { foo: "", bar: 0 };
    const yup = ifTypeOf({ foo: "foo", bar: 42 }).extends(target);
    const nope = ifTypeOf({ foo: "foo", bar: "whoops" }).extends(target);

    expect(yup).toBe(true);
    expect(nope).toBe(false);

    type cases = [
      Expect<Equal<typeof yup, true>>,
      Expect<Equal<typeof nope, false>>,
    ];
    const cases: cases = [true, true];
    expect(cases).toBe(cases);
  });

  it("base validation of narrowlyExtends() returns true/false", () => {
    const target = defineType({ bar: 0 })({ foo: "foo" });
    const yup = ifTypeOf({ foo: "foo", bar: 0 }).extends(target);
    const yup2 = ifTypeOf({ foo: "foey", bar: 0 }).extends(target);
    const nope1 = ifTypeOf({ foo: "foo", bar: 42 }).narrowlyExtends(target);
    const nope2 = ifTypeOf({ foo: "foo", bar: "whoops" }).extends(target);

    expect(yup).toBe(true);
    expect(yup2).toBe(true);
    expect(nope1).toBe(false);
    expect(nope2).toBe(false);

    type cases = [
      Expect<Equal<typeof yup, true>>,
      Expect<Equal<typeof yup2, true>>,
      Expect<Equal<typeof nope1, false>>,
      Expect<Equal<typeof nope2, false>>,
    ];
    const cases: cases = [true, true, true, true];
    expect(cases).toBe(cases);
  });

  it("validation of non-dictionary types works as expected too", () => {
    const target = 42 as number;
    const t2 = literal(42);

    const numToNum = ifTypeOf(55).extends(target);
    const wideNumCompare = ifTypeOf(0).extends(target);
    const narrowEquality = ifTypeOf(42).narrowlyExtends(t2);
    const stringIsNumber = ifTypeOf("foo").extends(target);
    const diffNumbersNarrowly = ifTypeOf(12).narrowlyExtends(t2);

    expect(numToNum).toBe(true);
    expect(wideNumCompare).toBe(true);
    expect(narrowEquality).toBe(true);
    expect(stringIsNumber).toBe(false);
    expect(diffNumbersNarrowly).toBe(false);

    type cases = [
      Expect<Equal<typeof numToNum, true>>,
      Expect<Equal<typeof wideNumCompare, true>>,
      Expect<Equal<typeof narrowEquality, true>>,
      Expect<Equal<typeof stringIsNumber, false>>,
      Expect<Equal<typeof diffNumbersNarrowly, false>>,
    ];
    const cases: cases = [true, true, true, true, true];
    expect(cases).toBe(cases);
  });

  it("validation of function types works when expressed widely", () => {
    const target: Function = () => "";
    const fn = () => "hi";
    const fnExtends = ifTypeOf(fn).extends(target);

    expect(fnExtends).toBe(true);

    type cases = [
      Expect<Equal<typeof fnExtends, true>>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("checklist example", () => {
    const noFoodOrDrink = ifTypeOf({ wakeUp: true }).extends({ wakeUp: true, eatBreakfast: true, drinkCoffee: true });
    const ready = ifTypeOf({ wakeUp: true, eatBreakfast: true, drinkCoffee: true }).extends({ wakeUp: true, eatBreakfast: true, drinkCoffee: true });

    // completely wrong
    const fullyBaked = ifTypeOf({ wakeUp: false, eatBreakfast: false, drinkCoffee: false }).extends({ wakeUp: true, eatBreakfast: true, drinkCoffee: true });

    // half-right
    const halfBaked = ifTypeOf({ wakeUp: false, eatBreakfast: false, drinkCoffee: false }).extends({ wakeUp: true, eatBreakfast: true, drinkCoffee: true } as const);

    // back to right; at the cost of being very careful
    const lucid = ifTypeOf({ wakeUp: false, eatBreakfast: false, drinkCoffee: false }).narrowlyExtends({ wakeUp: true, eatBreakfast: true, drinkCoffee: true } as const);

    // run-time tests of False Positives
    // ---------------------------------
    expect(noFoodOrDrink).toBe(false);
    expect(ready).toBe(true);

    // here we'll show how narrow types need to be
    // made explicit to both type and run time systems

    // in "fullyBaked" both run-time and type system are wrong functionally
    // but they report as true
    expect(fullyBaked).toBe(true);
    // we can get to a half-way house by expressing the type as "as const" and making it's types
    // literals; now the type system report "false" and the runtime says "true"
    expect(halfBaked).toBe(true);
    // to get to a fully working solution we need to use the `narrowlyDefines` operator
    // along with the "as const" for the type system
    expect(lucid).toBe(false);

    // type tests
    type FalsePositives = [
      Expect<Equal<typeof noFoodOrDrink, false>>,
      Expect<Equal<typeof fullyBaked, true>>,
      Expect<Equal<typeof halfBaked, false>>,
      Expect<Equal<typeof lucid, false>>
    ];
    const falsePositives: FalsePositives = [true, true, true, true];
    expect(falsePositives).toBe(falsePositives);

    // but now we have to accept that the type might be a combination of both
    // literal types and broader types; this is not hard to express with types
    // but it makes our approach much more awkward and the API much more cumbersome

    // here we see a type that represents this challange but how it fails with
    // with the runtime

    const literal = { foo: 1 } as const;
    const wide = { bar: "hi" };
    const hybrid = { ...literal, ...wide };
    const toughLuck = ifTypeOf({ foo: 1, bar: "bye" }).narrowlyExtends(hybrid);

    // toughLuck should be TRUE because both bar's are strings
    // but because we need to preserve run-time literal checking on "foo"
    // it is doing it on both
    expect(toughLuck).toBe(false);

    type HybridTests = [
      // foo is a literal, bar is wide
      Expect<Equal<typeof hybrid, { foo: 1; bar: string }>>,
      // and type system correctly evaluates
      Expect<Equal<typeof toughLuck, true>>
    ];
    const ToughLuck: HybridTests = [true, true];
    expect(ToughLuck).toBe(ToughLuck);

    // in addition to this hybrid issue, i'm not sure there is a good
    // way to do a narrow type check on a function; we can hit some use
    // cases by converting to a string but that's incomplete
    const fn = (_c: number) => "string";
    const fn2 = (_c: number) => "string";
    const genericFn: Function = () => "string";


    try {
      const narrow = ifTypeOf(fn).narrowlyExtends(fn2);
      const asWellAsGeneric = ifTypeOf(fn).narrowlyExtends(genericFn);
      // the type checks shows that the type system is fine
      type Functions = [
        Expect<Equal<typeof narrow, true>>,
        Expect<Equal<typeof asWellAsGeneric, true>>
      ];
      const functions: Functions = [true, true];
      expect(functions).toBe(functions);
      throw new Error("The attempt to run narrowlyExtends on a function should throw an error");
    } catch {
      // there is no way to narrow compare functions and so it throws
      // an error to the run time system
    };

  });
});

