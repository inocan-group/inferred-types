import { NamedSyncFunction } from 'types/runtime-types/type-defn/input-tokens/IT_TakeFunction';

// Test the exact function strings from the test
type Test1 = NamedSyncFunction<'function greet(name: string): string'>;
//   ^?

type Test2 = NamedSyncFunction<'function add<T extends number>(a: T, b: T): T'>;
//   ^?

export type Debug = { Test1: Test1; Test2: Test2 };