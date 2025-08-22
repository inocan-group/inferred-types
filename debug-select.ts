import { Select } from 'types/runtime-types/type-defn/input-tokens/IT_TakeFunction';

// Test the Select logic with a simple example
type TestSelect = Select<[
    "function greet(name: string): string" extends `function ${string}(${string}): ${string}` ? "NAMED_MATCH" : Error,
    "function greet(name: string): string" extends `function(${string}): ${string}` ? "ANON_MATCH" : Error,
]>;
//   ^?

export type Debug = TestSelect;