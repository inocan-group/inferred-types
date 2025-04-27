import { setupSafeStringEncoding } from "inferred-types/runtime";
import {
    Expect,
    SafeEncode,
    SafeDecode,
    SafeEncodeEscaped,
    Test
} from "inferred-types/types";
import { describe, expect, it } from "vitest";

type test = `There I was, "in the jungle (or maybe forest)"`;
describe("SafeEncode<T,G>", () => {

    it("with just quotes", () => {
        type E = SafeEncode<test, ["quotes"]>;
        type D = SafeDecode<E, ["quotes"]>;

        type cases = [
            Expect<Test<
                E, "equals",
                "There I was, ^<dq>in the jungle (or maybe forest)^<dq>"
            >>,
            Expect<Test<D, "equals",  test>>
        ];
    });

    it("with just brackets", () => {
        type E = SafeEncode<test, ["brackets"]>;
        type D = SafeDecode<E, ["brackets"]>;

        type cases = [
            Expect<Test<
                E, "equals",
                "There I was, \"in the jungle ^<op>or maybe forest^<cp>\""
            >>,
            Expect<Test<D, "equals",  test>>
        ];
    });

    it("with just whitespace", () => {
        type E = SafeEncode<test, ["whitespace"]>;
        type D = SafeDecode<E, ["whitespace"]>;

        type cases = [
            Expect<
                Test<E, "equals",
                "There^<sp>I^<sp>was, ^<sp>\"in^<sp>the^<sp>jungle^<sp>(or^<sp>maybe^<sp>forest)\""
            >>,
            Expect<Test<D, "equals",  test>>
        ];
    });

    it("with all tokens (implicit)", () => {
        type E = SafeEncode<test>;
        type D = SafeDecode<E>;

        type cases = [
            Expect<Test<
                E,
                "equals",
                "There^<sp>I^<sp>was,^<sp>^<dq>in^<sp>the^<sp>jungle^<sp>^<op>or^<sp>maybe^<sp>forest^<cp>^<dq>"
            >>,
            Expect<Test<D, "equals",  test>>
        ];
    });

    it("with all tokens (explicit)", () => {
        type E = SafeEncode<test, ["quotes", "brackets", "whitespace"]>;
        type D = SafeDecode<E>;

        type cases = [
            Expect<Test<
                E,
                "equals",
                "There^<sp>I^<sp>was,^<sp>^<dq>in^<sp>the^<sp>jungle^<sp>^<op>or^<sp>maybe^<sp>forest^<cp>^<dq>">
            >,
            Expect<Test<D, "equals",  test>>
        ];
    });

});

describe("SafeString encoding/decoding", () => {

    const text = `"Hi there" said the man in the green (or red) hat.`;

    it("quotes only", () => {
        const [encode, decode] = setupSafeStringEncoding("quotes");
        const safe = encode(text);
        const back = decode(safe);

        expect(safe).toBe("^<dq>Hi there^<dq> said the man in the green (or red) hat.")
        expect(back).toBe(text);
    });

    it("brackets only", () => {
        const [encode, decode] = setupSafeStringEncoding("brackets");
        const safe = encode(text);
        const back = decode(safe);

        expect(safe).toBe(`"Hi there" said the man in the green ^<op>or red^<cp> hat.`)
        expect(back).toBe(text);
    });

    it("whitespace only", () => {
        const [encode, decode] = setupSafeStringEncoding("whitespace");
        const safe = encode(text);
        const back = decode(safe);

        expect(safe).toBe(`\"Hi^<sp>there\"^<sp>said^<sp>the^<sp>man^<sp>in^<sp>the^<sp>green^<sp>(or^<sp>red)^<sp>hat.`)
        expect(back).toBe(text);
    });

    it("all groups (implicit)", () => {
        const [encode, decode] = setupSafeStringEncoding();
        const safe = encode(text);
        const back = decode(safe);

        expect(safe).toBe(
            "^<dq>Hi^<sp>there^<dq>^<sp>said^<sp>the^<sp>man^<sp>in^<sp>the^<sp>green^<sp>^<op>or^<sp>red^<cp>^<sp>hat."
        )
        expect(back).toBe(text);
    });

    it("all groups (explicit)", () => {
        const [encode, decode] = setupSafeStringEncoding("brackets", "quotes", "whitespace");
        const safe = encode(text);
        const back = decode(safe);

        expect(safe).toBe(
            "^<dq>Hi^<sp>there^<dq>^<sp>said^<sp>the^<sp>man^<sp>in^<sp>the^<sp>green^<sp>^<op>or^<sp>red^<cp>^<sp>hat."
        )
        expect(back).toBe(text);
    });

});

// only encode characters explicitly designed with `\` literal marker
// as prior character.
describe("Safe Encoding of Escaped Characters", () => {


    it("quotes", () => {
        type implicit = `There I was, "in the jungle (or maybe forest)"`;
        type explicit = "There I was, \"in the jungle (or maybe forest)\"";
        type sq = 'There I was, \"in the jungle (or maybe forest)\"';


        type S1 = SafeEncodeEscaped<implicit, ["quotes"]>;
        type S2 = SafeEncodeEscaped<explicit, ["quotes"]>;
        type S3 = SafeEncodeEscaped<sq, ["quotes"]>;

        type cases = [
            Expect<Test<
                S1, "equals",
                "There I was, \"in the jungle (or maybe forest)\""
            >>,
            Expect<Test<
                S2,
                "equals",
                "There I was, ^<dq>in the jungle (or maybe forest)^<dq>"
            >>,
            Expect<Test<
                S3,
                "equals",
                "There I was, ^<dq>in the jungle (or maybe forest)^<dq>"
            >>,
        ];
    });
    it("parenthesis", () => {
        type implicit = `There were (1) people whom \\(had\\) seen it`;


        type S1 = SafeEncodeEscaped<implicit, ["brackets"]>;

        type cases = [
            Expect<Test<
                S1, "equals",
                "There were (1) people whom ^<op>had^<cp> seen it"
            >>
        ];

    });

});

