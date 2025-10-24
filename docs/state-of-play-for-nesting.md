# State of Play: Nesting System

**Date:** 2025-10-23
**Status:** Partially Broken - Requires Cleanup

## Executive Summary

The nesting system is currently in a transitional state with remnants of a failed "hierarchical nesting with exceptions" implementation. This document analyzes what exists, what's broken, and what needs to be cleaned up.

## Background Context

### The Problem Being Solved
- **Goal:** Support "shallow" nesting - nest at root level but not inside nested contexts
- **Use Case:** Quote handling - treat content inside quotes as literal (no further nesting)

### Evolution of Attempts

1. **First Attempt:** Original "quotes mode" implementation - not satisfactory
2. **Second Attempt:** "Hierarchical nesting with exceptions"
   - Introduced `nextLevel` parameter to specify different nesting configs at different depths
   - Introduced exception rules to ignore entry/exit delimiters in certain contexts
   - **Result:** Design was good, implementation was "pretty broken"
3. **Current State:** Cleanup incomplete - hybrid of old simple system + broken hierarchical system

## Current Type Definitions

### Simple Nesting (Working)

**NestingKeyValue - Simple Form:**
```typescript
type Simple = { "(": ")" }  // ✅ Works
```

**NestingTuple - Simple Form:**
```typescript
type SimpleTuple = [["(", "["], [")", "]"]]  // ✅ Works
```

### Hierarchical Nesting (Broken - Should Be Removed)

**NestingKeyValue - Hierarchical Form:**
```typescript
// Type definition says this is valid:
type Hierarchical = { "(": [")", {}] }  // ❌ Broken
type HierarchicalWithNextLevel = { "(": [")", { "[": "]" }] }  // ❌ Broken
```

**Problem:** The type definition (`NestingKeyValue`) says it accepts:
- `string | NestingKeyValueConfig`

But `NestingKeyValueConfig` is an **object** with `{ exit, children?, exception? }`, NOT a tuple.

The documentation and tests use **tuple syntax** `[exit, nextLevel]`, but the type doesn't accept tuples!

### Named Configurations (Working with Caveats)

**Constants like `SHALLOW_BRACKET_AND_QUOTE_NESTING`:**
```typescript
export const SHALLOW_BRACKET_AND_QUOTE_NESTING = {
    "(": [")", {}],  // ❌ Uses hierarchical tuple syntax (broken)
    "[": ["]", {}],
    "{": ["}", {}],
    // ...
} as const;
```

**Problem:** These constants use the hierarchical tuple syntax that doesn't match the type definition and relies on the broken nextLevel logic.

## What's Broken and Why

### 1. Type Definition Mismatch

**In `NestingKeyValue.ts`:**
```typescript
export type NestingKeyValue = Record<
    string,
    | string
    | NestingKeyValueConfig  // ← Object with { exit, children?, exception? }
>;
```

**But everywhere else uses:**
```typescript
{ "(": [")", {}] }  // ← Tuple syntax [exit, nextLevel]
```

**Result:** TypeScript can't match tuples against `NestingKeyValueConfig`, so all hierarchical types resolve to `never`.

### 2. Helper Utilities Implement Hierarchical Logic

All these utilities have code to handle `[exit, nextLevel]` tuples:

- **GetExitToken.ts** (lines 10-18): Checks for `Value extends readonly [infer Exit, infer _NextLevel]`
- **IsExitToken.ts** (line 16): Uses `ExtractExitTokens<Values<TNesting>[number]>`
- **IsEntryToken.ts** (lines 17-20): Tries to extract keys from hierarchical configs
- **GetNextLevelConfig.ts** (lines 32-34): Extracts `nextLevel` from hierarchical tuples
- **GetParentConfig.ts**: Reconstructs parent nesting config from stack

**All this code is for the broken hierarchical/exception system.**

### 3. Constants Use Broken Syntax

**All shallow nesting constants:**
- `SHALLOW_BRACKET_NESTING`
- `SHALLOW_QUOTE_NESTING`
- `SHALLOW_BRACKET_AND_QUOTE_NESTING`

Use hierarchical tuple syntax: `{ "(": [")", {}] }`

This syntax doesn't type-check properly and relies on broken implementation logic.

### 4. Test Files Expect Hierarchical Behavior

**Tests like `RetainUntil__Nested.test.ts` (lines 128-144):**
```typescript
it("hierarchical config: explicit shallow behavior", () => {
    type Text = `{a, b, c}. result`;
    type T1 = RetainUntil__Nested<Text, ".", true, { "{": ["}", {}] }>;
    // Expects: `{a, b, c}.`
});
```

**These tests CANNOT pass** with current implementation because:
1. Type definition doesn't accept tuple syntax
2. Helper utilities return `never` for hierarchical configs
3. The nextLevel logic was never fully working

## Commit History Analysis

### The Refactor Commit (`a0174e88`)

**Date:** Oct 18, 2025
**Title:** "chore: refactor of file structure for nesting/parsing functionality"

**What it did:**
- Renamed `IsNestingEnd` → `IsExitToken`
- Renamed `IsNestingStart` → `IsEntryToken`
- Renamed `GetNestingEnd` → `GetExitToken`
- Modified `NestingKeyValue.ts` - added more detailed documentation about hierarchical forms
- Modified `NestingTuple.ts` - added exception support

**What it DIDN'T do:**
- Update test imports (caused 100+ test failures)
- Fix the type definition mismatch
- Complete the hierarchical implementation
- Remove broken nextLevel references

### Before the Refactor

The system was simpler:
- Simple key-value: `{ "(": ")" }`
- Simple tuple: `[["("], [")"]]`
- No hierarchical configs, no nextLevel logic

## What Needs to Happen

### Phase 1: Remove Hierarchical/NextLevel Logic ✅ **RECOMMENDED**

This is the cleanest path forward given the context.

**Type Definitions:**
1. **NestingKeyValue.ts:** Keep ONLY simple form
   ```typescript
   export type NestingKeyValue = Record<string, string>;
   ```

2. **NestingTuple.ts:** Keep simple 2-element tuple, remove 3-element hierarchical form

**Implementation Files:**
3. **GetExitToken.ts:** Remove all hierarchical tuple handling (lines 10-14)
4. **IsExitToken.ts:** Remove `ExtractExitTokens` logic, use simple `Values<>` lookup
5. **IsEntryToken.ts:** Already works for simple configs
6. **GetNextLevelConfig.ts:** Either remove entirely OR simplify to always return same config
7. **GetParentConfig.ts:** Either remove entirely OR simplify to always return root config

**Constants:**
8. **SHALLOW_* constants:** Change from `{ "(": [")", {}] }` to just `{ "(": ")" }`
   - **NOTE:** This removes "shallow" behavior - quotes will nest recursively
   - Alternative: Keep shallow constants but implement differently (see Phase 2)

**Tests:**
9. Remove or mark as `skip` all "hierarchical config" tests
10. Update shallow nesting tests to not expect hierarchical behavior

### Phase 2: Re-implement Shallow Nesting (Future)

If shallow nesting is still desired, implement it properly:

**Option A: Exception-based (requires solid implementation)**
- Define clear exception rules
- Implement exception checking in runtime and type utilities
- Keep nextLevel logic but FIX the type definitions

**Option B: Explicit shallow mode flag**
```typescript
type NestingKeyValue = Record<string,
    | string
    | { exit: string; shallow?: boolean }
>;
```

**Option C: Separate shallow config type**
```typescript
type ShallowNestingKeyValue = Record<string, string>;
type DeepNestingKeyValue = Record<string, string | [string, Nesting]>;
type NestingKeyValue = ShallowNestingKeyValue | DeepNestingKeyValue;
```

## Files Requiring Changes

### Type Definitions (modules/types/src/)
- `domains/nesting/primitives/NestingKeyValue.ts` - Simplify to `Record<string, string>`
- `domains/nesting/primitives/NestingTuple.ts` - Remove 3-element form
- `domains/nesting/helpers/GetExitToken.ts` - Remove hierarchical logic
- `domains/nesting/helpers/IsExitToken.ts` - Simplify
- `domains/nesting/helpers/GetNextLevelConfig.ts` - Remove or simplify
- `domains/nesting/helpers/GetParentConfig.ts` - Remove or simplify
- `domains/nesting/helpers/ExtractExitTokens.ts` - May no longer be needed

### Constants (modules/constants/src/)
- `Nesting.ts` - Update all SHALLOW_* constants from hierarchical to simple syntax

### Runtime (modules/runtime/src/)
- `string-literals/sub-string/retain/retainUntil__Nested.ts` - Remove nextLevel logic
- `domain/nesting/isNestingEndMatch.ts` - Remove hierarchical tuple handling
- Runtime equivalents of all type utilities above

### Tests
- `tests/domains/nesting/helper-types.test.ts` - Remove hierarchical test cases
- `tests/string-literals/sub-strings/RetainUntil__Nested.test.ts` - Remove hierarchical tests
- `tests/string-literals/NestedSplit.test.ts` - Update expectations
- Any other tests expecting hierarchical behavior

## Impact Analysis

### Breaking Changes

**If we remove hierarchical/nextLevel:**
1. ✅ **Type compatibility:** Simplifies types, makes them more predictable
2. ✅ **Runtime behavior:** Removes broken code paths
3. ❌ **Shallow nesting:** Loses "quotes mode" shallow behavior
   - Quotes will nest recursively like any other bracket
   - Example: `"foo {bar}"` will try to nest on `{`, whereas shallow mode treated quote content as literal

### Non-Breaking

1. **Simple nesting still works:** All basic `{ "(": ")" }` configs unaffected
2. **Simple tuples still work:** All `[["("], [")"]]` configs unaffected
3. **Most tests pass:** Only hierarchical and shallow-specific tests fail

## Recommendation

Given that:
1. The hierarchical implementation is "pretty broken"
2. nextLevel logic should "no longer be used"
3. Exception references should be kept but not used yet

**Recommended path:**

### Immediate (Fix Current Breakage)
1. **Remove all hierarchical/nextLevel logic** from type and runtime implementations
2. **Simplify type definitions** to only allow simple forms
3. **Update constants** to use simple syntax (accept loss of shallow behavior temporarily)
4. **Update or remove failing tests** that expect hierarchical behavior

### Future (When Ready to Re-implement)
1. Design new exception-based shallow nesting system properly
2. Add exception support with clear type definitions
3. Implement incrementally with comprehensive tests
4. Add back shallow constants once system is solid

## Questions for Clarification

1. **Is temporary loss of shallow nesting acceptable?**
   - Removing hierarchical logic means quotes will nest recursively
   - Alternative: Keep current broken state until new implementation ready?

2. **Should we keep GetNextLevelConfig/GetParentConfig utilities?**
   - Remove entirely (clean slate)
   - Keep but stub them out (return same config always)

3. **What about exception references in type definitions?**
   - Keep in `NestingKeyValueConfig` but unused?
   - Remove entirely until ready to implement?

## Next Steps

Awaiting decision on approach before proceeding with cleanup/fixes.
