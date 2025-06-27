import { Expect, Test, UpsertKeyValue } from "inferred-types/types";
import { describe, it } from "vitest";



describe("UpsertKeyValue<TObj,K,V>", () => {

    it("happy path", () => {
        type Obj = { foo: 1; bar: 2 };

        type Add = UpsertKeyValue<Obj, "baz", 42>;
        type Override = UpsertKeyValue<Obj, "foo", 42>;

        type cases = [
            Expect<Test<Add, "equals",  { foo: 1; bar: 2; baz: 42 }>>,
            Expect<Test<Override, "extends", { foo: 42; bar: 2 }>>
        ];
    });

});
