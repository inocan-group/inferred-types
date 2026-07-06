import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runtimeSrc = path.join(root, "modules/runtime/src");

function listTypeScriptFiles(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const fullPath = path.join(dir, entry.name);

        return entry.isDirectory()
            ? listTypeScriptFiles(fullPath)
            : entry.name.endsWith(".ts")
                ? [fullPath]
                : [];
    });
}

function hasExportModifier(node) {
    return Boolean(node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword));
}

function lineOf(sourceFile, node) {
    return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
}

function missingAnnotations(file) {
    const text = fs.readFileSync(file, "utf8");
    const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const missing = [];

    function visit(node) {
        if (
            ts.isFunctionDeclaration(node)
            && hasExportModifier(node)
            && node.typeParameters?.length
            && !node.type
        ) {
            missing.push(`${path.relative(root, file)}:${lineOf(sourceFile, node)} ${node.name?.text ?? "<anonymous>"}`);
        }

        if (ts.isVariableStatement(node) && hasExportModifier(node)) {
            for (const declaration of node.declarationList.declarations) {
                const init = declaration.initializer;
                if (
                    init
                    && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))
                    && init.typeParameters?.length
                    && !init.type
                ) {
                    missing.push(`${path.relative(root, file)}:${lineOf(sourceFile, declaration)} ${declaration.name.getText(sourceFile)}`);
                }
            }
        }

        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return missing;
}

const missing = listTypeScriptFiles(runtimeSrc).flatMap(missingAnnotations);

if (missing.length > 0) {
    console.error("Exported generic runtime functions must declare explicit return types:");
    for (const item of missing) {
        console.error(`  - ${item}`);
    }
    process.exit(1);
}
