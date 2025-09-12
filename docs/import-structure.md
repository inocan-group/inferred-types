# Import Structure

This monorepo uses a set of type references between projects and is published not only to "npm" but also "jsr" which has stricter (or at least different) rules about how to process import statements. For this reason we need to be careful to follow a strict standard when importing source files.

## Modules

Just as a quick reminder, the modules in this monorepo are:

- `constants` - defines constants used by both the `runtime` and `types` modules
- `types` - type utilities and base type definitions, depends on `constants` module for some symbol definitions
- `runtime` - runtime utilities; depends on symbols from both `constants` and `types` modules
- `inferred-type` - no real source code, this is just a consolidator of the other three modules to create the overall package which will be published to **npm** and **JSR**.

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

#### `types` module

Just like the runtime module, the types module DOES allow for path aliases to points one level deep in the **types** module rather than pointing to the root with (`inferred-types/types`). For instance:

- `types/boolean-logic`
- `types/take`

These are even less likely necessary and should be avoided unless absolutely necessary. They should NEVER be used beyond a depth of 2 directories and wherever they are used that alias must be explicitly added to the `deno.jsonc` file
as explicit path aliases.

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

## Finding Problems

Running the `pnpm test:imports` script will send XML data to STDOUT enumerating the problems which were detected. These problems are broken down into categories:

1. `invalid-runtime-alias-depth`

    Detects all import statements which use the `runtime/*` path alias pattern but which are more than two directories deep.

2. `invalid-type-alias-depth`

    Detects all import statements which use the `types/*` path alias pattern but which are more than two directories deep.

3. `unspecified-path-alias`

    Detects imports using `runtime/*` or `types/*` as sources where:
    - the alias is 2 directory levels (aka, it's valid)
    - but the explicit path is NOT referenced in the `deno.jsonc` file!

4. `relative-path`

    Detects relative imports.

5. `forbidden-@-import`

    Detects the use of a `@inferred-types/*` imports that is NOT in the "inferred-types" module.

6. `forbidden-runtime-import`

    Finds imports that use the `runtime/*` source structure but are NOT part of the **runtime** module.

7. `missing-type-modifier`

    Finds imports of `inferred-types/types` which **do not** use the `type` modifier:

    ```ts
    // wrong
    import { Foo } from "inferred-types/types";
    // correct
    import type { Foo } from "inferred-types/types";
    ```

8. `multiple-imports-same-source`

    Identifies all source files which have multiple imports of the same source.

    ```ts
    // wrong
    import type { Foo } from "inferred-types/types";
    import type { Bar } from "inferred-types/types";
    // correct
    import type { Foo, Bar } from "inferred-types/types";
    ```

### Schema

The XML Schema which describes the output is as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           elementFormDefault="qualified"
           attributeFormDefault="unqualified">

  <!-- Simple types -->
  <xs:simpleType name="SectionName">
    <xs:restriction base="xs:string">
      <xs:enumeration value="invalid-runtime-alias-depth"/>
      <xs:enumeration value="invalid-type-alias-depth"/>
      <xs:enumeration value="unspecified-path-alias"/>
      <xs:enumeration value="relative-path"/>
      <xs:enumeration value="forbidden-@-import"/>
      <xs:enumeration value="forbidden-runtime-import"/>
      <xs:enumeration value="forbidden-const-aliases"/>
      <xs:enumeration value="missing-type-modifier"/>
      <xs:enumeration value="multiple-imports-same-source"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="FilePath">
    <!-- Keep lenient; you can tighten with a regex if you want -->
    <xs:restriction base="xs:string">
      <xs:minLength value="1"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="LineNumber">
    <xs:restriction base="xs:positiveInteger"/>
  </xs:simpleType>

  <!-- Elements -->
  <xs:element name="invalid-imports">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="section" type="Section"
                    minOccurs="0" maxOccurs="unbounded"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <xs:complexType name="Section">
    <xs:sequence>
      <xs:element name="file" type="File"
                  minOccurs="0" maxOccurs="unbounded"/>
    </xs:sequence>
    <xs:attribute name="name" type="SectionName" use="required"/>
  </xs:complexType>

  <xs:complexType name="File">
    <xs:sequence>
      <xs:element name="instance" type="Instance"
                  minOccurs="1" maxOccurs="unbounded"/>
    </xs:sequence>
    <xs:attribute name="path" type="FilePath" use="required"/>
  </xs:complexType>

  <xs:complexType name="Instance" mixed="true">
    <!-- mixed=true allows the import line as text content -->
    <xs:attribute name="line" type="LineNumber" use="required"/>
    <!-- Optional: room for future metadata -->
    <xs:attribute name="severity" use="optional">
      <xs:simpleType>
        <xs:restriction base="xs:string">
          <xs:enumeration value="error"/>
          <xs:enumeration value="warning"/>
          <xs:enumeration value="info"/>
        </xs:restriction>
      </xs:simpleType>
    </xs:attribute>
    <xs:attribute name="href" type="xs:anyURI" use="optional"/>
    <xs:attribute name="column" type="xs:positiveInteger" use="optional"/>
    <xs:attribute name="endColumn" type="xs:positiveInteger" use="optional"/>
  </xs:complexType>

</xs:schema>
```

## Fixing Problems

In the prior section we discussed using the `pnpm test:imports` command to _find_ the problems with imports in this monorepo but how should we FIX them? This section discusses the preferred approach:

1. Run the `pnpm test:imports` script to get the diagnostics
2. If there are any problems in the `missing-type-modifier`, `relative-path`, `forbidden-@-import`, `multiple-imports-same-source`, `invalid-runtime-alias-depth` or `invalid-type-alias-depth` then immediately fix these as these types of errors always need to be fixed and the approach to fixing them is pretty straight forward:

    - `missing-type-modifier` - add the "type" keyword to the import for all of the items in this section
    - `relative-path` - replace a relative path import with a `inferred-types/*` based import
    - `forbidden-@-import` - replace all `@inferred-types/*` with `inferred-types/*` imports
    - `multiple-imports-same-source` - reduce all raised examples to a single import; the one exception to this rule would be if one import imports _types_ and the other imports _runtime_ symbols but this would only happen in the runtime module if at all.
    - `invalid-runtime-alias-depth` - reduce the depth to `runtime` and one directory (e.g., `runtime/datetime`, `runtime/lists`, etc.)
    - `invalid-types-alias-depth` - reduce the depth to `types` and one directory (e.g., `types/errors`, `types/regex`, etc.)
3. Build the project (`pnpm build`) to make sure nothing has broken
4. Re-run the `pnpm test:imports` scripts as solving problems like alias-depth can lead to new problems like `multiple-imports-same-source`, etc.

   - make sure that all items found in the categories above (e.g., `missing-type-modifier`, `relative-path`, `forbidden-@-import`, `multiple-imports-same-source`, `invalid-runtime-alias-depth`, `invalid-types-alias-depth`)

5. Ask the user whether they would like to add the missing path aliases found in the `unspecified-path-alias` section

    - if they DO want to add them then just update the `deno.jsonc` in the "imports" section
    - if they DON'T want to add them then update all the imports to use the appropriate `inferred-types/*` based import
    - if you have a way of giving the user a choice between individual sources rather than "all of them" then that would be better but it is not required.

6. Build the project (`pnpm build`) to make sure nothing has broken
