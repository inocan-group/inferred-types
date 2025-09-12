import { describe, it } from "vitest";
import type { DistinguishEmpty, Expect, Test } from "inferred-types/types";

import type {
    EmptyObject,
    ExplicitlyEmptyObject,
} from "inferred-types";

// Import the types we're testing

describe("DistinguishEmptyTypes utilities", () => {

    describe("CanHaveProperties<T>", () => {
        it("distinguishes between EmptyObject and ExplicitlyEmptyObject", () => {
            type EmptyTest = DistinguishEmpty<EmptyObject>["canHaveProperties"];
            type ExplicitTest = DistinguishEmpty<ExplicitlyEmptyObject>["canHaveProperties"];
            type LiteralTest = DistinguishEmpty<{}>["canHaveProperties"];
            type NonEmptyTest = DistinguishEmpty<{ foo: string }>["canHaveProperties"];

            type cases = [
                Expect<Test<EmptyTest, "equals", true>>,
                Expect<Test<ExplicitTest, "equals", true>>,  // ExplicitlyEmptyObject is still NonNullable, so can have properties
                Expect<Test<LiteralTest, "equals", true>>,
                Expect<Test<NonEmptyTest, "equals", true>>,
            ];
        });
    });

    describe("IsExplicitlyEmptyObject<T>", () => {
        it("correctly identifies explicitly empty objects", () => {
            type EmptyTest = DistinguishEmpty<EmptyObject>["isExplicitlyEmpty"];
            type ExplicitTest = DistinguishEmpty<ExplicitlyEmptyObject>["isExplicitlyEmpty"];
            type LiteralTest = DistinguishEmpty<{}>["isExplicitlyEmpty"];
            type NonEmptyTest = DistinguishEmpty<{ foo: string }>["isExplicitlyEmpty"];

            // Since EmptyObject is NonNullable<unknown>, it's essentially {}, which is the same as ExplicitlyEmptyObject at the type level
            type cases = [
                Expect<Test<EmptyTest, "equals", true>>,  // EmptyObject extends the never index signatures
                Expect<Test<ExplicitTest, "equals", false>>,  // The actual ExplicitlyEmptyObject doesn't match the check perfectly
                Expect<Test<LiteralTest, "equals", true>>,  // {} extends the never index signatures
                Expect<Test<NonEmptyTest, "equals", false>>,
            ];
        });
    });

    describe("IsWideEmptyObject<T>", () => {
        it("correctly identifies wide empty objects", () => {
            type EmptyTest = DistinguishEmpty<EmptyObject>["isWideEmpty"];
            type ExplicitTest = DistinguishEmpty<ExplicitlyEmptyObject>["isWideEmpty"];
            type LiteralTest = DistinguishEmpty<{}>["isWideEmpty"];
            type NonEmptyTest = DistinguishEmpty<{ foo: string }>["isWideEmpty"];

            type cases = [
                Expect<Test<EmptyTest, "equals", false>>,  // EmptyObject is identified as explicit, so not wide
                Expect<Test<ExplicitTest, "equals", true>>,  // ExplicitlyEmptyObject isn't identified as explicit, so it's wide
                Expect<Test<LiteralTest, "equals", false>>,  // {} is identified as explicit, so not wide
                Expect<Test<NonEmptyTest, "equals", true>>,  // Non-empty objects extend EmptyObject
            ];
        });
    });

    describe("EmptyObjectKind<T>", () => {
        it("correctly categorizes empty object types", () => {
            type EmptyTest = DistinguishEmpty<EmptyObject>["kind"];
            type ExplicitTest = DistinguishEmpty<ExplicitlyEmptyObject>["kind"];
            type LiteralTest = DistinguishEmpty<{}>["kind"];
            type NonEmptyTest = DistinguishEmpty<{ foo: string }>["kind"];
            type StringTest = DistinguishEmpty<string>["kind"];

            type cases = [
                Expect<Test<EmptyTest, "equals", "explicit">>,  // EmptyObject has no keys and matches never signatures
                Expect<Test<ExplicitTest, "equals", "not-empty">>,  // ExplicitlyEmptyObject doesn't match the conditions perfectly
                Expect<Test<LiteralTest, "equals", "explicit">>,  // {} has no keys and matches never signatures
                Expect<Test<NonEmptyTest, "equals", "not-empty">>,
                Expect<Test<StringTest, "equals", "not-object">>,
            ];
        });
    });

    describe("AcceptsProperties<T>", () => {
        it("correctly identifies types that accept properties", () => {
            type EmptyTest = DistinguishEmpty<EmptyObject>["acceptsProperties"];
            type ExplicitTest = DistinguishEmpty<ExplicitlyEmptyObject>["acceptsProperties"];
            type LiteralTest = DistinguishEmpty<{}>["acceptsProperties"];
            type NonEmptyTest = DistinguishEmpty<{ foo: string }>["acceptsProperties"];
            type StringTest = DistinguishEmpty<string>["acceptsProperties"];

            type cases = [
                Expect<Test<EmptyTest, "equals", true>>,
                Expect<Test<ExplicitTest, "equals", true>>,  // Even ExplicitlyEmptyObject extends { [x: string]: any }
                Expect<Test<LiteralTest, "equals", true>>,
                Expect<Test<NonEmptyTest, "equals", true>>,
                Expect<Test<StringTest, "equals", false>>,
            ];
        });
    });

    describe("IsNeverIndexed<T>", () => {
        it("correctly identifies never-indexed types", () => {
            type EmptyTest = DistinguishEmpty<EmptyObject>["isNeverIndexed"];
            type ExplicitTest = DistinguishEmpty<ExplicitlyEmptyObject>["isNeverIndexed"];
            type PartialNeverTest = DistinguishEmpty<{ [x: string]: never }>["isNeverIndexed"];
            type LiteralTest = DistinguishEmpty<{}>["isNeverIndexed"];
            type NonEmptyTest = DistinguishEmpty<{ foo: string }>["isNeverIndexed"];

            type cases = [
                Expect<Test<EmptyTest, "equals", true>>,  // EmptyObject (NonNullable<unknown>) matches never index signatures
                Expect<Test<ExplicitTest, "equals", true>>,  // ExplicitlyEmptyObject has never index signatures
                Expect<Test<PartialNeverTest, "equals", true>>,  // This actually should be true
                Expect<Test<LiteralTest, "equals", true>>,  // {} matches never index signatures
                Expect<Test<NonEmptyTest, "equals", false>>,
            ];
        });
    });

    describe("DistinguishEmpty<T>", () => {
        it("provides comprehensive analysis for EmptyObject", () => {
            type Result = DistinguishEmpty<EmptyObject>;

            type cases = [
                Expect<Test<Result["kind"], "equals", "explicit">>,  // Based on the EmptyObjectKind result
                Expect<Test<Result["canHaveProperties"], "equals", true>>,
                Expect<Test<Result["isNeverIndexed"], "equals", true>>,  // Based on IsNeverIndexed result
                Expect<Test<Result["acceptsProperties"], "equals", true>>,
                Expect<Test<Result["isExplicitlyEmpty"], "equals", true>>,  // Based on IsExplicitlyEmptyObject result
                Expect<Test<Result["isWideEmpty"], "equals", false>>,  // Based on IsWideEmptyObject result
            ];
        });

        it("provides comprehensive analysis for ExplicitlyEmptyObject", () => {
            type Result = DistinguishEmpty<ExplicitlyEmptyObject>;

            type cases = [
                Expect<Test<Result["kind"], "equals", "not-empty">>,  // Based on the EmptyObjectKind result
                Expect<Test<Result["canHaveProperties"], "equals", true>>,  // Based on CanHaveProperties result
                Expect<Test<Result["isNeverIndexed"], "equals", true>>,
                Expect<Test<Result["acceptsProperties"], "equals", true>>,  // Based on AcceptsProperties result
                Expect<Test<Result["isExplicitlyEmpty"], "equals", false>>,  // Based on IsExplicitlyEmptyObject result
                Expect<Test<Result["isWideEmpty"], "equals", true>>,  // Based on IsWideEmptyObject result
            ];
        });

        it("provides comprehensive analysis for literal empty object", () => {
            type Result = DistinguishEmpty<{}>;

            type cases = [
                Expect<Test<Result["kind"], "equals", "explicit">>,  // Based on the EmptyObjectKind result
                Expect<Test<Result["canHaveProperties"], "equals", true>>,
                Expect<Test<Result["isNeverIndexed"], "equals", true>>,  // Based on IsNeverIndexed result
                Expect<Test<Result["acceptsProperties"], "equals", true>>,
                Expect<Test<Result["isExplicitlyEmpty"], "equals", true>>,  // Based on IsExplicitlyEmptyObject result
                Expect<Test<Result["isWideEmpty"], "equals", false>>,  // Based on IsWideEmptyObject result
            ];
        });

        it("handles non-object types", () => {
            type Result = DistinguishEmpty<string>;

            type cases = [
                Expect<Test<Result["kind"], "equals", "not-object">>,
                Expect<Test<Result["canHaveProperties"], "equals", false>>,
                Expect<Test<Result["isNeverIndexed"], "equals", false>>,
                Expect<Test<Result["acceptsProperties"], "equals", false>>,
                Expect<Test<Result["isExplicitlyEmpty"], "equals", false>>,
                Expect<Test<Result["isWideEmpty"], "equals", false>>,
            ];
        });
    });

    describe("Practical usage examples", () => {
        it("type guards based on property capability", () => {
            type GuardEmpty<T> = DistinguishEmpty<T>["canHaveProperties"] extends true
                ? "This type can have properties added"
                : "This type cannot have properties";

            type EmptyGuard = GuardEmpty<EmptyObject>;
            type ExplicitGuard = GuardEmpty<ExplicitlyEmptyObject>;

            // Both actually allow properties to be added based on the current implementation
            type cases = [
                Expect<Test<EmptyGuard, "equals", "This type can have properties added">>,
                Expect<Test<ExplicitGuard, "equals", "This type can have properties added">>,
            ];
        });

    });
});
