import { describe, it } from "vitest";
import {
    Dictionary,
    EmptyObject,
    Expect,
    ObjectKeys,
    Test,
    ObjectKey
} from "inferred-types/types";


describe("ObjectKeys<T>", () => {

    it("wide objects", () => {
        type W1 = ObjectKeys<object>;
        //   ^?
        type W2 = ObjectKeys<Dictionary>;
        //   ^?
        type W3 = ObjectKeys<Record<string, string>>;
        //   ^?
        type W4 = ObjectKeys<Record<symbol, string>>;
        //   ^?


        type cases = [
            Expect<Test<W1, "equals", PropertyKey[]>>,
            Expect<Test<W2, "equals", ObjectKey[]>>,
            Expect<Test<W3, "equals", string[]>>,
            Expect<Test<W4, "equals", symbol[]>>,
        ];
    });

    it("narrow types", () => {
        type Foo = ObjectKeys<{ foo: 1 }>;
        //   ^?
        type Foobar = ObjectKeys<{ foo: 1; bar: 2 }>;
        //   ^?
        type FoobarWideVal = ObjectKeys<{ foo: number; bar: string }>;
        //   ^?
        type Foobar_RO = ObjectKeys<Readonly<{ foo: 1; bar: 2 }>>;
        //   ^?

        type cases = [
            Expect<Test<Foo, "equals", ["foo"]>>,
            Expect<Test<Foobar, "equals", ["foo", "bar"]>>,
            Expect<Test<FoobarWideVal, "equals", ["foo", "bar"]>>,
            Expect<Test<Foobar_RO, "equals", ["foo", "bar"]>>,
        ];
    });


    it("optional keys are last", () => {
        type BarOpt = ObjectKeys<{ foo: 1, bar?: string, baz: 2 }>;
        //   ^?

        type cases = [
            Expect<Test<BarOpt, "equals", ["foo", "baz", ("bar" | undefined)?]>>
        ];
    });


    it("variadic key shape", () => {
        type Shape = ObjectKeys<Record<"foo" | `_${string}` | "bar", string>>
        //   ^?

        type cases = [
            Expect<Test<Shape, "equals", ["foo", "bar", `_${string}`]>>
        ];
    });


    it("simple Map types", () => {
        type T1 = ObjectKeys<Map<string, number>>;
        type T2 = ObjectKeys<Map<"foo" | "bar" | "baz", number>>;

        type cases = [
            Expect<Test<T1, "equals", string[]>>,
            Expect<Test<T2, "equals", ["foo", "bar", "baz"]>>,
        ];
    });


    it("Set keys is an error", () => {
        type E1 = ObjectKeys<Set<string>>;

        type cases = [
            Expect<Test<E1, "isError", "invalid-type/object-keys">>
        ];
    });


    it("simple WeakMap types", () => {
        type T1 = ObjectKeys<WeakMap<object, number>>;
        type T2 = ObjectKeys<WeakMap<{id: 1} | { id: 2}, number>>;

        type cases = [
            Expect<Test<T1, "equals", object[]>>,
            Expect<Test<T2, "equals", {id: 1} | {id: 2}>>,
        ];
    });



    it("error handling for any type", () => {
        type AnyType = ObjectKeys<any>;
        //   ^?

        // Skip this test for now as isError is not working properly
        type cases = [
            Expect<Test<AnyType, "extends", Error>>,
            Expect<Test<AnyType, "isError", "invalid-type/object-keys">>
        ];
    });


    it("never", () => {
        type Never = ObjectKeys<never>;

        type cases = [
            Expect<Test<Never, "isError", "invalid-type">>
        ];
    });



    it("never keys", () => {
        // This would be an object where keyof TObj resolves to never
        // This is a bit tricky to construct, but we can test the behavior
        type NeverKeys = ObjectKeys<Record<never, string>>;
        //   ^?

        type cases = [
            Expect<Test<NeverKeys, "equals", []>>
        ];
    });


    it("empty object", () => {
        type Empty = ObjectKeys<EmptyObject>;
        //   ^?
        type ExplicitlyEmpty = ObjectKeys<EmptyObject>;
        //   ^?

        type cases = [
            Expect<Test<Empty, "equals", []>>,
            Expect<Test<ExplicitlyEmpty, "equals", []>>
        ];
    });


    it("symbol and string keys", () => {
        type NumberLike = ObjectKeys<{ "1": string; "2": number; foo: boolean }>;
        //   ^?

        // numeric keys are not allowed for a Dictionary
        type MixedKeys = ObjectKeys<{ [sym: symbol]: string; 1: number; foo: boolean }>;
        //   ^?

        type cases = [
            // NumberLike keys along with a string key
            Expect<Test<NumberLike, "hasSameValues", ["foo", "1","2"]>>,

        ];
    });


    it("multiple optional keys", () => {
        type MultipleOptional = ObjectKeys<{
            required1: string;
            optional1?: number;
            required2: boolean;
            optional2?: string;
            optional3?: boolean;
        }>;
        //   ^?

        type cases = [
            // The exact ordering of optional keys may vary, so we test the values
            Expect<Test<
                MultipleOptional, "equals",
                [ "required1", "required2", "optional1"?, "optional2"?, "optional3"?]
            >>
        ];
    });


});
