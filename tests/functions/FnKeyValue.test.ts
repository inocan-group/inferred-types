import { describe, it } from "vitest";
import {
    EmptyObject,
    Expect,
    FnKeyValue,
    Test,
} from "inferred-types/types";

describe("FnKeyValue<T>", () => {

    it("positive test", () => {
        type Fn = (() => "hi") & { foo: 1; bar: 2}
        type KV = FnKeyValue<Fn>;

        type cases = [
            Expect<Test<KV, "equals", { foo: 1, bar: 2 }>>
        ];
    });

    it("no kv", () => {
        type Fn = () => "hi";
        type KV = FnKeyValue<Fn>;

        type cases = [
            Expect<Test<KV, "equals", EmptyObject>>
        ];
    });


});
