import { OptSpace, AlphaChar } from 'inferred-types/types';

type OptGenerics = `<${string}>` | "";

// Test if the exact string matches the pattern
type SimpleTest = 'function greet(name: string): string' extends `function ${OptSpace}${AlphaChar}${string}${OptGenerics}(${string}):${OptSpace}${string}` ? "MATCH" : "NO_MATCH";
//   ^?

// Break it down step by step  
type Step1 = 'function greet(name: string): string' extends `function ${string}` ? "STEP1_OK" : "STEP1_FAIL";
//   ^?

type Step2 = 'greet(name: string): string' extends `${OptSpace}${AlphaChar}${string}${OptGenerics}(${string}):${OptSpace}${string}` ? "STEP2_OK" : "STEP2_FAIL";
//   ^?

export type Debug = { SimpleTest: SimpleTest; Step1: Step1; Step2: Step2 };