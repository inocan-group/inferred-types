import { Expect, KlassMeta, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("KlassMeta<T>", () => {
    class TestClass {
        public foo: number;
        public bar: string;

        constructor(foo: number, bar: string) {
            this.foo = foo;
            this.bar = bar;
        }
    }


    it("Happy Path", () => {
        type Inst = InstanceType<typeof TestClass>;
        type Params = ConstructorParameters<typeof TestClass>;
        type Meta = KlassMeta<typeof TestClass>;

        type cases = [
            Expect<Test<Meta["params"], "equals",  Params>>,
            Expect<Test<Meta["instance"], "equals",  Inst>>,
            Expect<Test<Meta["class_decorators"], "equals",  ClassDecoratorContext<typeof TestClass>>>,
            Expect<Test<
                Meta["field_decorators"],
                "equals",
                ClassFieldDecoratorContext<typeof TestClass>
            >>,
        ];
        const cases: cases = [
            true, true, true, true
        ];
    });

});
