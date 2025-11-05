import { describe, it, expect } from "vitest";
import type { Expect, SortByLength, Test } from "inferred-types/types";
import { sortByLength } from "inferred-types/runtime";

describe("SortByLength<T>", () => {

    it("basic sorting - longest to shortest", () => {
        type Simple = SortByLength<["a", "abc", "ab"]>;
        type Mixed = SortByLength<["hello", "hi", "goodbye", "hey"]>;
        type AllSameLength = SortByLength<["foo", "bar", "baz"]>;

        type cases = [
            // Longest to shortest
            Expect<Test<Simple, "equals", ["abc", "ab", "a"]>>,
            Expect<Test<Mixed, "equals", ["goodbye", "hello", "hey", "hi"]>>,
            // When all same length, maintains order
            Expect<Test<AllSameLength, "equals", ["foo", "bar", "baz"]>>,
        ];
    });

    it("single element array", () => {
        type Single = SortByLength<["hello"]>;

        type cases = [
            Expect<Test<Single, "equals", ["hello"]>>,
        ];
    });

    it("empty array", () => {
        type Empty = SortByLength<[]>;

        type cases = [
            Expect<Test<Empty, "equals", []>>,
        ];
    });

    it("two elements", () => {
        type Longer = SortByLength<["short", "longer"]>;
        type Shorter = SortByLength<["longer", "short"]>;
        type SameLength = SortByLength<["foo", "bar"]>;

        type cases = [
            Expect<Test<Longer, "equals", ["longer", "short"]>>,
            Expect<Test<Shorter, "equals", ["longer", "short"]>>,
            Expect<Test<SameLength, "equals", ["foo", "bar"]>>,
        ];
    });

    it("multiple strings with same length", () => {
        // When there are ties, the original order should be preserved
        type Ties = SortByLength<["aa", "bbbb", "c", "dd", "eee"]>;
        type AllTies = SortByLength<["foo", "bar", "baz", "qux"]>;

        type cases = [
            // "bbbb" (4), "eee" (3), "aa" and "dd" (2 each), "c" (1)
            Expect<Test<Ties, "equals", ["bbbb", "eee", "aa", "dd", "c"]>>,
            // All length 3, should preserve order
            Expect<Test<AllTies, "equals", ["foo", "bar", "baz", "qux"]>>,
        ];
    });

    it("longer strings", () => {
        type LongStrings = SortByLength<[
            "TypeScript",
            "JavaScript",
            "Go",
            "Rust",
            "Python"
        ]>;

        type cases = [
            // "JavaScript" (10), "TypeScript" (10), "Python" (6), "Rust" (4), "Go" (2)
            // When tied (JavaScript and TypeScript), preserves order (TypeScript first)
            Expect<Test<
                LongStrings,
                "equals",
                ["TypeScript", "JavaScript", "Python", "Rust", "Go"]
            >>,
        ];
    });

    it("very long array", () => {
        type ManyStrings = SortByLength<[
            "a",
            "bb",
            "ccc",
            "dddd",
            "eeeee",
            "ffffff",
            "ggggggg",
            "hhhhhhhh",
            "iiiiiiiii",
            "jjjjjjjjjj"
        ]>;

        type cases = [
            Expect<Test<
                ManyStrings,
                "equals",
                [
                    "jjjjjjjjjj",
                    "iiiiiiiii",
                    "hhhhhhhh",
                    "ggggggg",
                    "ffffff",
                    "eeeee",
                    "dddd",
                    "ccc",
                    "bb",
                    "a"
                ]
            >>,
        ];
    });

    it("with readonly tuple type", () => {
        type ReadonlyArray = SortByLength<readonly ["short", "medium", "x"]>;

        type cases = [
            Expect<Test<ReadonlyArray, "equals", ["medium", "short", "x"]>>,
        ];
    });

    it("edge case: empty strings", () => {
        type WithEmpty = SortByLength<["hello", "", "world", ""]>;
        type AllEmpty = SortByLength<["", "", ""]>;

        type cases = [
            // "hello" (5), "world" (5), "" (0), "" (0)
            Expect<Test<WithEmpty, "equals", ["hello", "world", "", ""]>>,
            Expect<Test<AllEmpty, "equals", ["", "", ""]>>,
        ];
    });

    it("stability test: order preservation for equal lengths", () => {
        // This tests that when multiple strings have the same length,
        // they maintain their original relative order
        type Stable = SortByLength<[
            "aaa",
            "bbbbb",
            "cc",
            "dddd",
            "e",
            "fff",
            "gggg",
            "hh"
        ]>;

        type cases = [
            Expect<Test<
                Stable,
                "equals",
                [
                    "bbbbb",  // 5
                    "dddd",   // 4
                    "gggg",   // 4 (preserves order after dddd)
                    "aaa",    // 3
                    "fff",    // 3 (preserves order after aaa)
                    "cc",     // 2
                    "hh",     // 2 (preserves order after cc)
                    "e"       // 1
                ]
            >>,
        ];
    });

    it("unicode and special characters", () => {
        // Each character counts as one, including emojis and unicode
        type Unicode = SortByLength<["hello", "world!", "hi😀", "bye"]>;

        type cases = [
            // "world!" (6), "hello" (5), "hi😀" (3), "bye" (3)
            Expect<Test<Unicode, "equals", ["world!", "hello", "hi😀", "bye"]>>,
        ];
    });

});

describe("sortByLength()", () => {

    it("basic sorting - longest to shortest", () => {
        const simple = sortByLength(["a", "abc", "ab"] as const);
        const mixed = sortByLength(["hello", "hi", "goodbye", "hey"] as const);
        const allSameLength = sortByLength(["foo", "bar", "baz"] as const);

        // Runtime tests
        expect(simple).toEqual(["abc", "ab", "a"]);
        expect(mixed).toEqual(["goodbye", "hello", "hey", "hi"]);
        expect(allSameLength).toEqual(["foo", "bar", "baz"]);

        // Type tests - function returns mutable arrays
        type cases = [
            Expect<Test<typeof simple, "equals", ["abc", "ab", "a"]>>,
            Expect<Test<typeof mixed, "equals", ["goodbye", "hello", "hey", "hi"]>>,
            Expect<Test<typeof allSameLength, "equals", ["foo", "bar", "baz"]>>,
        ];
    });

    it("single element array", () => {
        const single = sortByLength(["hello"] as const);

        expect(single).toEqual(["hello"]);

        type cases = [
            Expect<Test<typeof single, "equals", ["hello"]>>,
        ];
    });

    it("empty array", () => {
        const empty = sortByLength([] as const);

        expect(empty).toEqual([]);

        type cases = [
            Expect<Test<typeof empty, "equals", []>>,
        ];
    });

    it("two elements", () => {
        const longer = sortByLength(["short", "longer"] as const);
        const shorter = sortByLength(["longer", "short"] as const);
        const sameLength = sortByLength(["foo", "bar"] as const);

        expect(longer).toEqual(["longer", "short"]);
        expect(shorter).toEqual(["longer", "short"]);
        expect(sameLength).toEqual(["foo", "bar"]);

        type cases = [
            Expect<Test<typeof longer, "equals", ["longer", "short"]>>,
            Expect<Test<typeof shorter, "equals", ["longer", "short"]>>,
            Expect<Test<typeof sameLength, "equals", ["foo", "bar"]>>,
        ];
    });

    it("stability test: order preservation for equal lengths", () => {
        const stable = sortByLength([
            "aaa",
            "bbbbb",
            "cc",
            "dddd",
            "e",
            "fff",
            "gggg",
            "hh"
        ] as const);

        expect(stable).toEqual([
            "bbbbb",  // 5
            "dddd",   // 4
            "gggg",   // 4
            "aaa",    // 3
            "fff",    // 3
            "cc",     // 2
            "hh",     // 2
            "e"       // 1
        ]);

        type cases = [
            Expect<Test<
                typeof stable,
                "equals",
                [
                    "bbbbb",
                    "dddd",
                    "gggg",
                    "aaa",
                    "fff",
                    "cc",
                    "hh",
                    "e"
                ]
            >>,
        ];
    });

    it("edge case: empty strings", () => {
        const withEmpty = sortByLength(["hello", "", "world", ""] as const);
        const allEmpty = sortByLength(["", "", ""] as const);

        expect(withEmpty).toEqual(["hello", "world", "", ""]);
        expect(allEmpty).toEqual(["", "", ""]);

        type cases = [
            Expect<Test<typeof withEmpty, "equals", ["hello", "world", "", ""]>>,
            Expect<Test<typeof allEmpty, "equals", ["", "", ""]>>,
        ];
    });

    it("works with mutable arrays (not as const)", () => {
        const mutable = sortByLength(["short", "longer", "x"]);

        // Runtime test
        expect(mutable).toEqual(["longer", "short", "x"]);

        // Type test - even without 'as const', the function uses const generics
        // so it still infers narrow literal types
        type cases = [
            Expect<Test<typeof mutable, "equals", ["longer", "short", "x"]>>,
        ];
    });

    it("preserves narrow types with as const", () => {
        const narrow = sortByLength(["TypeScript", "JavaScript", "Go", "Rust", "Python"] as const);

        expect(narrow).toEqual(["TypeScript", "JavaScript", "Python", "Rust", "Go"]);

        type cases = [
            Expect<Test<
                typeof narrow,
                "equals",
                ["TypeScript", "JavaScript", "Python", "Rust", "Go"]
            >>,
        ];
    });

    it("handles unicode and special characters", () => {
        const unicode = sortByLength(["hello", "world!", "hi😀", "bye"] as const);

        // JavaScript counts emoji as 2 code units, but length still works
        expect(unicode).toEqual(["world!", "hello", "hi😀", "bye"]);

        type cases = [
            Expect<Test<typeof unicode, "equals", ["world!", "hello", "hi😀", "bye"]>>,
        ];
    });

    it("does not mutate original array", () => {
        const original = ["short", "longer", "x"] as const;
        const sorted = sortByLength(original);

        // Runtime test - original should be unchanged
        expect(original).toEqual(["short", "longer", "x"]);
        expect(sorted).toEqual(["longer", "short", "x"]);

        // Type test
        type cases = [
            Expect<Test<typeof sorted, "equals", ["longer", "short", "x"]>>,
        ];
    });

    it("works with wide readonly arrays", () => {
        const readonlyArr: readonly string[] = ["foo", "barbaz", "qux"];
        const sorted = sortByLength(readonlyArr);

        expect(sorted).toEqual(["barbaz", "foo", "qux"]);

        // When input is widened to readonly string[], output is widened to string[]
        type cases = [
            Expect<Test<typeof sorted, "extends", string[]>>,
        ];
    });

});
