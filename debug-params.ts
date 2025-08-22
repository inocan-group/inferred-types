import { IT_TakeParameters } from 'inferred-types/types';

// Test parameter parsing
type Test1 = IT_TakeParameters<'(name: string) => "hi"'>;
//   ^?

// Test function name parsing  
type Test2 = IT_TakeParameters<'function greet(name: string): string'>;
//   ^?

export type Debug = { Test1: Test1; Test2: Test2 };