import { describe, expect, it } from "vitest";
import { hasProtocolPrefix, isProtocol, isProtocolPrefix } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";


describe("isProtocol()", () => {

  it("happy path", () => {
    const t1 = isProtocol("http");
    const t2 = isProtocol("https");

    const f1 = isProtocol("httpie");
    const f2 = isProtocol("http", "https");

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(f1).toBe(false);
    expect(f2).toBe(false);

    const proto = "http" as string;

    if(isProtocol(proto, "http", "https")) {
      type P = typeof proto;

      expect(proto).toBe("http");

      // @ts-ignore
      type cases = [
        Expect<Test<P, "equals",  "http" | "https">>
      ];
    }
  });

});

describe("isProtocolPrefix()", () => {

  it("happy path", () => {
    const t1 = isProtocolPrefix("http://");
    const t2 = isProtocolPrefix("https://");

    const f1 = isProtocolPrefix("httpie://");

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(f1).toBe(false);

    const proto = "https://" as string;

    if(isProtocolPrefix(proto, "https", "http")) {
      type P = typeof proto;

      expect(proto).toBe("https://");

      // @ts-ignore
      type cases = [
        Expect<Test<P, "equals",  "https://" | "http://" >>
      ];
    }
  });

});
describe("hasProtocolPrefix()", () => {

  it("happy path", () => {
    const t1 = hasProtocolPrefix("http://facebook.com");
    const t2 = hasProtocolPrefix("https://facebook.com");

    const f1 = hasProtocolPrefix("httpie://facebook.com");

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(f1).toBe(false);

    const proto = "http://facebook.com" as string;

    if(hasProtocolPrefix(proto, "http", "https")) {
      type P = typeof proto;

      expect(proto).toBe("http://facebook.com");

      // @ts-ignore
      type cases = [
        Expect<Test<P, "equals",  `http://${string}` | `https://${string}`>>
      ];
    }
  });

});
