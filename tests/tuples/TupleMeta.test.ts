import { Length } from "inferred-types";
import {  DropVariadicTail, Expect, MaxSafeInteger, Test, TupleMeta } from "inferred-types/types";
import { describe, it } from "vitest";

describe("TupleMeta<T>", () => {

    it("happy path", () => {
        type Nada = TupleMeta<[]>;
        type Single = TupleMeta<[string]>;
        type OneOrTwo = TupleMeta<[string, string?]>;
        type OneOrMore = TupleMeta<[string, ...string[]]>;
        type ZeroOrMore = TupleMeta<[...string[]]>;

        type cases = [
            Expect<Test<Nada["range"], "equals",  "empty">>,
            Expect<Test<Single["range"], "equals",  "[ 1..1 ]">>,
            Expect<Test<OneOrTwo["range"], "equals",  "[ 1..2 ]">>,
            Expect<Test<OneOrMore["range"], "equals",  "[ 1..* ]">>,
            Expect<Test<ZeroOrMore["range"], "equals",  "[ 0..* ]">>,

            Expect<Test<Nada["isEmpty"], "equals",  true>>,
            Expect<Test<Single["isEmpty"], "equals",  false>>,

            Expect<Test<OneOrMore["isUnconstrained"], "equals",  true>>,
            Expect<Test<Single["isUnconstrained"], "equals",  false>>,

            Expect<Test<ZeroOrMore["isOptional"], "equals",  true>>,
            Expect<Test<Single["isOptional"], "equals",  false>>,
        ];
    });


    it("[T] handled correctly", () => {
        type Undef = TupleMeta<[undefined]>;
        type Unknown = TupleMeta<[unknown]>;
        type Num = TupleMeta<[number]>;
        type OptString = TupleMeta<[string|undefined]>;

        type cases = [
            Expect<Test<Undef["minLength"], "equals", 1>>,
            Expect<Test<Unknown["minLength"], "equals", 1>>,
            Expect<Test<Num["minLength"], "equals", 1>>,
            Expect<Test<OptString["minLength"], "equals", 1>>,

            Expect<Test<Undef["maxLength"], "equals", 1>>,
            Expect<Test<Unknown["maxLength"], "equals", 1>>,
            Expect<Test<Num["maxLength"], "equals", 1>>,
            Expect<Test<OptString["maxLength"], "equals", 1>>,
        ];
    });


    it("[ T, ...U[] ] handled correctly", () => {
        type Len = Length<[string|undefined, ...undefined[]]>
        type Undef = TupleMeta<[undefined, ...undefined[]]>;
        type Unknown = TupleMeta<[unknown, ...unknown[]]>;
        type Num = TupleMeta<[number, ...unknown[]]>;

        type cases = [
            Expect<Test<Undef["minLength"], "equals", 1>>,
            Expect<Test<Unknown["minLength"], "equals", 1>>,
            Expect<Test<Num["minLength"], "equals", 1>>,

            Expect<Test<Undef["maxLength"], "equals", MaxSafeInteger>>,
            Expect<Test<
                Unknown["maxLength"], "equals",
                MaxSafeInteger
            >>,
            Expect<Test<Num["maxLength"], "equals", MaxSafeInteger>>,
        ];
    });


    it("length property", () => {
        type Empty = TupleMeta<[]>;
        type Single = TupleMeta<[string]>;
        type Multiple = TupleMeta<[string, number]>;
        type WithOptional = TupleMeta<[string, number?]>;
        type Variadic = TupleMeta<[string, ...number[]]>;

        type cases = [
            Expect<Test<Empty["length"], "equals", 0>>,
            Expect<Test<Single["length"], "equals", 1>>,
            Expect<Test<Multiple["length"], "equals", 2>>,
            Expect<Test<WithOptional["length"], "equals", 1|2>>,
            // For variadic tuples, length is the non-variadic length
            Expect<Test<Variadic["length"], "equals", number>>,
        ];
    });


    it("nonVariadicLength property", () => {
        type Empty = TupleMeta<[]>;
        type Single = TupleMeta<[string]>;
        type Multiple = TupleMeta<[string, number]>;
        type WithOptional = TupleMeta<[string, number?]>;
        type Variadic = TupleMeta<[string, ...number[]]>;
        type HeadVariadic = TupleMeta<[...string[], number]>;

        type cases = [
            Expect<Test<Empty["nonVariadicLength"], "equals", 0>>,
            Expect<Test<Single["nonVariadicLength"], "equals", 1>>,
            Expect<Test<Multiple["nonVariadicLength"], "equals", 2>>,
            Expect<Test<WithOptional["nonVariadicLength"], "equals", 2>>,
            Expect<Test<Variadic["nonVariadicLength"], "equals", 1>>,
            Expect<Test<HeadVariadic["nonVariadicLength"], "equals", 1>>,
        ];
    });


    it("isVariadic property", () => {
        type Empty = TupleMeta<[]>;
        type Single = TupleMeta<[string]>;
        type VariadicTail = TupleMeta<[string, ...number[]]>;
        type VariadicHead = TupleMeta<[...string[], number]>;
        type WideArray = TupleMeta<string[]>;

        type cases = [
            Expect<Test<Empty["isVariadic"], "equals", false>>,
            Expect<Test<Single["isVariadic"], "equals", false>>,
            Expect<Test<VariadicTail["isVariadic"], "equals", true>>,
            Expect<Test<VariadicHead["isVariadic"], "equals", true>>,
            Expect<Test<WideArray["isVariadic"], "equals", false>>,
        ];
    });


    it("hasVariadicHead property", () => {
        type Empty = TupleMeta<[]>;
        type Single = TupleMeta<[string]>;
        type VariadicTail = TupleMeta<[string, ...number[]]>;
        type VariadicHead = TupleMeta<[...string[], number]>;

        type cases = [
            Expect<Test<Empty["hasVariadicHead"], "equals", false>>,
            Expect<Test<Single["hasVariadicHead"], "equals", false>>,
            Expect<Test<VariadicTail["hasVariadicHead"], "equals", false>>,
            Expect<Test<VariadicHead["hasVariadicHead"], "equals", true>>,
        ];
    });


    it("hasVariadicTail property", () => {
        type Empty = TupleMeta<[]>;
        type Single = TupleMeta<[string]>;
        type VariadicTail = TupleMeta<[string, ...number[]]>;
        type VariadicHead = TupleMeta<[...string[], number]>;

        type cases = [
            Expect<Test<Empty["hasVariadicTail"], "equals", false>>,
            Expect<Test<Single["hasVariadicTail"], "equals", false>>,
            Expect<Test<VariadicTail["hasVariadicTail"], "equals", true>>,
            Expect<Test<VariadicHead["hasVariadicTail"], "equals", false>>,
        ];
    });


    it("isWide property", () => {
        type EmptyTuple = TupleMeta<[]>;
        type SingleTuple = TupleMeta<[string]>;
        type MultipleTuple = TupleMeta<[string, number]>;
        type WithOptional = TupleMeta<[string, number?]>;
        type VariadicTuple = TupleMeta<[string, ...number[]]>;
        type WideArray = TupleMeta<string[]>;
        type WideArray2 = TupleMeta<(string | number)[]>;

        type cases = [
            Expect<Test<EmptyTuple["isWide"], "equals", false>>,
            Expect<Test<SingleTuple["isWide"], "equals", false>>,
            Expect<Test<MultipleTuple["isWide"], "equals", false>>,
            Expect<Test<WithOptional["isWide"], "equals", false>>,
            Expect<Test<VariadicTuple["isWide"], "equals", false>>,
            Expect<Test<WideArray["isWide"], "equals", true>>,
            Expect<Test<WideArray2["isWide"], "equals", true>>,
        ];
    });


    it("excludingVariadicElement property", () => {
        type Empty = TupleMeta<[]>;
        type Single = TupleMeta<[string]>;
        type VariadicTail = TupleMeta<[string, ...number[]]>;
        type X = DropVariadicTail<[string, ...number[]]>;
        type VariadicHead = TupleMeta<[...string[], number]>;

        type cases = [
            Expect<Test<Empty["excludingVariadicElement"], "equals", []>>,
            Expect<Test<Single["excludingVariadicElement"], "equals", [string]>>,
            Expect<Test<VariadicTail["excludingVariadicElement"], "equals", [string]>>,
            Expect<Test<VariadicHead["excludingVariadicElement"], "equals", [number]>>,
        ];
    });


    it("variadicType property", () => {
        type Empty = TupleMeta<[]>;
        type Single = TupleMeta<[string]>;
        type VariadicTail = TupleMeta<[string, ...number[]]>;
        type VariadicHead = TupleMeta<[...string[], number]>;

        type cases = [
            Expect<Test<Empty["variadicType"], "equals", never>>,
            Expect<Test<Single["variadicType"], "equals", never>>,
            Expect<Test<VariadicTail["variadicType"], "equals", number[]>>,
            Expect<Test<VariadicHead["variadicType"], "equals", string[]>>,
        ];
    });


    it("hasOptionalElements property", () => {
        type Empty = TupleMeta<[]>;
        type Single = TupleMeta<[string]>;
        type WithOptional = TupleMeta<[string, number?]>;
        type MultipleOptional = TupleMeta<[string?, number?]>;
        type AllRequired = TupleMeta<[string, number]>;

        type cases = [
            Expect<Test<Empty["hasOptionalElements"], "equals", false>>,
            Expect<Test<Single["hasOptionalElements"], "equals", false>>,
            Expect<Test<WithOptional["hasOptionalElements"], "equals", true>>,
            Expect<Test<MultipleOptional["hasOptionalElements"], "equals", true>>,
            Expect<Test<AllRequired["hasOptionalElements"], "equals", false>>,
        ];
    });


    it("requiredElementCount property", () => {
        type Empty = TupleMeta<[]>;
        type Single = TupleMeta<[string]>;
        type WithOptional = TupleMeta<[string, number?]>;
        type MultipleOptional = TupleMeta<[string?, number?]>;
        type AllRequired = TupleMeta<[string, number]>;

        type cases = [
            Expect<Test<Empty["requiredElementCount"], "equals", 0>>,
            Expect<Test<Single["requiredElementCount"], "equals", 1>>,
            Expect<Test<WithOptional["requiredElementCount"], "equals", 1>>,
            Expect<Test<MultipleOptional["requiredElementCount"], "equals", 0>>,
            Expect<Test<AllRequired["requiredElementCount"], "equals", 2>>,
        ];
    });


    it("optionalElementCount property", () => {
        type Empty = TupleMeta<[]>;
        type Single = TupleMeta<[string]>;
        type WithOptional = TupleMeta<[string, number?]>;
        type MultipleOptional = TupleMeta<[string?, number?]>;
        type AllRequired = TupleMeta<[string, number]>;

        type cases = [
            Expect<Test<Empty["optionalElementCount"], "equals", 0>>,
            Expect<Test<Single["optionalElementCount"], "equals", 0>>,
            Expect<Test<WithOptional["optionalElementCount"], "equals", 1>>,
            Expect<Test<MultipleOptional["optionalElementCount"], "equals", 2>>,
            Expect<Test<AllRequired["optionalElementCount"], "equals", 0>>,
        ];
    });

});
