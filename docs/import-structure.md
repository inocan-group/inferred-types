# Import Structure

This monorepo uses a set of type references between projects and is published not only to "npm" but also "jsr" which has stricter (or at least different) rules about how to process import statements. For this reason we need to be careful to follow a strict standard when importing source files.

## The Preferred Path Alias Imports

A vast majority of the import sources in this repo should come from one of these three:

- `inferred-types/constants`
- `inferred-types/types`
- `inferred-types/runtime`

### Edge Case: Avoiding Circular Deps

As a way to avoid  _circular dependencies_ in few edge cases within the **runtime** module/package, we do also allow imports of the form:

- `runtime/type-guards`
- `runtime/boolean-logic`
- etc.

These path aliases should only ever be used in the runtime source code (e.g., inside `/modules/runtime/src`) and only when they are necessary. It is always preferred that `inferred-types/runtime` be used instead of these `runtime/*` path aliases. Even within this exception case we should never use a path aliases deeper than two levels:

- `runtime/type-guards` is fine
- `runtime/type-guards/datetime` is not allowed

This depth limit is in part because EVERY path alias must be explicitly enumerated when publishing to JSR but also there has never been a situation where we've needed any more depth to avoid the circular dependency. The number of situations where the use of `runtime/*` aliases is very uncommon.

**Note:** `runtime/*` path alias imports should never be used in tests.

## Package Name Imports

The package/module `inferred-types` (found in `/modules/inferred-types/src`) is the ONLY package that should use namespace imports such as `@inferred-types/types`, etc. In this one module that is what is expected but it should not be used elsewhere!

## No Relative Imports

While it may be tempting to import a relative path such as `../some-directory/index.ts`; this should NOT be done! There is NO situation where this is a good idea.

## Additional Context

Each module's source code is organized in a set of nested folders and every nested folder there is a `index.ts` file which re-exports the symbols from the files in it's directory. If a directory has subdirectories, then the `index.ts` will also import the `index.ts` files from it's sub-directories. This ensures that all exported symbols are addressable at the root of the module via this re-exports tree. This is also why the three key import sources:

- `inferred-types/constants`
- `inferred-types/types`
- `inferred-types/runtime`

should work in almost all cases. Each of these import sources is a defined path alias to the `index.ts` file in the root of the given module. These path aliases are defined both in each module's `tsconfig.json` file but also in the `deno.jsonc` file in the root of the monorepo.
