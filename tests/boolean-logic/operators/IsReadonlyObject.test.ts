
import { describe, it } from "vitest";
import type { Expect, IsReadonlyObject, Test } from "inferred-types/types";

describe("IsReadonlyObject<T>", () => {

    it("happy path", () => {
        type T1 = IsReadonlyObject<{ readonly foo: 1 }>;
        type T2 = IsReadonlyObject<{ readonly foo: 1; readonly bar: 2 }>;

        type Mixed = IsReadonlyObject<{ readonly foo: 1; bar: 2 }>;
        type None = IsReadonlyObject<{ foo: 1; bar: 2 }>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<Mixed, "equals",  false>>,
            Expect<Test<None, "equals",  false>>,
        ];
    });

});
