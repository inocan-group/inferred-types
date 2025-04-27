import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { AsError, DoesExtend, ErrorCondition, Throw } from "inferred-types/types";

describe("AsError<T>", () => {
    type Err = Throw<"err", "oops", "Utility">;

    it("raw property check on ErrorCondition", () => {
        type cases = [
            Expect<Test<Err["kind"], "equals",  "err">>,
            Expect<Test<Err["msg"], "equals",  "oops">>,
            Expect<Test<Err["stack"], "equals",  ["Utility"]>>,
        ];
        const cases: cases = [
            true, true, true,
        ];
    });

    it("proxy an ErrorCondition", () => {
        type Proxy = AsError<Err>;

        type cases = [
            Expect<Test<Proxy, "equals",  Err>>
        ];
        const cases: cases = [true];
    });

    it("handle JS Error class", () => {
        const err = new Error("oops");
        err.name = "OopsError";

        type Runtime = AsError<typeof err>;

        type cases = [
            Expect<DoesExtend<Runtime, ErrorCondition<"runtime-error">>>
        ];
        const cases: cases = [true];
    });


    it("tuple errors", () => {
        type SimpleErr = AsError<["err", "oops"]>;
        type WithContext = AsError<["err", "oops", { ctx: { foo: 1; bar: 2 } }]>;

        type cases = [
            Expect<Test<SimpleErr, ErrorCondition<"err", "equals",  "oops">>>,
            Expect<DoesExtend<WithContext, ErrorCondition<"err", "oops">>>,
        ];
        const cases: cases = [true, true];

    });



});
