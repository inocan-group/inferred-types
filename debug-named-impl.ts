import { NamedSyncFunction } from 'types/runtime-types/type-defn/input-tokens/IT_TakeFunction';

// Test the NamedSyncFunction directly
type Test1 = NamedSyncFunction<'function greet(name: string): string'>;
//   ^?

export type Debug = Test1;