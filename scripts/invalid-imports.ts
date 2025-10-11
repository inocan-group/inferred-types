#!/usr/bin/env bun run
/**
 * Validates import statements in TypeScript files according to project rules.
 * Outputs XML report of violations and exits with appropriate code.
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, sep, resolve } from "node:path";
import { hostname } from "node:os";

// ============================================================================
// Type Definitions
// ============================================================================

interface ImportStatement {
  file: string;
  line: number;
  content: string;
  source: string;
}

interface FileInstance {
  line: number;
  content: string;
}

interface FileFindings {
  path: string;
  instances: FileInstance[];
}

interface SectionFindings {
  name: string;
  files: Map<string, FileInstance[]>;
}

type SectionName =
  | "invalid-runtime-alias-depth"
  | "invalid-type-alias-depth"
  | "unspecified-path-alias"
  | "relative-path"
  | "forbidden-@-import"
  | "forbidden-runtime-import"
  | "forbidden-const-aliases"
  | "missing-type-modifier"
  | "multiple-imports-same-source";

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Create a clickable terminal link using OSC 8 escape sequences
 * @see https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda
 */
function link(text: string, url: string): string {
  return `\x1B]8;;${url}\x1B\\${text}\x1B]8;;\x1B\\`;
}

/**
 * Create a clickable file link for terminal
 */
function fileLink(relativePath: string, absolutePath: string): string {
  const host = hostname();
  const fileUrl = `file://${host}${absolutePath}`;
  return link(relativePath, fileUrl);
}

/**
 * Escape XML special characters in text content
 */
function xmlEscapeText(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Escape XML special characters in attribute values
 */
function xmlEscapeAttr(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Normalize file path to use forward slashes and start with ./
 */
function normalizePath(filePath: string, basePath: string): string {
  let normalized = relative(basePath, filePath);
  // Convert backslashes to forward slashes for Windows
  normalized = normalized.split(sep).join("/");
  // Ensure it starts with ./
  if (!normalized.startsWith("./")) {
    normalized = "./" + normalized;
  }
  return normalized;
}

/**
 * Recursively find all TypeScript files
 */
function findTypeScriptFiles(dir: string, exclude: string[] = []): string[] {
  const files: string[] = [];
  const excludeDirs = ["node_modules", ".claude", "dist", "build", ".git"];

  function scan(currentDir: string) {
    try {
      const entries = readdirSync(currentDir);

      for (const entry of entries) {
        const fullPath = join(currentDir, entry);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          // Skip excluded directories
          if (!excludeDirs.includes(entry) && !exclude.includes(fullPath)) {
            scan(fullPath);
          }
        } else if (stat.isFile() && (entry.endsWith(".ts") || entry.endsWith(".tsx"))) {
          files.push(fullPath);
        }
      }
    } catch (err) {
      // Ignore permission errors
    }
  }

  scan(dir);
  return files;
}

/**
 * Extract import/export statements from a TypeScript file
 */
function extractImportStatements(filePath: string): ImportStatement[] {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const statements: ImportStatement[] = [];

  // Regex patterns for import/export statements
  const importRegex = /^\s*(import|export)\s+(?:type\s+)?(?:\*|{[^}]*}|[\w]+)?\s*(?:,\s*{[^}]*})?\s*from\s+["']([^"']+)["']/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;

    // Skip comment lines
    if (/^\s*\/\//.test(line)) {
      continue;
    }

    const match = line.match(importRegex);
    if (match) {
      statements.push({
        file: filePath,
        line: lineNumber,
        content: line.trim(),
        source: match[2],
      });
    }
  }

  return statements;
}

/**
 * Load path aliases from deno.jsonc
 */
function loadPathAliases(denoJsoncPath: string): { runtime: Set<string>; types: Set<string> } {
  const runtime = new Set<string>();
  const types = new Set<string>();

  if (!existsSync(denoJsoncPath)) {
    return { runtime, types };
  }

  const content = readFileSync(denoJsoncPath, "utf-8");
  // Remove comments from JSONC
  const jsonContent = content.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");

  try {
    const config = JSON.parse(jsonContent);
    const imports = config.imports || {};

    for (const key of Object.keys(imports)) {
      if (key.startsWith("runtime/")) {
        const segment = key.replace("runtime/", "");
        runtime.add(segment);
      } else if (key.startsWith("types/")) {
        const segment = key.replace("types/", "");
        types.add(segment);
      }
    }
  } catch (err) {
    console.error("Error parsing deno.jsonc:", err);
  }

  return { runtime, types };
}

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Detects runtime/* imports deeper than 2 levels
 */
function validateRuntimeAliasDepth(statements: ImportStatement[]): Map<string, FileInstance[]> {
  const findings = new Map<string, FileInstance[]>();

  for (const stmt of statements) {
    if (stmt.source.startsWith("runtime/")) {
      const parts = stmt.source.split("/");
      if (parts.length > 2) {
        // More than "runtime/segment"
        const instances = findings.get(stmt.file) || [];
        instances.push({ line: stmt.line, content: stmt.content });
        findings.set(stmt.file, instances);
      }
    }
  }

  return findings;
}

/**
 * Detects types/* imports deeper than 2 levels
 */
function validateTypeAliasDepth(statements: ImportStatement[]): Map<string, FileInstance[]> {
  const findings = new Map<string, FileInstance[]>();

  for (const stmt of statements) {
    if (stmt.source.startsWith("types/")) {
      const parts = stmt.source.split("/");
      if (parts.length > 2) {
        // More than "types/segment"
        const instances = findings.get(stmt.file) || [];
        instances.push({ line: stmt.line, content: stmt.content });
        findings.set(stmt.file, instances);
      }
    }
  }

  return findings;
}

/**
 * Detects runtime/* or types/* imports not defined in deno.jsonc
 */
function validateUnspecifiedPathAlias(
  statements: ImportStatement[],
  aliases: { runtime: Set<string>; types: Set<string> }
): Map<string, FileInstance[]> {
  const findings = new Map<string, FileInstance[]>();

  for (const stmt of statements) {
    if (stmt.source.startsWith("runtime/")) {
      const parts = stmt.source.split("/");
      if (parts.length === 2) {
        // Valid depth, check if specified
        const segment = parts[1];
        if (!aliases.runtime.has(segment)) {
          const instances = findings.get(stmt.file) || [];
          instances.push({ line: stmt.line, content: stmt.content });
          findings.set(stmt.file, instances);
        }
      }
    } else if (stmt.source.startsWith("types/")) {
      const parts = stmt.source.split("/");
      if (parts.length === 2) {
        // Valid depth, check if specified
        const segment = parts[1];
        if (!aliases.types.has(segment)) {
          const instances = findings.get(stmt.file) || [];
          instances.push({ line: stmt.line, content: stmt.content });
          findings.set(stmt.file, instances);
        }
      }
    }
  }

  return findings;
}

/**
 * Detects relative path imports with parent directory (..)
 */
function validateRelativePath(statements: ImportStatement[]): Map<string, FileInstance[]> {
  const findings = new Map<string, FileInstance[]>();

  for (const stmt of statements) {
    if (stmt.source.includes("../")) {
      const instances = findings.get(stmt.file) || [];
      instances.push({ line: stmt.line, content: stmt.content });
      findings.set(stmt.file, instances);
    }
  }

  return findings;
}

/**
 * Detects @inferred-types/* imports outside inferred-types module
 */
function validateForbiddenAtImport(statements: ImportStatement[]): Map<string, FileInstance[]> {
  const findings = new Map<string, FileInstance[]>();

  for (const stmt of statements) {
    if (stmt.source.startsWith("@inferred-types/")) {
      // Check if file is NOT in the inferred-types module
      if (!stmt.file.includes("/modules/inferred-types/")) {
        const instances = findings.get(stmt.file) || [];
        instances.push({ line: stmt.line, content: stmt.content });
        findings.set(stmt.file, instances);
      }
    }
  }

  return findings;
}

/**
 * Detects runtime/* imports outside runtime module
 */
function validateForbiddenRuntimeImport(statements: ImportStatement[]): Map<string, FileInstance[]> {
  const findings = new Map<string, FileInstance[]>();

  for (const stmt of statements) {
    // Match runtime/* pattern (one level deep)
    if (/^runtime\/[^/]+$/.test(stmt.source)) {
      // Check if file is NOT in the runtime module
      if (!stmt.file.includes("/modules/runtime/")) {
        const instances = findings.get(stmt.file) || [];
        instances.push({ line: stmt.line, content: stmt.content });
        findings.set(stmt.file, instances);
      }
    }
  }

  return findings;
}

/**
 * Detects constants/* imports
 */
function validateForbiddenConstAliases(statements: ImportStatement[]): Map<string, FileInstance[]> {
  const findings = new Map<string, FileInstance[]>();

  for (const stmt of statements) {
    if (stmt.source.startsWith("constants/")) {
      const instances = findings.get(stmt.file) || [];
      instances.push({ line: stmt.line, content: stmt.content });
      findings.set(stmt.file, instances);
    }
  }

  return findings;
}

/**
 * Detects imports from inferred-types/types without 'type' modifier
 */
function validateMissingTypeModifier(statements: ImportStatement[]): Map<string, FileInstance[]> {
  const findings = new Map<string, FileInstance[]>();

  for (const stmt of statements) {
    if (stmt.source === "inferred-types/types") {
      // Check if 'type' modifier is present
      if (
        !/\bimport\s+type\s+/.test(stmt.content) && // import type
        !/{[^}]*\btype\b[^}]*}/.test(stmt.content) // { type Foo }
      ) {
        const instances = findings.get(stmt.file) || [];
        instances.push({ line: stmt.line, content: stmt.content });
        findings.set(stmt.file, instances);
      }
    }
  }

  return findings;
}

/**
 * Detects multiple imports from the same source
 */
function validateMultipleImportsSameSource(statements: ImportStatement[]): Map<string, FileInstance[]> {
  const findings = new Map<string, FileInstance[]>();

  // Group by file and source
  const fileSourceMap = new Map<string, Map<string, ImportStatement[]>>();

  for (const stmt of statements) {
    if (!fileSourceMap.has(stmt.file)) {
      fileSourceMap.set(stmt.file, new Map());
    }
    const sourceMap = fileSourceMap.get(stmt.file)!;

    if (!sourceMap.has(stmt.source)) {
      sourceMap.set(stmt.source, []);
    }
    sourceMap.get(stmt.source)!.push(stmt);
  }

  // Find duplicates
  for (const [file, sourceMap] of fileSourceMap.entries()) {
    for (const [source, stmts] of sourceMap.entries()) {
      if (stmts.length >= 2) {
        const instances = findings.get(file) || [];
        for (const stmt of stmts) {
          instances.push({ line: stmt.line, content: stmt.content });
        }
        findings.set(file, instances);
      }
    }
  }

  return findings;
}

// ============================================================================
// XML Generation
// ============================================================================

/**
 * Generate XML output from findings
 */
function generateXML(sections: SectionFindings[], basePath: string): string {
  let xml = "<invalid-imports>\n";

  for (const section of sections) {
    xml += `<section name="${section.name}">\n`;

    for (const [filePath, instances] of section.files.entries()) {
      const normalizedPath = normalizePath(filePath, basePath);
      const absolutePath = resolve(filePath);
      const clickablePath = fileLink(normalizedPath, absolutePath);
      xml += `<file path="${xmlEscapeAttr(clickablePath)}">\n`;

      for (const instance of instances) {
        xml += `  <instance line="${instance.line}">${xmlEscapeText(instance.content)}</instance>\n`;
      }

      xml += `</file>\n`;
    }

    xml += `</section>\n\n`;
  }

  xml += "</invalid-imports>\n";
  return xml;
}

// ============================================================================
// Main Execution
// ============================================================================

function main() {
  // Determine scan directory
  const scanDir = process.argv[2] || ".";
  const basePath = process.cwd();

  // Determine which files to scan
  let filesToScan: string[] = [];
  if (scanDir === ".") {
    // Project mode: scan modules/**/src/**
    const modulesDir = join(process.cwd(), "modules");
    if (existsSync(modulesDir)) {
      const modules = readdirSync(modulesDir).filter((entry) => {
        const fullPath = join(modulesDir, entry);
        return statSync(fullPath).isDirectory();
      });

      for (const module of modules) {
        const srcDir = join(modulesDir, module, "src");
        if (existsSync(srcDir)) {
          filesToScan.push(...findTypeScriptFiles(srcDir));
        }
      }
    }
  } else {
    // Test mode: scan specified directory
    // Check if the path is already absolute
    const fullScanPath = scanDir.startsWith("/") ? scanDir : join(process.cwd(), scanDir);
    filesToScan = findTypeScriptFiles(fullScanPath);
  }

  // Extract all import statements
  const allStatements: ImportStatement[] = [];
  for (const file of filesToScan) {
    allStatements.push(...extractImportStatements(file));
  }

  // Load path aliases
  const denoJsoncPath = join(process.cwd(), "deno.jsonc");
  const aliases = loadPathAliases(denoJsoncPath);

  // Run all validations
  const sections: SectionFindings[] = [
    { name: "invalid-runtime-alias-depth", files: validateRuntimeAliasDepth(allStatements) },
    { name: "invalid-type-alias-depth", files: validateTypeAliasDepth(allStatements) },
    { name: "unspecified-path-alias", files: validateUnspecifiedPathAlias(allStatements, aliases) },
    { name: "relative-path", files: validateRelativePath(allStatements) },
    { name: "forbidden-@-import", files: validateForbiddenAtImport(allStatements) },
    { name: "forbidden-runtime-import", files: validateForbiddenRuntimeImport(allStatements) },
    { name: "forbidden-const-aliases", files: validateForbiddenConstAliases(allStatements) },
    { name: "missing-type-modifier", files: validateMissingTypeModifier(allStatements) },
    { name: "multiple-imports-same-source", files: validateMultipleImportsSameSource(allStatements) },
  ];

  // Generate and output XML
  const xml = generateXML(sections, basePath);
  console.log(xml);

  // Determine exit code
  const hasIssues = sections.some((section) => section.files.size > 0);
  process.exit(hasIssues ? 1 : 0);
}

main();
