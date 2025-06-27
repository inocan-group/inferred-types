import { Expect, EmptyObject, RemoveUndefined, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("RemoveUndefined<T>", () => {

    it("tuple tests", () => {
        type Identity = RemoveUndefined<[1, 2, 3]>;
        type OneGone = RemoveUndefined<[1, undefined, 2, 3]>;
        type AllGone = RemoveUndefined<[undefined, undefined]>;
        type Leading = RemoveUndefined<[undefined, 1, 2, 3]>;
        type Tailing = RemoveUndefined<[1, 2, 3, undefined]>;

        type cases = [
            Expect<Test<Identity,"equals", [1, 2, 3]>>,
            Expect<Test<OneGone, "equals", [1, 2, 3]>>,
            Expect<Test<AllGone, "equals", []>>,
            Expect<Test<Leading, "equals", [1, 2, 3]>>,
            Expect<Test<Tailing, "equals", [1, 2, 3]>>,
        ];
    });

    it("object tests", () => {
        type Identity = RemoveUndefined<{ foo: 1 }>;
        type NoBar = RemoveUndefined<{ foo: 1; bar: undefined }>;
        type NothingLeft = RemoveUndefined<{ foo: undefined; bar: undefined }>;
        type NothingToBegin = RemoveUndefined<EmptyObject>;

        type cases = [
            Expect<Test<Identity, "equals",  { foo: 1 }>>,
            Expect<Test<NoBar, "equals",  { foo: 1 }>>,
            Expect<Test<NothingLeft, "equals",  EmptyObject>>,
            Expect<Test<NothingToBegin, "equals",  EmptyObject>>,
        ];
    });
});
