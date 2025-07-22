import { describe, it, expect } from "vitest";
import { compare, isTemplateLiteral } from "inferred-types/runtime";
import {
    Compare,
    Expect,
    Test,
    IsFalse,
    IsFalsy,
    IsDateLike,
    Contains,
    EmptyObject,
    UpperAlphaChar,
    IsAfter
} from "inferred-types/types";

describe("Compare<TVal,TOp,TComparator> type util", () => {


    it("invalid operation", () => {
        type E1 = Compare<42, "foobar", [42]>;

        type cases = [
            Expect<Test<E1, "isError", "invalid-operation/foobar">>
        ];
    });


    it("equals", () => {
        type T1 = Compare<42, "equals", [42]>;
        type T2 = Compare<string, "equals", [string]>;
        type T3 = Compare<"foo", "equals", ["foo"]>;


        type F1 = Compare<"foo", "equals", ["bar"]>;
        type F2 = Compare<"foo", "equals", [42]>;
        type F3 = Compare<string, "equals", ["foo"]>;
        type F4 = Compare<"foo", "equals", [string]>;

        type E2 = Compare<"foo", "equals", ["foo", "bar"]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,


            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<F3, "equals",  false>>,
            Expect<Test<F4, "equals",  false>>,

            Expect<Test<E2, "isError", "invalid-parameters">>,
        ];
    });

    it("extends", () => {
        type T1 = Compare<42, "extends", [number]>;
        type T2 = Compare<number, "extends", [number]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>
        ];
    });


    it("equalsSome", () => {
        type T1 = Compare<42, "equalsSome", [42, 99]>;
        type T2 = Compare<99, "equalsSome", [42, 99]>;

        // @ts-ignore
        type E1 = Compare<42, "equalsSome", [42]>; // Error

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<E1, "isError", "invalid-parameters">>
        ];
    });



    it("startsWith", () => {
        type T1 = Compare<420, "startsWith", [42]>;
        type T2 = Compare<"foobar", "startsWith", ["foo"]>;
        type T3 = Compare<"Foo", "startsWith", [UpperAlphaChar]>;

        type F1 = Compare<"foo", "startsWith", [UpperAlphaChar]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,

            Expect<Test<F1, "equals",  false>>,
        ];
    });


    it("isTemplateLiteral", () => {
        type T1 = Compare<`hi${string}`, "isTemplateLiteral", []>;
        type T2 = Compare<`${string} is${number} years old`, "isTemplateLiteral", []>;

        type F1 = Compare<"hi", "isTemplateLiteral", []>

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<F1, "equals", false>>,
        ];
    });


    it("greaterThan", () => {
        type T1 = Compare<42, "greaterThan", [30]>;
        type T2 = Compare<"42", "greaterThan", [30]>;
        type F1 = Compare<"42", "greaterThan", [42]>;
        type B1 = Compare<number, "greaterThan", [42]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<B1, "equals",  boolean>>,
        ];
    });

    it("using ops with no params", () => {
        type T1 = Compare<false, "false", []>;
        type T2 = Compare<true, "true", []>;
        type T3 = Compare<"true", "truthy", []>;
        type T4 = Compare<"", "falsy", []>;

        type F1 = Compare<"true", "true", []>;
        type F2 = Compare<"", "false", []>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,

            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
        ];
    });


    it("contains with string input", () => {
        type T1 = Compare<"foobar", "contains", ["foo"]>;

        type B1 = Compare<string, "contains", ["foo"]>;
        type B2 = Compare<"foo", "contains", [string]>;

        type F1 = Compare<"foobar", "contains", ["bax"]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<B1, "equals",  boolean>>,
            Expect<Test<B2, "equals",  boolean>>,
            Expect<Test<F1, "equals",  false>>,
        ];
    });

    it("contains with tuple input", () => {
        type Tup = ["foo","bar",42];
        type T1 = Compare<Tup, "contains", ["foo"]>;
        type T2 = Compare<Tup, "contains", [string]>;
        type T3 = Compare<Tup, "contains", [number]>;
        type T3a = Contains<Tup, number>;
        type T4 = Compare<Tup, "contains", [42]>;
        type T4a = Contains<Tup, 42>;

        type F1 = Compare<Tup, "contains", ["bax"]>;
        type F2 = Compare<Tup, "contains", [99]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T3a, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,
            Expect<Test<T4a, "equals",  true>>,

            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
        ];
    });

    it("containsSome with string input", () => {
        type T1 = Compare<"foobar", "containsSome", ["foo", "bar"]>;
        type T2 = Compare<"foo", "containsSome", [string, number]>;

        type B1 = Compare<string, "contains", ["foo"]>;

        type F1 = Compare<"foobar", "contains", ["bax"]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<B1, "equals",  boolean>>,
            Expect<Test<F1, "equals",  false>>,
        ];
    });


    it("numeric operators", () => {
        type T1 = Compare<4, "greaterThan", [2]>;
        type T2 = Compare<2, "lessThan", [4]>;

        type T3 = Compare<4, "greaterThanOrEqual", [2]>;
        type T4 = Compare<4, "greaterThanOrEqual", [4]>;

        type T5 = Compare<2, "lessThanOrEqual", [4]>;
        type T6 = Compare<4, "lessThanOrEqual", [4]>;

        type T7 = Compare<5, "betweenInclusively", [1,10]>;
        type T8 = Compare<5, "betweenExclusively", [1,10]>;

        type T9 = Compare<5, "betweenInclusively", [5,10]>;
        type F9 = Compare<5, "betweenExclusively", [5,10]>;

        // Test the specific failing case mentioned
        type T10 = Compare<7, "betweenInclusively", [5,10]>;


        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,
            Expect<Test<T5, "equals",  true>>,
            Expect<Test<T6, "equals",  true>>,

            Expect<Test<T7, "equals",  true>>,
            Expect<Test<T8, "equals",  true>>,
            Expect<Test<T9, "equals",  true>>,
            Expect<Test<F9, "equals",  false>>,

            Expect<Test<T10, "equals",  true>>,

        ];
    });

    it("objectKeyEquals operator", () => {
        type Obj = { foo: 2, bar: "bye" };

        type T1 = Compare<Obj, "objectKeyEquals", ["foo", 2]>;
        type F1 = Compare<Obj, "objectKeyEquals", ["foo", 5]>;
        type F2 = Compare<Obj, "objectKeyEquals", ["bar", 2]>;
        type F3 = Compare<Obj, "objectKeyEquals", ["bar", number]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<F3, "equals",  false>>,
        ];
    });


    it("objectKeyExtends operator", () => {
        type Obj = { foo: 2, bar: "bye" };

        type T1 = Compare<Obj, "objectKeyExtends", ["foo", 2]>;
        type T2 = Compare<Obj, "objectKeyExtends", ["foo", number]>;

        type F1 = Compare<Obj, "objectKeyExtends", ["foo", 5]>;
        type F2 = Compare<Obj, "objectKeyExtends", ["bar", 2]>;


        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
        ];
    });



    it("isTruthy", () => {
        type T1 = Compare<true, "truthy", []>;
        type T2 = Compare<1, "truthy", []>;
        type T3 = Compare<"hello", "truthy", []>;
        type T4 = Compare<{}, "truthy", []>;
        type T4b = Compare<EmptyObject, "truthy", []>;
        type T5 = Compare<[], "truthy", []>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T4b, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
        ];
    });



    it("objectKey numeric ops", () => {
        type Obj = { foo: 2, bar: "bye" };

        type T1 = Compare<Obj, "objectKeyGreaterThan", ["foo", 1]>;

        type T2 = Compare<Obj, "objectKeyGreaterThanOrEqual", ["foo", 1]>;
        type T3 = Compare<Obj, "objectKeyGreaterThanOrEqual", ["foo", 2]>;

        type T4 = Compare<Obj, "objectKeyLessThanOrEqual", ["foo", 3]>;
        type T5 = Compare<Obj, "objectKeyLessThanOrEqual", ["foo", 2]>;

        type T6 = Compare<Obj, "objectKeyLessThan", ["foo",3]>;

        type F1 = Compare<Obj, "objectKeyGreaterThan", ["foo", 3]>;
        type F2 = Compare<Obj, "objectKeyGreaterThanOrEqual", ["foo", 3]>;

        type F3 = Compare<Obj, "objectKeyLessThan", ["foo", 1]>;
        type F4 = Compare<Obj, "objectKeyLessThanOrEqual", ["foo", 1]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,
            Expect<Test<T5, "equals",  true>>,
            Expect<Test<T6, "equals",  true>>,

            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<F3, "equals",  false>>,
            Expect<Test<F4, "equals",  false>>,
        ];
    });


    it("returnEquals", () => {
        type T1 = Compare<(() => string), "returnEquals", [string]>;
        type T2 = Compare<(() => number), "returnEquals", [number]>;

        type F1 = Compare<() => string, "returnEquals", [number]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
        ];
    });


});

describe("compare() runtime function", () => {

    describe("String operations", () => {
        it("startsWith", () => {

            const startsWithHello = compare("startsWith", "Hello");
            const t1 = startsWithHello("Hello World");
            const f1 = startsWithHello("Hi World");
            const f2 = startsWithHello(123);

            expect(t1).toBe(true);
            expect(f1).toBe(false);
            expect(f2).toBe(false);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof f2, "equals", false>>
            ];
        });

        it("endsWith", () => {
            const endsWithWorld = compare("endsWith", "World");
            type T1 = Compare<"Hello World", "endsWith", ["World"]>;
            const t1 = endsWithWorld("Hello World");
            type F1 = Compare<"Hello Earth", "endsWith", ["World"]>;
            const f1 = endsWithWorld("Hello Earth");
            type F2 = Compare<123, "endsWith", ["World"]>;
            const f2 = endsWithWorld(123);

            expect(t1).toBe(true);
            expect(f1).toBe(false);
            expect(f2).toBe(false);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<T1, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<F1, "equals", false>>,
                Expect<Test<typeof f2, "equals", false>>,
                Expect<Test<F2, "equals", false>>,

            ];
        });

        it("endsWithNumber", () => {
            const endsWithNum = compare("endsWithNumber");
            const t1 = endsWithNum("test123");
            const f1 = endsWithNum("test");
            const e1 = endsWithNum("123" as any);
            const e2 = endsWithNum("120" as any);

            expect(t1).toBe(true);
            expect(f1).toBe(false);
            expect(e1).toBe(true);
            expect(e2).toBe(true);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof e1, "equals",boolean>>,
                Expect<Test<typeof e2, "equals",boolean>>,
            ];
        });

        it("startsWithNumber", () => {
            const startsWithNum = compare("startsWithNumber");
            const t1 = startsWithNum("123test");
            const f1 = startsWithNum("test123");
            // @ts-expect-error
            const b1 = startsWithNum("123" as unknown);
            const e1 = startsWithNum(123 as any);

            expect(t1).toBe(true);
            expect(f1).toBe(false);
            expect(b1).toBe(true);
            expect(f1).toBe(false);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof b1, "equals", boolean>>,
                Expect<Test<typeof e1, "extends", boolean | Error>>,
            ];
        });

        it("onlyNumbers", () => {
            type X = Compare<"", "onlyNumbers", []>
            const onlyNum = compare("onlyNumbers");
            const result1 = onlyNum("12345");
            const result2 = onlyNum("123a45");
            const result3 = onlyNum("");
            const result4 = onlyNum(123 as any);

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


        it("isTemplateLiteral", () => {
            const str = "hi Mike" as `hi ${string}`;
            const t1 = isTemplateLiteral(str);
            const t2 = compare("isTemplateLiteral")(str);

            expect(t1).toBe("maybe");
            expect((t2 as any) instanceof Error).toBe(true);

            // in these case both runtime and type system know it's false
            const f1 = isTemplateLiteral(42);
            const f2 = compare("isTemplateLiteral")(42);

            // in these cases only the type system knows it's false
            const f3 = isTemplateLiteral("Hi");
            const f4 = compare("isTemplateLiteral")("Hi");

            expect(f1).toBe(false);
            expect(f2).toBe(false);
            expect(f3).toBe("maybe");
            expect((f4 as any) instanceof Error).toBe(true);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof t2, "equals", true>>,

                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof f2, "equals", false>>,

                Expect<Test<typeof f3, "equals", false>>,
                Expect<Test<typeof f4, "equals", false>>,
            ];
        });

    });

    describe("General operations", () => {
        it("equals", () => {
            const equals5 = compare("equals", 5);
            const five = equals5(5);
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
            type X = Compare<null, "false", []>;
            type X2 = IsFalse<null>;
            const isFalseVal = compare("false");
            const t1 = isFalseVal(false);
            const f1 = isFalseVal(true);
            const f2 = isFalseVal(0);
            const f3 = isFalseVal("");
            const f4 = isFalseVal(null);

            const b1 = isFalseVal(false as boolean);
            const b2 = isFalseVal(true as boolean);

            expect(t1).toBe(true);
            expect(f1).toBe(false);
            expect(f2).toBe(false);
            expect(f3).toBe(false);
            expect(f4).toBe(false);

            expect(b1).toBe(true); // at runtime it IS a false value
            expect(b1).toBe(false);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof f2, "equals", false>>,
                Expect<Test<typeof f3, "equals", false>>,

                // TODO: unsure why this is returning boolean but it should return false
                Expect<Test<typeof f4, "equals", false>>,

                Expect<Test<typeof b1, "equals", boolean>>,
                Expect<Test<typeof b2, "equals", boolean>>,
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
            const two = equalsSome(2);
            const stringTwo = equalsSome("2");
            const four = equalsSome(4);

            expect(two).toBe(true);
            expect(stringTwo).toBe(false);
            expect(four).toBe(false);

            type cases = [
                Expect<Test<typeof two, "equals", true>>,
                Expect<Test<typeof stringTwo, "equals", false>>,
                Expect<Test<typeof four, "equals", false>>,
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
            const t1 = gt5(6);
            const t2 = gt5("6");
            const f1 = gt5(5);
            const f2 = gt5(4);
            const b1 = gt5("not a number" as any);

            expect(t1).toBe(true);
            expect(t2).toBe(true);
            expect(f1).toBe(false);
            expect(f2).toBe(false);
            expect(b1).toBe(false);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof t2, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof f2, "equals", false>>,
                Expect<Test<typeof b1, "equals", boolean>>
            ];
        });

        it("greaterThanOrEqual", () => {
            const gte5 = compare("greaterThanOrEqual", 5);
            const t1 = gte5(6);
            const t2 = gte5(5);
            const f1 = gte5(4);

            expect(t1).toBe(true);
            expect(t2).toBe(true);
            expect(f1).toBe(false);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof t2, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>
            ];
        });

        it("lessThan", () => {
            const lt5 = compare("lessThan", 5);
            const t1 = lt5(4);
            const f1 = lt5(5);
            const f2 = lt5(6);

            expect(t1).toBe(true);
            expect(f1).toBe(false);
            expect(f2).toBe(false);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof f2, "equals", false>>
            ];
        });

        it("lessThanOrEqual", () => {
            const lte5 = compare("lessThanOrEqual", 5);
            const t1 = lte5(4);
            const t2 = lte5(5);
            const f1 = lte5(6);

            expect(t1).toBe(true);
            expect(t2).toBe(true);
            expect(f1).toBe(false);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof t2, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>
            ];
        });

        it("betweenExclusively", () => {
            const between5and10 = compare("betweenExclusively", 5, 10);
            type T1 = Compare<7, "betweenExclusively", [5,10]>;
            const t1 = between5and10(7);
            const f1 = between5and10(5);
            const f2 = between5and10(10);
            const f3 = between5and10(3);

            expect(t1).toBe(true);
            expect(f1).toBe(false);
            expect(f2).toBe(false);
            expect(f3).toBe(false);

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof f2, "equals", false>>,
                Expect<Test<typeof f3, "equals", false>>
            ];
        });

        it("betweenInclusively", () => {
            const between5and10 = compare("betweenInclusively", 5, 10);
            type T1 = Compare<7, "betweenInclusively", [5,10]>;
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
            const t1 = ageGt18({ age: 25 });
            const t2 = ageGt18({ age: "25" });

            const f1 = ageGt18({ age: 18 });
            const f2 = ageGt18({ age: 15 });
            const f3 = ageGt18({ name: "John" });

            const e1 = ageGt18({ age: "not a number" });
            const e2 = ageGt18("not an object");

            expect(t1).toBe(true);
            expect(t2).toBe(true);
            expect(f1).toBe(false);
            expect(f2).toBe(false);
            expect(f3).toBe(false);

            expect(e1 instanceof Error).toBe(false);
            expect(e2 instanceof Error).toBe(true);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof f2, "equals", false>>,
                Expect<Test<typeof f3, "equals", false>>,
                Expect<Test<typeof t2, "equals", true>>,
                Expect<Test<typeof e1, "isError", "invalid-value/non-numeric">>,
                Expect<Test<typeof e2, "isError", "invalid-value/wrong-type">>
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
            const nameEquals = compare(
                "objectKeyEquals",
                "name", "John"
            );
            const t1 = nameEquals({ name: "John" });
            const f1 = nameEquals({ name: "Jane" });
            const f2 = nameEquals({ age: 25 });
            const e1 = nameEquals("not an object");

            expect(t1).toBe(true);
            expect(f1).toBe(false);
            expect(f2).toBe(false); // no name key
            expect(e1 instanceof Error).toBe(true);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof f2, "equals", false>>,
                Expect<Test<typeof e1, "isError", "invalid-value/wrong-type">>
            ];
        });
    });

    describe("DateTime operations", () => {
        const dateTime1 = "2023-01-15T10:00:00";
        const dateTime2 = "2023-01-15T14:00:00";
        const dateTime3 = "2023-02-15T10:00:00";
        const dateTime4 = "2024-01-15T10:00:00";

        it("sameDay", () => {
            const sameDayAs = compare("sameDay", dateTime1);
            const t1 = sameDayAs(dateTime1);
            const t2 = sameDayAs(dateTime2);
            const f1 = sameDayAs(dateTime3);

            expect(t1).toBe(true);
            expect(t2).toBe(true); // same day, different time
            expect(f1).toBe(false); // different month

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof t2, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
            ];
        });

        it("sameMonth", () => {
            const sameMonthAs = compare("sameMonth", dateTime1);
            const result1 = sameMonthAs(dateTime1);
            const result2 = sameMonthAs(dateTime2);
            const result3 = sameMonthAs(dateTime3);
            const result4 = sameMonthAs(dateTime4);

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
            const sameMonthYearAs = compare("sameMonthYear", dateTime1);
            type D = IsDateLike<Date>;
            const result1 = sameMonthYearAs(dateTime1);
            const result2 = sameMonthYearAs(dateTime2);
            const result3 = sameMonthYearAs(dateTime3);
            const result4 = sameMonthYearAs(dateTime4);

            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(false);
            expect(result4).toBe(false); // different year

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", true>>,
                Expect<Test<typeof result3, "equals", false>>,
                Expect<Test<typeof result4, "equals", false>>
            ];
        });

        it("sameYear", () => {
            const sameYearAs = compare("sameYear", dateTime1);
            const t1 = sameYearAs(dateTime1);
            const t2 = sameYearAs(dateTime2);
            const t3 = sameYearAs(dateTime3);
            const f1 = sameYearAs(dateTime4);

            expect(t1).toBe(true);
            expect(t2).toBe(true);
            expect(t3).toBe(true);
            expect(f1).toBe(false);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof t2, "equals", true>>,
                Expect<Test<typeof t3, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>
            ];
        });

        it("after", () => {
            const after = compare("after", "2023-12-20");
            type T1 = IsAfter<"2023-12-22", "2023-12-20">;
            type TT1 = Compare<"2023-12-22", "after", ["2023-12-20"]>
            const t1 = after("2023-12-22"); // is after

            type F1 = IsAfter<"2023-12-20", "2023-12-20">;
            const f1 = after("2023-12-20"); // the same as comparator

            const d = new Date("2023-01-14");
            const b1 = after(d);

            expect(t1).toBe(true);
            expect(f1).toBe(false);
            expect(b1).toBe(false);

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof f1, "equals", false>>,
                Expect<Test<typeof b1, "equals", boolean>>
            ];
        });

        it("before", () => {
            const beforeDate2 = compare("before", dateTime2);
            const result1 = beforeDate2(dateTime1);
            const result2 = beforeDate2(dateTime2);
            const result3 = beforeDate2(dateTime3);

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
                Expect<Test<typeof result3, "equals", false>>,
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
                Expect<Test<typeof result2, "equals", false>>,
                Expect<Test<typeof result3, "equals", false>>
            ];
        });

    });

    describe("Edge cases and error handling", () => {




        it("handles complex nested comparisons", () => {
            const data = [
                { name: "John", age: 25, skills: ["js", "ts"] },
                { name: "Jane", age: 30, skills: ["python", "js"] },
                { name: "Bob", age: 20, skills: ["java"] }
            ] as const;

            const ageGt21 = compare("objectKeyGreaterThan", "age", 21);

            const result1 = ageGt21(data[0]); // true
            const result2 = ageGt21(data[1]); // true
            const result3 = ageGt21(data[2]); // false

            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(false);

            type cases = [
                Expect<Test<typeof result1, "equals", true>>,
                Expect<Test<typeof result2, "equals", true>>,
                Expect<Test<typeof result3, "equals", false>>
            ];
        });
    });
});
