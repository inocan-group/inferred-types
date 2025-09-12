import { Equal, Expect, ExpectFalse } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { createTemplateRegExp } from "inferred-types/runtime";
import type { Extends, RegexExecFn, RegexTestFn, RegularExpression, Test } from "inferred-types/types";

describe("createTemplateRegExp", () => {

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

    const subsetCases = [
        {
            name: `An exact match still matches`,
            template: `Number({{number}})`,
            test: "Number(5)",
            expected: true
        },
        {
            name: "Leading whitespace",
            template: `Number({{number}})`,
            test: "     Number(5)",
            expected: true
        },
        {
            name: "Leading and trailing whitespace",
            template: `Number({{number}})`,
            test: "     Number(5)      ",
            expected: true
        },

        {
            name: "Leading and trailing special characters",
            template: `Number({{number}})`,
            test: ".*+?^$  Number(5)   .*+?^$",
            expected: true
        },

        {
            name: "Unexpected space in described template",
            template: `Number({{number}})`,
            test: ".*+?^$  Number( 5)   .*+?^$",
            expected: false
        },
        {
            name: "Multiple dynamic segment types",
            template: `Name: {{string}}, Age: {{number}}`,
            test: `   Name: Bob Marley, Age: 55   `,
            expected: true
        }
    ]

    for (const { name, template, test, expected } of subsetCases) {
        const re = createTemplateRegExp(template, "subset");

        it(`RegExp[subset] >> ${name} >> ${expected ? "expected to match" : "expected NOT to match"}`, () => {

            expect(
                re.test(test),
                `Test "${name}" failed!\nThe regex which was used was: ${String(re)}`
            ).toBe(expected)
        });
    }

    it("type test for exact match's pattern property", () => {
        const re = createTemplateRegExp(`Age: {{number}}`);

        type cases = [
            Expect<Test<typeof re, "equals",  RegularExpression<`^Age: (\\d+)$`>>>
        ]
    })

    it("type test for subset match's pattern property", () => {
        const re = createTemplateRegExp(`Age: {{number}}`, "subset");

        type cases = [
            Expect<Test<typeof re, "equals",  RegularExpression<`.*(Age: (\\d+)).*`>>>
        ]
    })

    it("type testing of test() function when exact match", () => {
        const re = createTemplateRegExp(`Name: {{string}}`, "exact");

        const s1 = re.test("Name: Bob");
        const s2 = re.test("Name: Bob Marley ");
        const s3 = re.test("Name: Bob Marley " as string);

        const n = createTemplateRegExp(`Age: {{number}}`);

        const nt = n.test("Age: 42");
        const nf = n.test("Age: 42!");

        expect(s1).toBe(true);
        expect(s2).toBe(true);
        expect(s3).toBe(true);

        expect(nt).toBe(true);
        expect(nf).toBe(false);

        type cases = [
            Expect<Test<typeof s1, "equals",  true>>,
            Expect<Test<typeof s2, "equals",  true>>,
            Expect<Test<typeof s3, "equals",  boolean>>,

            Expect<Test<typeof nt, "equals",  true>>,
            Expect<Test<typeof nf, "equals",  false>>,
        ];
    });

    it("type testing of test() function when subset match", () => {
        const re = createTemplateRegExp(`Name: {{string}}`, "subset");

        const s1 = re.test("Name: Bob");
        const s2 = re.test("Name: Bob Marley ");
        const s3 = re.test("Name: Bob Marley " as string);
        const s4 = re.test("  Name: Bob    ");

        expect(s1).toBe(true);
        expect(s2).toBe(true);
        expect(s3).toBe(true); // boolean type when input string is wide
        expect(s4).toBe(true);

        const n = createTemplateRegExp(`Age: {{number}}`, "subset");

        const nt1 = n.test("Age: 42");
        const nt2 = n.test("Age: 42!");
        const nt3 = n.test("Age: 42" as `Age: ${number}`);
        const nf = n.test("Aged: 42!");

        expect(nt1).toBe(true);
        expect(nt2).toBe(true);
        expect(nt3).toBe(true);
        expect(nf).toBe(false);

        type cases = [
            Expect<Test<typeof s1, "equals",  true>>,
            Expect<Test<typeof s2, "equals",  true>>,
            // boolean type when input string is wide
            Expect<Test<typeof s3, "equals",  boolean>>,
            Expect<Test<typeof s4, "equals",  true>>,

            Expect<Test<typeof nt1, "equals",  true>>,
            Expect<Test<typeof nt2, "equals",  true>>,
            Expect<Test<typeof nt3, "equals",  true>>,
            Expect<Test<typeof nf, "equals",  false>>,
        ];
    });

    it("runtime API has exec() and test() functions", () => {
        const re = createTemplateRegExp(`Name: {{string}}, Age: {{number}}`, "exact");
        const execFunction = re.exec;
        const testFunction = re.test;

        expect(typeof execFunction).toBe("function");
        expect(typeof testFunction).toBe("function");

        type cases = [
            Expect<Test<
                typeof execFunction, "equals",
                RegexExecFn<"^Name: (.+?), Age: (\\d+)$">
            >>,
            Expect<Test<
                typeof testFunction, "equals",
                <T extends string>(test: T) => RegexTestFn<T, "^Name: (.+?), Age: (\\d+)$">
            >>,
        ];
    });

    it("exec() function with exact match", () => {
        const re = createTemplateRegExp(`Name: {{string}}, Age: {{number}}`, "exact");

        const t1 = re.exec(`Name: Bob, Age: 55`);
        const a1 = Array.from(t1);

        type Len = typeof t1["length"];
        type Full = typeof t1[0];
        type One = typeof t1[1];
        type Two = typeof t1[2];

        expect(a1).toEqual([`Name: Bob, Age: 55`, `Bob`, 55]);

        type cases = [
            Expect<Test<typeof t1, "extends", RegExpExecArray>>,
            Expect<Test<Len, "equals",  3>>,
            Expect<Test<
                Full,
                "equals",
                "Name: Bob, Age: 55"
            >>,
            Expect<Test<One, "equals",  "Bob">>,
            Expect<Test<Two, "equals",  55>>
        ];
    });

    it("exec() function with subset match", () => {
        const re = createTemplateRegExp(`Name: {{string}}, Age: {{number}}`, "subset");

        const t1 = re.exec(`- Name: Bob, Age: 55`);
        const a1 = Array.from(t1);

        type Len = typeof t1["length"];
        type Full = typeof t1[0];
        type One = typeof t1[1];
        type Two = typeof t1[2];
        type Three = typeof t1[3];

        expect(a1).toEqual([
            `- Name: Bob, Age: 55`,
            `Name: Bob, Age: 55`,
            `Bob`,
            55
        ]);

        type cases = [
            Expect<Extends<typeof t1, RegExpExecArray>>,
            Expect<Test<Len, "equals",  4>>,
            Expect<Test<
                Full,
                "equals",
                "- Name: Bob, Age: 55">>,
            Expect<Test<
                One,
                "equals",
                `Name: ${string}, Age: ${number}`
            >>,
            Expect<Test<Two, "equals",  "Bob">>,
            Expect<Test<Three, "equals",  55>>,
        ];
    });

});
