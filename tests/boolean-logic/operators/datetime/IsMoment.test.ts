import { IsMoment, MomentLike } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsMoment<T>", () => {

  it("Valid Moment.js-like Objects", () => {

    type cases = [
      // Complete Moment.js-like object should return true
      Expect<Test<IsMoment<MomentLike>, "equals", true>>,
    ];
  });

  it("Incomplete Moment.js Objects", () => {
    type IncompleteMoment = {
      format: () => string;
      year: () => number;
      month: () => number;
      // Missing required methods
    };

    type cases = [
      // Incomplete objects should return false
      Expect<Test<IsMoment<IncompleteMoment>, "equals", false>>,
    ];
  });

  it("Objects Missing Key Methods", () => {
    type NoFormat = {
      year: () => number;
      month: () => number;
      date: () => number;
      hour: () => number;
      minute: () => number;
      second: () => number;
      millisecond: () => number;
      add: (amount: number, unit: string) => any;
      toISOString: () => string;
    };

    type NoAdd = {
      format: () => string;
      year: () => number;
      month: () => number;
      date: () => number;
      hour: () => number;
      minute: () => number;
      second: () => number;
      millisecond: () => number;
      toISOString: () => string;
    };

    type cases = [
      // Missing format method
      Expect<Test<IsMoment<NoFormat>, "equals", false>>,
      // Missing add method
      Expect<Test<IsMoment<NoAdd>, "equals", false>>,
    ];
  });

  it("Non-Function Properties", () => {
    type NonFunctionMethods = {
      format: string; // Not a function
      year: number; // Not a function
      month: () => number;
      date: () => number;
      hour: () => number;
      minute: () => number;
      second: () => number;
      millisecond: () => number;
      add: (amount: number, unit: string) => any;
      toISOString: () => string;
    };

    type cases = [
      // Properties that aren't functions should return true (just checks for key existence)
      Expect<Test<IsMoment<NonFunctionMethods>, "equals", true>>,
    ];
  });

  it("Non-Object Types", () => {
    type cases = [
      // Primitive types should return false
      Expect<Test<IsMoment<string>, "equals", false>>,
      Expect<Test<IsMoment<number>, "equals", false>>,
      Expect<Test<IsMoment<boolean>, "equals", false>>,
      Expect<Test<IsMoment<null>, "equals", false>>,
      Expect<Test<IsMoment<undefined>, "equals", false>>,
      Expect<Test<IsMoment<symbol>, "equals", false>>,
      // Date object is not a Moment
      Expect<Test<IsMoment<Date>, "equals", false>>,
    ];
  });

  it("Empty and Minimal Objects", () => {
    type cases = [
      // Empty object should return false
      Expect<Test<IsMoment<{}>, "equals", false>>,
      // Object with only some properties should return false
      Expect<Test<IsMoment<{ format: () => string }>, "equals", false>>,
      Expect<Test<IsMoment<{ year: () => number }>, "equals", false>>,
    ];
  });

  it("Arrays and Functions", () => {
    type cases = [
      // Arrays should return false
      Expect<Test<IsMoment<[]>, "equals", false>>,
      Expect<Test<IsMoment<Array<any>>, "equals", false>>,
      // Functions should return false
      Expect<Test<IsMoment<() => void>, "equals", false>>,
      Expect<Test<IsMoment<Function>, "equals", false>>,
    ];
  });



  it("Union Types", () => {
    type ValidMoment = {
      format: () => string;
      year: () => number;
      month: () => number;
      date: () => number;
      hour: () => number;
      minute: () => number;
      second: () => number;
      millisecond: () => number;
      add: (amount: number, unit: string) => ValidMoment;
      toISOString: () => string;
    };

    type cases = [
      // Union with valid Moment returns false (union type system behavior)
      Expect<Test<IsMoment<ValidMoment | string>, "equals", false>>,
      Expect<Test<IsMoment<ValidMoment | Date>, "equals", false>>,
      // Union of non-Moments should return false
      Expect<Test<IsMoment<string | number>, "equals", false>>,
    ];
  });

  it("Complex Nested Objects", () => {
    type NestedObject = {
      moment: {
        format: () => string;
        year: () => number;
        month: () => number;
        date: () => number;
        hour: () => number;
        minute: () => number;
        second: () => number;
        millisecond: () => number;
        add: (amount: number, unit: string) => any;
        toISOString: () => string;
      };
    };

    type cases = [
      // Nested objects with Moment-like properties should return false (not at root level)
      Expect<Test<IsMoment<NestedObject>, "equals", false>>,
    ];
  });

});
