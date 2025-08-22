import { describe, it } from "vitest";
import {
    Expect,
    GetTemplateParams,
    TemplateParams,
    Test,
} from "inferred-types/types";

describe("TemplateParams<T>", () => {

    it("happy path", () => {
        type T1 = TemplateParams<"Hi {{string}}, you're age is {{number}}">;
        type T2 = TemplateParams<"Age: {{number}}, Name: {{string}}, Accepted: {{boolean}}">;

        type cases = [
            Expect<Test<T1, "equals", [ string, number ]>>,
            Expect<Test<T2, "equals", [ number, string, boolean ]>>,
        ];
    });

});

describe("GetTemplateParams<T>", () => {

    it("happy path", () => {
        type T1 = GetTemplateParams<"Hi {{string}}, you're age is {{number}}">;
        type T2 = GetTemplateParams<"Age: {{number}}, Name: {{string}}, Accepted: {{boolean}}">;

        type cases = [
            Expect<Test<T1, "equals", [ string, number ]>>,
            Expect<Test<T2, "equals", [ number, string, boolean ]>>,
        ];
    });


    it("adding custom segments", () => {
        type T1 = GetTemplateParams<
            "Hi {{string}}, you're email is {{email}}",
            { string: "string", email: `"{{string}}@{{string}}.{{string}}"`}
        >;

        type cases = [
            Expect<Test<T1, "equals", [ string, `${string}@${string}.${string}` ]>>
        ];
    });


});
