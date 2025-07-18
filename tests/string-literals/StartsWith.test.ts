import { Expect,StartsWith, Test, UpperAlphaChar } from "inferred-types/types";
import { describe, it } from "vitest";



describe("StartsWith<TValue,TTest>", () => {

    it("empty string behavior", () => {
        // Testing that empty string should not match anything
        type EmptyString1 = StartsWith<"foobar", "">;
        type EmptyString2 = StartsWith<"", "">;
        type EmptyString3 = StartsWith<"any string", "">;
        
        // Also test with arrays containing empty strings
        type EmptyInArray1 = StartsWith<"foobar", ["foo", ""]>;
        type EmptyInArray2 = StartsWith<"foobar", ["", "bar"]>;
        type OnlyEmptyInArray = StartsWith<"foobar", [""]>;
        
        type cases = [
            // Empty string comparator should always return false
            Expect<Test<EmptyString1, "equals", false>>,
            Expect<Test<EmptyString2, "equals", false>>,
            Expect<Test<EmptyString3, "equals", false>>,
            
            // Arrays with empty strings should still match valid patterns
            Expect<Test<EmptyInArray1, "equals", true>>, // matches "foo"
            Expect<Test<EmptyInArray2, "equals", false>>, // neither "" nor "bar" match
            Expect<Test<OnlyEmptyInArray, "equals", false>>, // only has empty string
        ];
    });

    it("happy path", () => {
        type Foo = StartsWith<"foobar", "foo">;
        type NoFoo = StartsWith<"barfoo", "foo">;

        type MultiFoo = StartsWith<"foobar", ["foo", "bar"]>;
        type NotMultiFoo = StartsWith<"foobar", ["bar", "baz"]>;

        type Num = StartsWith<420, 42>;
        type NotNum = StartsWith<520, 42>;

        type Upper = StartsWith<"Bar", UpperAlphaChar>;
        type NotUpper = StartsWith<"bar", UpperAlphaChar>;

        type WideComparator = StartsWith<"Foo", string>;
        type WideContent = StartsWith<string, "foo">;

        type cases = [
            Expect<Test<Foo, "equals", true>>,
            Expect<Test<NoFoo, "equals", false>>,

            Expect<Test<MultiFoo, "equals", true>>,
            Expect<Test<NotMultiFoo, "equals", false>>,

            Expect<Test<Num, "equals", true>>,
            Expect<Test<NotNum, "equals", false>>,

            Expect<Test<Upper, "equals", true>>,
            Expect<Test<NotUpper, "equals", false>>,

            Expect<Test<WideComparator, "equals", boolean>>,
            Expect<Test<WideContent, "equals", boolean>>,
        ];
    });

});


