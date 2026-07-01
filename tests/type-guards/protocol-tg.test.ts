import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { hasProtocol } from "inferred-types/runtime";

describe("hasProtocol(val, ...protocols)", () => {
    it("returns true when a string starts with any known protocol (no filter)", () => {
        const url = "https://example.com";

        const result = hasProtocol(url);
        expect(result).toBe(true);
        expect(hasProtocol("ftp://host/file")).toBe(true);
        expect(hasProtocol("ws://socket")).toBe(true);

        if (hasProtocol(url)) {
            type T = typeof url;

            type cases = [
                Expect<Test<T, "extends", string>>
            ];
        }
    });

    it("returns false when a string does not start with a known protocol", () => {
        expect(hasProtocol("example.com")).toBe(false);
        expect(hasProtocol("mailto:bob@x.com")).toBe(false);
    });

    it("narrows to the requested protocol when a filter is supplied", () => {
        const url = "https://example.com" as string;

        expect(hasProtocol(url, "https")).toBe(true);
        expect(hasProtocol("ftp://x", "https")).toBe(false);

        if (hasProtocol(url, "https")) {
            type T = typeof url;

            type cases = [
                Expect<Test<T, "extends", `https${string}`>>
            ];
        }
    });

    it("returns false for non-string values", () => {
        expect(hasProtocol(42)).toBe(false);
        expect(hasProtocol(null)).toBe(false);
        expect(hasProtocol(undefined)).toBe(false);
    });
});
