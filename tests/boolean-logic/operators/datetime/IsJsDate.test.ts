import { Expect, IsJsDate, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsJsDate<T>", () => {

    it("happy path", () => {
        type JsDate = IsJsDate<Date>;
        type JsDateInstance = IsJsDate<InstanceType<typeof Date>>;

        type cases = [
            Expect<Test<JsDate, "equals", true>>,
            Expect<Test<JsDateInstance, "equals", true>>,
        ];
    });

    it("primitives", () => {
        type Str = IsJsDate<string>;
        type Num = IsJsDate<number>;
        type Bool = IsJsDate<boolean>;

        type cases = [
            Expect<Test<Str, "equals", false>>,
            Expect<Test<Num, "equals", false>>,
            Expect<Test<Bool, "equals", false>>,
        ];
    });

    it("null and undefined", () => {
        type Null = IsJsDate<null>;
        type Undefined = IsJsDate<undefined>;

        type cases = [
            Expect<Test<Null, "equals", false>>,
            Expect<Test<Undefined, "equals", false>>,
        ];
    });

    it("any and unknown", () => {
        type Any = IsJsDate<any>;
        type Unknown = IsJsDate<unknown>;

        type cases = [
            Expect<Test<Any, "equals", boolean>>,
            Expect<Test<Unknown, "equals", boolean>>,
        ];
    });

    it("string literals", () => {
        type DateString = IsJsDate<"2023-01-01">;
        type IsoDateTime = IsJsDate<"2023-01-01T12:00:00.000Z">;
        type DateFormat = IsJsDate<"January 1, 2023">;
        type TimeStamp = IsJsDate<"1672531200000">;

        type cases = [
            Expect<Test<DateString, "equals", false>>,
            Expect<Test<IsoDateTime, "equals", false>>,
            Expect<Test<DateFormat, "equals", false>>,
            Expect<Test<TimeStamp, "equals", false>>,
        ];
    });

    it("numeric literals", () => {
        type Timestamp = IsJsDate<1672531200000>;
        type Year = IsJsDate<2023>;
        type Zero = IsJsDate<0>;
        type NegativeNum = IsJsDate<-1>;

        type cases = [
            Expect<Test<Timestamp, "equals", false>>,
            Expect<Test<Year, "equals", false>>,
            Expect<Test<Zero, "equals", false>>,
            Expect<Test<NegativeNum, "equals", false>>,
        ];
    });

    it("arrays and tuples", () => {
        type EmptyArray = IsJsDate<[]>;
        type StringArray = IsJsDate<string[]>;
        type DateArray = IsJsDate<Date[]>;
        type Tuple = IsJsDate<[Date, string]>;
        type DateTuple = IsJsDate<[Date]>;

        type cases = [
            Expect<Test<EmptyArray, "equals", false>>,
            Expect<Test<StringArray, "equals", false>>,
            Expect<Test<DateArray, "equals", false>>,
            Expect<Test<Tuple, "equals", false>>,
            Expect<Test<DateTuple, "equals", false>>,
        ];
    });

    it("objects", () => {
        type EmptyObject = IsJsDate<{}>;
        type PlainObject = IsJsDate<{ foo: string }>;
        type ObjectWithDate = IsJsDate<{ date: Date }>;
        type RecordType = IsJsDate<{ [key: string]: unknown }>;

        type cases = [
            Expect<Test<EmptyObject, "equals", false>>,
            Expect<Test<PlainObject, "equals", false>>,
            Expect<Test<ObjectWithDate, "equals", false>>,
            Expect<Test<RecordType, "equals", false>>,
        ];
    });

    it("functions", () => {
        type SimpleFunction = IsJsDate<() => void>;
        type FunctionWithParams = IsJsDate<(x: string) => Date>;
        type DateConstructor = IsJsDate<typeof Date>;
        type AsyncFunction = IsJsDate<() => Promise<Date>>;

        type cases = [
            Expect<Test<SimpleFunction, "equals", false>>,
            Expect<Test<FunctionWithParams, "equals", false>>,
            Expect<Test<DateConstructor, "equals", false>>,
            Expect<Test<AsyncFunction, "equals", false>>,
        ];
    });

    it("date-like objects (should be false)", () => {
        // Mock Luxon DateTime-like object
        type LuxonLike = {
            isValid: boolean;
            toISODate: () => string;
            toFormat: (format: string) => string;
            toMillis: () => number;
            year: number;
            month: number;
            day: number;
        };

        // Mock Moment.js-like object
        type MomentLike = {
            format: (format?: string) => string;
            year: () => number;
            month: () => number;
            date: () => number;
            hour: () => number;
            minute: () => number;
            second: () => number;
            millisecond: () => number;
            add: (amount: number, unit: string) => any;
            toISOString: () => string;
        };

        // Date-like plain object
        type DateLikeObject = {
            getFullYear: () => number;
            getMonth: () => number;
            getDate: () => number;
        };

        type cases = [
            Expect<Test<IsJsDate<LuxonLike>, "equals", false>>,
            Expect<Test<IsJsDate<MomentLike>, "equals", false>>,
            Expect<Test<IsJsDate<DateLikeObject>, "equals", false>>,
        ];
    });

    it("union types", () => {
        type DateOrString = IsJsDate<Date | string>;
        type DateOrNumber = IsJsDate<Date | number>;
        type StringOrNumber = IsJsDate<string | number>;
        type DateUnion = IsJsDate<Date | Date>;
        type ComplexUnion = IsJsDate<Date | string | number | boolean>;

        type cases = [
            Expect<Test<DateOrString, "equals", boolean>>,
            Expect<Test<DateOrNumber, "equals", boolean>>,
            Expect<Test<StringOrNumber, "equals", false>>,
            Expect<Test<DateUnion, "equals", true>>,
            Expect<Test<ComplexUnion, "equals", boolean>>,
        ];
    });

    it("intersection types", () => {
        type DateIntersection = IsJsDate<Date & { custom: string }>;
        type ObjectIntersection = IsJsDate<{ foo: string } & { bar: number }>;

        type cases = [
            Expect<Test<DateIntersection, "equals", true>>,
            Expect<Test<ObjectIntersection, "equals", false>>,
        ];
    });

    it("generic and conditional types", () => {
        type Generic<T> = IsJsDate<T>;
        type ConditionalDate<T> = T extends Date ? IsJsDate<T> : false;

        type GenericWithDate = Generic<Date>;
        type GenericWithString = Generic<string>;
        type ConditionalWithDate = ConditionalDate<Date>;
        type ConditionalWithString = ConditionalDate<string>;

        type cases = [
            Expect<Test<GenericWithDate, "equals", true>>,
            Expect<Test<GenericWithString, "equals", false>>,
            Expect<Test<ConditionalWithDate, "equals", true>>,
            Expect<Test<ConditionalWithString, "equals", false>>,
        ];
    });

    it("wide types", () => {
        type Any = IsJsDate<any>;
        type Unknown = IsJsDate<unknown>;
        type Never = IsJsDate<never>;
        type Object = IsJsDate<object>;

        type cases = [
            Expect<Test<Any, "equals", boolean>>,
            Expect<Test<Unknown, "equals", boolean>>,
            Expect<Test<Never, "equals", never>>,
            Expect<Test<Object, "equals", false>>,
        ];
    });

    it("class and constructor types", () => {
        class CustomDate extends Date {
            custom = "value";
        }

        class RegularClass {
            prop = "value";
        }

        type CustomDateInstance = IsJsDate<CustomDate>;
        type CustomDateClass = IsJsDate<typeof CustomDate>;
        type RegularClassInstance = IsJsDate<RegularClass>;
        type RegularClassClass = IsJsDate<typeof RegularClass>;

        type cases = [
            Expect<Test<CustomDateInstance, "equals", true>>,
            Expect<Test<CustomDateClass, "equals", false>>,
            Expect<Test<RegularClassInstance, "equals", false>>,
            Expect<Test<RegularClassClass, "equals", false>>,
        ];
    });

    it("edge cases", () => {
        type VoidType = IsJsDate<void>;
        type EmptyString = IsJsDate<"">;
        type StringLiteral = IsJsDate<"hello">;
        type NumericZero = IsJsDate<0>;
        type BooleanTrue = IsJsDate<true>;
        type BooleanFalse = IsJsDate<false>;

        type cases = [
            Expect<Test<VoidType, "equals", false>>,
            Expect<Test<EmptyString, "equals", false>>,
            Expect<Test<StringLiteral, "equals", false>>,
            Expect<Test<NumericZero, "equals", false>>,
            Expect<Test<BooleanTrue, "equals", false>>,
            Expect<Test<BooleanFalse, "equals", false>>,
        ];
    });

});
