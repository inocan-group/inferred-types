import { describe, it } from "vitest";
import { Expect, MakeKeysOptional, Test } from "inferred-types/types";



describe("MakeKeysOptional<TObj,TKeys>", () => {

    describe("dictionary", () => {
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
        })
    });

    describe("array", () => {


        it("partial", () => {
            type T1 = MakeKeysOptional<[1,2,3],1>;
            type T2 = MakeKeysOptional<[1,2,3],2>;

            type cases = [
                Expect<Test<T1, "equals", [1,2,3?]>>,
                Expect<Test<T2, "equals", [1,2?,3?]>>,
            ];
        });

        it("ignores initial state", () => {
            type T1 = MakeKeysOptional<[1?,2?,3?],1>;
            type T2 = MakeKeysOptional<[1?,2?,3?],2>;

            type cases = [
                Expect<Test<T1, "equals", [1,2,3?]>>,
                Expect<Test<T2, "equals", [1,2?,3?]>>,
            ];
        });

        it("all", () => {
            type T1 = MakeKeysOptional<[1,2,3],3>;
            type T2 = MakeKeysOptional<[1?,2?,3?],3>;

            type cases = [
                Expect<Test<T1, "equals", [1?,2?,3?]>>,
                Expect<Test<T2, "equals", [1?,2?,3?]>>,
            ];
        });


        it("too many", () => {
            type T1 = MakeKeysOptional<[1,2,3],8>;
            type T2 = MakeKeysOptional<[1?,2?,3?],8>;

            type cases = [
                Expect<Test<T1, "equals", [1?,2?,3?]>>,
                Expect<Test<T2, "equals", [1?,2?,3?]>>,
            ];
        });

    })

});

