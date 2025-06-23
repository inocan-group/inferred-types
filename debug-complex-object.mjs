import { parseInputToken } from "./modules/runtime/src/runtime-types/parser/parseInputToken.js";

console.log('Testing individual components:');

try {
  console.log('1. Testing Set<string>...');
  const setResult = parseInputToken('Set<string>');
  console.log('✓ Set<string> works:', setResult.kind);
} catch (e) {
  console.log('✗ Set<string> failed:', e.message);
}

try {
  console.log('2. Testing Map<string, string>...');
  const mapResult = parseInputToken('Map<string, string>');
  console.log('✓ Map<string, string> works:', mapResult.kind);
} catch (e) {
  console.log('✗ Map<string, string> failed:', e.message);
}

try {
  console.log('3. Testing simple object with Set...');
  const simpleSet = parseInputToken('{ tags: Set<string> }');
  console.log('✓ Simple Set object works:', simpleSet.kind);
} catch (e) {
  console.log('✗ Simple Set object failed:', e.message);
}

try {
  console.log('4. Testing simple object with Map...');
  const simpleMap = parseInputToken('{ metadata: Map<string, string> }');
  console.log('✓ Simple Map object works:', simpleMap.kind);
} catch (e) {
  console.log('✗ Simple Map object failed:', e.message);
}

try {
  console.log('5. Testing complex object...');
  const complex = parseInputToken('{ tags: Set<string>, metadata: Map<string, string> }');
  console.log('✓ Complex object works:', complex.kind);
} catch (e) {
  console.log('✗ Complex object failed:', e.message);
  console.log('Error details:', e);
}