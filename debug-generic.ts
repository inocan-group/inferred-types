import { IT_TakeFunction } from 'inferred-types/types';

// Test generic arrow function - this should start with <T>
type Test1 = '<T>(value: T) => T' extends `(${string}) => ${string}` ? "MATCH" : "NO_MATCH";
//   ^?

// This should show what the function actually resolves to
type Test2 = IT_TakeFunction<'<T>(value: T) => T'>;
//   ^?

export type Debug = { Test1: Test1; Test2: Test2 };