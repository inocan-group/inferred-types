import type { REPO_PAGE_TYPES, REPO_SOURCE_LOOKUP, REPO_SOURCES } from "inferred-types/constants";
import type {
  Flatten,
  Mutable,
  Opt,
  TupleToUnion,
  Unset,
  UrlsFrom,
  Values,
} from "inferred-types/types";

/**
 * **RepoSources**
 *
 * common sources for source code repositories.
 */
export type RepoSource = TupleToUnion<Mutable<typeof REPO_SOURCES>>;

/**
 * **RepoPageType**
 *
 * a union of descriptive page names you'd expect to find in a source
 * code repository.
 */
export type RepoPageType = TupleToUnion<Mutable<typeof REPO_PAGE_TYPES>>;

export type RepoUrls = UrlsFrom<Flatten<
  Mutable<Values<typeof REPO_SOURCE_LOOKUP>>
>>;

/**
 * **SemanticVersion**`<[TPrefix]>`
 *
 * Provides a type for _sematic versions_.
 *
 * - by default it only allows the `v${major}.${minor}.${patch}`
 * - setting `TPrefix to` `true` allows a version with or without
 * the leading "v"
 *    - `0.10.1` - valid
 *    - `v0.10.1` - also valid
 * - setting to `false` eliminates any prefix
 * - if you pass in a string `TPrefix` then it will be used directly
 */
export type SemanticVersion<
  TPrefix extends boolean | string | Unset = Unset,
> = TPrefix extends Unset
  ? `v${number}.${number}.${number}`
  : TPrefix extends true
    ? `${"v" | ""}${number}.${number}.${number}`
    : TPrefix extends false
      ? `${number}.${number}.${number}`
      : TPrefix extends string
        ? `${TPrefix}${number}.${number}.${number}`
        : never;

/**
 * **GitRef**
 *
 * A type that provides the basic shape of a non-HTTP reference
 * to a Git repository.
 */
export type GitRef = `git@${string}.${string}:${string}.git`;

type NpmPrefix = "" | "^" | ">=" | ">" | "~";
type NpmVersionNum = `${number}${Opt<`.${number}`>}${Opt<`.${number}`>}`;

/**
 * **NpmVersion**
 *
 * an [npm](https://npmjs.org) version / variant range.
 */
export type NpmVersion = `${NpmPrefix}${NpmVersionNum}`;

/**
 * The general structure of a `package.json` file.
 */
export interface PackageJson {
  /** The name of the package. */
  name?: string;
  /** The version of the package, typically following semantic versioning. */
  version?: string;
  /** A short description of the package. */
  description?: string;
  /** The entry point of the package, usually for CommonJS modules. */
  main?: string;
  /** Defines shortcut commands for package scripts. */
  scripts?: Record<string, string>;
  /** A map of package dependencies required for the project. */
  dependencies?: Record<string, NpmVersion>;
  /** A map of development-only dependencies. */
  devDependencies?: Record<string, NpmVersion>;
  /** A map of peer dependencies that must be provided by the consumer. */
  peerDependencies?: Record<string, NpmVersion>;
  /** A map of optional dependencies that won't break the package if missing. */
  optionalDependencies?: Record<string, NpmVersion>;
  /** Dependencies bundled when the package is published. */
  bundledDependencies?: string[] | Record<string, NpmVersion>;
  /** Keywords to help identify the package in searches. */
  keywords?: string[];
  /** The author of the package, as a string or object with details. */
  author?: string | { name: string; email?: string; url?: string };
  /** A list of contributors to the package, as strings or objects with details. */
  contributors?: (string | { name: string; email?: string; url?: string })[];
  /** The license for the package, typically an SPDX identifier. */
  license?: string;
  /** Repository information for the package. */
  repository?: string | { type: string; url: string; directory?: string };
  /** Information about how to report bugs in the package. */
  bugs?: string | { url?: string; email?: string };
  /** The URL to the homepage of the package. */
  homepage?: string;
  /** Specifies the Node.js and other environments the package supports. */
  engines?: Record<string, string>;
  /** Specifies the supported operating systems. */
  os?: string[];
  /** Specifies the supported CPU architectures. */
  cpu?: string[];
  /** Indicates if the package is private and cannot be published. */
  private?: boolean;
  /** Specifies workspace configuration for monorepos. */
  workspaces?: string[] | { packages?: string[]; nohoist?: string[] };
  /** Overrides versions of dependencies for nested packages. */
  resolutions?: Record<string, string>;
  /** Information about funding for the package. */
  funding?: string | { type?: string; url: string };
  /** Browser-specific entry points or fields for the package. */
  browser?: string | Record<string, string>;
  /** User-defined configuration values for package-specific settings. */
  config?: Record<string, any>;
  /** Defines the package's entry points for exports. */
  exports?: Record<string, string | Record<string, string>>;
  /** Defines the package's entry points for imports. */
  imports?: Record<string, string | Record<string, string>>;
  /** A list of files included when the package is published. */
  files?: string[];
  /** Specifies executable files for the package. */
  bin?: string | Record<string, string>;
  /** Specifies man pages for the package. */
  man?: string | string[];
  /** Specifies various directories used by the package. */
  directories?: {
    /** The directory for library files. */
    lib?: string;
    /** The directory for executable binaries. */
    bin?: string;
    /** The directory for man pages. */
    man?: string;
    /** The directory for documentation. */
    doc?: string;
    /** The directory for examples. */
    example?: string;
    /** The directory for tests. */
    test?: string;
  };
  /** Specifies whether the package is a module or CommonJS package. */
  type?: "module" | "commonjs";
  /** Configuration for how the package is published. */
  publishConfig?: Record<string, any>;
  /** The module entry point for ES modules. */
  module?: string;
  /** Specifies the type definition file for the package. */
  types?: string;
  /** An alias for `types`, specifying the type definition file. */
  typings?: string;
  /** Indicates whether the package has side effects or is tree-shakable. */
  sideEffects?: boolean | string[];
  /** Configuration for ESLint specific to the package. */
  eslintConfig?: Record<string, any>;
  /** Configuration for Prettier specific to the package. */
  prettier?: Record<string, any>;
  /** The path to the package's stylesheet entry. */
  style?: string;

  pnpm?: {
    overrides: Record<string, string>;
    [key: string]: unknown;
  };

  tsup?: any;

  [key: string]: unknown;
}

export interface CargoToml {
  /** Package metadata for the Rust project. */
  package?: {
    /** The name of the package. */
    name: string;
    /** The version of the package, typically following semantic versioning. */
    version: string;
    /** A short description of the package. */
    description?: string;
    /** The authors of the package, specified as an array of strings. */
    authors?: string[];
    /** The edition of Rust used by the package (e.g., "2018", "2021"). */
    edition?: string;
    /** The license of the package, typically an SPDX identifier. */
    license?: string;
    /** A path to the license file for the package. */
    license_file?: string;
    /** A URL to the package's homepage. */
    homepage?: string;
    /** A URL to the package's repository. */
    repository?: string;
    /** A URL to the issue tracker for the package. */
    documentation?: string;
    /** A URL to the package documentation. */
    readme?: string | boolean;
    /** Keywords to help categorize the package. */
    keywords?: string[];
    /** Categories to help classify the package. */
    categories?: string[];
    /** Whether the package should be published to crates.io. */
    publish?: boolean;
    /** An array of registries where the package can be published. */
    registries?: string[];
    /** Arbitrary metadata specific to this package. */
    [key: string]: unknown;
  };

  /** Dependencies required by the package. */
  dependencies?: Record<string, string | CargoDependency>;

  /** Dependencies used for development purposes only. */
  devDependencies?: Record<string, string | CargoDependency>;

  /** Dependencies that are optional and feature-gated. */
  optionalDependencies?: Record<string, string | CargoDependency>;

  /** Dependencies required to build the package (e.g., procedural macros). */
  buildDependencies?: Record<string, string | CargoDependency>;

  /** Custom feature flags for conditional compilation. */
  features?: Record<string, string[]>;

  /** The build script to use for the package. */
  build?: string;

  /** Configuration for workspace members, if the project is part of a workspace. */
  workspace?: {
    /** A list of member packages within the workspace. */
    members?: string[];
    /** Excluded packages from the workspace. */
    exclude?: string[];
  };

  /** Metadata for the package binaries. */
  bin?: Array<{
    /** The name of the binary. */
    name?: string;
    /** The path to the binary source file. */
    path?: string;
  }>;

  /** Metadata for the library target. */
  lib?: {
    /** The name of the library. */
    name?: string;
    /** The crate type(s) for the library. */
    crate_type?: string[];
  };

  /** Metadata for example binaries. */
  example?: {
    /** The name of the example binary. */
    name?: string;
    /** The path to the example binary source file. */
    path?: string;
  };

  /** Build target-specific configurations. */
  target?: Record<string, {
    /** Target-specific dependencies. */
    dependencies?: Record<string, string | CargoDependency>;
    /** Target-specific build dependencies. */
    build_dependencies?: Record<string, string | CargoDependency>;
  }>;

  /** The Rust compiler configuration. */
  [key: string]: unknown;
}

/** Detailed dependency configuration for Cargo dependencies. */
export interface CargoDependency {
  /** The version of the dependency. */
  version?: string;
  /** A git repository URL for the dependency. */
  git?: string;
  /** A branch, tag, or revision for the git dependency. */
  branch?: string;
  tag?: string;
  rev?: string;
  /** A path to a local dependency. */
  path?: string;
  /** An optional feature flag for the dependency. */
  features?: string[];
  /** Whether the dependency should be used as default. */
  default_features?: boolean;
  /** Whether the dependency is optional. */
  optional?: boolean;
  /** The package name in case it differs from the key. */
  package?: string;
}
