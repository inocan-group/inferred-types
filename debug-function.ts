import { IT_TakeFunction } from 'inferred-types/types';

// Test simple arrow function
type Test1 = IT_TakeFunction<'(name: string) => "hi"'>;
//   ^?

// Test named function
type Test2 = IT_TakeFunction<'function greet(name: string): string'>;
//   ^?

// Test async arrow function
type Test3 = IT_TakeFunction<'async (name: string) => Promise<"hi">'>;
//   ^?

export type Debug = { Test1: Test1; Test2: Test2; Test3: Test3 };