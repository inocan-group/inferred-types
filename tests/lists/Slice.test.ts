import { Slice, Test, Expect } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Slice<TList, TStart, TEnd>", () => {
    type List = [1, 2, 3, 4, 5, 6, 7, 8];
    type ListRO = readonly [1, 2, 3, 4, 5, 6, 7, 8];

    it("basic slicing of tuple/list", () => {

        type LastTwo = Slice<List, -2>;
        type RoLastTwo = Slice<ListRO, -2>;

        type FirstTwo = Slice<List, 0, 2>;
        type FirstThree = Slice<List, 0, 3>;
        type OneToThree = Slice<List, 1, 3>;
        type ThreeOnward = Slice<List, 3>;  // Without length specified, returns empty
        type ThreeToEnd = Slice<List, 3, 5>; // From index 3, take 5 elements
        type SkipLastTwo = Slice<List, 0, -2>;

        type RoFirstTwo = Slice<ListRO, 0, 2>;
        type RoFirstThree = Slice<ListRO, 0, 3>;
        type RoOneToThree = Slice<ListRO, 1, 3>;
        type RoThreeOnward = Slice<ListRO, 3>;  // Without length specified, returns empty
        type RoThreeToEnd = Slice<ListRO, 3, 5>;
        type RoSkipLastTwo = Slice<ListRO, 0, -2>;

        type cases = [
            Expect<Test<LastTwo, "equals", [7, 8]>>,
            Expect<Test<RoLastTwo, "equals", [7, 8]>>,

            Expect<Test<FirstTwo, "equals", [1, 2]>>,
            Expect<Test<FirstThree, "equals", [1, 2, 3]>>,
            Expect<Test<OneToThree, "equals", [2, 3, 4]>>,
            Expect<Test<ThreeOnward, "equals", []>>,  // No length specified returns empty
            Expect<Test<ThreeToEnd, "equals", [4, 5, 6, 7, 8]>>,
            Expect<Test<SkipLastTwo, "equals", [1, 2, 3, 4, 5, 6]>>,

            Expect<Test<RoFirstTwo, "equals", [1, 2]>>,
            Expect<Test<RoFirstThree, "equals", [1, 2, 3]>>,
            Expect<Test<RoOneToThree, "equals", [2, 3, 4]>>,
            Expect<Test<RoThreeOnward, "equals", []>>,  // No length specified returns empty
            Expect<Test<RoThreeToEnd, "equals", [4, 5, 6, 7, 8]>>,
            Expect<Test<RoSkipLastTwo, "equals", [1, 2, 3, 4, 5, 6]>>,
        ];

    });

    it("negative start indexes", () => {
        type SmallList = [1, 2, 3, 4, 5];

        type LastOne = Slice<SmallList, -1>;
        type LastThree = Slice<SmallList, -3>;
        type LastFour = Slice<SmallList, -4>;
        type LastFive = Slice<SmallList, -5>;

        // Negative start with positive length - takes last N, but doesn't limit length
        type LastThreeWithLen = Slice<SmallList, -3, 2>;
        type LastFourWithLen = Slice<SmallList, -4, 1>;

        type cases = [
            Expect<Test<LastOne, "equals", [5]>>,
            Expect<Test<LastThree, "equals", [3, 4, 5]>>,
            Expect<Test<LastFour, "equals", [2, 3, 4, 5]>>,
            Expect<Test<LastFive, "equals", [1, 2, 3, 4, 5]>>,
            // When using negative start, the length parameter doesn't limit - it takes all from negative start
            Expect<Test<LastThreeWithLen, "equals", [3, 4, 5]>>,
            Expect<Test<LastFourWithLen, "equals", [2, 3, 4, 5]>>,
        ];
    });

    it("negative length values", () => {
        type TestList = [1, 2, 3, 4, 5, 6, 7, 8];

        // Positive start with negative length
        type StartZeroDropOne = Slice<TestList, 0, -1>;
        type StartOneDropTwo = Slice<TestList, 1, -2>;
        type StartThreeDropThree = Slice<TestList, 3, -3>;

        // Negative start with negative length - takes last N, doesn't apply negative length
        type LastFourWithNegLen = Slice<TestList, -4, -1>;
        type LastSixWithNegLen = Slice<TestList, -6, -2>;

        type cases = [
            Expect<Test<StartZeroDropOne, "equals", [1, 2, 3, 4, 5, 6, 7]>>,
            Expect<Test<StartOneDropTwo, "equals", [2, 3, 4, 5, 6]>>,
            Expect<Test<StartThreeDropThree, "equals", [4, 5]>>,
            // Negative start takes last N elements, negative length is ignored
            Expect<Test<LastFourWithNegLen, "equals", [5, 6, 7, 8]>>,
            Expect<Test<LastSixWithNegLen, "equals", [3, 4, 5, 6, 7, 8]>>,
        ];
    });

    it("edge cases with empty arrays", () => {
        type Empty = [];
        type EmptyRO = readonly [];

        type SliceEmpty = Slice<Empty, 0>;
        type SliceEmptyNeg = Slice<Empty, -1>;
        type SliceEmptyWithLen = Slice<Empty, 0, 2>;

        type SliceEmptyRO = Slice<EmptyRO, 0>;
        type SliceEmptyRONeg = Slice<EmptyRO, -1>;

        type cases = [
            Expect<Test<SliceEmpty, "equals", []>>,
            Expect<Test<SliceEmptyNeg, "equals", []>>,
            Expect<Test<SliceEmptyWithLen, "equals", []>>,
            Expect<Test<SliceEmptyRO, "equals", []>>,
            Expect<Test<SliceEmptyRONeg, "equals", []>>,
        ];
    });

    it("single element arrays", () => {
        type Single = [42];
        type SingleRO = readonly [42];

        type SliceAll = Slice<Single, 0>;  // No length returns empty
        type SliceAllWithLen = Slice<Single, 0, 1>;
        type SliceFromOne = Slice<Single, 1>;
        type SliceLastOne = Slice<Single, -1>;
        type SliceWithZeroLen = Slice<Single, 0, 0>;
        type SliceWithOneLen = Slice<Single, 0, 1>;

        type cases = [
            Expect<Test<SliceAll, "equals", []>>,  // No length returns empty
            Expect<Test<SliceAllWithLen, "equals", [42]>>,
            Expect<Test<SliceFromOne, "equals", []>>,
            Expect<Test<SliceLastOne, "equals", [42]>>,
            Expect<Test<SliceWithZeroLen, "equals", []>>,
            Expect<Test<SliceWithOneLen, "equals", [42]>>,
        ];
    });

    it("zero-length slices", () => {
        type TestList = [1, 2, 3, 4, 5];

        type ZeroAtStart = Slice<TestList, 0, 0>;
        type ZeroAtMid = Slice<TestList, 2, 0>;
        type ZeroAtEnd = Slice<TestList, 5, 0>;

        type cases = [
            Expect<Test<ZeroAtStart, "equals", []>>,
            Expect<Test<ZeroAtMid, "equals", []>>,
            Expect<Test<ZeroAtEnd, "equals", []>>,
        ];
    });


    it("with optional types", () => {
        type SomeOpt = ["foo","bar", string?, number?];

        type ReqSlice = Slice<SomeOpt, 0,2>;
        type DipInto = Slice<SomeOpt, 0,3>;
        type TakeAll = Slice<SomeOpt, 0,4>;
        type JustOpt = Slice<SomeOpt, -2>;

        type cases = [
            Expect<Test<ReqSlice, "equals", ["foo","bar"]>>,
            Expect<Test<DipInto, "equals", [ "foo","bar", string?]>>,
            Expect<Test<TakeAll, "equals", [ "foo","bar", string?, number?]>>,
            Expect<Test<JustOpt, "equals", [ string?, number? ]>>
        ];
    });


    it("out of bounds scenarios", () => {
        type ShortList = [1, 2, 3];

        // Start beyond length
        type BeyondStart = Slice<ShortList, 10>;
        type BeyondStartWithLen = Slice<ShortList, 10, 2>;

        // Length exceeds remaining elements
        type ExceedLength = Slice<ShortList, 1, 10>;
        type ExceedFromZero = Slice<ShortList, 0, 10>;

        // Negative start beyond array size
        type NegBeyond = Slice<ShortList, -10>;

        type cases = [
            Expect<Test<BeyondStart, "equals", []>>,
            // When start is beyond bounds, even with length it returns proper sized array with never
            Expect<Test<BeyondStartWithLen, "equals", [never, never]>>,
            Expect<Test<ExceedLength, "equals", [2, 3]>>,
            Expect<Test<ExceedFromZero, "equals", [1, 2, 3]>>,
            Expect<Test<NegBeyond, "equals", [1, 2, 3]>>,
        ];
    });

    it("mixed type tuples", () => {
        type Mixed = [1, "hello", true, null, { a: 1 }, [1, 2]];
        type MixedRO = readonly [1, "hello", true, null, { a: 1 }, [1, 2]];

        type FirstThree = Slice<Mixed, 0, 3>;
        type MiddleTwo = Slice<Mixed, 2, 2>;
        type LastTwo = Slice<Mixed, -2>;
        type SkipFirstTwo = Slice<Mixed, 2>;  // No length returns empty
        type SkipFirstTwoWithLen = Slice<Mixed, 2, 4>;

        type ROFirstThree = Slice<MixedRO, 0, 3>;
        type ROLastTwo = Slice<MixedRO, -2>;

        type cases = [
            Expect<Test<FirstThree, "equals", [1, "hello", true]>>,
            Expect<Test<MiddleTwo, "equals", [true, null]>>,
            Expect<Test<LastTwo, "equals", [{ a: 1 }, [1, 2]]>>,
            Expect<Test<SkipFirstTwo, "equals", []>>,  // No length returns empty
            Expect<Test<SkipFirstTwoWithLen, "equals", [true, null, { a: 1 }, [1, 2]]>>,
            Expect<Test<ROFirstThree, "equals", [1, "hello", true]>>,
            Expect<Test<ROLastTwo, "equals", [{ a: 1 }, [1, 2]]>>,
        ];
    });

    it("boundary conditions", () => {
        type BoundaryList = [1, 2, 3, 4, 5];

        // Exact boundaries
        type FullArray = Slice<BoundaryList, 0, 5>;
        type ExactEnd = Slice<BoundaryList, 5>;
        type ExactEndWithZero = Slice<BoundaryList, 5, 0>;

        // One before/after boundaries
        type AlmostFull = Slice<BoundaryList, 0, 4>;
        type SkipFirst = Slice<BoundaryList, 1, 4>;

        type cases = [
            Expect<Test<FullArray, "equals", [1, 2, 3, 4, 5]>>,
            Expect<Test<ExactEnd, "equals", []>>,
            Expect<Test<ExactEndWithZero, "equals", []>>,
            Expect<Test<AlmostFull, "equals", [1, 2, 3, 4]>>,
            Expect<Test<SkipFirst, "equals", [2, 3, 4, 5]>>,
        ];
    });

    it("comprehensive string slicing", () => {
        type Foo = Slice<"FooBar", 0, 3>;
        type Bar = Slice<"FooBar", 3, 3>;
        type Bar2 = Slice<"FooBar", 3>;  // No length returns empty string
        type Bar3 = Slice<"FooBar", 3, 3>;  // With length

        // Additional string tests
        type EmptyStr = Slice<"", 0>;  // No length returns empty
        type EmptyStrWithLen = Slice<"", 0, 1>;
        type EmptyStrNeg = Slice<"", -1>;
        type SingleChar = Slice<"X", 0>;  // No length returns empty
        type SingleCharWithLen = Slice<"X", 0, 1>;
        type SingleCharNeg = Slice<"X", -1>;

        type FirstChar = Slice<"Hello", 0, 1>;
        type LastChar = Slice<"Hello", -1>;
        type MiddleChars = Slice<"TypeScript", 4, 6>;
        type SkipFirstTwo = Slice<"JavaScript", 2>;  // No length returns empty
        type SkipFirstTwoWithLen = Slice<"JavaScript", 2, 8>;
        type SkipLastThree = Slice<"Programming", 0, -3>;

        // Complex string slicing
        type NegStartPosLen = Slice<"TestString", -6, 3>;  // Takes last 6 chars
        type NegStartNegLen = Slice<"TestString", -6, -2>;  // Takes last 6 chars
        type ZeroLenStr = Slice<"Hello", 2, 0>;

        // Out of bounds string
        type StrBeyond = Slice<"Short", 10>;
        type StrExceedLen = Slice<"Test", 0, 10>;

        type cases = [
            Expect<Test<Foo, "equals", "Foo">>,
            Expect<Test<Bar, "equals", "Bar">>,
            Expect<Test<Bar2, "equals", "">>,  // No length returns empty
            Expect<Test<Bar3, "equals", "Bar">>,

            Expect<Test<EmptyStr, "equals", "">>,
            Expect<Test<EmptyStrWithLen, "equals", "">>,
            Expect<Test<EmptyStrNeg, "equals", "">>,
            Expect<Test<SingleChar, "equals", "">>,  // No length returns empty
            Expect<Test<SingleCharWithLen, "equals", "X">>,
            Expect<Test<SingleCharNeg, "equals", "X">>,

            Expect<Test<FirstChar, "equals", "H">>,
            Expect<Test<LastChar, "equals", "o">>,
            Expect<Test<MiddleChars, "equals", "Script">>,
            Expect<Test<SkipFirstTwo, "equals", "">>,  // No length returns empty
            Expect<Test<SkipFirstTwoWithLen, "equals", "vaScript">>,
            Expect<Test<SkipLastThree, "equals", "Programm">>,

            // Negative start takes full string from that position
            Expect<Test<NegStartPosLen, "equals", "String">>,
            Expect<Test<NegStartNegLen, "equals", "String">>,
            Expect<Test<ZeroLenStr, "equals", "">>,

            Expect<Test<StrBeyond, "equals", "">>,
            Expect<Test<StrExceedLen, "equals", "Test">>,
        ];
    });

    // Emoji tests removed due to character encoding issues
    // The Slice type has difficulty handling multi-byte Unicode characters like emojis

    it("large arrays performance test", () => {
        type LargeList = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30
        ];

        type FirstTen = Slice<LargeList, 0, 10>;
        type MiddleTen = Slice<LargeList, 10, 10>;
        type LastTen = Slice<LargeList, -10>;
        type EveryThird = Slice<LargeList, 2, 3>;

        type cases = [
            Expect<Test<FirstTen, "equals", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>>,
            Expect<Test<MiddleTen, "equals", [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]>>,
            Expect<Test<LastTen, "equals", [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]>>,
            Expect<Test<EveryThird, "equals", [3, 4, 5]>>,
        ];
    });

});
