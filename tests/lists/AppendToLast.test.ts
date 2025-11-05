import { describe, it } from "vitest";
import type { AppendToLast, Expect, AssertEqual } from "inferred-types/types";

describe("AppendToLast<TList, TAppend>", () => {
    it("should append text to the last element of a string array", () => {
        type SingleElement = AppendToLast<["hello"], " world">;
        type MultipleElements = AppendToLast<["foo", "bar", "baz"], "!">;
        type EmptyAppend = AppendToLast<["test"], "">;

        type cases = [
            Expect<AssertEqual<SingleElement, ["hello world"]>>,
            Expect<AssertEqual<MultipleElements, ["foo", "bar", "baz!"]>>,
            Expect<AssertEqual<EmptyAppend, ["test"]>>,
        ];
    });

    it("should work with readonly arrays", () => {
        type ReadonlyArray = AppendToLast<readonly ["a", "b", "c"], "d">;
        type ReadonlySingleElement = AppendToLast<readonly ["x"], "y">;

        type cases = [
            // EXPECTED behavior - readonly arrays should be transformed
            Expect<AssertEqual<ReadonlyArray, ["a", "b", "cd"]>>,
            Expect<AssertEqual<ReadonlySingleElement, ["xy"]>>,
        ];
    });

    it("should handle empty strings in the array", () => {
        type LastIsEmpty = AppendToLast<["foo", ""], "bar">;
        type AllEmpty = AppendToLast<["", "", ""], "x">;
        type EmptyWithAppend = AppendToLast<[""], "content">;

        type cases = [
            Expect<AssertEqual<LastIsEmpty, ["foo", "bar"]>>,
            Expect<AssertEqual<AllEmpty, ["", "", "x"]>>,
            Expect<AssertEqual<EmptyWithAppend, ["content"]>>,
        ];
    });

    it("should handle special characters and whitespace", () => {
        type WithSpaces = AppendToLast<["hello", "world"], " ">;
        type WithNewline = AppendToLast<["line"], "\n">;
        type WithTab = AppendToLast<["text"], "\t">;
        type WithSpecialChars = AppendToLast<["path/to"], "/file.ts">;

        type cases = [
            Expect<AssertEqual<WithSpaces, ["hello", "world "]>>,
            Expect<AssertEqual<WithNewline, ["line\n"]>>,
            Expect<AssertEqual<WithTab, ["text\t"]>>,
            Expect<AssertEqual<WithSpecialChars, ["path/to/file.ts"]>>,
        ];
    });

    it("should handle template literal types", () => {
        type WithNumber = AppendToLast<["item"], `${number}`>;
        type WithBoolean = AppendToLast<["is"], `${boolean}`>;
        type Complex = AppendToLast<["prefix"], `_${"a" | "b" | "c"}`>;

        type cases = [
            Expect<AssertEqual<WithNumber, [`item${number}`]>>,
            Expect<AssertEqual<WithBoolean, [`is${boolean}`]>>,
            Expect<AssertEqual<Complex, ["prefix_a" | "prefix_b" | "prefix_c"]>>,
        ];
    });

    it("should preserve the lead-in elements unchanged", () => {
        type ThreeElements = AppendToLast<["first", "second", "third"], "_suffix">;
        type ManyElements = AppendToLast<["a", "b", "c", "d", "e"], "!">;

        type cases = [
            Expect<AssertEqual<ThreeElements, ["first", "second", "third_suffix"]>>,
            Expect<AssertEqual<ManyElements, ["a", "b", "c", "d", "e!"]>>,
        ];
    });

    it("should distribute union types in the append parameter", () => {
        type UnionAppend = AppendToLast<["base"], "A" | "B">;
        type MultipleUnions = AppendToLast<["x", "y"], "1" | "2" | "3">;

        type cases = [
            // Template literal distributes the union, creating a union of string literals
            // not a union of array types
            Expect<AssertEqual<UnionAppend, ["baseA" | "baseB"]>>,
            Expect<AssertEqual<MultipleUnions, ["x", "y1" | "y2" | "y3"]>>,
        ];
    });

    it("should handle very long arrays", () => {
        type LongArray = AppendToLast<
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            "_end"
        >;

        type cases = [
            Expect<AssertEqual<
                LongArray,
                ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10_end"]
            >>,
        ];
    });

    it("should return never for empty arrays", () => {
        type EmptyArray = AppendToLast<[], "text">;
        type EmptyReadonly = AppendToLast<readonly [], "text">;

        type cases = [
            Expect<AssertEqual<EmptyArray, never>>,
            Expect<AssertEqual<EmptyReadonly, never>>,
        ];
    });

    it("should handle concatenation building patterns", () => {
        type PathBuilder = AppendToLast<["src", "components"], "/Button.tsx">;
        type ExtensionAdder = AppendToLast<["myfile"], ".ts">;
        type SuffixPattern = AppendToLast<["user", "data"], "_2024">;

        type cases = [
            Expect<AssertEqual<PathBuilder, ["src", "components/Button.tsx"]>>,
            Expect<AssertEqual<ExtensionAdder, ["myfile.ts"]>>,
            Expect<AssertEqual<SuffixPattern, ["user", "data_2024"]>>,
        ];
    });
});
