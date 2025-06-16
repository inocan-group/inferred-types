import { describe, it, expect } from "vitest";
import { compare, err } from "inferred-types/runtime";

describe("compare() runtime function", () => {

  describe("String operations", () => {
    it("startsWith", () => {
      const startsWithHello = compare("startsWith", ["Hello"]);
      expect(startsWithHello("Hello World")).toBe(true);
      expect(startsWithHello("Hi World")).toBe(false);
      expect(startsWithHello(123)).toBe(false);
    });

    it("endsWith", () => {
      const endsWithWorld = compare("endsWith", ["World"]);
      expect(endsWithWorld("Hello World")).toBe(true);
      expect(endsWithWorld("Hello Earth")).toBe(false);
      expect(endsWithWorld(123)).toBe(false);
    });

    it("endsWithNumber", () => {
      const endsWithNum = compare("endsWithNumber", []);
      expect(endsWithNum("test123")).toBe(true);
      expect(endsWithNum("test")).toBe(false);
      expect(endsWithNum(123 as any)).toBe(true);
      expect(endsWithNum(120 as any)).toBe(true);
    });

    it("startsWithNumber", () => {
      const startsWithNum = compare("startsWithNumber", []);
      expect(startsWithNum("123test")).toBe(true);
      expect(startsWithNum("test123")).toBe(false);
      expect(startsWithNum(123 as any)).toBe(true);
    });

    it("onlyNumbers", () => {
      const onlyNums = compare("onlyNumbers", []);
      expect(onlyNums("12345")).toBe(true);
      expect(onlyNums("123a45")).toBe(false);
      expect(onlyNums("")).toBe(true); // empty string has all numbers (vacuously true)
      expect(onlyNums(123 as any)).toBe(false); // not a string
    });

    it("onlyLetters", () => {
      const onlyLetters = compare("onlyLetters", []);
      expect(onlyLetters("abcDEF")).toBe(true);
      expect(onlyLetters("abc123")).toBe(false);
      expect(onlyLetters("abc def")).toBe(false); // space is not a letter
      expect(onlyLetters(123 as any)).toBe(false);
    });

    it("alphaNumeric", () => {
      const alphaNum = compare("alphaNumeric", []);
      expect(alphaNum("abc123")).toBe(true);
      expect(alphaNum("abc")).toBe(true);
      expect(alphaNum("123")).toBe(true);
      expect(alphaNum("abc 123")).toBe(false); // space is not alphanumeric
      expect(alphaNum("abc-123")).toBe(false); // hyphen is not alphanumeric
    });
  });

  describe("General operations", () => {
    it("equals", () => {
      const equals5 = compare("equals", [5]);
      expect(equals5(5)).toBe(true);
      expect(equals5("5")).toBe(false);
      expect(equals5(6)).toBe(false);

      const equalsHello = compare("equals", ["hello"]);
      expect(equalsHello("hello")).toBe(true);
      expect(equalsHello("Hello")).toBe(false);
    });

    it("false", () => {
      const isFalseOp = compare("false", []);
      expect(isFalseOp(false)).toBe(true);
      expect(isFalseOp(true)).toBe(false);
      expect(isFalseOp(0)).toBe(false);
      expect(isFalseOp("")).toBe(false);
      expect(isFalseOp(null)).toBe(false);
    });

    it("true", () => {
      const isTrueOp = compare("true", []);
      expect(isTrueOp(true)).toBe(true);
      expect(isTrueOp(false)).toBe(false);
      expect(isTrueOp(1)).toBe(false);
      expect(isTrueOp("true")).toBe(false);
    });

    it("truthy", () => {
      const isTruthyOp = compare("truthy", []);
      expect(isTruthyOp(true)).toBe(true);
      expect(isTruthyOp(1)).toBe(true);
      expect(isTruthyOp("hello")).toBe(true);
      expect(isTruthyOp([])).toBe(true);
      expect(isTruthyOp({})).toBe(true);
      expect(isTruthyOp(false)).toBe(false);
      expect(isTruthyOp(0)).toBe(false);
      expect(isTruthyOp("")).toBe(false);
      expect(isTruthyOp(null)).toBe(false);
      expect(isTruthyOp(undefined)).toBe(false);
    });

    it("falsy", () => {
      const isFalsyOp = compare("falsy", []);
      expect(isFalsyOp(false)).toBe(true);
      expect(isFalsyOp(0)).toBe(true);
      expect(isFalsyOp("")).toBe(true);
      expect(isFalsyOp(null)).toBe(true);
      expect(isFalsyOp(undefined)).toBe(true);
      expect(isFalsyOp(NaN)).toBe(true);
      expect(isFalsyOp(true)).toBe(false);
      expect(isFalsyOp(1)).toBe(false);
      expect(isFalsyOp("hello")).toBe(false);
    });

    it("equalsSome", () => {
      const equalsSome = compare("equalsSome", [1, 2, 3]);
      expect(equalsSome(2)).toBe(true);
      expect(equalsSome(4)).toBe(false);
      expect(equalsSome("2")).toBe(false);
    });

    it("contains", () => {
      const containsHello = compare("contains", ["hello"]);
      expect(containsHello("hello world")).toBe(true);
      expect(containsHello("hi world")).toBe(false);
      expect(containsHello(["hello", "world"])).toBe(true);
      expect(containsHello(["hi", "world"])).toBe(false);
    });

    it("containsSome", () => {
      const containsSome = compare("containsSome", ["hello", "hi"]);
      expect(containsSome("hello world")).toBe(true);
      expect(containsSome("hi there")).toBe(true);
      expect(containsSome("goodbye")).toBe(false);
      expect(containsSome(["hello", "world"])).toBe(true);
    });

    it("containsAll", () => {
      const containsAll = compare("containsAll", ["hello", "world"]);
      expect(containsAll("hello world")).toBe(true);
      expect(containsAll("world hello")).toBe(true);
      expect(containsAll("hello")).toBe(false);
      expect(containsAll(["hello", "world", "test"])).toBe(true);
      expect(containsAll(["hello", "test"])).toBe(false);
    });
  });

  describe("Numeric operations", () => {
    it("greaterThan", () => {
      const gt5 = compare("greaterThan", [5]);
      expect(gt5(6)).toBe(true);
      expect(gt5(5)).toBe(false);
      expect(gt5(4)).toBe(false);
      expect(gt5("6")).toBe(true); // numeric string
      expect(gt5("not a number" as any)).toBe(false);
    });

    it("greaterThanOrEqual", () => {
      const gte5 = compare("greaterThanOrEqual", [5]);
      expect(gte5(6)).toBe(true);
      expect(gte5(5)).toBe(true);
      expect(gte5(4)).toBe(false);
    });

    it("lessThan", () => {
      const lt5 = compare("lessThan", [5]);
      expect(lt5(4)).toBe(true);
      expect(lt5(5)).toBe(false);
      expect(lt5(6)).toBe(false);
    });

    it("lessThanOrEqual", () => {
      const lte5 = compare("lessThanOrEqual", [5]);
      expect(lte5(4)).toBe(true);
      expect(lte5(5)).toBe(true);
      expect(lte5(6)).toBe(false);
    });

    it("betweenExclusively", () => {
      const between5and10 = compare("betweenExclusively", [5, 10]);
      expect(between5and10(7)).toBe(true);
      expect(between5and10(5)).toBe(false);
      expect(between5and10(10)).toBe(false);
      expect(between5and10(3)).toBe(false);
    });

    it("betweenInclusively", () => {
      const between5and10 = compare("betweenInclusively", [5, 10]);
      expect(between5and10(7)).toBe(true);
      expect(between5and10(5)).toBe(true);
      expect(between5and10(10)).toBe(true);
      expect(between5and10(3)).toBe(false);
      expect(between5and10(11)).toBe(false);
    });
  });

  describe("Object operations", () => {
    it("objectKeyGreaterThan", () => {
      const ageGt18 = compare("objectKeyGreaterThan", ["age", 18]);
      expect(ageGt18({ age: 25 })).toBe(true);
      expect(ageGt18({ age: 18 })).toBe(false);
      expect(ageGt18({ age: 15 })).toBe(false);
      expect(ageGt18({ name: "John" })).toBe(false); // no age key
      expect(ageGt18({ age: "25" })).toBe(true); // numeric string
      expect(ageGt18({ age: "not a number" })).toBe(false);
      expect(ageGt18("not an object" as any) instanceof Error).toBe(true);
    });

    it("objectKeyGreaterThanOrEqual", () => {
      const ageGte18 = compare("objectKeyGreaterThanOrEqual", ["age", 18]);
      expect(ageGte18({ age: 25 })).toBe(true);
      expect(ageGte18({ age: 18 })).toBe(true);
      expect(ageGte18({ age: 15 })).toBe(false);
    });

    it("objectKeyLessThan", () => {
      const ageLt18 = compare("objectKeyLessThan", ["age", 18]);
      expect(ageLt18({ age: 15 })).toBe(true);
      expect(ageLt18({ age: 18 })).toBe(false);
      expect(ageLt18({ age: 25 })).toBe(false);
    });

    it("objectKeyLessThanOrEqual", () => {
      const ageLte18 = compare("objectKeyLessThanOrEqual", ["age", 18]);
      expect(ageLte18({ age: 15 })).toBe(true);
      expect(ageLte18({ age: 18 })).toBe(true);
      expect(ageLte18({ age: 25 })).toBe(false);
    });

    it("objectKeyEquals", () => {
      const nameEquals = compare("objectKeyEquals", ["name", "John"]);
      expect(nameEquals({ name: "John" })).toBe(true);
      expect(nameEquals({ name: "Jane" })).toBe(false);
      expect(nameEquals({ age: 25 })).toBe(false); // no name key
      expect(nameEquals("not an object" as any) instanceof Error).toBe(true);
    });
  });

  describe("DateTime operations", () => {
    const date1 = new Date("2023-01-15T10:00:00");
    const date2 = new Date("2023-01-15T14:00:00");
    const date3 = new Date("2023-02-15T10:00:00");
    const date4 = new Date("2024-01-15T10:00:00");

    it("sameDay", () => {
      const sameDayAs = compare("sameDay", [date1]);
      expect(sameDayAs(date1)).toBe(true);
      expect(sameDayAs(date2)).toBe(true); // same day, different time
      expect(sameDayAs(date3)).toBe(false); // different month
      expect(sameDayAs("not a date" as any) instanceof Error).toBe(true);
    });

    it("sameMonth", () => {
      const sameMonthAs = compare("sameMonth", [date1]);
      expect(sameMonthAs(date1)).toBe(true);
      expect(sameMonthAs(date2)).toBe(true);
      expect(sameMonthAs(date3)).toBe(false);
      expect(sameMonthAs(date4)).toBe(true); // same month, different year
    });

    it("sameMonthYear", () => {
      const sameMonthYearAs = compare("sameMonthYear", [date1]);
      expect(sameMonthYearAs(date1)).toBe(true);
      expect(sameMonthYearAs(date2)).toBe(true);
      expect(sameMonthYearAs(date3)).toBe(false);
      expect(sameMonthYearAs(date4)).toBe(false); // different year
    });

    it("sameYear", () => {
      const sameYearAs = compare("sameYear", [date1]);
      expect(sameYearAs(date1)).toBe(true);
      expect(sameYearAs(date2)).toBe(true);
      expect(sameYearAs(date3)).toBe(true);
      expect(sameYearAs(date4)).toBe(false);
    });

    it("after", () => {
      const afterDate1 = compare("after", [date1]);
      expect(afterDate1(date2)).toBe(true);
      expect(afterDate1(date1)).toBe(false);
      expect(afterDate1(new Date("2023-01-14"))).toBe(false);
    });

    it("before", () => {
      const beforeDate2 = compare("before", [date2]);
      expect(beforeDate2(date1)).toBe(true);
      expect(beforeDate2(date2)).toBe(false);
      expect(beforeDate2(date3)).toBe(false);
    });
  });

  describe("Other operations", () => {
    it("errors", () => {
      const isError = compare("errors", []);
      expect(isError(new Error("test"))).toBe(true);
      expect(isError(new TypeError("test"))).toBe(true);
      expect(isError("not an error")).toBe(false);
      expect(isError(null)).toBe(false);
    });

    it("errorsOfType", () => {
      const customError = Object.assign(new Error("test"), { type: "CustomError" });
      const isCustomError = compare("errorsOfType", ["CustomError"]);
      expect(isCustomError(customError)).toBe(true);
      expect(isCustomError(new Error("test"))).toBe(false);
      expect(isCustomError("not an error")).toBe(false);
    });

    it("returnEquals - returns runtime limitation error", () => {
      const fn = () => 5;
      const returnEquals5 = compare("returnEquals", [5]);
      const result = returnEquals5(fn);
      expect(result instanceof Error).toBe(true);
      // The err() function uses the first part as the type
      expect((result as any).type).toBe("runtime-limitation");
    });

    it("returnExtends - returns runtime limitation error", () => {
      const fn = () => "hello";
      const returnExtendsString = compare("returnExtends", ["string"]);
      const result = returnExtendsString(fn);
      expect(result instanceof Error).toBe(true);
      // The err() function uses the first part as the type
      expect((result as any).type).toBe("runtime-limitation");
    });
  });

  describe("Edge cases and error handling", () => {
    it("handles invalid operations", () => {
      // @ts-ignore
      const invalidOp = compare("notAnOperation" as any, []);
      const result = invalidOp("test");
      expect(result instanceof Error).toBe(true);
      expect((result as Error).message).toContain("not a supported operation");
    });

    it("handles invalid parameters gracefully", () => {
      // Testing numeric operation with non-numeric parameter
      const gtInvalid = compare("greaterThan", ["not a number" as any]);
      const result = gtInvalid(5);
      expect(result instanceof Error).toBe(true);
    });

    it("handles complex nested comparisons", () => {
      const data = [
        { name: "John", age: 25, skills: ["js", "ts"] },
        { name: "Jane", age: 30, skills: ["python", "js"] },
        { name: "Bob", age: 20, skills: ["java"] }
      ];

      const ageGt21 = compare("objectKeyGreaterThan", ["age", 21]);
      const filtered = data.filter(person => ageGt21(person) === true);
      expect(filtered).toHaveLength(2);
      expect(filtered.map(p => p.name)).toEqual(["John", "Jane"]);
    });
  });
});
