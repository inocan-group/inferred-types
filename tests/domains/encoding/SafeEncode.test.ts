import { Equal, Expect } from "@type-challenges/utils";
import { setupSafeStringEncoding } from "inferred-types/runtime";
import { SafeEncode, IsStringLiteral, Extends, SafeString, SafeDecode } from "inferred-types/types";
import { describe, expect, it } from "vitest";

describe("SafeEncode<T,G>", () => {
  type test = `There I was, "in the jungle (or maybe forest)"`;

  it("with just quotes", () => {
    type E = SafeEncode<test, ["quotes"]>;
    type D = SafeDecode<E, ["quotes"]>;

    type cases = [
      Expect<Equal<E, "There I was, ^<dq>in the jungle (or maybe forest)^<dq>">>,
      Expect<Equal<D, test>>
    ];
  });

  it("with just brackets", () => {
    type E = SafeEncode<test, ["brackets"]>;
    type D = SafeDecode<E, ["brackets"]>;

    type cases = [
      Expect<Equal<E, "There I was, \"in the jungle ^<op>or maybe forest^<cp>\"">>,
      Expect<Equal<D, test>>
    ];
  });

  it("with just whitespace", () => {
    type E = SafeEncode<test, ["whitespace"]>;
    type D = SafeDecode<E, ["whitespace"]>;

    type cases = [
      Expect<Equal<E, "There^<sp>I^<sp>was,^<sp>\"in^<sp>the^<sp>jungle^<sp>(or^<sp>maybe^<sp>forest)\"">>,
      Expect<Equal<D, test>>
    ];
  });

  it("with all tokens (implicit)", () => {
    type E = SafeEncode<test>;
    type D = SafeDecode<E>;

    type cases = [
      Expect<Equal<
        E,
        "There^<sp>I^<sp>was,^<sp>^<dq>in^<sp>the^<sp>jungle^<sp>^<op>or^<sp>maybe^<sp>forest^<cp>^<dq>"
      >>,
      Expect<Equal<D, test>>
    ];
  });

  it("with all tokens (explicit)", () => {
    type E = SafeEncode<test, ["quotes","brackets","whitespace"]>;
    type D = SafeDecode<E>;

    type cases = [
      Expect<Equal<
        E,
          "There^<sp>I^<sp>was,^<sp>^<dq>in^<sp>the^<sp>jungle^<sp>^<op>or^<sp>maybe^<sp>forest^<cp>^<dq>">
        >,
      Expect<Equal<D, test>>
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
    const [encode, decode] = setupSafeStringEncoding("brackets","quotes","whitespace");
    const safe = encode(text);
    const back = decode(safe);

    expect(safe).toBe(
      "^<dq>Hi^<sp>there^<dq>^<sp>said^<sp>the^<sp>man^<sp>in^<sp>the^<sp>green^<sp>^<op>or^<sp>red^<cp>^<sp>hat."
    )
    expect(back).toBe(text);
  });

});
