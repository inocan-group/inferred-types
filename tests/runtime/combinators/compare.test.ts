import { describe, it, expect } from "vitest";
import { compare } from "inferred-types/runtime";
import {
    Compare,
    Expect,
    Test,
    IsFalse,
    IsFalsy
} from "inferred-types/types";

describe("compare() runtime function", () => {

    describe("String operations", () => {
        it("startsWith", () => {
            const startsWithHello = compare("startsWith", "Hello");
            const result1 = startsWithHello("Hello World");
            const result2 = startsWithHello("Hi World");
            const result3 = startsWithHello(123);

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", false>>
            ];
        });

        it("endsWith", () => {
            const endsWithWorld = compare("endsWith", "World");
            type Result1 = Compare<"Hello World", "endsWith", ["World"]>;
            const result1 = endsWithWorld("Hello World");
            type Result2 = Compare<"Hello Earth", "endsWith", ["World"]>;
            const result2 = endsWithWorld("Hello Earth");
            type Result3 = Compare<123, "endsWith", ["World"]>;
            const result3 = endsWithWorld(123);

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<Result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<Result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", false>>,
                Expect<Test<Result3, "equals", false>>,

            ];
        });

        it("endsWithNumber", () => {
            const endsWithNum = compare("endsWithNumber");
            const result1 = endsWithNum("test123");
            const result2 = endsWithNum("test");
            const result3 = endsWithNum(123 as any);
            const result4 = endsWithNum(120 as any);

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(true);
            expect(result4).toBe(true);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", boolean>>,
                Expect<Test<typeof result4, "equals", boolean>>
            ];
        });

        it("startsWithNumber", () => {
            const startsWithNum = compare("startsWithNumber");
            const result1 = startsWithNum("123test");
            const result2 = startsWithNum("test123");
            const result3 = startsWithNum("123" as any);
            const f1 = startsWithNum(123 as any);

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(true);
            expect(f1).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", boolean>>,
                Expect<Test<typeof f1, "equals", boolean>>,
            ];
        });

        it("onlyNumbers", () => {
            type X = Compare<"", "onlyNumbers">
            const onlyNums = compare("onlyNumbers");
            const result1 = onlyNums("12345");
            const result2 = onlyNums("123a45");
            const result3 = onlyNums("");
            const result4 = onlyNums(123 as any);

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(false);
            expect(result4).toBe(false); // not a string

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", false>>,
                Expect<Test<typeof result4, "equals", boolean>>
            ];
        });

        it("onlyLetters", () => {
            const onlyLetters = compare("onlyLetters");
            const abc = onlyLetters("abcDEF");
            expect(abc).toBe(true);
            expect(onlyLetters("abc123")).toBe(false);
            expect(onlyLetters("abc def")).toBe(false); // space is not a letter
            expect(onlyLetters(123 as any)).toBe(false);

            type cases = [
                Expect<Test<
                    typeof abc, "equals",
                    true
                >>
            ]
        });

        it("alphaNumeric", () => {
            const alphaNum = compare("alphaNumeric");
            const alpha123 = alphaNum("abc123")
            expect(alpha123).toBe(true);
            expect(alphaNum("abc")).toBe(true);
            expect(alphaNum("123")).toBe(true);
            expect(alphaNum("abc 123")).toBe(false); // space is not alphanumeric
            expect(alphaNum("abc-123")).toBe(false); // hyphen is not alphanumeric


            type cases = [
                Expect<Test<
                    typeof alpha123, "equals",
                    true
                >>
            ]
        });
    });

    describe("General operations", () => {
        it("equals", () => {
            const equals5 = compare("equals", 5);
            const five = equals5(5);
            type X = Compare<5, "equals", [5]>;
            expect(equals5(5)).toBe(true);
            expect(equals5("5")).toBe(false);
            expect(equals5(6)).toBe(false);

            const equalsHello = compare("equals", "hello");
            expect(equalsHello("hello")).toBe(true);
            expect(equalsHello("Hello")).toBe(false);

            type cases = [
                Expect<Test<
                    typeof five, "equals",
                    true
                >>
            ]
        });

        it("false", () => {
            type X = Compare<null, "false">;
            type X2 = IsFalse<null>;
            const isFalseOp = compare("false");
            const t1 = isFalseOp(false);
            const f1 = isFalseOp(true);
            const f2 = isFalseOp(0);
            const f3 = isFalseOp("");
            const f4 = isFalseOp(null);

            const b1 = isFalseOp(false as boolean);

            expect(t1).toBe(true);
            expect(f1).toBe(false);
            expect(f2).toBe(false);
            expect(f3).toBe(false);
            expect(f4).toBe(false);

            expect(b1).toBe(true); // at runtime it IS a false value

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof f2, "equals", false>>,
                Expect<Test<typeof f3, "equals", false>>,
                Expect<Test<typeof f4, "equals", false>>,
                // the type system only sees "boolean" as the type
                // so it's `type` is "false"; this is an interesting
                // one but this IS the expected outcome
                Expect<Test<typeof b1, "equals", false>>,
            ];
        });

        it("true", () => {
            const isTrueOp = compare("true");
            const result1 = isTrueOp(true);
            const result2 = isTrueOp(false);
            const result3 = isTrueOp(1);
            const result4 = isTrueOp("true");

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(false);
            expect(result4).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", false>>,
                Expect<Test<typeof result4, "equals", false>>
            ];
        });

        it("truthy", () => {
            const isTruthyOp = compare("truthy");
            const t1 = isTruthyOp(true);
            const t2 = isTruthyOp(1);
            const t3 = isTruthyOp("hello");
            const t4 = isTruthyOp([]);
            const t5 = isTruthyOp({});
            const f1 = isTruthyOp(false);
            const f2 = isTruthyOp(0);
            const f3 = isTruthyOp("");
            const f4 = isTruthyOp(null);
            const f5 = isTruthyOp(undefined);

            expect(t1).toBe(true);
            expect(t2).toBe(true);
            expect(t3).toBe(true);
            expect(t4).toBe(true);
            expect(t5).toBe(true);
            expect(f1).toBe(false);
            expect(f2).toBe(false);
            expect(f3).toBe(false);
            expect(f4).toBe(false);
            expect(f5).toBe(false);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof t2, "equals", true>>,
                Expect<Test<typeof t3, "equals", true>>,
                Expect<Test<typeof t4, "equals", true>>,
                Expect<Test<typeof t5, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof f2, "equals", false>>,
                Expect<Test<typeof f3, "equals", false>>,
                Expect<Test<typeof f4, "equals", false>>,
                Expect<Test<typeof f5, "equals", false>>
            ];
        });

        it("falsy", () => {
            const isFalsyOp = compare("falsy");
            const t1 = isFalsyOp(false);
            const t2 = isFalsyOp(0);
            const t3 = isFalsyOp("");
            const t4 = isFalsyOp(null);
            type T4 = IsFalsy<null>;
            const t5 = isFalsyOp(undefined);
            // const result6 = isFalsyOp(NaN);
            const f1 = isFalsyOp(true);
            const f2 = isFalsyOp(1);
            const f3 = isFalsyOp("hello");

            expect(t1).toBe(true);
            expect(t2).toBe(true);
            expect(t3).toBe(true);
            expect(t4).toBe(true);
            expect(t5).toBe(true);
            // expect(result6).toBe(true);
            expect(f1).toBe(false);
            expect(f2).toBe(false);
            expect(f3).toBe(false);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof t2, "equals", true>>,
                Expect<Test<typeof t3, "equals", true>>,
                Expect<Test<typeof t4, "equals", true>>,
                Expect<Test<typeof t5, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof f2, "equals", false>>,
                Expect<Test<typeof f3, "equals", false>>
            ];
        });

        it("equalsSome", () => {
            const equalsSome = compare("equalsSome", 1, 2, 3);
            type Two = Compare<2, "equalsSome", [1, 2, 3]>;
            type StringTwo = Compare<"2", "equalsSome", [1, 2, 3]>;
            const two = equalsSome(2);
            const four = equalsSome(4);
            const stringTwo = equalsSome("2");

            expect(two).toBe(true);
            expect(four).toBe(false);
            expect(stringTwo).toBe(false);

            type cases = [
                Expect<Test<typeof two, "equals", true>>,
                Expect<Test<typeof four, "equals", false>>,
                Expect<Test<typeof stringTwo, "equals", false>>
            ];
        });

        it("contains", () => {
            type X = Compare<"hello world", "contains", ["hello"]>;
            const containsHello = compare("contains", "hello");
            const helloWorld = containsHello("hello world");
            expect(helloWorld).toBe(true);
            expect(containsHello("hi world")).toBe(false);
            expect(containsHello(["hello", "world"])).toBe(true);
            expect(containsHello(["hi", "world"])).toBe(false);

            type cases = [
                Expect<Test<
                    typeof helloWorld, "equals",
                    true
                >>
            ]
        });

        it("containsSome", () => {
            type X = Compare<"hello world", "containsSome", ["hello", "hi"]>;
            const containsSome = compare("containsSome", "hello", "hi");
            const hello = containsSome("hello world");
            expect(hello).toBe(true);
            expect(containsSome("hi there")).toBe(true);
            expect(containsSome("goodbye")).toBe(false);
            expect(containsSome(["hello", "world"])).toBe(true);

            type cases = [
                Expect<Test<
                    typeof hello, "equals",
                    true
                >>,
                Expect<Test<
                    X, "equals",
                    true
                >>,
            ]
        });

        it("containsAll", () => {
            const containsAll = compare("containsAll", "hello", "world");
            const helloWorld = containsAll("hello world");
            expect(helloWorld).toBe(true);
            expect(containsAll("world hello")).toBe(true);
            expect(containsAll("hello")).toBe(false);
            expect(containsAll(["hello", "world", "test"])).toBe(true);
            expect(containsAll(["hello", "test"])).toBe(false);

            type cases = [
                Expect<Test<
                    typeof helloWorld, "equals",
                    true
                >>
            ]
        });
    });

    describe("Numeric operations", () => {
        it("greaterThan", () => {
            const gt5 = compare("greaterThan", 5);
            const result1 = gt5(6);
            const result2 = gt5(5);
            const result3 = gt5(4);
            const result4 = gt5("6");
            const result5 = gt5("not a number" as any);

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(false);
            expect(result4).toBe(true); // numeric string
            expect(result5).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", false>>,
                Expect<Test<typeof result4, "equals", false>>,
                Expect<Test<typeof result5, "equals", false>>
            ];
        });

        it("greaterThanOrEqual", () => {
            const gte5 = compare("greaterThanOrEqual", 5);
            const result1 = gte5(6);
            const result2 = gte5(5);
            const result3 = gte5(4);

            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", false>>
            ];
        });

        it("lessThan", () => {
            const lt5 = compare("lessThan", 5);
            const result1 = lt5(4);
            const result2 = lt5(5);
            const result3 = lt5(6);

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", false>>
            ];
        });

        it("lessThanOrEqual", () => {
            const lte5 = compare("lessThanOrEqual", 5);
            const result1 = lte5(4);
            const result2 = lte5(5);
            const result3 = lte5(6);

            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", false>>
            ];
        });

        it("betweenExclusively", () => {
            const between5and10 = compare("betweenExclusively", 5, 10);
            const result1 = between5and10(7);
            const result2 = between5and10(5);
            const result3 = between5and10(10);
            const result4 = between5and10(3);

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(false);
            expect(result4).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", true>>,
                Expect<Test<typeof result3, "equals", true>>,
                Expect<Test<typeof result4, "equals", false>>
            ];
        });

        it("betweenInclusively", () => {
            const between5and10 = compare("betweenInclusively", 5, 10);
            const result1 = between5and10(7);
            const result2 = between5and10(5);
            const result3 = between5and10(10);
            const result4 = between5and10(3);
            const result5 = between5and10(11);

            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(true);
            expect(result4).toBe(false);
            expect(result5).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", true>>,
                Expect<Test<typeof result3, "equals", true>>,
                Expect<Test<typeof result4, "equals", false>>,
                Expect<Test<typeof result5, "equals", false>>
            ];
        });
    });

    describe("Object operations", () => {
        it("objectKeyGreaterThan", () => {
            const ageGt18 = compare("objectKeyGreaterThan", "age", 18);
            const result1 = ageGt18({ age: 25 });
            const result2 = ageGt18({ age: 18 });
            const result3 = ageGt18({ age: 15 });
            const result4 = ageGt18({ name: "John" });
            const result5 = ageGt18({ age: "25" });
            const result6 = ageGt18({ age: "not a number" });
            const result7 = ageGt18("not an object" as any);

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(false);
            expect(result4).toBe(false); // no age key
            expect(result5).toBe(true); // numeric string
            expect(result6).toBe(false);
            expect(result7 instanceof Error).toBe(true);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", false>>,
                Expect<Test<typeof result4, "equals", false>>,
                Expect<Test<typeof result5, "equals", true>>,
                Expect<Test<typeof result6, "equals", false>>,
                Expect<Test<typeof result7, "equals", Error>>
            ];
        });

        it("objectKeyGreaterThanOrEqual", () => {
            const ageGte18 = compare("objectKeyGreaterThanOrEqual", "age", 18);
            const result1 = ageGte18({ age: 25 });
            const result2 = ageGte18({ age: 18 });
            const result3 = ageGte18({ age: 15 });

            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", true>>,
                Expect<Test<typeof result3, "equals", false>>
            ];
        });

        it("objectKeyLessThan", () => {
            const ageLt18 = compare("objectKeyLessThan", "age", 18);
            const result1 = ageLt18({ age: 15 });
            const result2 = ageLt18({ age: 18 });
            const result3 = ageLt18({ age: 25 });

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", false>>
            ];
        });

        it("objectKeyLessThanOrEqual", () => {
            const ageLte18 = compare("objectKeyLessThanOrEqual", "age", 18);
            const result1 = ageLte18({ age: 15 });
            const result2 = ageLte18({ age: 18 });
            const result3 = ageLte18({ age: 25 });

            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", true>>,
                Expect<Test<typeof result3, "equals", false>>
            ];
        });

        it("objectKeyEquals", () => {
            const nameEquals = compare("objectKeyEquals", "name", "John");
            const result1 = nameEquals({ name: "John" });
            const result2 = nameEquals({ name: "Jane" });
            const result3 = nameEquals({ age: 25 });
            const result4 = nameEquals("not an object" as any);

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(false); // no name key
            expect(result4 instanceof Error).toBe(true);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", false>>,
                Expect<Test<typeof result4, "equals", Error>>
            ];
        });
    });

    describe("DateTime operations", () => {
        const date1 = "2023-01-15T10:00:00";
        const date2 = "2023-01-15T14:00:00";
        const date3 = "2023-02-15T10:00:00";
        const date4 = "2024-01-15T10:00:00";

        it("sameDay", () => {
            const sameDayAs = compare("sameDay", date1);
            const t1 = sameDayAs(date1);
            const t2 = sameDayAs(date2);
            const f1 = sameDayAs(date3);
            const result4 = sameDayAs("not a date" as any);

            expect(t1).toBe(true);
            expect(t2).toBe(true); // same day, different time
            expect(f1).toBe(false); // different month
            expect(result4 instanceof Error).toBe(true);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof t2, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof result4, "equals", Error>>
            ];
        });

        it("sameMonth", () => {
            const sameMonthAs = compare("sameMonth", date1);
            const result1 = sameMonthAs(date1);
            const result2 = sameMonthAs(date2);
            const result3 = sameMonthAs(date3);
            const result4 = sameMonthAs(date4);

            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(false);
            expect(result4).toBe(true); // same month, different year

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", true>>,
                Expect<Test<typeof result3, "equals", false>>,
                Expect<Test<typeof result4, "equals", true>>
            ];
        });

        it("sameMonthYear", () => {
            const sameMonthYearAs = compare("sameMonthYear", date1);
            const result1 = sameMonthYearAs(date1);
            const result2 = sameMonthYearAs(date2);
            const result3 = sameMonthYearAs(date3);
            const result4 = sameMonthYearAs(date4);

            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(false);
            expect(result4).toBe(false); // different year

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", false>>,
                Expect<Test<typeof result4, "equals", false>>
            ];
        });

        it("sameYear", () => {
            const sameYearAs = compare("sameYear", date1);
            const result1 = sameYearAs(date1);
            const result2 = sameYearAs(date2);
            const result3 = sameYearAs(date3);
            const result4 = sameYearAs(date4);

            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(true);
            expect(result4).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", true>>,
                Expect<Test<typeof result4, "equals", false>>
            ];
        });

        it("after", () => {
            const afterDate1 = compare("after", date1);
            const result1 = afterDate1(date2);
            const result2 = afterDate1(date1);
            const result3 = afterDate1(new Date("2023-01-14"));

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", true>>,
                Expect<Test<typeof result3, "equals", false>>
            ];
        });

        it("before", () => {
            const beforeDate2 = compare("before", date2);
            const result1 = beforeDate2(date1);
            const result2 = beforeDate2(date2);
            const result3 = beforeDate2(date3);

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", false>>
            ];
        });
    });

    describe("Other operations", () => {
        it("errors", () => {
            const isError = compare("errors");
            const result1 = isError(new Error("test"));
            const result2 = isError(new TypeError("test"));
            const result3 = isError("not an error");
            const result4 = isError(null);

            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(false);
            expect(result4).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", true>>,
                Expect<Test<typeof result3, "equals", true>>,
                Expect<Test<typeof result4, "equals", false>>
            ];
        });

        it("errorsOfType", () => {
            const customError = Object.assign(new Error("test"), { type: "CustomError" });
            const isCustomError = compare("errorsOfType", "CustomError");
            const result1 = isCustomError(customError);
            const result2 = isCustomError(new Error("test"));
            const result3 = isCustomError("not an error");

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", true>>,
                Expect<Test<typeof result3, "equals", false>>
            ];
        });

        it("returnEquals - returns runtime limitation error", () => {
            const fn = () => 5;
            const returnEquals5 = compare("returnEquals", 5);
            const result = returnEquals5(fn);
            expect(result instanceof Error).toBe(true);
            // The err() function uses the first part as the type
            expect((result as any).type).toBe("runtime-limitation");

            type cases = [
                Expect<Test<typeof result, "equals", Error>>
            ];
        });

        it("returnExtends - returns runtime limitation error", () => {
            const fn = () => "hello";
            const returnExtendsString = compare("returnExtends", "string");
            const result = returnExtendsString(fn);
            expect(result instanceof Error).toBe(true);
            // The err() function uses the first part as the type
            expect((result as any).type).toBe("runtime-limitation");

            type cases = [
                Expect<Test<typeof result, "equals", Error>>
            ];
        });
    });

    describe("Edge cases and error handling", () => {
        it("handles invalid operations", () => {
            // @ts-ignore
            const invalidOp = compare("notAnOperation" as any, []);
            const result = invalidOp("test");
            expect(result).toBe(false); // Never constant returns false for invalid operations

            type cases = [
                Expect<Test<typeof result, "equals", false>>
            ];
        });

        it("handles invalid parameters gracefully", () => {
            // Testing numeric operation with non-numeric parameter
            const gtInvalid = compare("greaterThan", "not a number" as any);
            const result = gtInvalid(5);
            expect(result instanceof Error).toBe(true);

            type cases = [
                Expect<Test<typeof result, "equals", Error>>
            ];
        });

        it("handles complex nested comparisons", () => {
            const data = [
                { name: "John", age: 25, skills: ["js", "ts"] },
                { name: "Jane", age: 30, skills: ["python", "js"] },
                { name: "Bob", age: 20, skills: ["java"] }
            ];

            const ageGt21 = compare("objectKeyGreaterThan", "age", 21);
            const filtered = data.filter(person => {
                const result = ageGt21(person);
                return result === true;
            });
            const result1 = ageGt21(data[0]);
            const result2 = ageGt21(data[1]);
            const result3 = ageGt21(data[2]);

            expect(filtered).toHaveLength(2);
            expect(filtered.map(p => p.name)).toEqual(["John", "Jane"]);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", true>>,
                Expect<Test<typeof result3, "equals", false>>
            ];
        });
    });
});
