import { describe, expect, it } from "vitest";
import type { AssertError, Expect, ObjectKeys, Test, ToStringLiteral, TupleMeta } from "inferred-types/types";

import { err, toStringLiteral, split, stripChars } from "inferred-types/runtime";

describe("ToStringLiteral<T>", () => {

    it("undefined and null values", () => {
        type Undef = ToStringLiteral<undefined>;
        type Null = ToStringLiteral<null>;

        type cases = [
            Expect<Test<Undef, "equals", "undefined">>,
            Expect<Test<Null, "equals", "null">>
        ];
    });

    it("scalar values", () => {
        type Num = ToStringLiteral<42>;
        type Str = ToStringLiteral<"42">;
        type True = ToStringLiteral<true>;
        type False = ToStringLiteral<false>;
        // note: at design time we can capture the type
        // "boolean" whereas this is not possible at runtime
        // because it will have resolved to `true` or `false`.
        type Bool = ToStringLiteral<boolean>;

        type WideStr = ToStringLiteral<string>;
        type WideNum = ToStringLiteral<number>;

        type cases = [
            Expect<Test<Num, "equals", "42">>,
            Expect<Test<Str, "equals", `"42"`>>,
            Expect<Test<True, "equals", "true">>,
            Expect<Test<False, "equals", "false">>,
            Expect<Test<Bool, "equals", "false | true">>,

            Expect<Test<WideStr, "equals", "string">>,
            Expect<Test<WideNum, "equals", "number">>,
        ];
    });

    it("dictionary object", () => {
        type FooBar = ToStringLiteral<{ foo: "hi"; bar: 42 }>;
        type FooBarSingle = ToStringLiteral<
            { foo: "hi"; bar: 42 },
            { quote: "'"}
        >;
        type Nested = ToStringLiteral<{
            uno: { foo: "hi"; bar: [1,2,3] };
            dos: [4,5,6]
        }>;

        type cases = [
            Expect<Test<FooBar, "equals", `{ foo: "hi", bar: 42 }`>>,
            Expect<Test<
                FooBarSingle, "equals",
                `{ foo: 'hi', bar: 42 }`
            >>,
            Expect<Test<
                Nested, "equals",
                `{ uno: { foo: \"hi\", bar: [ 1, 2, 3 ] }, dos: [ 4, 5, 6 ] }`
            >>,
        ];
    });

    it("dictionary with optional keys", () => {
        type FooBar = ToStringLiteral<{foo: 1; bar?: 2}>

        type cases = [
            Expect<Test<FooBar, "equals", "{ foo: 1, bar?: 2 }">>
        ];
    });

    it("literal array", () => {
        type Numeric = ToStringLiteral<[1,2,3]>;
        type Obj = ToStringLiteral<[
            { id: 1},
            { id: 2}
        ]>;
        type MultiDim = ToStringLiteral<[
            [1,2],
            [3,4]
        ]>

        type Mixed = ToStringLiteral<[1,"foo",3]>;
        type Mixed2 = ToStringLiteral<[
            1,2, "foo",
            { id: 1 }
        ]>;

        type cases = [
            Expect<Test<Numeric, "equals", `[ 1, 2, 3 ]`>>,
            Expect<Test<Obj, "equals", `[ { id: 1 }, { id: 2 } ]`>>,
            Expect<Test<MultiDim, "equals", `[ [ 1, 2 ], [ 3, 4 ] ]`>>,
            Expect<Test<Mixed, "equals", `[ 1, "foo", 3 ]`>>,
            Expect<Test<
                Mixed2, "equals",
                `[ 1, 2, "foo", { id: 1 } ]`
            >>,
        ];
    });

    it("literal array (with optionals)", () => {
        type Opt1 = ToStringLiteral<[1,2,3?]>;
        type Opt2 = ToStringLiteral<[1,2,{foo:1}?]>;
        type MultiOpt = ToStringLiteral<[1,2?,3?]>;
        type AllOpt = ToStringLiteral<[1?,2?,3?]>;

        type cases = [
            Expect<Test<Opt1, "equals", `[ 1, 2, 3? ]`>>,
            Expect<Test<Opt2, "equals", `[ 1, 2, { foo: 1 }? ]`>>,
            Expect<Test<MultiOpt, "equals", `[ 1, 2?, 3? ]`>>,
            Expect<Test<AllOpt, "equals", `[ 1?, 2?, 3? ]`>>,
        ];
    });

    it("tuple (wide types)", () => {
        type StrArr = ToStringLiteral<string[]>;
        type NumArr = ToStringLiteral<number[]>;
        type BoolArr = ToStringLiteral<boolean[]>;

        type UnionArr = ToStringLiteral<(4 | "foo")[]>;

        type cases = [
            Expect<Test<StrArr, "equals", `string[]`>>,
            Expect<Test<NumArr, "equals", `number[]`>>,
            Expect<Test<BoolArr, "equals", `(false | true)[]`>>,

            Expect<Test<
                UnionArr, "extends",
                "(\"foo\" | 4)[]" |
                `("foo" | 4)[]`
            >>,
        ];
    })

    it("tuple (empty)", () => {
        type Empty = ToStringLiteral<[]>;

        type cases = [
            Expect<Test<Empty, "equals", "[]">>
        ];
    });

    it("Union type", () => {
        type StrNum = ToStringLiteral<string | number>;
        type Numeric = ToStringLiteral<1 | 2 | 3 | 4>;
        type Obj = ToStringLiteral<
            { id: 1 } | { id: 2 }
        >;

        type cases = [
            Expect<Test<
                StrNum, "extends",
                "string | number" | "number | string"
            >>,
            /** the ordering of a union type can vary */
            Expect<Test<
                Numeric, "containsAll",
                ["1","2","3","4","|"]
            >>,
            Expect<Test<
                Obj, "equals",
                `{ id: 1 } | { id: 2 }`
            >>,
        ];
    });

});

describe("toStringLiteral(val)", () => {

    it("scalar", () => {
        const num = toStringLiteral(42);
        const str = toStringLiteral("42");
        const yup = toStringLiteral(true);
        const nope = toStringLiteral(false);
        /**
         * when we type cast a value it has an effect
         * on the _type_ but not on the _value_ which
         * is all we can test for here as the runtime
         * has not "types".
         */
        const bool = toStringLiteral(true as boolean);
        const missing = toStringLiteral(null);

        expect(num).toBe("42");
        expect(str).toBe(`"42"`);
        expect(yup).toBe("true");
        expect(nope).toBe("false");
        expect(bool).toBe("true");
        expect(missing).toBe("null");

        type cases = [
            Expect<Test<typeof num, "equals", "42">>,
            Expect<Test<typeof str, "equals", `"42"`>>,
            Expect<Test<typeof yup, "equals", "true">>,
            Expect<Test<typeof nope, "equals", "false">>,
            Expect<Test<typeof bool, "equals", "false | true">>,
            Expect<Test<typeof missing, "equals", "null">>,
        ];
    });

    it("dictionary", () => {
        const fooBar = toStringLiteral({foo: 1, bar: "hi"});
        const nested = toStringLiteral({
            uno: { foo: "hi", bar: [1,2,3] },
            dos: [4,5,6]
        });

        expect(fooBar).toBe("{ foo: 1, bar: \"hi\" }");
        expect(nested).toBe(
            `{ uno: { foo: \"hi\", bar: [ 1, 2, 3 ] }, dos: [ 4, 5, 6 ] }`
        )

        type cases = [
            Expect<Test<
                typeof fooBar, "equals",
                "{ foo: 1, bar: \"hi\" }"
            >>
        ];
    });

    it("tuple", () => {
        const tup = toStringLiteral([
            1, 2,
            "foo",
            { id: 1 }
        ]);

        expect(tup).toBe(`[ 1, 2, "foo", { id: 1 } ]`)

        type cases = [
            Expect<Test<
                typeof tup, "containsAll",
                [ "1", "2", "\"foo\"", "{ id: 1 }" ]
            >>
        ];
    });

    it("error propagation from object properties", () => {
        // Create an object with a property that is an error
        const objWithError = {
            foo: "valid",
            bar: err("malformed-token", "Invalid token")
        };

        const result = toStringLiteral(objWithError, { tokensAllowed: true });

        type cases = [
            Expect<AssertError<typeof result, "malformed-token">>
        ]
        // The result should be an error
        expect(result).toBeInstanceOf(Error);

        if (result instanceof Error) {
            const typedErr = result as any;
            // Should preserve the error type
            expect(typedErr.type).toBe("malformed-token");
            // Should mention which property failed
            expect(typedErr.message).toContain("bar");
            expect(typedErr.message).toContain("malformed token");
            // Should include context
            expect(typedErr.property).toBe("bar");
            expect(typedErr.token).toEqual(objWithError);
            expect(typedErr.originalError).toBeInstanceOf(Error);
        }
    });

    it("error with subType is preserved", () => {
        // Create an error with both type and subType
        const objWithError = {
            foo: "valid",
            bar: err("malformed-token/array", "Invalid array token")
        };

        const result = toStringLiteral(objWithError, { tokensAllowed: true });

        expect(result).toBeInstanceOf(Error);

        type cases = [
            Expect<AssertError<typeof result, "malformed-token", "array">>
        ]

        if (result instanceof Error) {
            const typedErr = result as any;
            // Should preserve both type and subType
            expect(typedErr.type).toBe("malformed-token");
            expect(typedErr.subType).toBe("array");
        }
    });

    it("nested errors are caught at first level", () => {
        // Create nested object with error at inner level
        const nestedError = {
            outer: "valid",
            inner: {
                nested: err("malformed-token/literal", "Bad literal")
            }
        };

        const result = toStringLiteral(nestedError, { tokensAllowed: true });

        type cases = [
            Expect<AssertError<typeof result, "malformed-token", "literal">>
        ]

        // Should catch the nested error when processing the inner object
        expect(result).toBeInstanceOf(Error);

        if (result instanceof Error) {
            const typedErr = result as any;
            // The outer level should report the 'inner' property as problematic
            expect(typedErr.property).toBe("inner");
        }
    });
});
