// Test if named function patterns match
type Test1 = 'function greet(name: string): string' extends `function ${string}(${string}): ${string}` ? "MATCH" : "NO_MATCH";
//   ^?

type Test2 = 'async function fetchData(url: string): Promise<string>' extends `async function ${string}(${string}): ${string}` ? "MATCH" : "NO_MATCH";
//   ^?

export type Debug = { Test1: Test1; Test2: Test2 };