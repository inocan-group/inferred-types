import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import {
    hasUrlPort,
    hasUrlQueryParameter,
    isDomainName,
    isUrlPath,
    isUrlSource,
} from "inferred-types/runtime";

describe("hasUrlPort(val)", () => {
    it("returns true when an explicit port is present after the source", () => {
        const url = "https://example.com:8080/path";

        const result = hasUrlPort(url);
        expect(result).toBe(true);

        if (hasUrlPort(url)) {
            type T = typeof url;

            type cases = [
                Expect<Test<T, "extends", string>>
            ];
        }
    });

    it("returns false when no explicit port is present", () => {
        expect(hasUrlPort("https://example.com/path")).toBe(false);
        expect(hasUrlPort("https://example.com")).toBe(false);
    });

    it("returns false for non-string values", () => {
        expect(hasUrlPort(42)).toBe(false);
        expect(hasUrlPort(null)).toBe(false);
        expect(hasUrlPort(undefined)).toBe(false);
    });
});

describe("hasUrlQueryParameter(val, prop)", () => {
    it("returns true when the query parameter is present", () => {
        const result = hasUrlQueryParameter("https://x.com/p?foo=1&bar=2", "foo");
        expect(result).toBe(true);
        expect(hasUrlQueryParameter("https://x.com/p?foo=1&bar=2", "bar")).toBe(true);

        type cases = [
            Expect<Test<typeof result, "equals", boolean>>
        ];
    });

    it("returns false when the query parameter is absent", () => {
        expect(hasUrlQueryParameter("https://x.com/p?foo=1", "baz")).toBe(false);
        expect(hasUrlQueryParameter("https://x.com/p", "foo")).toBe(false);
    });
});

describe("isDomainName(val)", () => {
    it("returns true for a valid domain name", () => {
        const domain = "example.com";

        const result = isDomainName(domain);
        expect(result).toBe(true);
        expect(isDomainName("www.builder.co.uk")).toBe(true);

        if (isDomainName(domain)) {
            type T = typeof domain;

            type cases = [
                Expect<Test<T, "extends", string>>
            ];
        }
    });

    it("returns false for single-segment names and invalid input", () => {
        expect(isDomainName("localhost")).toBe(false);
        // last segment must be more than a single character
        expect(isDomainName("a.b")).toBe(false);
    });

    it("returns false for non-string values", () => {
        expect(isDomainName(42)).toBe(false);
        expect(isDomainName(null)).toBe(false);
        expect(isDomainName(undefined)).toBe(false);
    });
});

describe("isUrlPath(val)", () => {
    it("returns true for an empty string (a valid UrlPath)", () => {
        expect(isUrlPath("")).toBe(true);
    });

    it("returns true for a real absolute path", () => {
        const path = "/foo/bar";

        // `UrlPathChars` includes "/" so an absolute path IS a valid UrlPath
        const result = isUrlPath(path);
        expect(result).toBe(true);

        if (isUrlPath(path)) {
            type T = typeof path;

            type cases = [
                Expect<Test<T, "extends", string>>
            ];
        }
    });

    it("returns false when the value does not start with a slash", () => {
        expect(isUrlPath("foo")).toBe(false);
        expect(isUrlPath("foo/bar")).toBe(false);
    });

    it("returns false for non-string values", () => {
        expect(isUrlPath(42)).toBe(false);
        expect(isUrlPath(null)).toBe(false);
    });
});

describe("isUrlSource(val)", () => {
    it("returns true for a domain name", () => {
        const result = isUrlSource("example.com");
        expect(result).toBe(true);

        type cases = [
            Expect<Test<typeof result, "equals", boolean>>
        ];
    });

    it("returns true for an IP address", () => {
        expect(isUrlSource("127.0.0.1")).toBe(true);
    });

    it("returns false for a single-segment host or non-source strings", () => {
        expect(isUrlSource("localhost")).toBe(false);
        expect(isUrlSource("not a source")).toBe(false);
    });

    it("returns false for non-string values", () => {
        expect(isUrlSource(42)).toBe(false);
        expect(isUrlSource(null)).toBe(false);
    });
});
