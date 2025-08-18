import { Expect, TakeFirst, Test, TupleMeta } from "inferred-types/types";
import { describe, it } from "vitest";



describe("TakeFirst<TContent,TLen,[THandle]>", () => {

    it("happy path", () => {
        type Arr = [1, 2, 3, "foo", "bar"];

        type Two = TakeFirst<Arr, 2>;
        type Three = TakeFirst<Arr, 3>;
        type Biggie = TakeFirst<Arr, 100>;

        type cases = [
            Expect<Test<Two, "equals", [1, 2]>>,
            Expect<Test<Three, "equals", [1, 2, 3]>>,
            Expect<Test<Biggie, "equals", Arr>>,
        ];
    });


    it("all elements are optional", () => {
        type T1 = TakeFirst<[1?, 2?, 3?, string?], 1>;
        type T2 = TakeFirst<[1?, 2?, 3?, string?], 2>;
        type T3 = TakeFirst<[1?, 2?, 3?, string?], 3>;
        type T4 = TakeFirst<[1?, 2?, 3?, string?], 4>;

        type cases = [
            Expect<Test<T1, "equals", [1?]>>,
            Expect<Test<T2, "equals", [1?, 2?]>>,
            Expect<Test<T3, "equals", [1?, 2?, 3?]>>,
            Expect<Test<T4, "equals", [1?, 2?, 3?, string?]>>,
        ];
    });


    it("some elements are optional", () => {
        type T1 = TakeFirst<[1, 2?, 3?, string?], 1>;
        type T2 = TakeFirst<[1, 2?, 3?, string?], 2>;
        type T3 = TakeFirst<[1, 2?, 3?, string?], 3>;
        type T4 = TakeFirst<[1, 2?, 3?, string?], 4>;


        type cases = [
            Expect<Test<T1, "equals", [1]>>,
            Expect<Test<T2, "equals", [1, 2?]>>,
            Expect<Test<T3, "equals", [1, 2?, 3?]>>,
            Expect<Test<T4, "equals", [1, 2?, 3?, string?]>>,
        ];
    });

    it("diverse tuple types and patterns", () => {
        // Different types, not just numbers
        type Mixed = ["hello", boolean, 42, null, undefined];
        type WithOptionals = [string, number?, boolean?, object?];
        
        // Different optional patterns (valid TypeScript syntax)
        type EarlyOptional = [string?, number?, boolean?];
        type MiddleOptional = [string, number?, boolean?];
        type MixedPattern = [string?, number?, boolean?, object?];

        type cases = [
            // Mixed types without optionals
            Expect<Test<TakeFirst<Mixed, 2>, "equals", ["hello", boolean]>>,
            Expect<Test<TakeFirst<Mixed, 3>, "equals", ["hello", boolean, 42]>>,
            
            // Generic types with optionals
            Expect<Test<TakeFirst<WithOptionals, 2>, "equals", [string, number?]>>,
            Expect<Test<TakeFirst<WithOptionals, 3>, "equals", [string, number?, boolean?]>>,
            
            // Early optional (all optional after first)
            Expect<Test<TakeFirst<EarlyOptional, 2>, "equals", [string?, number?]>>,
            Expect<Test<TakeFirst<EarlyOptional, 3>, "equals", [string?, number?, boolean?]>>,
            
            // Middle optional (required first, then optional)
            Expect<Test<TakeFirst<MiddleOptional, 2>, "equals", [string, number?]>>,
            Expect<Test<TakeFirst<MiddleOptional, 3>, "equals", [string, number?, boolean?]>>,
            
            // Complex mixed pattern (all optional)
            Expect<Test<TakeFirst<MixedPattern, 2>, "equals", [string?, number?]>>,
            Expect<Test<TakeFirst<MixedPattern, 3>, "equals", [string?, number?, boolean?]>>,
        ];
    });

    it("edge cases and boundaries", () => {
        // Empty tuple
        type Empty = [];
        
        // Single element tuples
        type SingleRequired = [number];
        type SingleOptional = [string?];
        
        // Large tuples beyond common patterns
        type LargeTuple = [1, 2, 3, 4, 5, 6, 7, 8];
        type LargeOptional = [1?, 2?, 3?, 4?, 5?, 6?, 7?, 8?];

        type cases = [
            // Empty and zero cases
            Expect<Test<TakeFirst<Empty, 0>, "equals", []>>,
            Expect<Test<TakeFirst<Empty, 1>, "equals", []>>,
            Expect<Test<TakeFirst<[1, 2, 3], 0>, "equals", []>>,
            
            // Single elements
            Expect<Test<TakeFirst<SingleRequired, 1>, "equals", [number]>>,
            Expect<Test<TakeFirst<SingleOptional, 1>, "equals", [string?]>>,
            
            // Large tuples (testing depth limits)
            Expect<Test<TakeFirst<LargeTuple, 5>, "equals", [1, 2, 3, 4, 5]>>,
            Expect<Test<TakeFirst<LargeOptional, 5>, "equals", [1?, 2?, 3?, 4?, 5?]>>,
            
            // Taking more than available
            Expect<Test<TakeFirst<[1, 2], 5>, "equals", [1, 2]>>,
            Expect<Test<TakeFirst<[1?, 2?], 5>, "equals", [1?, 2?]>>,
        ];
    });

    it("challenging patterns that break hardcoded solutions", () => {
        // 5-element tuples (beyond my hardcoded 4-element pattern)
        type FiveElement = [string, number, boolean, null, undefined];
        type FiveOptional = [string?, number?, boolean?, null?, undefined?];
        type FiveMixed = [string, number?, boolean?, null?, undefined?];
        
        // 6+ element tuples
        type SixElement = ["a", "b", "c", "d", "e", "f"];
        type SixMixed = ["a", "b"?, "c"?, "d"?, "e"?, "f"?];
        
        // Different types entirely
        type WeirdTypes = [Map<string, number>, Set<boolean>?, RegExp?, Date?];
        
        // Nested types
        type NestedTypes = [Array<string>, Record<string, number>?, Promise<boolean>?];

        type cases = [
            // 5-element tests
            Expect<Test<TakeFirst<FiveElement, 3>, "equals", [string, number, boolean]>>,
            Expect<Test<TakeFirst<FiveOptional, 3>, "equals", [string?, number?, boolean?]>>,
            Expect<Test<TakeFirst<FiveMixed, 3>, "equals", [string, number?, boolean?]>>,
            
            // 6+ element tests
            Expect<Test<TakeFirst<SixElement, 4>, "equals", ["a", "b", "c", "d"]>>,
            Expect<Test<TakeFirst<SixMixed, 4>, "equals", ["a", "b"?, "c"?, "d"?]>>,
            
            // Complex types
            Expect<Test<TakeFirst<WeirdTypes, 2>, "equals", [Map<string, number>, Set<boolean>?]>>,
            Expect<Test<TakeFirst<WeirdTypes, 3>, "equals", [Map<string, number>, Set<boolean>?, RegExp?]>>,
            
            // Nested types
            Expect<Test<TakeFirst<NestedTypes, 2>, "equals", [Array<string>, Record<string, number>?]>>,
        ];
    });
});
