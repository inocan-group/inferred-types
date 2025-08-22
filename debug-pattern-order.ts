// Test pattern matching order
type NamedFunction = 'function greet(name: string): string';

// Test which pattern matches first
type Test1 = NamedFunction extends `function ${string}(${string}): ${string}` ? "NAMED_MATCH" : "NO_NAMED_MATCH";
//   ^?

type Test2 = NamedFunction extends `function(${string}): ${string}` ? "ANON_MATCH" : "NO_ANON_MATCH";  
//   ^?

// Test the space issue - maybe the space between function and name is the problem
type Test3 = NamedFunction extends `function ${infer Name}(${string}): ${string}` ? `NAME=${Name}` : "NO_EXTRACT";
//   ^?

export type Debug = { Test1: Test1; Test2: Test2; Test3: Test3 };