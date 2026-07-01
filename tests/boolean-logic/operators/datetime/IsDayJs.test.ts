import { describe, it } from "vitest";
import type { AnyFunction, Expect, IsDayJs, Test } from "inferred-types/types";

type DayJsLikeShape = {
    add: AnyFunction;
    clone: AnyFunction;
    date: AnyFunction;
    endOf: AnyFunction;
    isAfter: AnyFunction;
    isBefore: AnyFunction;
    daysInMonth: AnyFunction;
    millisecond: AnyFunction;
    calendar: AnyFunction;
};

describe("IsDayJs<T>", () => {

    it("true DayJS-like shapes", () => {
        type FullShape = IsDayJs<DayJsLikeShape>;
        type NarrowMethods = IsDayJs<{
            add: (amount: number, unit: string) => DayJsLikeShape;
            clone: () => DayJsLikeShape;
            date: () => number;
            endOf: (unit: string) => DayJsLikeShape;
            isAfter: (input: unknown) => boolean;
            isBefore: (input: unknown) => boolean;
            daysInMonth: () => number;
            millisecond: () => number;
            calendar: () => string;
        }>;
        type WithExtraProperties = IsDayJs<DayJsLikeShape & {
            format: (template?: string) => string;
            toDate: () => Date;
        }>;

        type cases = [
            Expect<Test<FullShape, "equals", true>>,
            Expect<Test<NarrowMethods, "equals", true>>,
            Expect<Test<WithExtraProperties, "equals", true>>,
        ];
    });

    it("primitives", () => {
        type cases = [
            Expect<Test<IsDayJs<string>, "equals", false>>,
            Expect<Test<IsDayJs<number>, "equals", false>>,
            Expect<Test<IsDayJs<boolean>, "equals", false>>,
            Expect<Test<IsDayJs<symbol>, "equals", false>>,
            Expect<Test<IsDayJs<null>, "equals", false>>,
            Expect<Test<IsDayJs<undefined>, "equals", false>>,
        ];
    });

    it("wide and special types", () => {
        type cases = [
            Expect<Test<IsDayJs<any>, "equals", false>>,
            Expect<Test<IsDayJs<unknown>, "equals", boolean>>,
            Expect<Test<IsDayJs<never>, "equals", false>>,
            Expect<Test<IsDayJs<object>, "equals", false>>,
        ];
    });

    it("union types", () => {
        type cases = [
            Expect<Test<IsDayJs<DayJsLikeShape | string>, "equals", boolean>>,
            Expect<Test<IsDayJs<DayJsLikeShape | Date>, "equals", boolean>>,
            Expect<Test<IsDayJs<string | number>, "equals", false>>,
            Expect<Test<IsDayJs<{ foo: string } | { bar: number }>, "equals", false>>,
        ];
    });

    it("non-DayJS dictionary shapes", () => {
        type MissingMethod = Omit<DayJsLikeShape, "daysInMonth">;
        type WrongMethodType = Omit<DayJsLikeShape, "clone"> & {
            clone: string;
        };
        type JsDateLike = {
            getDate: () => number;
            getMonth: () => number;
            getFullYear: () => number;
        };
        type MomentLike = {
            add: AnyFunction;
            calendar: AnyFunction;
            date: AnyFunction;
            format: AnyFunction;
            fromNow: AnyFunction;
            isValid: AnyFunction;
            subtract: AnyFunction;
            toDate: AnyFunction;
        };

        type cases = [
            Expect<Test<IsDayJs<{}>, "equals", false>>,
            Expect<Test<IsDayJs<{ add: AnyFunction }>, "equals", false>>,
            Expect<Test<IsDayJs<MissingMethod>, "equals", false>>,
            Expect<Test<IsDayJs<WrongMethodType>, "equals", false>>,
            Expect<Test<IsDayJs<JsDateLike>, "equals", false>>,
            Expect<Test<IsDayJs<MomentLike>, "equals", false>>,
            Expect<Test<IsDayJs<Record<string, unknown>>, "equals", false>>,
        ];
    });

});
