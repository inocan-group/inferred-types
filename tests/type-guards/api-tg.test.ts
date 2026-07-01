import { describe, expect, it } from "vitest";
import type { Dictionary, Expect, OptionalParamFn, Test, TypedFunction } from "inferred-types/types";
import {
    isApi,
    isApiSurface,
    isEscapeFunction,
    isOptionalParamFunction,
} from "inferred-types/runtime";

describe("isEscapeFunction(val)", () => {
    it("returns true for a function tagged with escape === true", () => {
        const fn = Object.assign(() => "escaped", { escape: true as const });

        const result = isEscapeFunction(fn);
        expect(result).toBe(true);

        if (isEscapeFunction(fn)) {
            type T = typeof fn;

            type cases = [
                Expect<Test<T, "extends", () => unknown>>
            ];
        }
    });

    it("returns false for a plain function without escape marker", () => {
        expect(isEscapeFunction(() => "x")).toBe(false);
        expect(isEscapeFunction(Object.assign(() => 1, { escape: false }))).toBe(false);
    });

    it("returns false for non-function values", () => {
        expect(isEscapeFunction(42)).toBe(false);
        expect(isEscapeFunction({ escape: true })).toBe(false);
        expect(isEscapeFunction(null)).toBe(false);
        expect(isEscapeFunction(undefined)).toBe(false);
    });
});

describe("isOptionalParamFunction(val)", () => {
    it("returns true for a function tagged with optionalParams === true", () => {
        const fn = Object.assign(() => "x", { optionalParams: true as const });

        const result = isOptionalParamFunction(fn);
        expect(result).toBe(true);

        if (isOptionalParamFunction(fn)) {
            type T = typeof fn;

            type cases = [
                Expect<Test<T, "extends", OptionalParamFn>>
            ];
        }
    });

    it("returns false for a plain function without the marker", () => {
        expect(isOptionalParamFunction(() => "x")).toBe(false);
        expect(isOptionalParamFunction(Object.assign(() => 1, { optionalParams: false }))).toBe(false);
    });

    it("returns false for non-function values", () => {
        expect(isOptionalParamFunction(42)).toBe(false);
        expect(isOptionalParamFunction({ optionalParams: true })).toBe(false);
        expect(isOptionalParamFunction(undefined)).toBe(false);
    });
});

describe("isApi(val)", () => {
    it("returns true for a dictionary with a 'surface' and _kind of 'api'", () => {
        const api = { _kind: "api", surface: { foo: () => 1 } };

        const result = isApi(api);
        expect(result).toBe(true);

        if (isApi(api)) {
            type T = typeof api;

            type cases = [
                Expect<Test<T, "extends", { __kind: "api"; surface: Dictionary | TypedFunction }>>
            ];
        }
    });

    it("returns false when required keys or the correct _kind are missing", () => {
        expect(isApi({ surface: {} })).toBe(false);
        expect(isApi({ _kind: "api" })).toBe(false);
        expect(isApi({ _kind: "fluent-api", surface: {} })).toBe(false);
    });

    it("returns false for non-dictionary values", () => {
        expect(isApi(42)).toBe(false);
        expect(isApi("api")).toBe(false);
        expect(isApi(null)).toBe(false);
        expect(isApi(undefined)).toBe(false);
    });
});

describe("isApiSurface(val)", () => {
    it("returns true for a dictionary containing at least one escape function", () => {
        const escape = Object.assign(() => "esc", { escape: true as const });
        const surface = { escape, other: 42 };

        const result = isApiSurface(surface);
        expect(result).toBe(true);

        if (isApiSurface(surface)) {
            type T = typeof surface;

            type cases = [
                Expect<Test<T, "extends", Dictionary | TypedFunction>>
            ];
        }
    });

    it("returns false for a dictionary without any escape function", () => {
        expect(isApiSurface({ a: 1, b: () => 2 })).toBe(false);
        expect(isApiSurface({})).toBe(false);
    });

    it("returns false for non-dictionary values", () => {
        expect(isApiSurface(5)).toBe(false);
        expect(isApiSurface("surface")).toBe(false);
        expect(isApiSurface(null)).toBe(false);
    });
});
