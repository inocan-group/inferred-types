#!/usr/bin/env node
import { Project, SyntaxKind } from "ts-morph";
import path from "node:path";

const project = new Project({
  tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
  skipAddingFilesFromTsConfig: false,
});

let issues = 0;

for (const sf of project.getSourceFiles()) {
  const file = sf.getFilePath();
  if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue;
  for (const imp of sf.getImportDeclarations()) {
    try {
      const spec = imp.getModuleSpecifier();
      const kind = spec.getKind();
      if (kind !== SyntaxKind.StringLiteral) {
        issues++;
        const text = imp.getText().trim();
        const pos = imp.getStartLineNumber();
        console.log(`${file}:${pos}: ${text}`);
      }
    } catch (err) {
      issues++;
      const text = imp.getText().trim();
      const pos = imp.getStartLineNumber();
      console.log(`${file}:${pos}: ${text}`);
    }
  }
  for (const exp of sf.getExportDeclarations()) {
    try {
      const spec = exp.getModuleSpecifier();
      if (!spec) continue;
      const kind = spec.getKind();
      if (kind !== SyntaxKind.StringLiteral) {
        issues++;
        const text = exp.getText().trim();
        const pos = exp.getStartLineNumber();
        console.log(`${file}:${pos}: ${text}`);
      }
    } catch (err) {
      issues++;
      const text = exp.getText().trim();
      const pos = exp.getStartLineNumber();
      console.log(`${file}:${pos}: ${text}`);
    }
  }
}

console.log(`Checked ${project.getSourceFiles().length} files; issues: ${issues}`);
