import { describe, it } from "vitest";
import { Expect, MakeKeysOptional, Test } from "inferred-types/types";



describe("MakeKeysOptional<TObj,TKeys>", () => {

    it("convert one key", () => {
        type Obj = { foo: 1; bar: 2 };
        type Opt = MakeKeysOptional<Obj, ["bar"]>;

        type cases = [
            Expect<Test<Opt, "equals", { foo: 1; bar?: 2 | undefined }>>
        ];
    });


    it("convert key which is already optional", () => {
        type Obj = { foo: 1; bar?: 2 };
        type Opt = MakeKeysOptional<Obj, ["bar"]>;

        type cases = [
            Expect<Test<Opt, "equals", { foo: 1; bar?: 2 | undefined }>>
        ];
    });

    it("optional values in origin are preserved", () => {
        type Obj = { foo?: 1; bar: 2 };
        type Opt = MakeKeysOptional<Obj, ["bar"]>;

        type cases = [
            Expect<Test<Opt, "equals", { foo?: 1; bar?: 2 | undefined }>>
        ];
    });


});

