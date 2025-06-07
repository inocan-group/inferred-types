import { describe, expect, it } from "vitest";
import {
    Expect,
    Test,
    ToStringLiteral
} from "inferred-types/types";
import { toStringLiteral } from "inferred-types/runtime";

describe("ToStringLiteral<T>", () => {


    it("undefined value", () => {
        type Undef = ToStringLiteral<undefined>;

        type cases = [
            Expect<Test<Undef, "equals", "undefined">>
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

        type cases = [
            Expect<Test<Num, "equals", "42">>,
            Expect<Test<Str, "equals", `"42"`>>,
            Expect<Test<True, "equals", "true">>,
            Expect<Test<False, "equals", "false">>,
            Expect<Test<Bool, "equals", "boolean">>,
        ];
    });

    it("dictionary object", () => {
        type FooBar = ToStringLiteral<{ foo: "hi"; bar: 42 }>;
        type FooBarSingle = ToStringLiteral<{ foo: "hi"; bar: 42 }, { quote: "'"}>;
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


    it("tuple", () => {
        type Nums = ToStringLiteral<[1,2,3]>;
        type Mixed = ToStringLiteral<[1,"foo",3]>;
        type Obj = ToStringLiteral<[
            { id: 1},
            { id: 2}
        ]>;
        type MultiDim = ToStringLiteral<[
            [1,2],
            [3,4]
        ]>
        type Mixed2 = ToStringLiteral<[
            1,2,
            "foo",
            { id: 1 }
        ]>

        type cases = [
            Expect<Test<Nums, "equals", `[ 1, 2, 3 ]`>>,
            Expect<Test<Mixed, "equals", `[ 1, "foo", 3 ]`>>,
            Expect<Test<Obj, "equals", `[ { id: 1 }, { id: 2 } ]`>>,
            Expect<Test<MultiDim, "equals", `[ [ 1, 2 ], [ 3, 4 ] ]`>>
        ];
    });

    it("Union type", () => {
        type StrNum = ToStringLiteral<string | number>;
        type Nums = ToStringLiteral<1 | 2 | 3 | 4>;
        type Obj = ToStringLiteral<
            { id: 1 } | { id: 2 }
        >;

        type cases = [
            Expect<Test<
                StrNum, "equals",
                "string | number"
            >>,
            /** the ordering of a union type can vary */
            Expect<Test<
                Nums, "containsAll",
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
            Expect<Test<typeof bool, "equals", "boolean">>,
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
            /** type tests */
        ];
    });
});
