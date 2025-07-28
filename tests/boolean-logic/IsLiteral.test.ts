import { describe, expect, it } from "vitest";
import { Equal, Expect, ExpectFalse } from "@type-challenges/utils";
import {
    EmptyObject,
    ExplicitlyEmptyObject,
    IsBooleanLiteral,
    IsLiteralLike,
    IsObjectLiteral,
    Test
} from "inferred-types/types";

describe("IsObjectLiteral<T>", () => {

    it("happy path", () => {


        type cases = [
            // an empty object is still allowed to take on keys after it is
            // defined without error. The type will remain showing as empty
            // but there is no typing error when more characters are added
            Expect<Test<IsObjectLiteral<EmptyObject>, "equals",  false>>,
            // when we explicitly strip out the index keys then this
            // becomes an explicit literal type with zero keys
            Expect<Test<IsObjectLiteral<ExplicitlyEmptyObject>, "equals",  true>>,
            Expect<Test<IsObjectLiteral<{ foo: 1; bar: 2 }>, "equals",  true>>,
            Expect<Test<IsObjectLiteral<object>, "equals",  false>>,
            Expect<Test<IsObjectLiteral<Record<string, unknown>>, "equals",  false>>,
        ];

    });
});


describe("IsLiteral<T> type utility", () => {
    it("string values", () => {
        const s = "hi" as string;
        const sl = "hi" as const;

        type cases = [
            Expect<Test<IsLiteralLike<typeof s>, "equals",  false>>,
            Expect<Test<IsLiteralLike<typeof sl>, "equals",  true>>
        ];
        const cases: cases = [true, true];
        expect(typeof s).toBe("string");
        expect(typeof sl).toBe("string");
    });

    it("numeric values", () => {
        const v = 42 as number;
        const vl = 42 as const;

        type cases = [
            Expect<Test<IsLiteralLike<typeof v>, "equals",  false>>,
            Expect<Test<IsLiteralLike<typeof vl>, "equals",  true>>
        ];
        const cases: cases = [true, true];

        expect(typeof v).toBe("number");
        expect(typeof vl).toBe("number");
    });

    it("boolean values", () => {
        type cases = [
            // wide
            ExpectFalse<IsBooleanLiteral<boolean>>,
            Expect<Test<IsLiteralLike<boolean>, "equals",  false>>,
            // literal
            Expect<Test<IsBooleanLiteral<false>, "equals",  true>>,
            Expect<Test<IsLiteralLike<false>, "equals",  true>>
        ];
        const cases: cases = [false, true, true, true];
    });

    it("union with undefined", () => {
        const vb = true as true | undefined;
        const vs = "foo" as "foo" | undefined;
        const vn = 42 as 42 | undefined;

        type cases = [
            Expect<Test<IsLiteralLike<Exclude<typeof vb, undefined>>, "equals",  true>>, //
            Expect<Test<IsLiteralLike<Exclude<typeof vs, undefined>>, "equals",  true>>, //
            Expect<Test<IsLiteralLike<Exclude<typeof vn, undefined>>, "equals",  true>>, //
        ];
        const cases: cases = [true, true, true];
    });


    it("arrays", () => {
        type StringArr = IsLiteralLike<string[]>;
        type NumericArr = IsLiteralLike<number[]>;
        type UnionArr = IsLiteralLike<(string | number)[]>;
        type StringTuple = IsLiteralLike<["foo", "bar", "baz"]>;
        type RO_StringTuple = IsLiteralLike<readonly ["foo", "bar", "baz"]>;
        type TupleWithWide = IsLiteralLike<["foo", "bar", "baz", number, string]>;
        type TupleWithWide_RO = IsLiteralLike<["foo", "bar", "baz", number, string]>;
        type TupleOnlyWide = IsLiteralLike<[number, string, number]>;


        type cases = [
            Expect<Test<StringArr, "equals",  false>>,
            Expect<Test<NumericArr, "equals",  false>>,
            Expect<Test<UnionArr, "equals",  false>>,
            Expect<Test<StringTuple, "equals",  true>>,
            Expect<Test<RO_StringTuple, "equals",  true>>,
            Expect<Test<TupleWithWide, "equals",  true>>,
            Expect<Test<TupleWithWide_RO, "equals",  true>>,
            Expect<Test<TupleOnlyWide, "equals",  true>>,
        ];


    });


    it("objects", () => {
        type GenericString = IsLiteralLike<Record<string, string>>;
        type GenericUnion = IsLiteralLike<Record<string, string | number>>;
        // eslint-disable-next-line @typescript-eslint/ban-types
        type Empty = IsLiteralLike<{}>;
        type Loose = IsLiteralLike<object>;
        type Keyed = IsLiteralLike<{ foo: 1 }>;

        type cases = [
            Expect<Test<IsLiteralLike<Record<string, unknown>>, "equals",  false>>,
            Expect<Test<GenericString, "equals",  false>>,
            Expect<Test<GenericUnion, "equals",  false>>,
            Expect<Test<Empty, "equals",  false>>,
            Expect<Test<Loose, "equals",  false>>,
            Expect<Test<Keyed, "equals",  true>>,
        ];

    });


});
