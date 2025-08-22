import { OptSpace, AlphaChar } from 'inferred-types/types';

// Debug the exact patterns
type OptGenerics = `<${string}>` | "";

// Test named function patterns
type Test1 = 'function greet(name: string): string' extends `function ${OptSpace}${AlphaChar}${string}${OptGenerics}(${string}):${OptSpace}${string}` ? "NAMED_MATCH" : "NO_MATCH";
//   ^?

type Test2 = 'function add<T extends number>(a: T, b: T): T' extends `function ${OptSpace}${AlphaChar}${string}${OptGenerics}(${string}):${OptSpace}${string}` ? "NAMED_GENERIC_MATCH" : "NO_MATCH";
//   ^?

// Test anonymous function patterns  
type Test3 = 'function(name: string): string' extends `function ${OptGenerics}(${string}): ${string}` ? "ANON_MATCH" : "NO_MATCH";
//   ^?

export type Debug = { Test1: Test1; Test2: Test2; Test3: Test3 };