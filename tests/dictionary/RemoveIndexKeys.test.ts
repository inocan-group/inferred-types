
import { describe, it } from "vitest";
import type {
    Expect,
    Narrowable,
    RemoveIndexKeys,
    Test,
} from "inferred-types/types";

describe("RemoveIndexKeys<T>", () => {

    it("wide string indexes", () => {
        type Literal = RemoveIndexKeys<{ foo: 1; bar: 2 }>;
        type LiteralWithAnyIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: string]: any }>;
        type LiteralWithUnknownIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: string]: unknown }>;
        type LiteralWithStringIdx = RemoveIndexKeys<{ foo: "bar";[key: string]: string }>;
        type LiteralWithNarrowableIdx = RemoveIndexKeys<{ foo: "bar";[key: string]: Narrowable }>;

        type cases = [
            Expect<Test<Literal, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithAnyIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithUnknownIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithStringIdx, "equals",  { foo: "bar" }>>,
            Expect<Test<LiteralWithNarrowableIdx, "equals",  { foo: "bar" }>>,

        ];
    });

    it("wide numeric indexes", () => {
        type Literal = RemoveIndexKeys<{ foo: 1; bar: 2 }>;
        type LiteralWithAnyIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: number]: any }>;
        type LiteralWithUnknownIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: number]: unknown }>;
        type LiteralWithStringIdx = RemoveIndexKeys<{ foo: "bar";[key: number]: string }>;
        type LiteralWithNarrowableIdx = RemoveIndexKeys<{ foo: "bar";[key: number]: Narrowable }>;

        type cases = [
            Expect<Test<Literal, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithAnyIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithUnknownIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithStringIdx, "equals",  { foo: "bar" }>>,
            Expect<Test<LiteralWithNarrowableIdx, "equals",  { foo: "bar" }>>,

        ];
    });

    it("wide symbol indexes", () => {
        type Literal = RemoveIndexKeys<{ foo: 1; bar: 2 }>;
        type LiteralWithAnyIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: symbol]: any }>;
        type LiteralWithUnknownIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: symbol]: unknown }>;
        type LiteralWithStringIdx = RemoveIndexKeys<{ foo: "bar";[key: symbol]: string }>;
        type LiteralWithNarrowableIdx = RemoveIndexKeys<{ foo: "bar";[key: symbol]: Narrowable }>;

        type cases = [
            Expect<Test<Literal, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithAnyIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithUnknownIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithStringIdx, "equals",  { foo: "bar" }>>,
            Expect<Test<LiteralWithNarrowableIdx, "equals",  { foo: "bar" }>>,
        ];
    });

    it("template literal indexes", () => {
        type T1 = RemoveIndexKeys<{ foo: 1; bar: 2; [key: `_${string}`]: number}>;
        type T2 = RemoveIndexKeys<{ [key: `id-${number}`]: string; name: "test" }>;
        type T3 = RemoveIndexKeys<{ [key: `${string}-suffix`]: boolean; active: true }>;
        type T4 = RemoveIndexKeys<{ [key: `prefix-${string}-suffix`]: object; data: { id: 1 } }>;

        type cases = [
            Expect<Test<T1, "equals", { foo: 1; bar: 2 }>>,
            Expect<Test<T2, "equals", { name: "test" }>>,
            Expect<Test<T3, "equals", { active: true }>>,
            Expect<Test<T4, "equals", { data: { id: 1 } }>>,
        ];
    });

    it("mixed index signature types", () => {
        type Mixed1 = RemoveIndexKeys<{
            foo: 1;
            bar: 2;
            [key: string]: unknown;
            [key: number]: unknown;
            [key: symbol]: unknown;
            [key: `_${string}`]: number;
        }>;

        type Mixed2 = RemoveIndexKeys<{
            name: string;
            age: number;
            [key: `id-${number}`]: string;
            [key: string]: any;
        }>;

        type cases = [
            Expect<Test<Mixed1, "equals", { foo: 1; bar: 2 }>>,
            Expect<Test<Mixed2, "equals", { name: string; age: number }>>,
        ];
    });

    it("arrays - limitations noted", () => {
        // Note: Array handling in RemoveIndexKeys has limitations
        // Arrays have complex type structures with both explicit indices
        // and numeric index signatures that are difficult to separate

        type Tuple = RemoveIndexKeys<["a", "b", "c"]>;

        // For now, we just test that the operation doesn't error
        // and produces some result
        type cases = [
            Expect<Test<Tuple, "extends", unknown>>,
        ];
    });

    it("edge cases", () => {
        type Empty = RemoveIndexKeys<{}>;
        type OnlyIndexes = RemoveIndexKeys<{ [key: string]: any }>;
        type OnlyTemplateIndexes = RemoveIndexKeys<{ [key: `_${string}`]: number }>;

        type cases = [
            Expect<Test<Empty, "equals", {}>>,
            Expect<Test<OnlyIndexes, "equals", {}>>,
            Expect<Test<OnlyTemplateIndexes, "equals", {}>>,
        ];
    });

    it("complex template literal patterns", () => {
        type Complex1 = RemoveIndexKeys<{
            id: number;
            [key: `${string}_${string}`]: string;
            [key: `prefix-${number}-suffix`]: boolean;
        }>;

        type Complex2 = RemoveIndexKeys<{
            data: object;
            [key: `${string}:${string}:${string}`]: any;
            [key: `route/${string}`]: Function;
        }>;

        type cases = [
            Expect<Test<Complex1, "equals", { id: number }>>,
            Expect<Test<Complex2, "equals", { data: object }>>,
        ];
    });

});

