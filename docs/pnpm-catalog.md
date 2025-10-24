# pnpm Catalogs: Research & Documentation

**Last Updated:** 2025-10-23
**pnpm Version:** 9.5+ (Catalogs feature introduced)

## Overview

Catalogs are a pnpm workspace feature that enables developers to define dependency version ranges as reusable constants within `pnpm-workspace.yaml`, which can then be referenced across multiple `package.json` files using the `catalog:` protocol.

## Why Use Catalogs?

### Primary Benefits

1. **Version Consistency** — Ensures unique, consistent dependency versions across the entire workspace
2. **Simplified Upgrades** — Update dependency versions in one place (`pnpm-workspace.yaml`) instead of editing multiple `package.json` files
3. **Reduced Merge Conflicts** — Minimizes git conflicts since `package.json` files remain stable during version upgrades
4. **Better Dependency Governance** — Centralized control over which versions are allowed in the monorepo

### Real-World Impact

- **Before catalogs**: Upgrading a dependency used in 10 packages requires editing 10 `package.json` files
- **With catalogs**: Edit one line in `pnpm-workspace.yaml`, run `pnpm install`
- **Merge conflicts**: Package.json files no longer change during routine version updates

## How Catalogs Work

### The `catalog:` Protocol

Instead of specifying version ranges directly in `package.json`, you use the `catalog:` protocol to reference centrally-defined versions.

**Traditional approach:**
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "typescript": "^5.3.0"
  }
}
```

**Catalog approach:**
```json
{
  "dependencies": {
    "react": "catalog:",
    "typescript": "catalog:"
  }
}
```

## Defining Catalogs

### Default Catalog

Use the singular `catalog` field in `pnpm-workspace.yaml`:

```yaml
catalog:
  # Core dependencies
  typescript: ^5.3.0
  vitest: ^1.0.0

  # React ecosystem
  react: ^18.3.1
  react-dom: ^18.3.1

  # Build tools
  tsdown: ^0.2.0
```

**Referencing in package.json:**
```json
{
  "dependencies": {
    "react": "catalog:",           // Shorthand
    "typescript": "catalog:default" // Explicit (same as above)
  }
}
```

### Named Catalogs

Use the plural `catalogs` field for multiple, semantically-grouped catalogs:

```yaml
catalogs:
  # Main production catalog
  main:
    typescript: ^5.3.0
    vitest: ^1.0.0

  # React 17 projects
  react17:
    react: ^17.0.2
    react-dom: ^17.0.2

  # React 18 projects
  react18:
    react: ^18.3.1
    react-dom: ^18.3.1
```

**Referencing named catalogs:**
```json
{
  "dependencies": {
    "react": "catalog:react18",
    "typescript": "catalog:main"
  }
}
```

**Note:** Default and named catalogs can coexist in the same `pnpm-workspace.yaml`.

## Supported Fields

The `catalog:` protocol works in:

### package.json
- `dependencies`
- `devDependencies`
- `peerDependencies`
- `optionalDependencies`

### pnpm-workspace.yaml
- `overrides` (for catalog-wide version overrides)

## Configuration Settings

### 1. `catalog-mode`

Controls how `pnpm add` interacts with catalogs.

**Values:**
- `manual` (default) — No automatic catalog usage; developer explicitly uses `catalog:` protocol
- `prefer` — Automatically uses catalog versions when adding dependencies if compatible version exists
- `strict` — **Enforces catalog-only versions; fails if dependency is not in catalog**

**Configuration locations:**
- `.npmrc` (project-level)
- `~/.npmrc` (user-level)
- `pnpm-workspace.yaml` (workspace settings)

**Example in `.npmrc`:**
```ini
catalog-mode=strict
```

### 2. `cleanup-unused-catalogs`

Boolean setting that removes unused catalog entries during `pnpm install`.

**Default:** `false`

**Example:**
```ini
cleanup-unused-catalogs=true
```

## Strict Mode: Enforcing Catalog Usage

### What It Does

Setting `catalog-mode=strict` enforces that:
1. All dependencies in the catalog **must** be referenced using `catalog:` protocol
2. Workspaces **cannot** specify alternative versions for cataloged dependencies
3. `pnpm add` will fail if attempting to add a dependency not in the catalog

### Use Case

Ideal for monorepos where you want:
- Guaranteed version consistency
- Prevention of accidental version drift
- Enforcement of centralized dependency governance
- Similar behavior to tools like `syncpack`

### Recommended Migration Path

1. Start with `catalog-mode=manual` during migration
2. Move to `catalog-mode=prefer` once all dependencies are cataloged
3. Enable `catalog-mode=strict` after verifying all packages use `catalog:` protocol

## Publishing Behavior

**Important:** The `catalog:` protocol is automatically replaced with actual version ranges when running:
- `pnpm publish`
- `pnpm pack`

This ensures published packages have concrete version ranges, just like the `workspace:` protocol behavior.

**Before publish (package.json):**
```json
{
  "dependencies": {
    "react": "catalog:"
  }
}
```

**After publish (in published tarball):**
```json
{
  "dependencies": {
    "react": "^18.3.1"
  }
}
```

## Migration Tools

### Official Codemod

pnpm provides an official codemod for migrating existing workspaces:

```bash
pnpx codemod pnpm/catalog
```

This tool:
- Scans all `package.json` files in the workspace
- Extracts common dependency versions
- Creates catalog entries in `pnpm-workspace.yaml`
- Updates `package.json` files to use `catalog:` protocol

### Manual Migration Steps

1. **Audit current dependencies**
   ```bash
   # List all dependencies across workspace
   find . -name "package.json" -not -path "*/node_modules/*" -exec cat {} \;
   ```

2. **Create catalog in pnpm-workspace.yaml**
   ```yaml
   catalog:
     typescript: ^5.3.0
     vitest: ^1.0.0
     # ... etc
   ```

3. **Update package.json files**
   Replace version ranges with `catalog:`

4. **Run pnpm install**
   ```bash
   pnpm install
   ```

5. **Verify**
   ```bash
   pnpm why <package-name>
   ```

## Best Practices

### 1. Organize Catalogs Semantically

Group related dependencies:

```yaml
catalog:
  # Type system
  typescript: ^5.3.0

  # Testing
  vitest: ^1.0.0
  "@vitest/ui": ^1.0.0

  # Build tools
  tsdown: ^0.2.0

  # Linting
  eslint: ^8.0.0
```

### 2. Use Named Catalogs for Variants

When different packages need different versions:

```yaml
catalogs:
  default:
    typescript: ^5.3.0
    vitest: ^1.0.0

  legacy:
    typescript: ^4.9.0
```

### 3. Document Catalog Decisions

Add comments in `pnpm-workspace.yaml`:

```yaml
catalog:
  # Locked to 5.3.x due to breaking changes in 5.4
  typescript: ^5.3.0

  # Must match TypeScript version compatibility
  "@typescript-eslint/parser": ^6.0.0
```

### 4. Version Range Strategy

Choose appropriate semver ranges:
- **Patch versions** (`~1.2.3`) — Most conservative
- **Minor versions** (`^1.2.3`) — Balanced (recommended)
- **Latest** (`*`) — Most permissive (not recommended)

### 5. Enable Strict Mode After Full Migration

Don't enable `catalog-mode=strict` until:
- All packages use `catalog:` protocol
- All dependencies are in the catalog
- Team is familiar with the workflow

## Recent Updates (2025)

### Dependabot Support (February 2025)

GitHub Dependabot now offers full support for pnpm workspace catalogs:
- Automatically updates catalog entries in `pnpm-workspace.yaml`
- Ensures safe, scoped updates for each workspace
- Prevents lockfile inconsistencies
- Improves reliability of automated dependency updates

**Configuration:**
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
```

Dependabot will detect the catalog structure and update accordingly.

## Common Patterns

### Monorepo with Shared Dependencies

Most common use case — all packages share core dependencies:

```yaml
catalog:
  # Shared across all packages
  typescript: ^5.3.0
  vitest: ^1.0.0
  eslint: ^8.0.0
```

### Workspace Dependencies + External Dependencies

Combine `workspace:` and `catalog:` protocols:

```json
{
  "dependencies": {
    "@myorg/utils": "workspace:*",     // Internal package
    "react": "catalog:",                // External dependency
    "typescript": "catalog:"            // External dependency
  }
}
```

### Overrides with Catalogs

Force specific versions across the entire dependency tree:

```yaml
catalog:
  react: ^18.3.1

overrides:
  # Force all transitive dependencies to use catalog version
  react: "catalog:"
```

## Troubleshooting

### Issue: "Package not found in catalog"

**Cause:** Trying to add a dependency not in the catalog while in `strict` mode.

**Solution:**
1. Add dependency to catalog in `pnpm-workspace.yaml`
2. OR temporarily switch to `catalog-mode=manual`

### Issue: Version mismatch warnings

**Cause:** Multiple packages using different versions before migration.

**Solution:**
1. Audit all versions: `pnpm list <package-name>`
2. Decide on canonical version
3. Update catalog
4. Run `pnpm install`

### Issue: Peer dependency conflicts

**Cause:** Catalog version incompatible with peer dependency requirements.

**Solution:**
1. Check peer dependency ranges
2. Adjust catalog version to satisfy all peers
3. OR use named catalogs for different version groups

## Migration Checklist

- [ ] Review pnpm version (requires 9.5+)
- [ ] Audit all current dependencies across workspace
- [ ] Identify version inconsistencies
- [ ] Decide on canonical versions for shared dependencies
- [ ] Create catalog structure in `pnpm-workspace.yaml`
- [ ] Update all `package.json` files to use `catalog:` protocol
- [ ] Run `pnpm install` and resolve any conflicts
- [ ] Test all packages build and test successfully
- [ ] (Optional) Enable `catalog-mode=prefer`
- [ ] (Optional) Enable `catalog-mode=strict` for enforcement
- [ ] Update CI/CD pipelines if needed
- [ ] Document catalog usage for team

## References

- [Official pnpm Catalogs Documentation](https://pnpm.io/catalogs)
- [pnpm Workspace Documentation](https://pnpm.io/workspaces)
- [GitHub Discussion: Enforcing Catalog Usage](https://github.com/orgs/pnpm/discussions/8567)
- [Socket.dev: pnpm 9.5 Introduces Catalogs](https://socket.dev/blog/pnpm-9-5-introduces-catalogs-shareable-dependency-version-specifiers)
- [Dependabot Support Announcement](https://github.blog/changelog/2025-02-04-dependabot-now-supports-pnpm-workspace-catalogs-ga/)
