import { describe, it } from "vitest";
import type { Test, Expect } from "@type-challenges/utils";

describe("Diagnosing type widening in createFnWithProps", () => {
    it("TypeScript's default function inference", () => {
        // Direct function type inference
        const fnWithConst = () => "hi" as const;
        const fnWithoutConst = () => "hi";
        
        // What TypeScript infers:
        type FnWithConst = typeof fnWithConst;      // () => "hi"
        type FnWithoutConst = typeof fnWithoutConst; // () => string
        
        type cases = [
            Expect<Test<FnWithConst, "equals", () => "hi">>,
            Expect<Test<FnWithoutConst, "equals", () => string>>,
        ];
    });
    
    it("Generic with const modifier behavior", () => {
        // Test how const generic behaves
        function captureType<const T>(value: T): T {
            return value;
        }
        
        const literalFn = captureType(() => "hi");
        const literalValue = captureType("hi");
        
        // The const modifier preserves the literal for values, 
        // but not for function return types
        type LiteralFn = typeof literalFn;     // () => string (still widened!)
        type LiteralValue = typeof literalValue; // "hi" (preserved)
        
        type cases = [
            Expect<Test<LiteralFn, "equals", () => string>>,
            Expect<Test<LiteralValue, "equals", "hi">>,
        ];
    });
    
    it("Potential solution: NoInfer wrapper", () => {
        // One potential solution is to use NoInfer or a similar pattern
        type PreserveLiteral<T> = T extends (...args: any[]) => infer R
            ? (...args: Parameters<T>) => R
            : T;
            
        function createFnWithLiteral<
            const TFn extends (...args: any[]) => any
        >(fn: TFn): PreserveLiteral<TFn> {
            return fn as any;
        }
        
        // This still won't work because the widening happens
        // at the point of defining the arrow function
        const testFn = createFnWithLiteral(() => "hi");
        type TestFn = typeof testFn; // Still () => string
        
        type cases = [
            Expect<Test<TestFn, "equals", () => string>>,
        ];
    });
});