import { } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { createTemplateRegExp } from "inferred-types/runtime";

describe("createTemplateRegExp(template)", () => {

    const testCases = [
        {
            template: `Name: {{string}}; Age: {{number}}`,
            test: "Name: John Doe; Age: 35",
            expected: true
        },
        {
            template: `Status: {{boolean}}; Count: {{number}}`,
            test: "Status: false; Count: 123",
            expected: true
        },
        {
            template: `Status: {{boolean}}; Count: {{number}}`,
            test: "Status: maybe; Count: 123",
            expected: false
        },
        {
            template: `{{string}}-{{number}}-{{boolean}}`,
            test: "abc-123-true",
            expected: true
        },
        {
            template: "Price: ${{number}}.{{number}}",
            test: "Price: $19.99",
            expected: true
        },
        {
            template: `Special chars .*+?^$ {{string}}`,
            test: "Special chars .*+?^$ hello",
            expected: true
        },
    ] as const;

    for (const { template, test, expected } of testCases) {
        const re = createTemplateRegExp(template);

        it(`RegExp >> template(${template}) ${expected ? "has match for" : "does not have match for"}: ${test}`, () => {

            expect(
                re.test(test),
                `Expected the RegExp -- ${String(re)} -- to assert ${expected} when provided the string literal: ${test}\n`
            ).toBe(expected)
        });
    }
});

const a = createTemplateRegExp(`Price: {{number}}.{{number}}`)
console.log(String(a))
