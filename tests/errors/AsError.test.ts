
import { describe, it } from "vitest";
import {
    Expect,
    AsError,
    ErrorCondition,
    Test,
    Throw
} from "inferred-types/types";

describe("AsError<T>", () => {
    type Err = Throw<"err", "oops", "Utility">;

    it("raw property check on ErrorCondition", () => {
        type cases = [
            Expect<Test<Err["kind"], "equals",  "err">>,
            Expect<Test<Err["msg"], "equals",  "oops">>,
            Expect<Test<Err["stack"], "equals",  ["Utility"]>>,
        ];
    });

    it("proxy an ErrorCondition", () => {
        type Proxy = AsError<Err>;

        type cases = [
            Expect<Test<Proxy, "equals",  Err>>
        ];
    });

    it("handle JS Error class", () => {
        const err = new Error("oops");
        err.name = "OopsError";

        type Runtime = AsError<typeof err>;

        type cases = [
            Expect<Test<Runtime, "extends", ErrorCondition<"runtime-error">>>
        ];
    });


    it("tuple errors", () => {
        type SimpleErr = AsError<["err", "oops"]>;
        type WithContext = AsError<["err", "oops", { ctx: { foo: 1; bar: 2 } }]>;

        type cases = [
            Expect<Test<SimpleErr, "equals",  ErrorCondition<"err", "oops">>>,
            Expect<Test<WithContext, "extends", ErrorCondition<"err", "oops">>>,
        ];

    });



});
