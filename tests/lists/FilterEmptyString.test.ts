import { describe, it } from "vitest";
import type {
    Expect,
    FilterEmptyStrings,
    FilterEmptyStringsInTerminalPosition,
    Test
} from "inferred-types/types";

describe("FilterEmptyStrings<T>", () => {

    it("filters out all empty strings from a tuple", () => {
        type T1 = FilterEmptyStrings<["", "hello", "", "world", ""]>;
        type T2 = FilterEmptyStrings<["", "", ""]>;
        type T3 = FilterEmptyStrings<["hello", "world"]>;
        type T4 = FilterEmptyStrings<[]>;

        type cases = [
            Expect<Test<T1, "equals", ["hello", "world"]>>,
            Expect<Test<T2, "equals", []>>,
            Expect<Test<T3, "equals", ["hello", "world"]>>,
            Expect<Test<T4, "equals", []>>
        ];
    });

    it("preserves non-string values", () => {
        type T1 = FilterEmptyStrings<["", 42, "", true, "", null, undefined]>;
        type T2 = FilterEmptyStrings<[1, 2, 3]>;
        type T3 = FilterEmptyStrings<[null, undefined, false, 0]>;

        type cases = [
            Expect<Test<T1, "equals", [42, true, null, undefined]>>,
            Expect<Test<T2, "equals", [1, 2, 3]>>,
            Expect<Test<T3, "equals", [null, undefined, false, 0]>>
        ];
    });

    it("handles mixed string types", () => {
        type Str1 = string;
        type Str2 = string;
        type EmptyStr = string;
        type T1 = FilterEmptyStrings<["", Str1, "", Str2, ""]>;
        type T2 = FilterEmptyStrings<["", "literal", EmptyStr, "another"]>;

        type cases = [
            Expect<Test<T1, "equals", [string, string]>>,
            Expect<Test<T2, "equals", ["literal", string, "another"]>>
        ];
    });

    it("works with readonly tuples", () => {
        type T1 = FilterEmptyStrings<readonly ["", "hello", "", "world", ""]>;
        type T2 = FilterEmptyStrings<readonly ["", "", ""]>;

        type cases = [
            Expect<Test<T1, "equals", ["hello", "world"]>>,
            Expect<Test<T2, "equals", []>>
        ];
    });

    it("preserves order of non-empty elements", () => {
        type T1 = FilterEmptyStrings<["a", "", "b", "", "c", ""]>;
        type T2 = FilterEmptyStrings<["", "first", "second", "", "third"]>;

        type cases = [
            Expect<Test<T1, "equals", ["a", "b", "c"]>>,
            Expect<Test<T2, "equals", ["first", "second", "third"]>>
        ];
    });

    it("handles complex nested types", () => {
        type T1 = FilterEmptyStrings<["", { foo: "bar" }, "", [1, 2, 3], ""]>;
        type T2 = FilterEmptyStrings<["", () => string, "", { nested: { deep: "" } }, ""]>;

        type cases = [
            Expect<Test<T1, "equals", [{ foo: "bar" }, [1, 2, 3]]>>,
            Expect<Test<T2, "equals", [() => string, { nested: { deep: "" } }]>>
        ];
    });
});

describe("FilterEmptyStringsInTerminalPosition<T>", () => {

    it("removes leading and trailing empty strings", () => {
        type T1 = FilterEmptyStringsInTerminalPosition<["", "hello", "", "world", ""]>;
        type T2 = FilterEmptyStringsInTerminalPosition<["", "", ""]>;
        type T3 = FilterEmptyStringsInTerminalPosition<["hello", "world"]>;
        type T4 = FilterEmptyStringsInTerminalPosition<[]>;

        type cases = [
            Expect<Test<T1, "equals", ["hello", "", "world"]>>,
            Expect<Test<T2, "equals", []>>,
            Expect<Test<T3, "equals", ["hello", "world"]>>,
            Expect<Test<T4, "equals", []>>
        ];
    });

    it("preserves interior empty strings", () => {
        type T1 = FilterEmptyStringsInTerminalPosition<["", "a", "", "b", "", "c", ""]>;
        type T2 = FilterEmptyStringsInTerminalPosition<["first", "", "middle", "", "last"]>;
        type T3 = FilterEmptyStringsInTerminalPosition<["", "", "start", "", "middle", "", "end", "", ""]>;

        type cases = [
            Expect<Test<T1, "equals", ["a", "", "b", "", "c"]>>,
            Expect<Test<T2, "equals", ["first", "", "middle", "", "last"]>>,
            Expect<Test<T3, "equals", ["start", "", "middle", "", "end"]>>
        ];
    });

    it("preserves non-string values", () => {
        type T1 = FilterEmptyStringsInTerminalPosition<["", 42, "", true, "", null, undefined]>;
        type T2 = FilterEmptyStringsInTerminalPosition<[1, 2, 3]>;
        type T3 = FilterEmptyStringsInTerminalPosition<[null, undefined, false, 0]>;

        type cases = [
            Expect<Test<T1, "equals", [42, "", true, "", null, undefined]>>,
            Expect<Test<T2, "equals", [1, 2, 3]>>,
            Expect<Test<T3, "equals", [null, undefined, false, 0]>>
        ];
    });

    it("works with readonly tuples", () => {
        type T1 = FilterEmptyStringsInTerminalPosition<readonly ["", "hello", "", "world", ""]>;
        type T2 = FilterEmptyStringsInTerminalPosition<readonly ["", "", ""]>;

        type cases = [
            Expect<Test<T1, "equals", ["hello", "", "world"]>>,
            Expect<Test<T2, "equals", []>>
        ];
    });

    it("handles mixed string types", () => {
        type Str1 = string;
        type Str2 = string;
        type T1 = FilterEmptyStringsInTerminalPosition<["", Str1, "", Str2, ""]>;
        type T2 = FilterEmptyStringsInTerminalPosition<["", "literal", string, "another"]>;

        type cases = [
            Expect<Test<T1, "equals", [string, "", string]>>,
            Expect<Test<T2, "equals", ["literal",  string, "another"]>>
        ];
    });

    it("handles edge cases with single elements", () => {
        type T1 = FilterEmptyStringsInTerminalPosition<[""]>;
        type T2 = FilterEmptyStringsInTerminalPosition<["hello"]>;
        type T3 = FilterEmptyStringsInTerminalPosition<[42]>;

        type cases = [
            Expect<Test<T1, "equals", []>>,
            Expect<Test<T2, "equals", ["hello"]>>,
            Expect<Test<T3, "equals", [42]>>
        ];
    });

    it("handles complex nested types", () => {
        type T1 = FilterEmptyStringsInTerminalPosition<["", { foo: "bar" }, "", [1, 2, 3], ""]>;
        type T2 = FilterEmptyStringsInTerminalPosition<["", () => string, "", { nested: { deep: "" } }, ""]>;

        type cases = [
            Expect<Test<T1, "equals", [{ foo: "bar" }, "", [1, 2, 3]]>>,
            Expect<Test<T2, "equals", [() => string, "", { nested: { deep: "" } }]>>
        ];
    });

    it("handles alternating empty and non-empty strings", () => {
        type T1 = FilterEmptyStringsInTerminalPosition<["", "", "a", "", "b", "", ""]>;
        type T2 = FilterEmptyStringsInTerminalPosition<["", "", "", "x", "", "", ""]>;

        type cases = [
            Expect<Test<T1, "equals", ["a", "", "b"]>>,
            Expect<Test<T2, "equals", ["x"]>>
        ];
    });
});
