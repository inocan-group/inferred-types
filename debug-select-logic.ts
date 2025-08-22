import { IT_TakeFunction } from 'inferred-types/types';

// Test the exact strings from the failing tests
type NamedFunction = 'function greet(name: string): string';
type GenericNamedFunction = 'function add<T extends number>(a: T, b: T): T';
type AnonFunction = 'function(name: string): string';

type Test1 = IT_TakeFunction<NamedFunction>;
//   ^?

type Test2 = IT_TakeFunction<GenericNamedFunction>;
//   ^?

type Test3 = IT_TakeFunction<AnonFunction>;
//   ^?

export type Debug = { Test1: Test1; Test2: Test2; Test3: Test3 };