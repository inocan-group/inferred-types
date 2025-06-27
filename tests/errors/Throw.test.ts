import { describe, it } from "vitest";
import {
    Expect,
    ErrorCondition,
    Extends,
    IsErrorCondition,
    MapError,
    ProxyError,
    Test,
    Throw
} from "inferred-types/types";

describe("Throw<TKind,TMessage,TUtility,TRest>", () => {

    it("happy path", () => {
        type Simple = Throw<"my-error">;

        type cases = [
            Expect<Test<Simple, "equals",  { __kind: "ErrorCondition"; kind: "my-error" }>>,
            Expect<Test<Simple, "extends", ErrorCondition>>,
            Expect<Test<Simple, "extends", ErrorCondition<"my-error">>>,
            Expect<Test<IsErrorCondition<Simple>, "equals", true>>,
            Expect<Test<IsErrorCondition<Simple, "my-error">, "equals", true>>,
        ];
    });


    it("Use of Utility and underlying error", () => {
        type Origin = Throw<"origin", "The original error", "Origin<T>">;
        type Bubbles = Throw<"bubbles", "Uh oh!", "Bubbles<T>", { underlying: Origin }>;
        type Flat = Throw<"flat", never, never, { underlying: Origin }>;

        type cases = [
            Expect<Test<Origin["utility"], "equals",  "Origin<T>">>,
            Expect<Test<Bubbles["utility"], "equals",  "Bubbles<T>">>,

            Expect<Test<Origin["stack"], "equals",  ["Origin<T>"]>>,
            Expect<Test<Bubbles["stack"], "equals",  ["Bubbles<T>", "Origin<T>"]>>,
            Expect<Test<Flat["stack"], "equals",  ["unspecified", "Origin<T>"]>>,
        ];
    });


    it("Using ProxyError to establish underlying error", () => {
        type Origin = Throw<"origin", "The original error", "Origin<T>">;
        type Bubbles = ProxyError<Origin, "Bubbles<T>", "T">;

        type cases = [
            Expect<Test<Bubbles["stack"], "equals",  ["Bubbles<T>", "Origin<T>"]>>,
            Expect<Test<Bubbles["kind"], "equals",  "origin">>
        ];
    });


    it("Using MapError to establish underlying error", () => {
        type Origin = Throw<"origin", "The original error", "Origin<T>">;
        type Bubbles = MapError<Origin, "oh-shit", "Bubbles<T>", "T">;

        type cases = [
            Expect<Test<Bubbles["stack"], "equals", ["Bubbles<T>", "Origin<T>"]>>,
            Expect<Test<Bubbles["kind"], "equals", "oh-shit">>
        ];
    });



});
