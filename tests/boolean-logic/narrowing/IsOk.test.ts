import { describe, it } from "vitest";
import type { Expect, IsOk, Test } from "inferred-types/types";

describe("IsOk<T>", () => {

    it("happy path - removes errors from unions", () => {
        type StringOrError = string | Error;
        type NumberOrError = number | Error;
        type MultipleErrors = string | Error | TypeError | RangeError;
        type MixedUnion = string | number | Error | TypeError | boolean;

        type cases = [
            // Basic union with Error
            Expect<Test<IsOk<StringOrError>, "equals", string>>,
            Expect<Test<IsOk<NumberOrError>, "equals", number>>,

            // Multiple error types in union
            Expect<Test<IsOk<MultipleErrors>, "equals", string>>,

            // Mixed union with multiple non-error and error types
            Expect<Test<IsOk<MixedUnion>, "equals", string | number | boolean>>,
        ];
    });

    it("single error types return never", () => {
        type JustError = Error;
        type JustTypeError = TypeError;
        type JustRangeError = RangeError;

        type cases = [
            Expect<Test<IsOk<JustError>, "equals", never>>,
            Expect<Test<IsOk<JustTypeError>, "equals", never>>,
            Expect<Test<IsOk<JustRangeError>, "equals", never>>,
        ];
    });

    it("non-error types pass through unchanged", () => {
        type JustString = string;
        type JustNumber = number;
        type JustBoolean = boolean;
        type ObjectType = { foo: string; bar: number };
        type ArrayType = string[];
        type FunctionType = (x: number) => string;

        type cases = [
            // Primitive types
            Expect<Test<IsOk<JustString>, "equals", string>>,
            Expect<Test<IsOk<JustNumber>, "equals", number>>,
            Expect<Test<IsOk<JustBoolean>, "equals", boolean>>,

            // Complex types
            Expect<Test<IsOk<ObjectType>, "equals", { foo: string; bar: number }>>,
            Expect<Test<IsOk<ArrayType>, "equals", string[]>>,
            Expect<Test<IsOk<FunctionType>, "equals", (x: number) => string>>,
        ];
    });

    it("handles custom error classes", () => {
        class CustomError extends Error {
            constructor(message: string) {
                super(message);
                this.name = "CustomError";
            }
        }

        class AnotherCustomError extends Error {
            constructor(public code: number, message: string) {
                super(message);
                this.name = "AnotherCustomError";
            }
        }

        type WithCustomError = string | CustomError;
        type MultipleCustom = number | CustomError | AnotherCustomError;
        type MixedCustom = string | Error | CustomError | boolean;

        type cases = [
            // Custom errors are filtered out
            Expect<Test<IsOk<WithCustomError>, "equals", string>>,
            Expect<Test<IsOk<MultipleCustom>, "equals", number>>,
            Expect<Test<IsOk<MixedCustom>, "equals", string | boolean>>,

            // Single custom error returns never
            Expect<Test<IsOk<CustomError>, "equals", never>>,
            Expect<Test<IsOk<AnotherCustomError>, "equals", never>>,
        ];
    });

    it("handles null and undefined in unions", () => {
        type WithNull = string | Error | null;
        type WithUndefined = number | TypeError | undefined;
        type WithBoth = boolean | Error | null | undefined;
        type OnlyNullables = IsOk<null | undefined | Error>;

        type cases = [
            Expect<Test<IsOk<WithNull>, "equals", string | null>>,
            Expect<Test<IsOk<WithUndefined>, "equals", number | undefined>>,
            Expect<Test<IsOk<WithBoth>, "equals", boolean | null | undefined>>,

            Expect<Test<OnlyNullables, "equals", null | undefined>>,
        ];
    });

    it("handles never and unknown", () => {
        type WithNever = string | Error | never;
        type JustNever = never;
        type WithUnknown = unknown | Error;
        type UnknownOnly = unknown;

        type cases = [
            // Never is absorbed in unions
            Expect<Test<IsOk<WithNever>, "equals", string>>,
            Expect<Test<IsOk<JustNever>, "equals", never>>,

            // Unknown behavior
            Expect<Test<IsOk<WithUnknown>, "equals", unknown>>,
            Expect<Test<IsOk<UnknownOnly>, "equals", unknown>>,
        ];
    });

    it("handles any type", () => {
        // Note: Cannot test 'any' type directly as Test utility rejects it
        // IsOk<any> would return any (since any doesn't extend Error)
        // IsOk<string | Error | any> would return any (since any dominates unions)

        // Instead, let's test that IsOk preserves specific types when not errors
        type NotAnError = { value: string };
        type UnionWithObject = NotAnError | Error;

        type cases = [
            // Object types that don't extend Error pass through
            Expect<Test<IsOk<NotAnError>, "equals", { value: string }>>,
            Expect<Test<IsOk<UnionWithObject>, "equals", { value: string }>>,
        ];
    });

    it("handles complex nested structures", () => {
        type Result<T> = T | Error;
        type NestedResult = Result<Result<string>>;
        type ArrayOfResults = Result<string>[];
        type ObjectWithErrors = {
            data: string | Error;
            status: number | TypeError;
            nested: {
                value: boolean | RangeError;
            };
        };

        type cases = [
            // Nested results - the union gets flattened to string | Error | Error
            // which simplifies to string | Error, then IsOk removes Error
            Expect<Test<IsOk<NestedResult>, "equals", string>>,

            // Array of results - IsOk only works on the outer type
            Expect<Test<IsOk<ArrayOfResults>, "equals", (string | Error)[]>>,

            // Object with error unions - IsOk doesn't traverse object properties
            Expect<Test<IsOk<ObjectWithErrors>, "equals", {
                data: string | Error;
                status: number | TypeError;
                nested: {
                    value: boolean | RangeError;
                };
            }>>,
        ];
    });

    it("edge cases with empty unions and literals", () => {
        type LiteralUnion = "success" | "pending" | Error;
        type NumericLiteralUnion = 1 | 2 | 3 | TypeError;
        type BooleanLiteralUnion = true | false | Error;

        type cases = [
            // Literal unions
            Expect<Test<IsOk<LiteralUnion>, "equals", "success" | "pending">>,
            Expect<Test<IsOk<NumericLiteralUnion>, "equals", 1 | 2 | 3>>,
            Expect<Test<IsOk<BooleanLiteralUnion>, "equals", true | false>>,
        ];
    });

});
