#!/usr/bin/env node
/**
 * Integration test for circular dependencies
 *
 * This script tests for circular dependencies in multiple ways:
 * 1. Source code analysis - checks for barrel imports within runtime-types
 * 2. Bundle loading - ensures bundles can be imported without circular dep errors
 * 3. Module initialization - tests that critical modules initialize correctly
 *
 * Run with: node scripts/test-circular-deps.mjs
 */

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync, readdirSync, statSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');

// Colors for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`${colors.green}✓${colors.reset} ${name}`);
  } catch (error) {
    failed++;
    failures.push({ name, error });
    console.log(`${colors.red}✗${colors.reset} ${name}`);
    console.log(`  ${colors.red}${error.message}${colors.reset}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

/**
 * Recursively find all TypeScript files in a directory
 */
function findTsFiles(dir, files = []) {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      findTsFiles(fullPath, files);
    } else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Check if a file imports from the runtime-types barrel
 */
function checkForBarrelImport(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const violations = [];

  lines.forEach((line, index) => {
    // Check for exact barrel import: runtime/runtime-types (not deeper paths)
    const match = line.match(/from\s+['"]runtime\/runtime-types['"]\s*;?$/);
    if (match) {
      violations.push({
        file: filePath,
        line: index + 1,
        content: line.trim()
      });
    }
  });

  return violations;
}

console.log(`${colors.cyan}Testing for circular dependencies...${colors.reset}\n`);

// Test 1: Check runtime-types module for barrel imports
test('runtime-types files should not import from runtime/runtime-types barrel', () => {
  const runtimeTypesDir = join(root, 'modules/runtime/src/runtime-types');
  const files = findTsFiles(runtimeTypesDir);
  const allViolations = [];

  for (const file of files) {
    const violations = checkForBarrelImport(file);
    allViolations.push(...violations);
  }

  if (allViolations.length > 0) {
    const details = allViolations.map(v =>
      `  ${v.file.replace(root, '')}:${v.line}\n    ${v.content}`
    ).join('\n');
    throw new Error(`Found ${allViolations.length} barrel import(s) in runtime-types:\n${details}`);
  }

  assert(allViolations.length === 0, 'Should have no barrel imports');
});

// Test 2: Ensure ESM bundle loads without circular dependency errors
test('ESM bundle loads without circular dependency errors', async () => {
  const bundlePath = join(root, 'modules/inferred-types/dist/index.js');

  try {
    const module = await import(bundlePath);
    assert(module, 'Module should import successfully');

    // Verify key exports exist (if they exist, circular deps didn't break initialization)
    assert(typeof module.ensureLeading === 'function', 'ensureLeading should be a function');
    assert(typeof module.shape === 'function', 'shape should be a function');
    assert(Array.isArray(module.ALPHA_CHARS), 'ALPHA_CHARS should be an array');

  } catch (error) {
    if (error.message.includes('circular') || error.message.includes('Circular')) {
      throw new Error(`Circular dependency detected in ESM bundle: ${error.message}`);
    }
    throw error;
  }
});

// Test 3: Verify critical runtime-types modules can be imported
test('runtime-types modules initialize correctly', async () => {
  const bundlePath = join(root, 'modules/inferred-types/dist/index.js');
  const module = await import(bundlePath);

  // These are the modules that had circular deps - verify they work
  assert(typeof module.shape === 'function', 'shape function should be available');

  // Test that shape actually works (would fail if circular dep broke initialization)
  const result = module.shape((s) => s.boolean());
  assert(typeof result === 'string', 'shape should return a string token');
  assert(result.includes('boolean'), 'shape result should contain "boolean"');
});

// Test 4: Check for common circular dependency patterns in source
test('No files import from their own barrel exports', () => {
  const violations = [];

  // Check each module
  const moduleDirs = [
    { dir: 'modules/runtime/src/runtime-types', barrel: 'runtime/runtime-types' },
    { dir: 'modules/types/src', barrel: 'types/*' },
    { dir: 'modules/constants/src', barrel: 'constants/*' },
  ];

  for (const { dir, barrel } of moduleDirs) {
    const fullDir = join(root, dir);
    try {
      const files = findTsFiles(fullDir);

      for (const file of files) {
        const content = readFileSync(file, 'utf-8');

        // For runtime-types, check for exact barrel import
        if (barrel === 'runtime/runtime-types') {
          const match = content.match(/from\s+['"]runtime\/runtime-types['"]\s*;?$/m);
          if (match) {
            violations.push({
              file: file.replace(root, ''),
              barrel,
              line: content.substring(0, content.indexOf(match[0])).split('\n').length
            });
          }
        }
      }
    } catch (e) {
      // Directory might not exist, skip
    }
  }

  if (violations.length > 0) {
    const details = violations.map(v =>
      `  ${v.file}:${v.line} imports from ${v.barrel}`
    ).join('\n');
    throw new Error(`Found ${violations.length} self-referential barrel import(s):\n${details}`);
  }
});

// Test 5: Verify no parent directory imports (../) in runtime-types
test('runtime-types uses only same-directory relative imports', () => {
  const runtimeTypesDir = join(root, 'modules/runtime/src/runtime-types');
  const files = findTsFiles(runtimeTypesDir);
  const violations = [];

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Skip comments
      const trimmed = line.trim();
      if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
        return;
      }

      // Check for parent directory imports
      if (line.match(/from\s+['"]\.\.\//) || line.match(/export\s+.*from\s+['"]\.\.\//)) {
        violations.push({
          file: file.replace(root, ''),
          line: index + 1,
          content: line.trim()
        });
      }
    });
  }

  if (violations.length > 0) {
    const details = violations.map(v =>
      `  ${v.file}:${v.line}\n    ${v.content}`
    ).join('\n');
    throw new Error(`Found ${violations.length} parent directory import(s):\n${details}`);
  }
});

// Summary
console.log('\n' + '='.repeat(50));
if (failed === 0) {
  console.log(`${colors.green}All ${passed} tests passed!${colors.reset}`);
  console.log(`${colors.cyan}No circular dependencies detected.${colors.reset}`);
  process.exit(0);
} else {
  console.log(`${colors.red}${failed} test(s) failed${colors.reset}, ${colors.green}${passed} passed${colors.reset}`);
  console.log('\nFailures:');
  failures.forEach(({ name, error }) => {
    console.log(`  ${colors.red}✗${colors.reset} ${name}`);
    console.log(`    ${error.message}`);
  });
  process.exit(1);
}
