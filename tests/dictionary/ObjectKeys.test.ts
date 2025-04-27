import { describe, it } from "vitest";
import {
    Expect, Test,
    ObjectKeys,
    EmptyObject,
    Dictionary,
    ObjectKey,
    IsWideObject,
    IsNever
} from "inferred-types/types"
import { ExplicitlyEmptyObject, IsWideContainer } from "transpiled/types";

describe("ObjectObjectKeys<T> with object targets", () => {
    type OBJ = { foo: 1; bar: 2 };
    type T1 = IsWideContainer<Record<ObjectKey, unknown>>;
    type T2 = IsWideObject<Record<string, unknown>>;


    type Foobar = ObjectKeys<OBJ>;
    type FooBar_RO = ObjectKeys<Readonly<OBJ>>;
    type FooBar_Indexed = ObjectKeys<{ foo: 1; bar: 2;[x: string]: unknown }>;
    type Uno = ObjectKeys<{ baz: 3 }>;

    type Rec = ObjectKeys<Record<ObjectKey, unknown>>;
    type StrRec = ObjectKeys<Record<string, string>>;
    type UnionRec = ObjectKeys<Record<"foo" | "bar", number>>;

    type Empty = ObjectKeys<ExplicitlyEmptyObject>;
    type Curly = ObjectKeys<EmptyObject>;
    type Dict = ObjectKeys<Dictionary>;
    type Obj = ObjectKeys<object>;


    it("object resolution", () => {
        type cases = [

            Expect<Test<Foobar, "hasSameKeys", ["foo", "bar"]>>,
            Expect<Test<FooBar_RO, "hasSameKeys", ["foo", "bar"]>>,
            Expect<Test<FooBar_Indexed, "hasSameKeys", ["foo", "bar"]>>,
            Expect<Test<Uno, "hasSameKeys", ["baz"]>>,

            Expect<Test<Rec, "equals", ObjectKey[]>>,
            Expect<Test<StrRec, "equals", string[]>>,
            Expect<Test<UnionRec, "equals", ["foo", "bar"]>>,

            Expect<Test<Empty, "equals", []>>,
            Expect<Test<Curly, "equals", ObjectKey[]>>,
            Expect<Test<Dict, "equals", ObjectKey[]>>,
            Expect<Test<Obj, "equals", ObjectKey[]>>,
        ];
    });


    it("array resolution", () => {

        type cases = [
            Expect<Test<ObjectKeys<[]>, "equals", number[]>>,
            Expect<Test<ObjectKeys<string[]>, "equals", number[]>>,
            Expect<HasSameObjectKeys<ObjectKeys<[1, 2, 3]>, [0, 1, 2]>>,
            Expect<Test<ObjectKeys<[1, 2, 3]>, "equals", [0, 1, 2]>>,
        ];
    });

});
